type WhyThisCandleProps = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
};

export default function WhyThisCandle({
  eyebrow,
  heading,
  paragraphs,
}: WhyThisCandleProps) {
  return (
    <section
      id="why-this-candle"
      className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24 lg:py-32"
    >
      <div className="max-w-3xl">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-[#B99752]">
          {eyebrow}
        </p>

        <h2 className="font-cormorant text-4xl font-medium leading-tight tracking-[-0.02em] text-zinc-900 sm:text-5xl">
          {heading}
        </h2>

        <div className="mt-12 space-y-8">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg leading-9 text-zinc-600"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}