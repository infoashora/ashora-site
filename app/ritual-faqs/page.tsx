// app/ritual-faqs/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Ritual FAQs | ASHORA",
  description:
    "A gentle guide to intention candles, crystals, herbs, cleansing, moon phases, and mindfulness—so you can craft simple, powerful rituals with ASHORA.",
};

export default function RitualFaqsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      {/* Header */}
      <header className="mb-8 md:mb-10">
        <h1 className="font-cormorant text-3xl md:text-4xl font-semibold tracking-tight">
          Ritual FAQs & Guide
        </h1>
        <p className="mt-3 max-w-3xl text-sm md:text-base text-zinc-700">
          Hi lovely,
          <br />
          Welcome to your spiritual sanctuary. This guide is here to help you bring intention,
          calm, and energy alignment into your daily life. Rituals don’t need to be complicated –
          they simply require presence, clarity, and a little magic.
        </p>
      </header>

      {/* Sections */}
      <div className="grid gap-6 md:gap-8">
        {/* Intention Candles */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
          <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
            Intention Candles
          </h2>
          <p className="mt-2 text-zinc-700">
            Lighting a candle bridges your inner world with outer reality.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Get clear on your intention.</li>
            <li>Light your candle and state your desire.</li>
            <li>Visualise the outcome.</li>
            <li>Give thanks when extinguishing.</li>
          </ul>
          <p className="mt-3 text-zinc-700">
            Each ASHORA candle comes with its own ritual guide to make this process simple and powerful.
          </p>
        </section>

        {/* Crystals */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
          <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
            Crystals
          </h2>
          <p className="mt-2 text-zinc-700">
            Crystals hold and amplify energy, each with unique properties.
          </p>
          <ul className="mt-3 grid gap-1 text-zinc-700 sm:grid-cols-2">
            <li>
              <span className="font-medium">Clear Quartz:</span> Amplification.
            </li>
            <li>
              <span className="font-medium">Amethyst:</span> Peace &amp; protection.
            </li>
            <li>
              <span className="font-medium">Citrine:</span> Confidence &amp; success.
            </li>
          </ul>
          <p className="mt-3 text-zinc-700">Trust your intuition – you’ll be drawn to what you need.</p>
        </section>

        {/* Herbs & Botanicals */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
          <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
            Herbs &amp; Botanicals
          </h2>
          <p className="mt-2 text-zinc-700">
            Sacred herbs support intentions on both energetic and sensory levels.
          </p>
          <ul className="mt-3 grid gap-1 text-zinc-700 sm:grid-cols-2">
            <li>
              <span className="font-medium">Rosemary:</span> Clarity.
            </li>
            <li>
              <span className="font-medium">Lavender:</span> Peace.
            </li>
            <li>
              <span className="font-medium">Basil:</span> Prosperity.
            </li>
          </ul>
          <p className="mt-3 text-zinc-700">
            Lighting a herb-infused candle layers extra support into your practice.
          </p>
        </section>

        {/* Cleansing Your Space */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
          <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
            Cleansing Your Space
          </h2>
          <p className="mt-2 text-zinc-700">Keep your energy fresh and balanced:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Light a candle with intention.</li>
            <li>Open windows for fresh air.</li>
            <li>Burn cleansing herbs (sage, palo santo).</li>
            <li>Use sound or place protective crystals.</li>
          </ul>
        </section>

        {/* Moon Phases */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
          <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
            Moon Phases
          </h2>
          <p className="mt-2 text-zinc-700">
            Work with lunar rhythms to enhance your practice:
          </p>
          <ul className="mt-3 grid gap-1 text-zinc-700 sm:grid-cols-2">
            <li>
              <span className="font-medium">New Moon:</span> New beginnings, fresh intentions.
            </li>
            <li>
              <span className="font-medium">Full Moon:</span> Manifestation, gratitude, release.
            </li>
            <li>
              <span className="font-medium">Waning Moon:</span> Letting go, cleansing.
            </li>
          </ul>
        </section>

        {/* Meditation & Mindfulness */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
          <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
            Meditation &amp; Mindfulness
          </h2>
          <p className="mt-2 text-zinc-700">
            Rituals are most powerful when you slow down. Try:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Candle gazing for focus.</li>
            <li>Breathing exercises.</li>
            <li>Gratitude reflection.</li>
          </ul>
          <p className="mt-3 text-zinc-700">Even 5 minutes daily can transform your energy.</p>
        </section>

        {/* Build Your Ritual Toolkit */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
          <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
            Build Your Ritual Toolkit
          </h2>
          <p className="mt-2 text-zinc-700">Start simple and grow naturally:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Intention candles.</li>
            <li>Crystals &amp; herbs.</li>
            <li>Cleansing tools.</li>
            <li>A journal or sacred space.</li>
          </ul>
          <p className="mt-3 text-zinc-700">
            Our ritual kits combine these essentials into one complete set.
          </p>
        </section>

        {/* Closing */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
          <p className="text-zinc-700">
            Your journey starts here. Explore ASHORA candles, ritual kits, and custom spiritual tools to create rituals
            that support your highest self.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-[#D1A954] hover:text-[#D1A954]"
            >
              Shop All
            </Link>
            <Link
              href="/custom-orders"
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-[#D1A954] hover:text-[#D1A954]"
            >
              Explore Custom Orders
            </Link>
          </div>
          <p className="mt-6 text-zinc-700">
            With love &amp; intention,<br />ASHORA Team x
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Questions? We’re here to support you –{" "}
            <a href="mailto:info@ashora.co.uk" className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80">
              info@ashora.co.uk
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
