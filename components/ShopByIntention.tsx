import Link from "next/link";

const intentions = [
  {
    slug: "manifestation",
    title: "Manifestation",
    img: "/link-cards/Manifestation Link Image (2).png",
  },
  {
    slug: "love-self-love",
    title: "Love & Self-Love",
    img: "/link-cards/Love & Self Love Link Image (2).png",
  },
  {
    slug: "wealth-abundance",
    title: "Wealth & Abundance",
    img: "/link-cards/Wealth & Abundance Link Image (2).png",
  },
  {
    slug: "peace-healing",
    title: "Peace & Healing",
    img: "/link-cards/Peace & Healing Link Image (2).png",
  },
];

export default function ShopByIntention() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-8 pb-2">
      <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
        Shop by Intention
      </h2>
      <p className="text-sm text-ink/70 mt-1">
        Tap an intention to see candles, ritual boxes, and herb boxes aligned to it.
      </p>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {intentions.map((i) => (
          <Link
            key={i.slug}
            href={`/intentions/${i.slug}`}
            className="group block rounded-2xl border border-ink/10 bg-white overflow-hidden no-underline"
          >
            <div className="aspect-square bg-parchment">
              <img
                src={i.img}
                alt={i.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="px-3 py-2 text-center text-sm font-medium text-ink group-hover:text-gold">
              {i.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
