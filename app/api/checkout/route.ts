// app/api/checkout/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import type Stripe from "stripe";

type CartItem = {
  handle: string;
  name: string;
  unitAmount: number; // pence (e.g. 1999 = £19.99)
  quantity: number;
  image?: string;
};

// Lazy Stripe client (no top-level side effects during build)
async function getStripe(): Promise<Stripe> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  const mod = await import("stripe");
  const StripeCtor = mod.default;
  // omit apiVersion to avoid TS literal narrowing conflicts
  return new StripeCtor(key) as unknown as Stripe;
}

export async function POST(req: Request) {
  try {
    const stripe = await getStripe();

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

    // Build Stripe line items
    const line_items =
      body.items.map((i) => ({
        quantity: Math.max(1, Number(i.quantity || 1)),
        price_data: {
          currency: "gbp",
          unit_amount: Math.max(1, Math.round(Number(i.unitAmount || 0))),
          product_data: {
            name: i.name,
            metadata: { handle: i.handle },
            images: i.image ? [abs(i.image)!] : undefined,
          },
        },
      })) as unknown as Stripe.Checkout.SessionCreateParams.LineItem[];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      automatic_tax: { enabled: false },
      billing_address_collection: "auto",
      line_items,
      customer_email: body.customerEmail || undefined,
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=1`,
      metadata: { source: "ashora_web_test" },
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
