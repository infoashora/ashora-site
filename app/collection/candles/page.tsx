// app/collection/candles/page.tsx
"use client";

import Link from "next/link";
import { PRODUCTS, type Product } from "@/app/product/content";

const TITLE = "Candles";
const SUB = "Hand-poured, vegan wax—each aligned to a specific intention.";

const INTENTION_IMAGE: Record<string, string> = {
  manifestation: "/intention/manifestation.jpg",
  "love-self-love": "/intention/love-self-love.jpg",
  "wealth-abundance": "/intention/wealth-abundance.jpg",
  "peace-healing": "/intention/peace-healing.jpg",
};

function imgFor(product: Product): string {
  return (
    product.image ||
    product.images?.[0] ||
    (product.intention
      ? INTENTION_IMAGE[product.intention]
      : undefined) ||
    "/hero/ashora-hero-1.jpg"
  );
}

export default function CandlesCollectionPage() {
  const items = PRODUCTS.filter(
    (product) => product.kind === "candle"
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <nav className="text-sm text-zinc-600">
        <Link
          href="/"
          className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
        >
          Home
        </Link>

        {" / "}

        <span className="text-zinc-800">
          {TITLE}
        </span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          {TITLE}
        </h1>

        <p className="mt-1 text-sm text-zinc-600">
          {SUB}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => {
          const href = `/product/${product.handle}`;
          const src = imgFor(product);

          return (
            <Link
              key={product.handle}
              href={href}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-[#D1A954] hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <div className="text-xs uppercase tracking-wide text-zinc-500">
                  Candle
                </div>

                <h3 className="mt-1 line-clamp-1 font-medium text-zinc-900">
                  {product.title}
                </h3>

                <div className="mt-1 text-sm text-zinc-700">
                  {product.priceText}
                </div>

                <div className="mt-2 text-sm text-zinc-600 transition group-hover:text-[#D1A954]">
                  View details →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}