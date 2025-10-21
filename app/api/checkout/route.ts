// app/api/checkout/route.ts
export const runtime = "nodejs";

import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.warn("[checkout] STRIPE_SECRET_KEY missing at boot");
}
const stripe = new Stripe(stripeSecret as string);

// HARD FALLBACK so shipping always appears (your £3.99 rate)
const HARD_FALLBACK_SHIP_ID = "shr_1SKM0rK36YMrV9fBDriy8iHr";

type CartItem = {
  handle: string;
  name: string;
  unitAmount: number; // pence (e.g. 1999 = £19.99) — TAX-EXCLUSIVE
  quantity: number;
  image?: string;
};

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

    const abs = (url?: string) => {
      if (!url) return undefined;
      if (/^https?:\/\//i.test(url)) return url;
      if (url.startsWith("/")) return `${origin}${url}`;
      return `${origin}/${url}`;
    };

    // Build line items (VAT will be ADDED via automatic_tax)
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      body.items.map((i) => ({
        quantity: Math.max(1, Number(i.quantity || 1)),
        price_data: {
          currency: "gbp",
          tax_behavior: "exclusive", // add VAT on top
          unit_amount: Math.max(1, Math.round(Number(i.unitAmount || 0))),
          product_data: {
            name: i.name,
            metadata: { handle: i.handle },
            images: i.image ? [abs(i.image)!] : undefined,
          },
        },
      }));

    // SHIPPING — build list of candidate rate IDs (envs first, then hard fallback)
    const mode = (process.env.STRIPE_SHIPPING_MODE || "").toLowerCase();
    const candidateIds: string[] = [];

    // If you later create a CALCULATED rate in Stripe, you can use this:
    if (mode === "calculated" && process.env.STRIPE_SHIP_CALCULATED_ID) {
      candidateIds.push(process.env.STRIPE_SHIP_CALCULATED_ID);
    } else {
      if (process.env.STRIPE_SHIP_STANDARD_ID) {
        candidateIds.push(process.env.STRIPE_SHIP_STANDARD_ID);
      }
      if (process.env.STRIPE_SHIP_EXPRESS_ID) {
        candidateIds.push(process.env.STRIPE_SHIP_EXPRESS_ID);
      }
    }

    // Hard fallback so shipping ALWAYS shows
    if (candidateIds.length === 0) {
      candidateIds.push(HARD_FALLBACK_SHIP_ID);
    }

    const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      candidateIds.map((id) => ({ shipping_rate: id }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      // VAT / taxes at checkout
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },

      // Collect shipping address (expand list if you ship outside GB)
      shipping_address_collection: { allowed_countries: ["GB"] },

      shipping_options, // guaranteed to contain at least the hard fallback

      billing_address_collection: "auto",
      line_items,
      customer_email: body.customerEmail || undefined,

      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=1`,
      metadata: { source: "ashora_web_live" },
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
