// app/shipping/page.tsx

import Link from "next/link";

const GOLD = "#D1A954";

export const metadata = {
  title: "Shipping & Returns | ASHORA",
  description:
    "Learn about Ashora’s shipping options, processing times, returns, and eco-conscious packaging.",
};

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="rounded-2xl border border-zinc-200 bg-white/70 p-6 md:p-7">
      <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h2>
      <div
        className="mt-2 h-px w-24 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }}
        aria-hidden
      />
      <div className="mt-4 text-sm md:text-[15px] leading-7 text-zinc-700">{children}</div>
    </section>
  );
}

export default function ShippingPage() {
  return (
    <main className="relative">
      {/* Soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(209,169,84,0.08), transparent 60%), radial-gradient(45% 50% at 100% 10%, rgba(209,169,84,0.05), transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-zinc-600">
          <Link
            href="/"
            className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
          >
            Home
          </Link>{" "}
          / <span className="text-zinc-800">Shipping &amp; Returns</span>
        </nav>

        {/* Page header */}
        <header className="mb-8 text-center">
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Shipping &amp; Returns
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm md:text-[15px] text-zinc-600">
            Thoughtfully packaged. Intentionally delivered. Always with love.
          </p>
          <div
            className="mx-auto mt-5 h-px w-44 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }}
            aria-hidden
          />
        </header>

        <div className="grid gap-6">
          <Section title="Processing Time" id="processing">
            <p>
              Each candle is hand-poured with pure intention and carefully packaged in eco-friendly
              materials. Your order will be lovingly prepared and shipped within{" "}
              <strong>2–4 business days</strong>.
            </p>
          </Section>

          <Section title="UK Shipping Options" id="uk-shipping">
            <ul className="grid gap-2">
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>
                  <strong>Standard Delivery</strong>: £3.99 <span className="text-zinc-500">(3–5 business days)</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>
                  <strong>Express Delivery</strong>: £5.99 <span className="text-zinc-500">(1–2 business days)</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>
                  <strong>Free Standard Delivery</strong> on orders over £50
                </span>
              </li>
            </ul>
          </Section>

          <Section title="International Shipping" id="international">
            <ul className="grid gap-2">
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>
                  <strong>Europe</strong>: £7.99 <span className="text-zinc-500">(5–10 business days)</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>
                  <strong>USA, Canada &amp; Australia</strong>: £12.99{" "}
                  <span className="text-zinc-500">(7–14 business days)</span>
                </span>
              </li>
            </ul>
          </Section>

          <Section title="Sustainable Packaging" id="packaging">
            <p>
              Every order arrives in completely recyclable packaging — from tissue paper to protective
              boxing — because caring for our planet is part of the Ashora way.
            </p>
          </Section>

          <Section title="Returns &amp; Exchanges" id="returns">
            <div className="grid gap-4">
              <div>
                <h3 className="font-cormorant text-xl md:text-2xl font-semibold text-zinc-900">
                  Our Promise
                </h3>
                <p className="mt-1">
                  We want you to absolutely love your Ashora experience!
                </p>
              </div>

              <div className="grid gap-3">
                <div>
                  <h4 className="font-medium text-zinc-900">Unopened Items</h4>
                  <p className="mt-1">
                    Returns accepted within 14 days if items are unopened, unused, and in their original packaging.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900">Used Candles</h4>
                  <p className="mt-1">
                    Due to the sacred, intention-based nature of our candles, we cannot accept returns once lit or used.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900">Damaged Orders</h4>
                  <p className="mt-1">
                    If your order arrives damaged or incorrect, please contact us at{" "}
                    <a
                      href="mailto:info@ashora.co.uk"
                      className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
                    >
                      info@ashora.co.uk
                    </a>{" "}
                    within 48 hours with photos. We&apos;ll make it right with a replacement or refund.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900">Custom &amp; Ritual Items</h4>
                  <p className="mt-1">Limited edition and specially prepared ritual items are non-returnable.</p>
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900">Return Costs</h4>
                  <p className="mt-1">You cover return postage unless we&apos;ve made an error or sent damaged items.</p>
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900">Refunds</h4>
                  <p className="mt-1">
                    Processed back to your original payment method within 7–10 business days after we receive your return.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Care &amp; Sustainability" id="care">
            <div className="grid gap-3">
              <div>
                <h4 className="font-medium text-zinc-900">Candle Care Guide</h4>
                <p className="mt-1">
                  Every order includes a double-sided guide with candle safety tips on one side and creative ways to reuse your
                  beautiful jar on the other — because magic should last beyond the flame.
                </p>
              </div>
              <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-4 text-[13px] text-zinc-700">
                <p>
                  Ashora cannot accept returns for issues caused by improper candle care, but we&apos;re always here to help at{" "}
                  <a
                    href="mailto:info@ashora.co.uk"
                    className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
                  >
                    info@ashora.co.uk
                  </a>.
                </p>
              </div>
            </div>
          </Section>

          <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 md:p-7 text-center">
            <p className="text-sm md:text-[15px] text-zinc-700">
              Questions? We typically respond within 24 hours because your journey matters to us.
            </p>
            <p className="mt-4 font-medium text-zinc-800">
              With love &amp; intention,<br />
              ASHORA Team x
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
