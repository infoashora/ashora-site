// app/intention/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/app/components/ProductCard";
import {
  getIntention,
  INTENTIONS,
  type IntentionKey,
} from "@/app/intention/content";
import {
  getLiveProductsByIntention,
  type Product as AshoraProduct,
} from "@/app/product/live";

type PageProps = {
  params: {
    slug: IntentionKey;
  };
};

const INTENTION_IMAGES: Record<IntentionKey, string> = {
  manifestation: "/intention/manifestation.png",
  "love-self-love": "/intention/love-self-love.png",
  "wealth-abundance": "/intention/wealth-abundance.png",
  "peace-healing": "/intention/peace-healing.png",
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = INTENTIONS[params.slug];
  const title = data?.title ?? "Shop by Intention";
  const description =
    data?.blurb ??
    "Intention-led candles by ASHORA — spiritual-meets-luxury and hand-poured in the UK.";

  return {
    title: `${title} · ASHORA`,
    description,
  };
}

export default async function IntentionPage({ params }: PageProps) {
  const slug = params.slug;
  const data = getIntention(slug);

  const products: AshoraProduct[] = await getLiveProductsByIntention(slug);
  const aligned = products.slice(0, 4);

  return (
    <main className="bg-[#faf8f4]">
      {/* Intention Hero */}
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-7 sm:py-9">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <Link
              href="/"
              className="transition-colors hover:text-[#9b793d]"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href="/collections"
              className="transition-colors hover:text-[#9b793d]"
            >
              Collections
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-zinc-900">{data.title}</span>
          </nav>
        </div>

        <div className="border-t border-zinc-200">
          <div className="mx-auto grid max-w-6xl lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[360px] overflow-hidden bg-[#eee9df] sm:min-h-[430px] lg:min-h-[520px]">
              <Image
                src={INTENTION_IMAGES[slug]}
                alt={`${data.title} intention`}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
              />
            </div>

            <div className="flex flex-col justify-between border-t border-zinc-200 bg-[#faf8f4] px-6 py-9 sm:px-10 sm:py-11 lg:border-l lg:border-t-0 lg:px-12 lg:py-14">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b793d]">
                  The Intention Collection
                </p>

                <h1 className="mt-5 max-w-xl font-cormorant text-5xl font-semibold leading-[0.96] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
                  {data.title}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600">
                  {data.blurb}
                </p>
              </div>

              <div className="mt-10 border-t border-zinc-300 pt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                      Crystals
                    </p>

                    <p className="mt-3 text-sm leading-6 text-zinc-900">
                      {data.crystals}
                    </p>
                  </div>

                  <div className="border-t border-zinc-300 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                      Botanicals
                    </p>

                    <p className="mt-3 text-sm leading-6 text-zinc-900">
                      {data.herbs}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <Link
                    href="#shop-this-intention"
                    className="group inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
                  >
                    Shop This Intention
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>

                  <Link
                    href="/quiz"
                    className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-600 transition-colors hover:text-[#9b793d]"
                  >
                    Retake the Quiz
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
        </div>
      </section>

      {/* Why This Intention */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                Your Inner Season
              </p>

              <h2 className="mt-3 max-w-md font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
                Why this intention may matter now.
              </h2>
            </div>

            <div>
              <div
                className="prose prose-sm max-w-none text-zinc-700 prose-p:my-0 prose-p:leading-7 prose-strong:text-zinc-950"
                dangerouslySetInnerHTML={{
                  __html: data.journeyHtml,
                }}
              />

              <div className="mt-8 border-t border-zinc-300 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                  When To Use This Intention
                </p>

                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {data.whenToUse.map((item, index) => (
                    <li
                      key={index}
                      className="grid grid-cols-[28px_1fr] gap-3 border-t border-zinc-300 pt-4"
                    >
                      <span className="text-[10px] font-semibold tracking-[0.16em] text-[#9b793d]">
                        0{index + 1}
                      </span>

                      <p className="text-sm leading-6 text-zinc-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affirmations */}
      <section className="bg-zinc-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D1A954]">
              Speak It Into Being
            </p>

            <h2 className="mt-3 max-w-md font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl">
              Daily Affirmations
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
              Repeat each affirmation slowly while your candle burns, or return
              to one whenever you need to reconnect with this intention.
            </p>
          </div>

          <div className="border-t border-zinc-700">
            {data.affirmations.map((affirmation, index) => (
              <div
                key={index}
                className="grid gap-3 border-b border-zinc-700 py-5 sm:grid-cols-[42px_1fr] sm:gap-6"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D1A954]">
                  0{index + 1}
                </p>

                <p className="font-cormorant text-2xl font-medium leading-[1.25] tracking-tight text-white">
                  {affirmation}
                </p>
              </div>
            ))}

            <p className="pt-5 text-xs leading-5 text-zinc-500">
              Repeat 3–9 times, or until the words begin to feel natural.
            </p>
          </div>
        </div>
      </section>

      {/* Ritual */}
      <section className="bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                Create The Moment
              </p>

              <h2 className="mt-3 max-w-md font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
                Simple Candle Ritual
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
                Ritual does not need to be complicated. Begin with presence,
                move slowly and let the intention guide the moment.
              </p>
            </div>

            <ol className="border-t border-zinc-300">
              {data.rituals.map((ritual, index) => (
                <li
                  key={index}
                  className="grid gap-3 border-b border-zinc-300 py-5 sm:grid-cols-[42px_1fr] sm:gap-6"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9b793d]">
                    0{index + 1}
                  </span>

                  <p className="text-sm leading-7 text-zinc-700">{ritual}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 border-t border-zinc-300 pt-5">
            <p className="text-xs leading-5 text-zinc-500">
              Always practise candle safety. Never leave a burning candle
              unattended, keep away from children and pets, and place on a
              stable heat-resistant surface.
            </p>
          </div>
        </div>
      </section>

      {/* Shop This Intention */}
      {aligned.length > 0 && (
        <section
          id="shop-this-intention"
          className="scroll-mt-28 border-t border-zinc-200 bg-[#faf8f4]"
        >
          <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12 lg:py-14">
            <div className="grid gap-7 border-b border-zinc-300 pb-7 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                  Continue Your Ritual
                </p>

                <h2 className="mt-3 max-w-xl font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
                  The candle created for {data.title}.
                </h2>
              </div>

              <div className="lg:justify-self-end">
                <p className="max-w-md text-sm leading-6 text-zinc-600">
                  Bring this intention into your everyday space with the candle
                  thoughtfully created to support it.
                </p>

                <Link
                  href="/shop"
                  className="group mt-5 inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
                >
                  View All Candles
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {aligned.map((product) => (
                <ProductCard key={product.handle} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}