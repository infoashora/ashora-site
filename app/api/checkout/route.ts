// app/api/checkout/route.ts
export const runtime = "nodejs";

import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.warn("[checkout] STRIPE_SECRET_KEY missing at boot");
}
const stripe = new Stripe(stripeSecret as string);

type CartItem = {
  handle: string;
  name: string;
  unitAmount: number; // pence — tax-free / tax already included in price
  quantity: number;
  image?: string;
};

function toInt(x: string | undefined, fallback = 0): number {
  const n = Number(x);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : fallback;
}

function readCsv(name: string, fallback: string[]): string[] {
  const raw = process.env[name];
  if (!raw) return fallback;
  return raw
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}

/**
 * Intention Candles (for the Christmas offer) are identified by handle.
 *
 * Rule:
 *  - handle contains one of:
 *      "manifestation", "love-self-love", "wealth-abundance", "peace-healing"
 *  - AND handle also contains "candle"
 *
 * That way herb boxes / ritual boxes (which may share the intention name)
 * do NOT get the discount.
 */
const INTENTION_HANDLE_KEYWORDS = [
  "manifestation",
  "love-self-love",
  "wealth-abundance",
  "peace-healing",
];

function isIntentionCandleHandle(handle: string | undefined): boolean {
  if (!handle) return false;
  const h = handle.toLowerCase();
  if (!h.includes("candle")) return false;
  return INTENTION_HANDLE_KEYWORDS.some((k) => h.includes(k));
}

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response("Missing STRIPE_SECRET_KEY", { status: 500 });
    }

    const hdrOrigin = req.headers.get("origin");
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      hdrOrigin ||
      "http://localhost:3000";

    const body = (await req.json()) as {
      items: CartItem[];
      customerEmail?: string;
      promoCode?: string | null;
    };

    if (!body?.items?.length) {
      return new Response("No items in cart", { status: 400 });
    }

    // ---------- Normalize cart items ----------
    const normalized = body.items.map((it) => {
      const unit = Math.max(1, Math.round(Number(it.unitAmount || 0)));
      const qty = Math.max(1, Math.floor(it.quantity || 1));
      const intention = isIntentionCandleHandle(it.handle);
      return {
        ...it,
        unit,
        qty,
        isIntentionCandle: intention,
      };
    });

    // ---------- Christmas Promo: 10% off Intention Candles (>= 2 qty total) ----------
    const totalIntentionQty = normalized
      .filter((i) => i.isIntentionCandle)
      .reduce((sum, i) => sum + i.qty, 0);

    const CHRISTMAS_INTENTION_DISCOUNT_RATE = 0.1;
    const christmasDiscountApplies = totalIntentionQty >= 2;

    // Subtotal based on original prices (pre-discount) for shipping logic / metadata
    const subtotalPence = normalized.reduce(
      (sum, it) => sum + it.unit * it.qty,
      0
    );

    // Build line_items with discounted unit_amount for intention candles (if promo applies)
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      normalized.map((i) => {
        const baseUnit = i.unit;
        const discountedUnit =
          christmasDiscountApplies && i.isIntentionCandle
            ? Math.max(
                1,
                Math.round(baseUnit * (1 - CHRISTMAS_INTENTION_DISCOUNT_RATE))
              )
            : baseUnit;

        return {
          quantity: i.qty,
          price_data: {
            currency: "gbp",
            unit_amount: discountedUnit,
            product_data: {
              name: i.name,
              metadata: {
                handle: i.handle,
                is_intention_candle: i.isIntentionCandle ? "1" : "0",
              },
              images:
                i.image && /^https?:\/\//i.test(i.image)
                  ? [i.image]
                  : undefined,
            },
          },
        };
      });

    // ---------- Promo code lookup (Stripe Dashboard promotions) ----------
    let appliedPromotionCodeId: string | undefined;
    const rawPromo = (body.promoCode || "").trim();

    if (rawPromo) {
      try {
        const promoList = await stripe.promotionCodes.list({
          code: rawPromo,
          active: true,
          limit: 1,
        });

        const promo = promoList.data[0];

        if (!promo) {
          return new Response("Invalid or expired promo code", {
            status: 400,
          });
        }

        appliedPromotionCodeId = promo.id;
      } catch (err: any) {
        console.error("[checkout] promo lookup error", err?.raw || err);
        const msg =
          (err?.raw && (err.raw.message || err.raw.error?.message)) ||
          err?.message ||
          "Promo code error";

        return new Response(`Stripe promo error: ${msg}`, { status: 400 });
      }
    }

    // ---------- Shipping Env Vars ----------
    const legacyStandardId = process.env.STRIPE_SHIP_STANDARD_ID;
    const legacyExpressId = process.env.STRIPE_SHIP_EXPRESS_ID;

    let ukStandardId =
      process.env.STRIPE_SHIP_UK_STANDARD_ID || legacyStandardId || "";

    const ukExpressId =
      process.env.STRIPE_SHIP_UK_EXPRESS_ID || legacyExpressId || "";

    const intlStandardId = process.env.STRIPE_SHIP_INTL_STANDARD_ID || "";
    const intlExpressId = process.env.STRIPE_SHIP_INTL_EXPRESS_ID || "";

    const freeId = process.env.STRIPE_SHIP_FREE_ID || "";
    const freeThreshold = toInt(process.env.FREE_SHIPPING_THRESHOLD_PENCE, 0);

    const intlStdFallback = toInt(process.env.INTL_STANDARD_PENCE, 1299);
    const intlExpFallback = toInt(process.env.INTL_EXPRESS_PENCE, 1999);

    // Kill archived UK Standard ID
    const ARCHIVED_UK_STANDARD = "shr_1SKM0rK36YMrV9fBDriy8iHr";
    if (ukStandardId === ARCHIVED_UK_STANDARD) {
      console.warn(
        "[checkout] Ignoring archived UK standard ID from env, using inline fallback."
      );
      ukStandardId = "";
    }

    const canOfferFree =
      !!freeId || (freeThreshold > 0 && subtotalPence >= freeThreshold);

    const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      [];

    // Free
    if (canOfferFree) {
      if (freeId && subtotalPence >= freeThreshold) {
        shipping_options.push({ shipping_rate: freeId });
      } else if (subtotalPence >= freeThreshold) {
        shipping_options.push({
          shipping_rate_data: {
            display_name: "Free Shipping",
            type: "fixed_amount",
            fixed_amount: { currency: "gbp", amount: 0 },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 4 },
            },
          },
        });
      }
    }

    // UK: Standard
    if (ukStandardId) {
      shipping_options.push({ shipping_rate: ukStandardId });
    } else {
      shipping_options.push({
        shipping_rate_data: {
          display_name: "UK Standard (2–4 business days)",
          type: "fixed_amount",
          fixed_amount: { currency: "gbp", amount: 399 },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 4 },
          },
        },
      });
    }

    // UK: Express
    if (ukExpressId) {
      shipping_options.push({ shipping_rate: ukExpressId });
    } else {
      shipping_options.push({
        shipping_rate_data: {
          display_name: "UK Express / Next-Day",
          type: "fixed_amount",
          fixed_amount: { currency: "gbp", amount: 699 },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 1 },
          },
        },
      });
    }

    // International: Standard
    if (intlStandardId) {
      shipping_options.push({ shipping_rate: intlStandardId });
    } else {
      shipping_options.push({
        shipping_rate_data: {
          display_name: "International Standard (Tracked)",
          type: "fixed_amount",
          fixed_amount: { currency: "gbp", amount: intlStdFallback },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 10 },
          },
        },
      });
    }

    // International: Express
    if (intlExpressId) {
      shipping_options.push({ shipping_rate: intlExpressId });
    } else {
      shipping_options.push({
        shipping_rate_data: {
          display_name: "International Express",
          type: "fixed_amount",
          fixed_amount: { currency: "gbp", amount: intlExpFallback },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      });
    }

    // ---------- Allowed Countries ----------
    type AllowedCountry =
      Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry;

    const allowedCountries =
      readCsv("ALLOWED_SHIP_COUNTRIES", [
        "GB",
        "IE",
        "US",
        "CA",
        "AU",
        "NZ",
        "FR",
        "DE",
        "NL",
        "BE",
        "ES",
        "IT",
        "PT",
        "AT",
        "DK",
        "FI",
        "SE",
        "NO",
        "CH",
        "AE",
        "SG",
        "HK",
        "JP",
      ]) as AllowedCountry[];

    // Debug logging
    console.log("[checkout] config", {
      allowedCountries,
      ukStandardId: ukStandardId || "(inline 399p)",
      ukExpressId: ukExpressId || "(inline 699p)",
      intlStandardId: intlStandardId || `(inline ${intlStdFallback}p)`,
      intlExpressId: intlExpressId || `(inline ${intlExpFallback}p)`,
      freeId: freeId || "(none)",
      subtotalPence,
      freeThreshold,
      promoCode: rawPromo || "(none)",
      appliedPromotionCodeId: appliedPromotionCodeId || "(none)",
      christmasIntentionQty: totalIntentionQty,
      christmasDiscountApplied: christmasDiscountApplies,
    });

    // ---------- Session Params ----------
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: allowedCountries },
      shipping_options,
      billing_address_collection: "auto",
      line_items,
      customer_email: body.customerEmail || undefined,
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=1`,
      metadata: {
        source: "ashora_web_live",
        free_threshold_pence: String(freeThreshold),
        subtotal_pence: String(subtotalPence),
        christmas_intention_discount_applied: christmasDiscountApplies ? "1" : "0",
        christmas_intention_total_qty: String(totalIntentionQty),
        christmas_intention_discount_rate: christmasDiscountApplies
          ? "10%"
          : "0%",
      },
    };

    if (appliedPromotionCodeId) {
      params.discounts = [{ promotion_code: appliedPromotionCodeId }];
    }

    const session = await stripe.checkout.sessions.create(params);
    return Response.json({ url: session.url });
  } catch (err: any) {
    console.error("[checkout] create error", err?.raw || err);
    const msg =
      (err?.raw && (err.raw.message || err.raw.error?.message)) ||
      err?.message ||
      "Checkout error";

    return new Response(`Stripe error: ${msg}`, { status: 500 });
  }
}
