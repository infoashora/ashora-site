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

    // Subtotal in pence (for free-shipping logic)
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

    // Shipping options:
    // Always offer Standard + Express when configured.
    // Offer Free only when subtotal >= FREE_SHIPPING_THRESHOLD_PENCE.
    const standardId = process.env.STRIPE_SHIP_STANDARD_ID; // shr_...
    const expressId = process.env.STRIPE_SHIP_EXPRESS_ID;   // shr_...
    const freeId = process.env.STRIPE_SHIP_FREE_ID;         // shr_...
    const freeThreshold = toInt(process.env.FREE_SHIPPING_THRESHOLD_PENCE, 0);

    const shippingRateIds: string[] = [];

    const canOfferFree = !!freeId && subtotalPence >= freeThreshold;
    if (canOfferFree) shippingRateIds.push(freeId!);

    if (standardId) shippingRateIds.push(standardId);
    if (expressId) shippingRateIds.push(expressId);

    // If nothing configured, leave undefined; Stripe will error if shipping is required but no options exist.
    const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] | undefined =
      shippingRateIds.length
        ? shippingRateIds.map((id) => ({ shipping_rate: id }))
        : undefined;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      // Taxes
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },

      // Ship to GB (add more ISO codes if you expand)
      shipping_address_collection: { allowed_countries: ["GB"] },

      // Multiple options shown to the customer
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
