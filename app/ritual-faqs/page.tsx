// app/ritual-faqs/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Ritual FAQs | ASHORA",
  description:
    "A gentle guide to intention candles, crystals, herbs, cleansing, moon phases, and mindfulness—so you can craft simple, powerful rituals with ASHORA.",
};

const RITUAL_STEPS = [
  "Get clear on your intention.",
  "Light your candle and state your desire.",
  "Visualise the outcome.",
  "Give thanks when extinguishing.",
];

const CRYSTALS = [
  {
    name: "Clear Quartz",
    purpose: "Amplification.",
  },
  {
    name: "Amethyst",
    purpose: "Peace and protection.",
  },
  {
    name: "Citrine",
    purpose: "Confidence and success.",
  },
];

const HERBS = [
  {
    name: "Rosemary",
    purpose: "Clarity.",
  },
  {
    name: "Lavender",
    purpose: "Peace.",
  },
  {
    name: "Basil",
    purpose: "Prosperity.",
  },
];

const CLEANSING_STEPS = [
  "Light a candle with intention.",
  "Open windows and allow fresh air to move through your space.",
  "Use cleansing herbs thoughtfully and safely.",
  "Use sound or place meaningful crystals nearby.",
];

const MOON_PHASES = [
  {
    name: "New Moon",
    purpose: "New beginnings and fresh intentions.",
  },
  {
    name: "Full Moon",
    purpose: "Manifestation, gratitude and release.",
  },
  {
    name: "Waning Moon",
    purpose: "Letting go and cleansing.",
  },
];

const MINDFULNESS_STEPS = [
  "Candle gazing for focus.",
  "Breathing exercises.",
  "Gratitude reflection.",
];

const TOOLKIT_STEPS = [
  "An intention candle.",
  "Crystals or meaningful natural objects.",
  "A journal for reflection.",
  "A quiet, comfortable space.",
];

