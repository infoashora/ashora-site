// app/terms/page.tsx

import Link from "next/link";

const GOLD = "#D1A954";

export const metadata = {
  title: "Terms of Service | ASHORA",
  description:
    "Read Ashora’s Terms of Service covering ordering, payments, shipping, returns, safety, and compliance.",
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
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
        aria-hidden
      />
      <div className="mt-4 text-sm md:text-[15px] leading-7 text-zinc-700">{children}</div>
    </section>
  );
}

export default function TermsPage() {
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
          / <span className="text-zinc-800">Terms of Service</span>
        </nav>

        {/* Page header */}
        <header className="mb-8 text-center">
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm md:text-[15px] text-zinc-600">Last updated: 2025</p>
          <div
            className="mx-auto mt-5 h-px w-44 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
            aria-hidden
          />
        </header>

        <div className="grid gap-6">
          <Section title="Ordering & Pricing" id="ordering">
            <p>
              All prices are shown in GBP (£) and include VAT where applicable. Placing an order
              constitutes an offer to purchase. We reserve the right to refuse or cancel any order —
              for example due to suspected fraud or inventory issues.
            </p>
          </Section>

          <Section title="Payment" id="payment">
            <p>
              Payments are processed securely via Stripe. Your card is charged when your order is
              confirmed. We do not store full card details on our servers.
            </p>
          </Section>

          <Section title="Shipping & Delivery" id="shipping">
            <p>
              Orders are typically dispatched within the processing time stated on our{" "}
              <Link
                href="/shipping"
                className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
              >
                Shipping page
              </Link>
              . Delivery timeframes may vary by carrier and destination. Risk of loss passes to you
              upon delivery to the address provided at checkout.
            </p>
          </Section>

          <Section title="Returns & Refunds" id="returns">
            <p>
              If there’s an issue with your order, contact us at{" "}
              <a
                href="mailto:info@ashora.co.uk"
                className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
              >
                info@ashora.co.uk
              </a>{" "}
              within 14 days of delivery. For safety reasons, used candles and opened consumables
              may not be eligible for return unless the product is defective. For full details,
              please see our{" "}
              <Link
                href="/returns"
                className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
              >
                Returns Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="Safety Guidance" id="safety">
            <ul className="grid gap-2">
              <li className="flex items-start gap-2">
                <span
                  className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: GOLD }}
                />
                <span>Never leave a burning candle unattended.</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: GOLD }}
                />
                <span>Keep away from children, pets, drafts, and flammable materials.</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: GOLD }}
                />
                <span>
                  Trim wick to approximately 5&nbsp;mm before each use; burn on a heat-resistant
                  surface.
                </span>
              </li>
            </ul>
          </Section>

          <Section title="Limitation of Liability" id="liability">
            <p>
              To the maximum extent permitted by law, Ashora is not liable for indirect or
              consequential losses. Nothing in these terms limits liability where it cannot be
              excluded by law.
            </p>
          </Section>

          <Section title="Contact & Compliance" id="contact">
            <p>
              For any enquiries, please contact{" "}
              <a
                href="mailto:info@ashora.co.uk"
                className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
              >
                info@ashora.co.uk
              </a>
              .
            </p>
            <div className="mt-4 rounded-lg border border-amber-100 bg-amber-50/60 p-4 text-[13px] text-zinc-700">
              <strong className="text-zinc-900">CLP Compliance:</strong> Each candle includes a CLP
              circle sticker on the base with the required safety and substance information. Labels
              are plain white with black text and provided for compliance (not aesthetic).
            </div>
          </Section>

          <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 md:p-7 text-center">
            <p className="text-sm md:text-[15px] text-zinc-700">
              These terms govern your use of Ashora products and this website.
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
