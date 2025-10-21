// app/intention/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  getIntention,
  INTENTIONS,
  type IntentionKey,
} from "@/app/intention/content";
import {
  getLiveProductsByIntention,
  type Product as AshoraProduct,
} from "@/app/product/live";

type PageProps = { params: { slug: IntentionKey } };

const GOLD_HEX = "#D1A954";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = INTENTIONS[params.slug];
  const title = data?.title ?? "Shop by Intention";
  const description =
    data?.blurb ??
    "Intention-led ritual tools by ASHORA — spiritual-meets-luxury, hand-poured in the UK.";
  return {
    title: `${title} · ASHORA`,
    description,
  };
}

export default async function IntentionPage({ params }: PageProps) {
  const slug = params.slug;
  const data = getIntention(slug);

  // Live products filtered by intention (fallback to 6 max)
  const products: AshoraProduct[] = await getLiveProductsByIntention(slug);
  const aligned = products.slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-600">
        <Link
          href="/"
          className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
        >
          Home
        </Link>{" "}
        /{" "}
        <Link
          href="/collections"
          className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
        >
          Collections
        </Link>{" "}
        / <span className="text-zinc-800">{data.title}</span>
      </nav>

      {/* Luxe hero */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_40%_at_50%_0%,rgba(209,169,84,0.08),transparent_60%),radial-gradient(40%_40%_at_100%_10%,rgba(209,169,84,0.06),transparent_55%)]"
        />

        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-10">
          {/* Gold accent column */}
          <div className="hidden shrink-0 md:block">
            <div
              className="h-24 w-1 rounded-full"
              style={{ backgroundColor: GOLD_HEX }}
              aria-hidden="true"
            />
          </div>

          <div className="flex-1">
            <h1 className="font-cormorant text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
              {data.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">
              {data.blurb}
            </p>

            {/* Key correspondences */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4">
                <div className="text-xs uppercase tracking-wide text-zinc-500">
                  Crystals
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-900">
                  {data.crystals}
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4">
                <div className="text-xs uppercase tracking-wide text-zinc-500">
                  Herbs
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-900">
                  {data.herbs}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affirmations & Rituals */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">
            Daily Affirmations
          </h2>
          <ul className="mt-3 list-inside space-y-2 text-sm leading-6 text-zinc-700">
            {data.affirmations.map((a, idx) => (
              <li key={idx} className="relative pl-5">
                <span
                  className="absolute left-0 top-2 block h-2 w-2 rounded-full"
                  style={{ backgroundColor: GOLD_HEX }}
                  aria-hidden="true"
                />
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-zinc-500">
            Repeat 3–9 times while the candle burns, or any time you need a
            gentle reset.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">
            Simple Ritual Ideas
          </h2>
          <ol className="mt-3 list-decimal list-inside space-y-2 text-sm leading-6 text-zinc-700">
            {data.rituals.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-zinc-500">
            Always practice candle safety. Never leave a burning candle
            unattended.
          </p>
        </div>
      </section>

      {/* Shop the intention */}
      {aligned.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-900">
              Shop the Intention
            </h2>
            <Link
              href="/collections"
              className="text-sm text-zinc-700 underline decoration-[rgba(209,169,84,0.35)] underline-offset-4 hover:text-zinc-900"
            >
              View all products
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {aligned.map((p) => (
              <ProductCard key={p.handle} product={p} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
