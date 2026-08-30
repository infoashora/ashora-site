// app/collections/page.tsx
import Link from "next/link";

import ProductCard from "@/app/components/ProductCard";
import ShopByIntention from "@/components/ShopByIntention";
import { PRODUCTS } from "@/app/product/content";

export const metadata = {
  title: "Shop Candles | ASHORA",
  description:
    "Browse ASHORA intention candles, hand-poured with herbs, crystals, and purpose.",
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4]">
      <ShopByIntention />

      {/* Candle Catalogue */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-8 border-b border-zinc-300 pb-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                The Complete Collection
              </p>

              <h2 className="mt-4 font-cormorant text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                All Candles
              </h2>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-md text-sm leading-7 text-zinc-600">
                Explore every intention candle, each hand-poured in small
                batches and thoughtfully created for a different season of
                life.
              </p>

              <Link
                href="/quiz"
                className="group mt-6 inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
              >
                Not sure where to begin?
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing Guidance */}
      <section className="border-t border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid gap-10 border-y border-zinc-300 py-10 sm:py-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Let Intuition Lead
              </p>

              <h2 className="mt-4 max-w-xl font-cormorant text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                Choose the candle that feels right for this chapter.
              </h2>
            </div>

            <div>
              <p className="max-w-lg text-sm leading-7 text-zinc-600">
                There is no wrong place to begin. Follow the intention,
                fragrance or feeling that draws your attention.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <Link
                  href="/quiz"
                  className="group inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
                >
                  Take the Intention Quiz
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-700 transition-colors hover:text-[#9b793d]"
                >
                  Discover Our Story
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
        </div>
      </section>
    </main>
  );
}