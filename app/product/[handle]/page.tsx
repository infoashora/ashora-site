import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// 🔁 Use LIVE catalogue helpers (overlays data/stock.json)
import {
  getLiveProductByHandle,
  getLiveRelatedProducts,
  type Product as AshoraProduct,
} from "@/app/product/live";

// UI
import AddToCartButton from "../../components/AddToCartButton";
import ProductCard from "../../../components/ProductCard";
import SwipeGallery from "../components/SwipeGallery";

const GOLD = "#D1A954";

/** Fallback “Smells like?” copy for candles when live product lacks smellsLike */
const SCENT_COPY: Record<string, string> = {
  "manifestation-candle":
    "Infused with Clear Quartz for clarity and Citrine for abundance, this hand-poured blend of Bay Leaf, Cinnamon, and Rosemary aligns energy with purpose. A delicate fusion of pear, jasmine, and soft vanilla evokes focus and draws your manifestations into being.",
  "love-self-love-candle":
    "Infused with Rose Aura Quartz to open the heart and Moonstone to restore inner harmony, this hand-poured blend of Rose Petals, Lavender, and Cornflower nurtures tenderness and devotion. A romantic fusion of rose, freesia, and amber envelops the senses — inviting love in all its forms and reminding you of your inherent worthiness.",
  "wealth-abundance-candle":
    "Infused with Green Aventurine to attract prosperity and Citrine to amplify success, this hand-poured blend of Cinnamon, Basil, and Peppermint channels opportunity and gratitude. A warm harmony of mandarin, rose, and amber awakens confidence — aligning your energy with abundance in every form.",
  "peace-healing-candle":
    "Infused with Amethyst to calm the spirit and Howlite to soften the mind, this hand-poured blend of Lavender, Chamomile, and Rosemary soothes and restores the soul. A comforting fusion of tobacco, honey, and amber grounds the senses — releasing tension and guiding you back to inner harmony.",
};

