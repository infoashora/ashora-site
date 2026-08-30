import Image from "next/image";
import Link from "next/link";

const INTENTIONS = [
  {
    slug: "manifestation",
    title: "Manifestation",
    description: "Clarity · Confidence · New Beginnings",
    img: "/intention/manifestation.png",
  },
  {
    slug: "love-self-love",
    title: "Love & Self-Love",
    description: "Compassion · Connection · Self-Worth",
    img: "/intention/love-self-love.png",
  },
  {
    slug: "wealth-abundance",
    title: "Wealth & Abundance",
    description: "Opportunity · Expansion · Growth",
    img: "/intention/wealth-abundance.png",
  },
  {
    slug: "peace-healing",
    title: "Peace & Healing",
    description: "Stillness · Restoration · Reflection",
    img: "/intention/peace-healing.png",
  },
];

export default function ShopByIntention() {
  return (
    <>
      {/* Collections Introduction */}
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                The Intention Collection
              </p>

              <h1 className="mt-4 max-w-xl font-cormorant text-5xl font-semibold leading-[0.98] tracking-tight text-zinc-950 sm:text-6xl">
                Candles for the life you are creating.
              </h1>
            </div>

            <div className="border-l border-zinc-300 pl-6 sm:pl-8">
              <p className="max-w-xl text-base leading-8 text-zinc-600">
                Every ASHORA candle begins with an intention. Explore the
                collection through the energy, feeling or chapter you want to
                create space for.
              </p>

              <Link
                href="/quiz"
                className="group mt-7 inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
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

      {/* Intention Discovery */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-8 border-b border-zinc-300 pb-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Choose Your Direction
              </p>

              <h2 className="mt-4 font-cormorant text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Shop by Intention
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-zinc-600 lg:justify-self-end">
              Begin with what you need most. Each intention has been developed
              with its own fragrance, botanicals, crystals and ritual guidance.
            </p>
          </div>

          <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {INTENTIONS.map((intention, index) => (
              <Link
                key={intention.slug}
                href={`/intention/${intention.slug}`}
                className={`group mx-auto block w-full max-w-[275px] ${
                  index % 2 !== 0 ? "lg:translate-y-6" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#eee9df]">
                  <Image
                    src={intention.img}
                    alt={intention.title}
                    fill
                    className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    sizes="(min-width: 1024px) 275px, (min-width: 640px) 45vw, 100vw"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"
                  />
                </div>

                <div className="border-b border-zinc-300 pb-4 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                        Intention
                      </p>

                      <h3 className="mt-2 text-lg font-medium tracking-tight text-zinc-950">
                        {intention.title}
                      </h3>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-1 text-sm text-zinc-400 transition duration-300 group-hover:translate-x-1 group-hover:text-zinc-950"
                    >
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {intention.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Break */}
      <section className="bg-zinc-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:py-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20 lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1A954]">
              Made With Meaning
            </p>
          </div>

          <div>
            <p className="max-w-3xl font-cormorant text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl">
              More than fragrance. Each candle is created as a quiet invitation
              to pause, reconnect and move with intention.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}