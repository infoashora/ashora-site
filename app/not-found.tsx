import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#faf8f4]">
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto grid min-h-[72vh] max-w-6xl lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col justify-between bg-zinc-950 px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D1A954]">
                404
              </p>

              <h1 className="mt-5 max-w-lg font-cormorant text-5xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Lost your way?
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-zinc-300">
                The page you were looking for may have moved, changed or no
                longer be available.
              </p>
            </div>

            <div className="mt-10 border-t border-zinc-700 pt-6">
              <p className="max-w-md font-cormorant text-2xl font-medium leading-[1.25] tracking-tight text-white">
                Your next intention is still waiting.
              </p>

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Return to what feels aligned
              </p>
            </div>
          </div>

          <div className="flex items-center bg-[#faf8f4] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="w-full">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                Find Your Way Back
              </p>

              <h2 className="mt-4 max-w-xl font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
                Begin again from somewhere that feels intentional.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">
                Return home, explore the candle collection or let the intention
                quiz guide you somewhere new.
              </p>

              <div className="mt-8 border-t border-zinc-300">
                {[
                  {
                    number: "01",
                    title: "Return Home",
                    description:
                      "Go back to the ASHORA homepage and continue exploring.",
                    href: "/",
                    label: "Home",
                  },
                  {
                    number: "02",
                    title: "Shop Candles",
                    description:
                      "Browse the full intention candle collection.",
                    href: "/shop",
                    label: "Shop All Candles",
                  },
                  {
                    number: "03",
                    title: "Find Your Intention",
                    description:
                      "Use the quiz to discover the intention that matches your current season.",
                    href: "/quiz",
                    label: "Take The Quiz",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="grid gap-4 border-b border-zinc-300 py-5 sm:grid-cols-[42px_1fr_auto] sm:items-center sm:gap-6"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b793d]">
                      {item.number}
                    </p>

                    <div>
                      <h3 className="text-sm font-medium text-zinc-950">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {item.description}
                      </p>
                    </div>

                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-900 transition-colors hover:text-[#9b793d]"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D1A954]">
            Still Need Help?
          </p>

          <div>
            <p className="max-w-3xl font-cormorant text-2xl font-medium leading-[1.25] tracking-tight text-white sm:text-3xl">
              If you were trying to find something specific, our team can help
              point you in the right direction.
            </p>

            <a
              href="mailto:info@ashora.co.uk"
              className="group mt-6 inline-flex items-center gap-3 border-b border-zinc-500 pb-2 text-sm font-medium text-white transition-colors hover:border-[#D1A954] hover:text-[#D1A954]"
            >
              info@ashora.co.uk
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}