export default function RitualFaqsPage() {
  return (
    <main className="bg-[#faf8f4]">
      {/* Introduction */}
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Ritual Guidance
              </p>

              <h1 className="mt-4 max-w-xl font-cormorant text-5xl font-semibold leading-[0.98] tracking-tight text-zinc-950 sm:text-6xl">
                Ritual FAQs &amp; Guide
              </h1>
            </div>

            <div className="border-l border-zinc-300 pl-6 sm:pl-8">
              <p className="text-sm font-medium text-zinc-950">Hi lovely,</p>

              <p className="mt-4 max-w-xl text-base leading-8 text-zinc-600">
                Welcome to your spiritual sanctuary. This guide is here to help
                you bring intention, calm, and energy alignment into your daily
                life.
              </p>

              <p className="mt-4 max-w-xl text-base leading-8 text-zinc-600">
                Rituals don&apos;t need to be complicated — they simply require
                presence, clarity, and a little magic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intention Candles */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Begin With The Flame
              </p>

              <h2 className="mt-4 max-w-sm font-cormorant text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                Intention Candles
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-600">
                Lighting a candle bridges your inner world with outer reality.
              </p>
            </div>

            <div className="border-t border-zinc-300">
              {RITUAL_STEPS.map((step, index) => (
                <div
                  key={step}
                  className="grid gap-4 border-b border-zinc-300 py-6 sm:grid-cols-[56px_1fr] sm:gap-8"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                    0{index + 1}
                  </p>

                  <p className="text-base leading-8 text-zinc-700">{step}</p>
                </div>
              ))}

              <p className="border-b border-zinc-300 py-7 text-sm leading-7 text-zinc-600">
                Each ASHORA candle comes with its own ritual guide to make this
                process simple, thoughtful and meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Crystals and Herbs */}
      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1A954]">
                Energy &amp; Intuition
              </p>

              <h2 className="mt-4 font-cormorant text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Crystals
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-300">
                Crystals hold and amplify energy, each with unique properties.
                Trust your intuition — you&apos;ll often feel drawn to what you
                need.
              </p>

              <div className="mt-8 border-t border-zinc-700">
                {CRYSTALS.map((crystal, index) => (
                  <div
                    key={crystal.name}
                    className="grid grid-cols-[40px_1fr] gap-4 border-b border-zinc-700 py-5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D1A954]">
                      0{index + 1}
                    </p>

                    <p className="text-sm leading-7 text-zinc-300">
                      <span className="font-medium text-white">
                        {crystal.name}
                      </span>
                      {" — "}
                      {crystal.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1A954]">
                Botanical Support
              </p>

              <h2 className="mt-4 font-cormorant text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Herbs &amp; Botanicals
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-300">
                Sacred herbs can support intentions on both energetic and
                sensory levels. Herb-infused candles add another thoughtful
                layer to your practice.
              </p>

              <div className="mt-8 border-t border-zinc-700">
                {HERBS.map((herb, index) => (
                  <div
                    key={herb.name}
                    className="grid grid-cols-[40px_1fr] gap-4 border-b border-zinc-700 py-5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D1A954]">
                      0{index + 1}
                    </p>

                    <p className="text-sm leading-7 text-zinc-300">
                      <span className="font-medium text-white">{herb.name}</span>
                      {" — "}
                      {herb.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cleansing and Moon Phases */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Refresh Your Environment
              </p>

              <h2 className="mt-4 font-cormorant text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Cleansing Your Space
              </h2>

              <p className="mt-5 text-sm leading-7 text-zinc-600">
                Simple practices can help your space feel calm, fresh and
                balanced.
              </p>

              <div className="mt-8 border-t border-zinc-300">
                {CLEANSING_STEPS.map((step, index) => (
                  <div
                    key={step}
                    className="grid grid-cols-[40px_1fr] gap-4 border-b border-zinc-300 py-5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b793d]">
                      0{index + 1}
                    </p>

                    <p className="text-sm leading-7 text-zinc-600">{step}</p>
                  </div>
                ))}
              </div>
            </article>

            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Work With The Rhythm
              </p>

              <h2 className="mt-4 font-cormorant text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Moon Phases
              </h2>

              <p className="mt-5 text-sm leading-7 text-zinc-600">
                Work with lunar rhythms to bring more focus and meaning to your
                practice.
              </p>

              <div className="mt-8 border-t border-zinc-300">
                {MOON_PHASES.map((phase, index) => (
                  <div
                    key={phase.name}
                    className="grid grid-cols-[40px_1fr] gap-4 border-b border-zinc-300 py-5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b793d]">
                      0{index + 1}
                    </p>

                    <p className="text-sm leading-7 text-zinc-600">
                      <span className="font-medium text-zinc-950">
                        {phase.name}
                      </span>
                      {" — "}
                      {phase.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Mindfulness */}
      <section className="border-y border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Slow Down
              </p>

              <h2 className="mt-4 max-w-md font-cormorant text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                Meditation &amp; Mindfulness
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-zinc-600">
                Rituals are often most powerful when you create enough space to
                be fully present.
              </p>
            </div>

            <div className="border-t border-zinc-300">
              {MINDFULNESS_STEPS.map((step, index) => (
                <div
                  key={step}
                  className="grid gap-4 border-b border-zinc-300 py-6 sm:grid-cols-[56px_1fr] sm:gap-8"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                    0{index + 1}
                  </p>

                  <p className="text-base leading-8 text-zinc-700">{step}</p>
                </div>
              ))}

              <p className="border-b border-zinc-300 py-7 text-sm leading-7 text-zinc-600">
                Even five intentional minutes each day can change the way you
                experience your energy and your environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Start Simply
              </p>

              <h2 className="mt-4 max-w-sm font-cormorant text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                Build Your Ritual Toolkit
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-600">
                Your practice does not need to begin with many objects. Choose
                what feels meaningful and allow it to grow naturally.
              </p>
            </div>

            <div className="grid border-x border-b border-zinc-300 sm:grid-cols-2">
              {TOOLKIT_STEPS.map((step, index) => (
                <article
                  key={step}
                  className={`min-h-[190px] border-t border-zinc-300 p-6 sm:p-7 ${
                    index % 2 !== 0 ? "sm:border-l" : ""
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                    0{index + 1}
                  </p>

                  <p className="mt-8 max-w-xs font-cormorant text-2xl font-semibold leading-tight tracking-tight text-zinc-950">
                    {step}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1A954]">
                Your Journey Starts Here
              </p>

              <h2 className="mt-4 max-w-xl font-cormorant text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Create a ritual that supports where you are today.
              </h2>
            </div>

            <div>
              <p className="max-w-lg text-sm leading-7 text-zinc-300">
                Explore ASHORA candles or create a bespoke candle designed
                around an intention that is personal to you.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-medium text-white transition-colors hover:border-[#D1A954] hover:text-[#D1A954]"
                >
                  Shop Candles
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <Link
                  href="/custom-orders"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-300 transition-colors hover:text-[#D1A954]"
                >
                  Explore Custom Orders
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>

              <p className="mt-8 text-sm leading-7 text-zinc-400">
                With love &amp; intention,
                <br />
                ASHORA Team
              </p>

              <p className="mt-4 text-xs leading-6 text-zinc-500">
                Questions? We&apos;re here to support you —{" "}
                <a
                  href="mailto:info@ashora.co.uk"
                  className="border-b border-zinc-600 pb-1 text-zinc-300 transition-colors hover:border-[#D1A954] hover:text-[#D1A954]"
                >
                  info@ashora.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}