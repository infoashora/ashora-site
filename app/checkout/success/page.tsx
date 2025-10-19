// Server Component: fetches the Stripe session and shows a receipt-lite view
import Link from "next/link";
import Stripe from "stripe";

type Props = { searchParams?: { session_id?: string } };

function formatGBP(pence?: number | null) {
  if (typeof pence !== "number") return "â€”";
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
}

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = searchParams?.session_id;

  let session: Stripe.Checkout.Session | null = null;
  let lineItems: Stripe.ApiList<Stripe.LineItem>["data"] = [];

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" });
    try {
      const s = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items.data.price.product"],
      });
      session = s;
      // @ts-expect-error: expanded line_items at runtime
      lineItems = s?.line_items?.data ?? [];
    } catch (e) {
      // swallow â€” weâ€™ll just render a generic thank-you
      console.error("Could not load Stripe session", e);
    }
  }

  const total = formatGBP(typeof session?.amount_total === "number" ? session?.amount_total : null);
  const email = session?.customer_details?.email ?? "";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Thank you â€” your order is confirmed.</h1>
        <p className="mt-2 text-zinc-600">
          {email ? (
            <>A confirmation has been sent to <span className="font-medium">{email}</span>.</>
          ) : (
            <>A confirmation email has been sent.</>
          )}
        </p>
      </header>

      {/* Order summary (only if we could load it) */}
      {lineItems.length > 0 && (
        <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">Order Summary</h2>
          <div className="mt-3 divide-y">
            {lineItems.map((li) => {
              const name =
                (li.price?.product as any)?.name ||
                li.description ||
                li.price?.nickname ||
                "ASHORA Item";
              const qty = li.quantity ?? 1;
              const unitPence = li.price?.unit_amount ?? null;
              return (
                <div key={li.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-xs text-zinc-500">Qty: {qty}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatGBP(unitPence)}</div>
                    <div className="text-xs text-zinc-500">Line: {formatGBP((unitPence ?? 0) * qty)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm">
            <span>Order Total</span>
            <span className="font-semibold">{total}</span>
          </div>
          <p className="mt-2 text-xs text-zinc-500">Shipping & taxes are included in the final total shown at checkout.</p>
        </section>
      )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-[#D1A954] hover:text-[#D1A954] focus:outline-none focus:ring-2 focus:ring-[#D1A954]/30"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-transparent px-3 py-2 text-sm text-zinc-700 underline decoration-amber-300 underline-offset-4"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
