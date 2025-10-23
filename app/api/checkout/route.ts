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
  unitAmount: number; // pence — TAX-EXCLUSIVE
  quantity: number;
  image?: string;
};

function toInt(x: string | undefined, fallback = 0): number {
  const n = Number(x);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : fallback;
}

/** Comma-separated helper for environment lists */
function readCsv(name: string, fallback: string[]): string[] {
  const raw = process.env[name];
  if (!raw) return fallback;
  return raw
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
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
    };

    if (!body?.items?.length) {
      return new Response("No items in cart", { status: 400 });
    }

    // Subtotal (for free-shipping logic)
    const subtotalPence = body.items.reduce((sum, it) => {
      const unit = Math.max(1, Math.round(Number(it.unitAmount || 0)));
      const qty = Math.max(1, Math.floor(it.quantity || 1));
      return sum + unit * qty;
    }, 0);

    // Build Stripe line items (VAT added on top via automatic_tax)
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      body.items.map((i) => ({
        quantity: Math.max(1, Math.floor(i.quantity || 1)),
        price_data: {
          currency: "gbp",
          tax_behavior: "exclusive", // VAT on top
          unit_amount: Math.max(1, Math.round(Number(i.unitAmount || 0))),
          product_data: {
            name: i.name,
            metadata: { handle: i.handle },
            images:
              i.image && /^https?:\/\//i.test(i.image)
                ? [i.image]
                : undefined,
          },
        },
      }));

    // ---------- Shipping options (UK + International) ----------
    //
    // IMPORTANT:
    // - If you create Shipping Rates in the Stripe Dashboard and restrict them to certain countries,
    //   Checkout will ONLY show rates that match the customer's shipping address country.
    // - We wire both UK and International IDs here; Stripe will filter based on those restrictions.
    //
    // Existing UK envs (back-compat):
    const legacyStandardId = process.env.STRIPE_SHIP_STANDARD_ID; // shr_...
    const legacyExpressId = process.env.STRIPE_SHIP_EXPRESS_ID;   // shr_...

    // New explicit envs:
    const ukStandardId = process.env.STRIPE_SHIP_UK_STANDARD_ID || legacyStandardId;
    const ukExpressId  = process.env.STRIPE_SHIP_UK_EXPRESS_ID  || legacyExpressId;

    const intlStandardId = process.env.STRIPE_SHIP_INTL_STANDARD_ID;
    const intlExpressId  = process.env.STRIPE_SHIP_INTL_EXPRESS_ID;

    const freeId = process.env.STRIPE_SHIP_FREE_ID; // Optional (e.g., UK-only free rate with country restriction)
    const freeThreshold = toInt(process.env.FREE_SHIPPING_THRESHOLD_PENCE, 0);

    // Fallback international amounts (used only if INTL IDs are missing)
    const intlStdFallback = toInt(process.env.INTL_STANDARD_PENCE, 999);  // £9.99
    const intlExpFallback = toInt(process.env.INTL_EXPRESS_PENCE, 1999); // £19.99

    const canOfferFree = !!freeId || (freeThreshold > 0 && subtotalPence >= freeThreshold);

    const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [];

    // Free (conditional) — typically set up in Dashboard with country restriction (e.g., UK only)
    if (canOfferFree) {
      if (freeId && subtotalPence >= freeThreshold) {
        shipping_options.push({ shipping_rate: freeId });
      } else if (subtotalPence >= freeThreshold) {
        // Fallback free rate (no country restriction in API form)
        shipping_options.push({
          shipping_rate_data: {
            display_name: "Free Shipping",
            type: "fixed_amount",
            fixed_amount: { currency: "gbp", amount: 0 },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 4 },
            },
            tax_behavior: "exclusive",
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
          tax_behavior: "exclusive",
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
          tax_behavior: "exclusive",
        },
      });
    }

    // International: Standard
    if (intlStandardId) {
      shipping_options.push({ shipping_rate: intlStandardId });
    } else {
      // Fallback international (shown to everyone if you don't restrict IDs in Dashboard)
      shipping_options.push({
        shipping_rate_data: {
          display_name: "International Standard (Tracked)",
          type: "fixed_amount",
          fixed_amount: { currency: "gbp", amount: intlStdFallback },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 10 },
          },
          tax_behavior: "exclusive",
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
          tax_behavior: "exclusive",
        },
      });
    }

    // ---------- Allowed ship-to countries ----------
    const allowedCountries = readCsv("ALLOWED_SHIP_COUNTRIES", [
      // Sensible default list — edit via env
      "GB","IE","US","CA","AU","NZ",
      "FR","DE","NL","BE","ES","IT","PT","AT","DK","FI","SE","NO",
      "CH","AE","SG","HK","JP"
    ]);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      // Taxes
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },

      // Expand shipping globally (editable via env)
      shipping_address_collection: { allowed_countries: allowedCountries },

      // Multiple options shown to the customer (Stripe will filter ID-based ones by country if configured)
      shipping_options,

      // Payments (enable international methods automatically)
      automatic_payment_methods: { enabled: true },

      billing_address_collection: "auto",
      line_items,
      customer_email: body.customerEmail || undefined,

      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=1`,
      metadata: {
        source: "ashora_web_live",
        free_threshold_pence: String(freeThreshold),
        subtotal_pence: String(subtotalPence),
      },
    });

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
