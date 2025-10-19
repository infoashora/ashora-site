// app/returns/page.tsx

import Link from "next/link";

const GOLD = "#D1A954";

export const metadata = {
  title: "Returns Policy | ASHORA",
  description:
    "Read Ashora’s returns, exchanges, and refunds policy, including what’s eligible and how to start a return.",
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

export default function ReturnsPage() {
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
          / <span className="text-zinc-800">Returns</span>
        </nav>

        {/* Page header */}
        <header className="mb-8 text-center">
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Returns &amp; Exchanges
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm md:text-[15px] text-zinc-600">
            We want you to absolutely love your Ashora experience.
          </p>
          <div
            className="mx-auto mt-5 h-px w-44 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
            aria-hidden
          />
        </header>

        <div className="grid gap-6">
          <Section title="Our Promise" id="promise">
            <p>
              Your spiritual journey matters to us. If there’s a concern with your order, we’re here
              to help and will always handle your request with care.
            </p>
          </Section>

          <Section title="Eligibility" id="eligibility">
            <ul className="grid gap-2">
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>
                  <strong>Unopened Items:</strong> Returns accepted within <strong>14 days</strong> if
                  items are unopened, unused, and in their original packaging.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>
                  <strong>Used Candles:</strong> Due to the sacred, intention-based nature of our candles,
                  we’re unable to accept returns once a candle has been lit or used.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>
                  <strong>Custom &amp; Ritual Items:</strong> Limited-edition or specially prepared ritual
                  items are <em>non-returnable</em>.
                </span>
              </li>
            </ul>
          </Section>

          <Section title="Damaged or Incorrect Orders" id="damaged">
            <p>
              If your order arrives damaged or incorrect, please email us within <strong>48 hours</strong> of
              delivery with clear photos. We’ll make it right with a replacement or refund where appropriate.
            </p>
            <p className="mt-2">
              Contact:{" "}
              <a
                href="mailto:info@ashora.co.uk"
                className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
              >
                info@ashora.co.uk
              </a>
            </p>
          </Section>

          <Section title="How to Start a Return" id="how-to">
            <ol className="grid gap-2 list-decimal pl-5">
              <li>
                Email{" "}
                <a
                  href="mailto:info@ashora.co.uk"
                  className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
                >
                  info@ashora.co.uk
                </a>{" "}
                with your order number and reason for return.
              </li>
              <li>We’ll confirm eligibility and provide return instructions.</li>
              <li>Package items securely in original packaging where possible.</li>
              <li>Ship the parcel using a tracked service and keep your receipt.</li>
            </ol>
          </Section>

          <Section title="Return Costs & Refunds" id="costs-refunds">
            <div className="grid gap-3">
              <div>
                <h4 className="font-medium text-zinc-900">Return Costs</h4>
                <p className="mt-1">
                  Return postage is covered by the customer unless we’ve made an error or the items
                  arrived damaged.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900">Refunds</h4>
                <p className="mt-1">
                  Once your return is received and approved, refunds are issued to the original payment
                  method within <strong>7–10 business days</strong>. Timing may vary by bank or card provider.
                </p>
              </div>
            </div>
          </Section>

          <Section title="Exchanges" id="exchanges">
            <p>
              If you’d like a different item, size, or variation, we recommend placing a new order and
              returning the original eligible item for a refund.
            </p>
          </Section>

          <Section title="Candle Care & Responsibility" id="care">
            <p>Every order includes a candle care guide. For safety and best results:</p>
            <ul className="mt-2 grid gap-2">
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>Never leave a burning candle unattended.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>Keep away from children, pets, drafts, and flammable materials.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>Trim the wick to ~5&nbsp;mm before each use and burn on a heat-resistant surface.</span>
              </li>
            </ul>
            <div className="mt-4 rounded-lg border border-amber-100 bg-amber-50/60 p-4 text-[13px] text-zinc-700">
              Ashora cannot accept returns for issues caused by improper candle care, but we’re always happy
              to advise at{" "}
              <a
                href="mailto:info@ashora.co.uk"
                className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
              >
                info@ashora.co.uk
              </a>.
            </div>
          </Section>

          <Section title="Your Right to Cancel (UK)" id="uk-rights">
            <p>
              If you’re a UK consumer, you may have the right to cancel most online purchases within{" "}
              <strong>14 days</strong> of receipt under consumer law. This does not apply to sealed goods
              that are not suitable for return due to health protection or hygiene reasons once unsealed,
              or to bespoke/custom items.
            </p>
          </Section>

          <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 md:p-7 text-center">
            <p className="text-sm md:text-[15px] text-zinc-700">
              Need a hand? We typically respond within 24 hours.
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
