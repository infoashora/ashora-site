"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";
import type { Product } from "@/app/product/content";

type Props = {
  product: Product;
  /** Visual variant. "compact" is used in tight spots (e.g. suggestions). */
  variant?: "default" | "compact";
};

export default function ProductCard({ product, variant = "default" }: Props) {
  const { add } = useCart();

  const stock = typeof product.stock === "number" ? product.stock : 0;
  const soldOut = stock <= 0;
  const lowStock = !soldOut && stock <= 5;

  // Image sizing/layout per variant
  const imgHeights =
    variant === "compact"
      ? "h-48 sm:h-52 lg:h-48 xl:h-52"
      : "h-80 sm:h-96 lg:h-[22rem] xl:h-[24rem]";
  const imgPadding = variant === "compact" ? "p-2 sm:p-2.5" : "p-2.5 sm:p-3";
  const outerState = soldOut ? "opacity-60 grayscale" : "opacity-100";

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white ${outerState}`}
    >
      {/* Top image band (no crop) */}
      {soldOut ? (
        <div
          className="relative block w-full bg-zinc-50"
          aria-label={`${product.title} (Sold out)`}
        >
          <div className={`relative w-full ${imgHeights} ${imgPadding}`}>
            <div className="relative h-full w-full">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.title} - Sold out`}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={false}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-400">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Sold out badge */}
          <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow-md">
            Sold out
          </div>
        </div>
      ) : (
        <Link
          href={`/product/${product.handle}`}
          className="relative block w-full bg-zinc-50"
          aria-label={product.title}
        >
          <div className={`relative w-full ${imgHeights} ${imgPadding}`}>
            <div className="relative h-full w-full">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={false}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-400">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Black Friday corner ribbon */}
          <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100 shadow-md">
            20% OFF
          </div>
        </Link>
      )}

      {/* Bottom info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="min-h-[3.25rem]">
          {!!product.badge && <p className="text-xs text-zinc-500">{product.badge}</p>}
          <h3 className="line-clamp-2 text-sm font-medium text-zinc-900">
            {product.title}
          </h3>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-900">
              {product.priceText}
            </span>
            {lowStock && (
              <span className="text-xs text-amber-700">{`Only ${stock} left`}</span>
            )}
          </div>

          {soldOut ? (
            <span
              className="cursor-not-allowed rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-500"
              aria-disabled="true"
            >
              Sold out
            </span>
          ) : (
            <button
              type="button"
              onClick={() => add(product.handle)}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-900 transition hover:border-zinc-900"
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
