import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/app/components/ProductCard";
import { getLiveProducts } from "@/app/product/live";

export default async function ShopAllPage() {
  const liveProducts = await getLiveProducts();

  const products = liveProducts
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="bg-white">
      {/* Collection Introduction */}
      <section className="border-b border-[#e6dfd5] bg-[#f7f4ee]">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
          <header className="pt-4 sm:pt-6 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-20 lg:pt-8">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#a88a52]">
                The Intention Collection
              </p>

              <h1 className="mt-5 font-cormorant text-5xl font-medium leading-[0.96] tracking-[-0.025em] text-[#161616] sm:text-6xl lg:text-[4.75rem]">
                Candles for the life
                <span className="block">you are creating.</span>
              </h1>
            </div>

            <div className="mt-8 max-w-xl border-l border-[#d8cfc2] pl-6 lg:mt-0 lg:justify-self-end lg:pl-8">
              <p className="text-base leading-8 text-zinc-700 sm:text-lg">
                Hand-poured intention candles created with layered fragrance,
                carefully selected herbs, crystals and affirmations to support
                moments of presence, reflection and ritual.
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-500">
                Choose the intention that speaks to where you are now—or where
                you are ready to go next.
              </p>
            </div>
          </header>
        </div>
      </section>

      {/* Candle Collection */}
      <section
        aria-label="Intention candle collection"
        className="mx-auto w-full max-w-7xl px-6 pb-20 pt-12 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </section>

      {/* After Dark Editorial */}
      <section className="border-t border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid border-y border-zinc-300 lg:grid-cols-[0.92fr_1.08fr]">
            {/* Editorial Copy */}
            <div className="flex flex-col justify-between py-9 pr-0 sm:py-12 lg:min-h-[560px] lg:py-14 lg:pr-14">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b793d]">
                  More Than A Candle
                </p>

                <h2 className="mt-5 max-w-lg font-cormorant text-4xl font-medium leading-[1.06] tracking-[-0.02em] text-zinc-950 sm:text-[2.85rem] lg:text-[3.25rem]">
                  Made for the moments you want to remember.
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                  From quiet evenings alone to nights shared with the people
                  you love, ASHORA was created to make everyday moments feel a
                  little more intentional.
                </p>

                <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-500">
                  Light the candle. Set the atmosphere. Let the moment become
                  part of the ritual.
                </p>
              </div>

              <div className="mt-9 border-t border-zinc-300 pt-6 lg:mt-12">
                <p className="max-w-md font-cormorant text-2xl font-medium leading-[1.25] tracking-tight text-zinc-950">
                  Intention does not have to be quiet. Sometimes it looks like
                  laughter, connection and being completely present.
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

            {/* Campaign Image */}
            <div className="relative min-h-[420px] overflow-hidden border-t border-zinc-300 bg-zinc-900 sm:min-h-[520px] lg:min-h-[560px] lg:border-l lg:border-t-0">
              <Image
                src="/editorial/after-dark/love-self-love.png"
                alt="ASHORA Love & Self-Love candle during an evening shared with friends"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 54vw, 100vw"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5"
              />

              <div className="absolute bottom-5 left-5 border border-white/30 bg-black/25 px-3 py-2 backdrop-blur-sm sm:bottom-6 sm:left-6">
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white">
                  ASHORA After Dark
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Principles */}
      <section className="border-t border-zinc-800 bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-7xl px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Hand-Poured",
              text: "Crafted in small batches in Essex.",
            },
            {
              number: "02",
              title: "Vegan Soy Wax",
              text: "Thoughtfully chosen for a clean, even burn.",
            },
            {
              number: "03",
              title: "Crystal Infused",
              text: "Each intention is paired with selected crystals.",
            },
            {
              number: "04",
              title: "Affirmation Included",
              text: "Every candle arrives with its own affirmation card.",
            },
          ].map((item, index) => (
            <div
              key={item.number}
              className={`border-zinc-800 py-7 ${
                index > 0 ? "border-t sm:border-t-0" : ""
              } ${
                index % 2 !== 0
                  ? "sm:border-l sm:pl-7"
                  : "sm:pr-7"
              } ${
                index >= 2 ? "sm:border-t lg:border-t-0" : ""
              } ${
                index > 0 ? "lg:border-l lg:pl-7 lg:pr-7" : ""
              }`}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D1A954]">
                {item.number}
              </p>

              <h3 className="mt-3 text-sm font-medium text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}