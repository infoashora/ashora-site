type IngredientItem = {
  name: string;
  description: string;
};

type InsideYourCandleProps = {
  eyebrow?: string;
  heading: string;
  introduction: string;
  ingredients: IngredientItem[];
  waxDescription: string;
  burnTime: string;
  affirmationCard: string;
};

export default function InsideYourCandle({
  eyebrow = "Inside Your Candle",
  heading,
  introduction,
  ingredients,
  waxDescription,
  burnTime,
  affirmationCard,
}: InsideYourCandleProps) {
  return (
    <section
      id="inside-your-candle"
      className="scroll-mt-28 border-y border-zinc-200 bg-[#F8F6F1]"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
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

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ingredients.map((ingredient, index) => (
                <article
                  key={ingredient.name}
                  className="group min-h-60 border border-zinc-200 bg-white p-6 transition duration-300 hover:border-[#B99752]/50 hover:shadow-[0_18px_45px_rgba(24,24,27,0.06)] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[#B99752]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-10 font-cormorant text-3xl font-medium leading-tight text-zinc-900">
                    {ingredient.name}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-zinc-600">
                    {ingredient.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <article className="border border-zinc-200 bg-zinc-900 p-6 text-white lg:min-h-64">
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#D7BD82]">
                  The Wax
                </p>

                <h3 className="mt-6 font-cormorant text-3xl font-medium leading-tight">
                  Luxurious Vegan Soy Wax
                </h3>

                <p className="mt-5 text-sm leading-7 text-zinc-300">
                  {waxDescription}
                </p>
              </article>

              <article className="border border-[#B99752]/40 bg-[#B99752] p-6 text-white lg:min-h-64">
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/75">
                  Burn Time
                </p>

                <h3 className="mt-6 font-cormorant text-3xl font-medium leading-tight">
                  Approx. 40–50 Hours
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/85">
                  {burnTime}
                </p>
              </article>

              <article className="border border-zinc-200 bg-white p-6 lg:min-h-64">
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#B99752]">
                  Included
                </p>

                <h3 className="mt-6 font-cormorant text-3xl font-medium leading-tight text-zinc-900">
                  A5 Affirmation Card
                </h3>

                <p className="mt-5 text-sm leading-7 text-zinc-600">
                  {affirmationCard}
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}