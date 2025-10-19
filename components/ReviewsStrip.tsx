export default function ReviewsStrip() {
  const Star = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        d="M12 3l2.5 5.2 5.8.8-4.2 4.1 1 5.7L12 16.8 6.9 18.8l1-5.7L3.8 9l5.8-.8L12 3z"
        fill="currentColor"
      />
    </svg>
  );

  const Rating = ({ value = 5 }: { value?: number }) => (
    <div className="inline-flex items-center gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} />
      ))}
      <span className="ml-2 text-xs text-ink/70">4.9 average</span>
    </div>
  );

  const reviews = [
    {
      quote: "The Wealth candle felt like momentum in a jar.",
      name: "Amina",
      where: "London",
      intention: "Wealth & Abundance",
    },
    {
      quote: "The ritual made me slow down and actually breathe.",
      name: "James",
      where: "Manchester",
      intention: "Peace & Healing",
    },
    {
      quote: "Soft, romantic, and grounding â€” I light it for journaling.",
      name: "Cait",
      where: "Bristol",
      intention: "Love & Self-Love",
    },
  ];

  return (
    <section id="reviews" className="relative">
      {/* soft background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_60%_at_50%_0%,rgba(198,168,100,0.10),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-6 py-14 space-y-6">
        <header className="space-y-1 max-w-prose">
          <h2 className="text-xl font-medium">Loved by our community</h2>
          <p className="text-sm opacity-70">
            Gentle, intentional, and crafted to feel like a ritual every time.
          </p>
          <Rating />
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.quote}
              className="rounded-2xl border border-gold/25 bg-white/80 backdrop-blur p-5 shadow-sm"
            >
              <blockquote className="text-sm leading-relaxed">
                â€œ{r.quote}â€
              </blockquote>
              <figcaption className="mt-3 text-xs opacity-70">
                â€” {r.name}, {r.where} Â· {r.intention}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="pt-2">
          <a href="/collections" className="btn bg-parchment hover:text-gold no-underline">
            Shop the collection
          </a>
        </div>
      </div>
    </section>
  );
}
