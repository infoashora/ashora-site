import Link from "next/link";

const GOLD = "#D1A954";

export default function AboutPage() {
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

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-zinc-600">
          <Link
            href="/"
            className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
          >
            Home
          </Link>{" "}
          / <span className="text-zinc-800">About</span>
        </nav>

        {/* Hero */}
        <header className="text-center">
          <h1 className="font-cormorant text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
            About ASHORA
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600">
            Spiritual-meets-luxury ritual tools — candles, crystals, and herb blends — crafted
            with intention to bring calm, clarity, and devotion into everyday life.
          </p>
          <div
            className="mx-auto mt-6 h-px w-40 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }}
            aria-hidden
          />
        </header>

        {/* Founder story card */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="grid items-stretch gap-0 md:grid-cols-5">
            <div className="md:col-span-3 p-6 md:p-8">
              <h2 className="font-cormorant text-2xl font-semibold tracking-tight text-zinc-900">
                The seed to the garden
              </h2>
              <div className="mt-3 space-y-4 text-sm leading-7 text-zinc-700">
                <p>
                  I grew up feeling like I was wrestling with my attention, my emotions, and a
                  hyperactivity that didn’t fit the world around me. By secondary school, everything
                  felt overwhelming. I was eventually diagnosed with ADHD and depression. Medication
                  helped a little, but the support around me was thin, and I moved to a Pupil
                  Support Unit.
                </p>
                <p>
                  One day at a church market with my Nan, we found a small crystal stall that changed
                  my life. She showed me how to choose stones by intuition. I bought a few crystals,
                  a salt lamp, and a book — small pieces that quietly shifted my inner peace.
                </p>
                <p>
                  Grief, a toxic relationship, and a string of challenges followed. At 17, I left
                  medication and turned to meditation, journaling, art, and ritual. At 18, I became
                  a mother. Three months after my son was born, my Nan passed suddenly. In 2023 I
                  separated from my son’s father and advocated for him through assessments; shortly
                  after his third birthday he was diagnosed with autism.
                </p>
                <p>
                  Through it all, daily rituals, breathwork, manifestation, and mindful creativity
                  became my lifeline. They led me into energy and frequency work — the kind you can
                  feel in your body and your space.
                </p>
                <p>
                  That’s where ASHORA was born. From art and ritual came a brand I couldn’t find
                  elsewhere: candles and spiritual tools infused with intention, designed for mental
                  wellbeing, spiritual practice, and everyday calm — vegan, eco-conscious, and
                  hand-poured with love.
                </p>
              </div>
            </div>

            {/* Pull-quote side panel */}
            <aside className="relative md:col-span-2 border-t md:border-l md:border-t-0 border-zinc-200 bg-amber-50/50 p-6 md:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full"
                style={{ background: `${GOLD}26`, filter: "blur(18px)" }}
              />
              <blockquote className="text-[15px] leading-7 text-zinc-800">
                <span className="block text-[11px] uppercase tracking-wide text-zinc-600">
                  A note from our founder
                </span>
                <span className="mt-2 block font-medium">
                  “When you light an ASHORA candle, you aren’t just inviting light — you’re inviting
                  intention, clarity, and peace. Ritual is the gentle practice of showing up for
                  yourself, even in the dark.”
                </span>
              </blockquote>

              <div className="mt-6 grid gap-3 text-sm">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
                >
                  Find Your Intention
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
                >
                  Explore the Collection
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Gentle timeline */}
        <section className="mt-8">
          <h3 className="font-cormorant text-xl font-semibold tracking-tight text-zinc-900">
            A path marked by intention
          </h3>
          <ol className="mt-4 space-y-3">
            {[
              {
                t: "Early years",
                d: "ADHD & depression diagnosis; learning to self-soothe without the right support.",
              },
              {
                t: "A spark",
                d: "A crystal stall with Nan — intuition, energy, and a new way to listen inward.",
              },
              { t: "Turning inward", d: "Meditation, journaling, art, ritual become daily anchors." },
              { t: "Motherhood & loss", d: "Becoming a mum; losing Nan; choosing gentleness and presence." },
              {
                t: "Advocacy",
                d: "Navigating assessments; my son’s autism diagnosis; building a calmer home rhythm.",
              },
              { t: "ASHORA", d: "From pain to practice to product — a sanctuary you can hold." },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-1 inline-block h-2 w-2 flex-none rounded-full"
                  style={{ background: GOLD }}
                />
                <p className="text-sm text-zinc-700">
                  <span className="font-medium text-zinc-900">{item.t} — </span>
                  {item.d}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Brand pillars */}
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              h: "Spiritual-meets-Luxury",
              p: "Ritual tools designed to look as beautiful as they feel — gold-kissed, calm, intentional.",
            },
            {
              h: "Vegan & Eco-Conscious",
              p: "Consciously sourced materials and small-batch, hand-poured production.",
            },
            {
              h: "Made with Intention",
              p: "Crystals, herbs, and affirmations aligned to Manifestation, Love, Wealth, and Peace.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h4 className="font-cormorant text-lg font-semibold tracking-tight text-zinc-900">
                {card.h}
              </h4>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{card.p}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
          <h3 className="font-cormorant text-2xl font-semibold tracking-tight text-zinc-900">
            Light the way with ASHORA
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-700">
            Start with the intention that calls you. Each piece includes guidance for ritual,
            affirmation, and gentle practice.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-medium text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              Shop the Collection
            </Link>
            <Link
              href="/quiz"
              className="rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-medium text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              Find Your Intention
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
