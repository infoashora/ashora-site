
// app/api/checkout/route.ts
export const runtime = "nodejs";

import Stripe from "stripe";
import { getLiveProductsMap } from "@/app/product/live";

const PERSONALISATION_PRICE_PENCE = 500;
const MAX_NAME_LENGTH = 40;

const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  console.warn("[checkout] STRIPE_SECRET_KEY missing at boot");
}

const stripe = new Stripe(stripeSecret as string);

type CartItem = {
  handle: string;
  name?: string;
  unitAmount?: number;
  quantity: number;
  image?: string;
  personalisationName?: string;
};

type CheckoutBody = {
  items: CartItem[];
  customerEmail?: string;
  promoCode?: string | null;
};

function toInt(
  value: string | undefined,
  fallback = 0
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? Math.max(0, Math.floor(number))
    : fallback;
}

function readCsv(
  name: string,
  fallback: string[]
): string[] {
  const raw = process.env[name];

  if (!raw) return fallback;

  return raw
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean);
}

function normalisePersonalisation(value: unknown): string {
  if (typeof value !== "string") return "";

  return value.trim().replace(/\s+/g, " ");
}

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response("Missing STRIPE_SECRET_KEY", {
        status: 500,
      });
    }

    const hdrOrigin = req.headers.get("origin");

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      hdrOrigin ||
      "http://localhost:3000";

    let body: CheckoutBody;

    try {
      body = (await req.json()) as CheckoutBody;
    } catch {
      return new Response("Invalid checkout request", {
        status: 400,
      });
    }

    if (!Array.isArray(body?.items) || body.items.length === 0) {
      return new Response("No items in cart", {
        status: 400,
      });
    }

    if (body.items.length > 100) {
      return new Response("Too many cart entries", {
        status: 400,
      });
    }

    type NormalisedItem = {
      handle: string;
      title: string;
      unit: number;
      qty: number;
      personalisationName: string;
    };

    const productsMap = await getLiveProductsMap();
    const normalised: NormalisedItem[] = [];
    const productQuantities: Record<string, number> = {};

    // Derive all prices and product details on the server.
    for (const item of body.items) {
      if (!item || typeof item.handle !== "string") {
        return new Response("Invalid cart item", {
          status: 400,
        });
      }

      const product = productsMap[item.handle];

      if (!product || product.kind !== "candle") {
        return new Response("Unknown product", {
          status: 400,
        });
      }

      if (
        typeof item.quantity !== "number" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
      ) {
        return new Response("Invalid quantity", {
          status: 400,
        });
      }

      if (
        item.personalisationName !== undefined &&
        typeof item.personalisationName !== "string"
      ) {
        return new Response("Invalid personalisation", {
          status: 400,
        });
      }

      const personalisationName = normalisePersonalisation(
        item.personalisationName
      );

      if (personalisationName.length > MAX_NAME_LENGTH) {
        return new Response("Personalisation name is too long", {
          status: 400,
        });
      }

      if (
        item.personalisationName !== undefined &&
        !personalisationName
      ) {
        return new Response("Personalisation name is required", {
          status: 400,
        });
      }

      if (personalisationName && item.quantity !== 1) {
        return new Response(
          "Each personalised candle must have its own cart entry",
          { status: 400 }
        );
      }

      const totalQuantity =
        (productQuantities[item.handle] || 0) + item.quantity;

      if (
        typeof product.stock === "number" &&
        totalQuantity > product.stock
      ) {
        return new Response(
          `Not enough stock available for ${product.title}`,
          { status: 400 }
        );
      }

      productQuantities[item.handle] = totalQuantity;

      normalised.push({
        handle: item.handle,
        title: product.title,
        unit:
          product.pricePence +
          (personalisationName
            ? PERSONALISATION_PRICE_PENCE
            : 0),
        qty: item.quantity,
        personalisationName,
      });
    }

    const subtotalPence = normalised.reduce(
      (sum, item) => sum + item.unit * item.qty,
      0
    );

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      normalised.map((item) => ({
        quantity: item.qty,
        price_data: {
          currency: "gbp",
          unit_amount: item.unit,
          product_data: {
            name: item.title,
            description: item.personalisationName
              ? `Personalised candle box - Name: ${item.personalisationName}`
              : "Standard intention candle",
            metadata: {
              handle: item.handle,
              personalised: item.personalisationName
                ? "true"
                : "false",
              personalisation_name: item.personalisationName,
            },
          },
        },
      }));

    // ---------- Promo code lookup ----------
    let appliedPromotionCodeId: string | undefined;

    const rawPromo =
      typeof body.promoCode === "string"
        ? body.promoCode.trim()
        : "";

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
      } catch (err: unknown) {
        console.error("[checkout] promo lookup error", err);

        return new Response("Stripe promo code error", {
          status: 400,
        });
      }
    }

    // ---------- Shipping Env Vars ----------
    const legacyStandardId =
      process.env.STRIPE_SHIP_STANDARD_ID;

    const legacyExpressId =
      process.env.STRIPE_SHIP_EXPRESS_ID;

    let ukStandardId =
      process.env.STRIPE_SHIP_UK_STANDARD_ID ||
      legacyStandardId ||
      "";

    const ukExpressId =
      process.env.STRIPE_SHIP_UK_EXPRESS_ID ||
      legacyExpressId ||
      "";

    const intlStandardId =
      process.env.STRIPE_SHIP_INTL_STANDARD_ID || "";

    const intlExpressId =
      process.env.STRIPE_SHIP_INTL_EXPRESS_ID || "";

    const freeId =
      process.env.STRIPE_SHIP_FREE_ID || "";

    const freeThreshold = 6000;

    const intlStdFallback = toInt(
      process.env.INTL_STANDARD_PENCE,
      1299
    );

    const intlExpFallback = toInt(
      process.env.INTL_EXPRESS_PENCE,
      1999
    );

    const ARCHIVED_UK_STANDARD =
      "shr_1SKM0rK36YMrV9fBDriy8iHr";

    if (ukStandardId === ARCHIVED_UK_STANDARD) {
      console.warn(
        "[checkout] Ignoring archived UK standard ID from env, using inline fallback."
      );

      ukStandardId = "";
    }

    const canOfferFree = subtotalPence >= freeThreshold;

    const shipping_options:
      Stripe.Checkout.SessionCreateParams.ShippingOption[] = [];

    // ---------- Free shipping ----------
    if (canOfferFree) {
      if (
        freeId &&
        subtotalPence >= freeThreshold
      ) {
        shipping_options.push({
          shipping_rate: freeId,
        });
      } else if (
        freeThreshold > 0 &&
        subtotalPence >= freeThreshold
      ) {
        shipping_options.push({
          shipping_rate_data: {
            display_name: "Free Shipping",
            type: "fixed_amount",
            fixed_amount: {
              currency: "gbp",
              amount: 0,
            },
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 2,
              },
              maximum: {
                unit: "business_day",
                value: 4,
              },
            },
          },
        });
      }
    }

    // ---------- UK Standard ----------
    if (ukStandardId) {
      shipping_options.push({
        shipping_rate: ukStandardId,
      });
    } else {
      shipping_options.push({
        shipping_rate_data: {
          display_name: "UK Standard (2-4 business days)",
          type: "fixed_amount",
          fixed_amount: {
            currency: "gbp",
            amount: 399,
          },
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 2,
            },
            maximum: {
              unit: "business_day",
              value: 4,
            },
          },
        },
      });
    }

    // ---------- UK Express ----------
    if (ukExpressId) {
      shipping_options.push({
        shipping_rate: ukExpressId,
      });
    } else {
      shipping_options.push({
        shipping_rate_data: {
          display_name: "UK Express / Next-Day",
          type: "fixed_amount",
          fixed_amount: {
            currency: "gbp",
            amount: 699,
          },
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      });
    }

    // ---------- International Standard ----------
    if (intlStandardId) {
      shipping_options.push({
        shipping_rate: intlStandardId,
      });
    } else {
      shipping_options.push({
        shipping_rate_data: {
          display_name:
            "International Standard (Tracked)",
          type: "fixed_amount",
          fixed_amount: {
            currency: "gbp",
            amount: intlStdFallback,
          },
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 10,
            },
          },
        },
      });
    }

    // ---------- International Express ----------
    if (intlExpressId) {
      shipping_options.push({
        shipping_rate: intlExpressId,
      });
    } else {
      shipping_options.push({
        shipping_rate_data: {
          display_name: "International Express",
          type: "fixed_amount",
          fixed_amount: {
            currency: "gbp",
            amount: intlExpFallback,
          },
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 2,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      });
    }

    // ---------- Allowed Countries ----------
    type AllowedCountry =
      Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry;

    const allowedCountries = readCsv(
      "ALLOWED_SHIP_COUNTRIES",
      [
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
      ]
    ) as AllowedCountry[];

    console.log("[checkout] config", {
      allowedCountries,
      ukStandardId: ukStandardId || "(inline 399p)",
      ukExpressId: ukExpressId || "(inline 699p)",
      intlStandardId:
        intlStandardId ||
        `(inline ${intlStdFallback}p)`,
      intlExpressId:
        intlExpressId ||
        `(inline ${intlExpFallback}p)`,
      freeId: freeId || "(none)",
      subtotalPence,
      freeThreshold,
      promoCode: rawPromo || "(none)",
      appliedPromotionCodeId:
        appliedPromotionCodeId || "(none)",
    });

    // ---------- Session Params ----------
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: allowedCountries,
      },
      shipping_options,
      billing_address_collection: "auto",
      line_items,
      customer_email:
        typeof body.customerEmail === "string"
          ? body.customerEmail
          : undefined,
      success_url:
        `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=1`,
      metadata: {
        source: "ashora_web_live",
        free_threshold_pence: String(freeThreshold),
        subtotal_pence: String(subtotalPence),
      },
    };

    if (appliedPromotionCodeId) {
      params.discounts = [
        {
          promotion_code: appliedPromotionCodeId,
        },
      ];
    }

    const session =
      await stripe.checkout.sessions.create(params);

    return Response.json({
      url: session.url,
    });
  } catch (err: unknown) {
    console.error("[checkout] create error", err);

    const message =
      err instanceof Error
        ? err.message
        : "Checkout error";

    return new Response(`Stripe error: ${message}`, {
      status: 500,
    });
  }
}


