type CareItem = {
  title: string;
  description: string;
};

type CandleCareProps = {
  eyebrow?: string;
  heading: string;
  introduction: string;
  items: CareItem[];
  closingLine?: string;
};

export default function CandleCare({
  eyebrow = "Candle Care",
  heading,
  introduction,
  items,
  closingLine,
}: CandleCareProps) {
  return (
    <section
      id="candle-care"
      className="scroll-mt-28 border-y border-zinc-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#B99752]">
            {eyebrow}
          </p>

          <h2 className="mt-5 font-cormorant text-4xl font-medium leading-tight tracking-[-0.02em] text-zinc-900 sm:text-5xl">
            {heading}
          </h2>

          <div className="mt-8 h-px w-24 bg-[#B99752]" />

          <p className="mt-8 text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
            {introduction}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group border border-zinc-200 bg-[#FCFBF8] p-6 transition duration-300 hover:border-[#B99752]/50 hover:bg-white hover:shadow-[0_18px_45px_rgba(24,24,27,0.06)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-cormorant text-3xl font-medium text-[#B99752] transition duration-300 group-hover:text-[#9D7B38]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="mt-2 h-1.5 w-1.5 rounded-full bg-[#B99752]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-8 font-cormorant text-3xl font-medium leading-tight text-zinc-900">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {closingLine && (
          <div className="mt-12 border-l border-[#B99752] pl-6 sm:pl-8">
            <p className="max-w-3xl font-cormorant text-2xl font-medium italic leading-relaxed text-zinc-900 sm:text-3xl">
              {closingLine}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}