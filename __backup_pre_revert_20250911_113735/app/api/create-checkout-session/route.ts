import { NextResponse } from "next/server";
import { getStripe } from "../../../lib/stripe";
import { products } from "../../../data/products";

type CartItem = { id: string; quantity?: number };

/** GET /api/create-checkout-session â€” health check */
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const hasSecret = !!process.env.STRIPE_SECRET_KEY;
  const hasPub = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return NextResponse.json({
    ok: true,
    siteUrl,
    stripeConfigured: hasSecret && hasPub,
    missing: [
      !hasSecret ? "STRIPE_SECRET_KEY" : null,
      !hasPub ? "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" : null,
    ].filter(Boolean),
  });
}

/** POST /api/create-checkout-session â€” create Stripe session */
export async function POST(req: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const missing: string[] = [];
  if (!process.env.STRIPE_SECRET_KEY) missing.push("STRIPE_SECRET_KEY");
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    missing.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
  if (!siteUrl) missing.push("NEXT_PUBLIC_SITE_URL");

  if (missing.length) {
    return NextResponse.json(
      { error: `Missing environment variables: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // Read raw body -> JSON
  let raw = "";
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ error: "Unable to read request body." }, { status: 400 });
  }

  if (!raw) {
    return NextResponse.json(
      { error: "Empty request body. Send JSON with Content-Type: application/json." },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch (e: any) {
    return NextResponse.json(
      { error: `Invalid JSON body: ${e?.message ?? "parse error"}` },
      { status: 400 }
    );
  }

  const items = Array.isArray((body as any)?.items)
    ? ((body as any).items as CartItem[])
    : [];

  if (!items.length) {
    return NextResponse.json(
      { error: "No items provided. Include { items: [{ id, quantity }] }." },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();

    const line_items = items.map((item) => {
      const p = products.find((prd) => prd.id === item.id);
      if (!p) throw new Error(`Unknown product id: ${item.id}`);

      const qty = Number(item.quantity) > 0 ? Number(item.quantity) : 1;

      return {
        quantity: qty,
        price_data: {
          currency: "gbp",
          unit_amount: p.price, // pence
          product_data: { name: p.name },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      allow_promotion_codes: true,
      success_url: `${siteUrl}/cart?status=success`,
      cancel_url: `${siteUrl}/cart?status=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[Ashora] Stripe session error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
