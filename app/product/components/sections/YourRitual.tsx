type YourRitualProps = {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  closingLine?: string;
};

export default function YourRitual({
  eyebrow = "Your Ritual",
  heading,
  paragraphs,
  closingLine,
}: YourRitualProps) {
  return (
    <section
      id="your-ritual"
      className="scroll-mt-28 border-y border-zinc-200/70 bg-[#F8F6F1]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#B99752]">
              {eyebrow}
            </p>

            <h2 className="mt-5 max-w-xl font-cormorant text-4xl font-medium leading-tight tracking-[-0.02em] text-zinc-900 sm:text-5xl">
              {heading}
            </h2>

            <div className="mt-8 h-px w-24 bg-[#B99752]" />
          </div>

          <div className="border-l border-[#B99752]/40 pl-6 sm:pl-10 lg:pl-14">
            <div className="space-y-8">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {closingLine && (
              <p className="mt-12 max-w-2xl font-cormorant text-2xl font-medium italic leading-relaxed text-zinc-900 sm:text-3xl">
                {closingLine}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}