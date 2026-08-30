import Link from "next/link";

const STORY_PARAGRAPHS = [
  "I grew up feeling like I was wrestling with my attention, my emotions, and a hyperactivity that didn’t fit the world around me. By secondary school, everything felt overwhelming. I was eventually diagnosed with ADHD and depression. Medication helped a little, but the support around me was thin, and I moved to a Pupil Support Unit.",

  "One day at a church market with my Nan, we found a small crystal stall that changed my life. She showed me how to choose stones by intuition. I bought a few crystals, a salt lamp, and a book — small pieces that quietly shifted my inner peace.",

  "Grief, a toxic relationship, and a string of challenges followed. At 17, I left medication and turned to meditation, journaling, art, and ritual. At 18, I became a mother. Three months after my son was born, my Nan passed suddenly. In 2023 I separated from my son’s father and advocated for him through assessments; shortly after his third birthday he was diagnosed with autism.",

  "Through it all, daily rituals, breathwork, manifestation, and mindful creativity became my lifeline. They led me into energy and frequency work — the kind you can feel in your body and your space.",

  "That’s where ASHORA was born. From art and ritual came a brand I couldn’t find elsewhere: candles and spiritual tools infused with intention, designed for mental wellbeing, spiritual practice, and everyday calm — vegan, eco-conscious, and hand-poured with love.",
];

const TIMELINE = [
  {
    title: "Early years",
    description:
      "ADHD & depression diagnosis; learning to self-soothe without the right support.",
  },
  {
    title: "A spark",
    description:
      "A crystal stall with Nan — intuition, energy, and a new way to listen inward.",
  },
  {
    title: "Turning inward",
    description:
      "Meditation, journaling, art, ritual become daily anchors.",
  },
  {
    title: "Motherhood & loss",
    description:
      "Becoming a mum; losing Nan; choosing gentleness and presence.",
  },
  {
    title: "Advocacy",
    description:
      "Navigating assessments; my son’s autism diagnosis; building a calmer home rhythm.",
  },
  {
    title: "ASHORA",
    description:
      "From pain to practice to product — a sanctuary you can hold.",
  },
];

const PILLARS = [
  {
    number: "01",
    title: "Spiritual-meets-Luxury",
    description:
      "Ritual tools designed to look as beautiful as they feel — gold-kissed, calm, intentional.",
  },
  {
    number: "02",
    title: "Vegan & Eco-Conscious",
    description:
      "Consciously sourced materials and small-batch, hand-poured production.",
  },
  {
    number: "03",
    title: "Made with Intention",
    description:
      "Crystals, herbs, and affirmations aligned to Manifestation, Love, Wealth, and Peace.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#faf8f4]">
      {/* Introduction */}
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                The Story Behind ASHORA
              </p>

              <h1 className="mt-4 max-w-xl font-cormorant text-5xl font-semibold leading-[0.98] tracking-tight text-zinc-950 sm:text-6xl">
                About ASHORA
              </h1>
            </div>

            <div className="border-l border-zinc-300 pl-6 sm:pl-8">
              <p className="max-w-xl text-base leading-8 text-zinc-600">
                Spiritual-meets-luxury ritual tools — candles, crystals, and
                herb blends — crafted with intention to bring calm, clarity,
                and devotion into everyday life.
              </p>

              <Link
                href="/quiz"
                className="group mt-7 inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:text-[#9b793d]"
              >
                Find Your Intention
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                The Beginning
              </p>

              <h2 className="mt-4 max-w-sm font-cormorant text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                The seed to the garden
              </h2>

              <div className="mt-7 h-px w-20 bg-[#D1A954]" />

              <p className="mt-7 max-w-sm text-sm leading-7 text-zinc-500">
                A deeply personal journey from overwhelm and loss to ritual,
                intention and the creation of ASHORA.
              </p>
            </div>

            <div className="border-t border-zinc-300">
              {STORY_PARAGRAPHS.map((paragraph, index) => (
                <div
                  key={paragraph}
                  className="grid gap-4 border-b border-zinc-300 py-7 sm:grid-cols-[56px_1fr] sm:gap-8 sm:py-8"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                    0{index + 1}
                  </p>

                  <p className="text-base leading-8 text-zinc-700">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1A954]">
                A Note From Our Founder
              </p>
            </div>

            <div>
              <blockquote className="max-w-3xl font-cormorant text-3xl font-medium leading-[1.25] tracking-tight text-white sm:text-4xl">
                “When you light an ASHORA candle, you aren’t just inviting
                light — you’re inviting intention, clarity, and peace.”
              </blockquote>

              <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300">
                Ritual is the gentle practice of showing up for yourself, even
                in the dark.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  href="/quiz"
                  className="group inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-medium text-white transition-colors hover:border-[#D1A954] hover:text-[#D1A954]"
                >
                  Find Your Intention
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-300 transition-colors hover:text-[#D1A954]"
                >
                  Explore the Collection
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                The Journey
              </p>

              <h2 className="mt-4 max-w-sm font-cormorant text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                A path marked by intention
              </h2>
            </div>

            <ol className="border-t border-zinc-300">
              {TIMELINE.map((item, index) => (
                <li
                  key={item.title}
                  className="grid gap-4 border-b border-zinc-300 py-6 sm:grid-cols-[56px_180px_1fr] sm:items-start sm:gap-6"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                    0{index + 1}
                  </p>

                  <h3 className="font-cormorant text-xl font-semibold tracking-tight text-zinc-950">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-7 text-zinc-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="border-y border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid gap-8 border-b border-zinc-300 pb-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Our Principles
              </p>

              <h2 className="mt-4 font-cormorant text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                What guides ASHORA
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-zinc-600 lg:justify-self-end">
              Every detail is considered through the lens of beauty,
              consciousness and meaningful everyday ritual.
            </p>
          </div>

          <div className="grid border-x border-b border-zinc-300 md:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <article
                key={pillar.title}
                className={`min-h-[250px] p-7 sm:p-8 ${
                  index > 0
                    ? "border-t border-zinc-300 md:border-l md:border-t-0"
                    : ""
                } ${index === 1 ? "bg-zinc-900" : "bg-white"}`}
              >
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                    index === 1 ? "text-[#D1A954]" : "text-[#9b793d]"
                  }`}
                >
                  {pillar.number}
                </p>

                <h3
                  className={`mt-8 font-cormorant text-2xl font-semibold tracking-tight ${
                    index === 1 ? "text-white" : "text-zinc-950"
                  }`}
                >
                  {pillar.title}
                </h3>

                <p
                  className={`mt-4 text-sm leading-7 ${
                    index === 1 ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 border-y border-zinc-300 py-10 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20 sm:py-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Begin Your Ritual
              </p>

              <h2 className="mt-4 max-w-xl font-cormorant text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                Light the way with ASHORA
              </h2>
            </div>

            <div>
              <p className="max-w-lg text-sm leading-7 text-zinc-600">
                Start with the intention that calls you. Each piece includes
                guidance for ritual, affirmation, and gentle practice.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
                >
                  Shop the Collection
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <Link
                  href="/quiz"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-700 transition-colors hover:text-[#9b793d]"
                >
                  Find Your Intention
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}