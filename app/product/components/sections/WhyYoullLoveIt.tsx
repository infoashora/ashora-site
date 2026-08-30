type LovePoint = {
  title: string;
  description: string;
};

type WhyYoullLoveItProps = {
  eyebrow?: string;
  heading: string;
  introduction?: string;
  points: LovePoint[];
};

export default function WhyYoullLoveIt({
  eyebrow = "Why You'll Love It",
  heading,
  introduction,
  points,
}: WhyYoullLoveItProps) {
  return (
    <section
      id="why-youll-love-it"
      className="scroll-mt-28 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#B99752]">
              {eyebrow}
            </p>

            <h2 className="mt-5 max-w-xl font-cormorant text-4xl font-medium leading-tight tracking-[-0.02em] text-zinc-900 sm:text-5xl">
              {heading}
            </h2>

            <div className="mt-8 h-px w-24 bg-[#B99752]" />

            {introduction && (
              <p className="mt-8 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
                {introduction}
              </p>
            )}
          </div>

          <div className="border-t border-zinc-200">
            {points.map((point, index) => (
              <article
                key={`${point.title}-${index}`}
                className="group grid gap-5 border-b border-zinc-200 py-7 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-8 sm:py-8"
              >
                <div className="flex items-start">
                  <span className="font-cormorant text-3xl font-medium text-[#B99752] transition duration-300 group-hover:text-[#9D7B38]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="font-cormorant text-2xl font-medium leading-tight text-zinc-900 sm:text-3xl">
                    {point.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                    {point.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}