type PageProps = {
  params: { handle: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const p = (await getLiveProductByHandle(params.handle)) || null;
  const title = p ? `${p.title} · ASHORA` : "Product · ASHORA";
  const description = p
    ? `${p.title} — ASHORA`
    : "Intention-led ritual tools by ASHORA.";
  return { title, description };
}

export default async function ProductPage({
  params,
  searchParams,
}: PageProps) {
  const product = (await getLiveProductByHandle(params.handle)) || null;

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm text-zinc-600">Product not found.</p>
        <Link
          href="/shop"
          className="mt-4 inline-block text-zinc-800 underline underline-offset-4"
        >
          ← Back to shop
        </Link>
      </main>
    );
  }

  const priceGBP = (product.pricePence / 100).toFixed(2);
  const soldOut = !product.stock || product.stock <= 0;

  // Relateds: other items with the same intention (max 3), using LIVE data
  const suggestions: AshoraProduct[] = (
    await getLiveRelatedProducts(product.handle)
  ).slice(0, 3);

  // ---------- Gallery data ----------
  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];
  const count = gallery.length;
  const indexParam = (() => {
    const raw = searchParams?.img;
    const s = Array.isArray(raw) ? raw[0] : raw;
    const n = Number(s);
    return Number.isFinite(n) && n >= 0 && n < count ? n : 0;
  })();

  // Join link when sold out
  const joinHref = `/join?product=${encodeURIComponent(
    product.handle
  )}&title=${encodeURIComponent(product.title)}`;

  // -------- Smells like? content (live field OR fallback mapping) --------
  const smellsLike =
    ((product as any)?.smellsLike
      ? String((product as any).smellsLike)
      : "") ||
    SCENT_COPY[product.handle] ||
    "";

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Gallery column (swipe-enabled on mobile) */}
        <SwipeGallery
          handle={product.handle}
          title={product.title}
          images={gallery}
          index={indexParam}
          outerClassName={`rounded-xl border border-zinc-200 ${
            soldOut ? "bg-zinc-50 opacity-70 grayscale" : "bg-zinc-50"
          }`}
          mediaBoxClassName=""
        />

        {/* Right column */}
        <div className="flex flex-col">
          {/* Intention + stock badge */}
          <div className="mb-2 flex items-center gap-2">
            {product.intention && (
              <span
                className="inline-block rounded-full border border-zinc-300 px-2.5 py-1 text-[11px] tracking-wide text-zinc-700"
                title="Intention"
              >
                {product.intention.replace("-", " ")}
              </span>
            )}
            {soldOut && (
              <span
                className="inline-block rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white"
                title="This item is currently sold out"
              >
                Sold out
              </span>
            )}
            {!soldOut &&
              typeof product.stock === "number" &&
              product.stock <= 5 && (
                <span
                  className="inline-block rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-900"
                  style={{ backgroundColor: "rgba(209,169,84,0.95)" }}
                  title="Limited stock"
                >
                  Only {product.stock} left
                </span>
              )}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            {product.title}
          </h1>

          {/* Price + shipping note */}
          <div className="mt-3 text-[15px] font-semibold">£{priceGBP}</div>
          <p className="mt-1 text-xs text-zinc-600">
            Shipping calculated at checkout.
          </p>

          {/* CTA */}
          <div className="mt-6">
            {soldOut ? (
              <Link
                href={joinHref}
                aria-label={`Join ASHORA Circle for restock updates on ${product.title}`}
                className="block w-full rounded-md border border-zinc-300 bg-zinc-100 px-4 py-3 text-center text-[15px] font-medium text-zinc-700 transition
                           hover:bg-white hover:text-zinc-900 hover:shadow-sm"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)",
                }}
              >
                Sold out — join our circle for restock updates →
              </Link>
            ) : (
              <AddToCartButton
                handle={product.handle}
                stock={product.stock} // pass live stock to the cart guard
                className="h-12 w-full rounded-md bg-[var(--gold)] text-white text-[15px] font-medium transition hover:opacity-90"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              />
            )}

            <div className="mt-3 flex items-center justify-between">
              <Link
                href="/shop"
                className="text-sm text-zinc-600 underline-offset-4 hover:underline"
              >
                Continue Shopping
              </Link>
              {/* Small stock indicator when in stock */}
              {!soldOut &&
                typeof product.stock === "number" &&
                product.stock <= 5 && (
                  <span className="text-xs text-amber-700" title="Limited stock">
                    Only {product.stock} left
                  </span>
                )}
            </div>
          </div>

          {/* Luxe accordions */}
          <div className="mt-10 space-y-4">
            {/* Description */}
            <details className="group overflow-hidden rounded-lg border border-zinc-200 bg-white">
              <summary
                className="cursor-pointer list-none px-4 py-3 text-lg font-medium tracking-wide text-zinc-900 transition hover:text-[var(--gold)]"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              >
                Description
              </summary>
              <div className="px-4 pb-4 leading-relaxed text-zinc-700">
                {product.descriptionHtml ? (
                  <div
                    className="[&_ul]:ml-5 [&_ul]:list-disc [&_li]:mt-1"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                ) : (
                  <p>Details coming soon.</p>
                )}
              </div>
            </details>

            {/* NEW: Smells like? (shown if copy is available) */}
            {!!smellsLike && (
              <details className="group overflow-hidden rounded-lg border border-zinc-200 bg-white">
                <summary
                  className="cursor-pointer list-none px-4 py-3 text-lg font-medium tracking-wide text-zinc-900 transition hover:text-[var(--gold)]"
                  style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
                >
                  Smells like?
                </summary>
                <div className="px-4 pb-4 leading-relaxed text-zinc-700">
                  <p>{smellsLike}</p>
                </div>
              </details>
            )}

            {/* How to Use / Ways to Use */}
            <details className="group overflow-hidden rounded-lg border border-zinc-200 bg-white">
              <summary
                className="cursor-pointer list-none px-4 py-3 text-lg font-medium tracking-wide text-zinc-900 transition hover:text-[var(--gold)]"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              >
                {product.kind === "herb-box" ? "Ways to Use" : "How to Use"}
              </summary>
              <div className="px-4 pb-4 leading-relaxed text-zinc-700">
                {product.kind === "herb-box" && (product as any).waysHtml ? (
                  <div
                    className="[&_ul]:ml-5 [&_ul]:list-disc [&_li]:mt-1"
                    dangerouslySetInnerHTML={{
                      __html: (product as any).waysHtml,
                    }}
                  />
                ) : (
                  <p>
                    Follow the included ritual card for best results. Always burn
                    within sight, keep away from drafts, children and pets.
                    Trim wick to 5&nbsp;mm before lighting.
                  </p>
                )}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {gallery.map((src, i) => {
            const base = `/product/${product.handle}`;
            const href = count > 1 ? `${base}?img=${i}` : base;
            return (
              <Link
                key={src + i}
                href={href}
                className={`relative inline-block overflow-hidden rounded-md border ${
                  i === indexParam
                    ? "border-zinc-900"
                    : "border-zinc-200"
                } bg-white`}
                aria-label={`Show image ${i + 1}`}
              >
                <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                  <Image
                    src={src}
                    alt={`${product.title} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* You may also like */}
      {suggestions.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-lg font-semibold">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((p) => (
              <ProductCard key={p.handle} product={p} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
