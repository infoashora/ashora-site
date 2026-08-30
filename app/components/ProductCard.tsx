"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/product/content";

type Props = {
  product: Product;
  /** Visual variant. "compact" is used in tight spots (e.g. suggestions). */
  variant?: "default" | "compact";
};

export default function ProductCard({ product, variant = "default" }: Props) {
  const stock = typeof product.stock === "number" ? product.stock : 0;
  const soldOut = stock <= 0;
  const lowStock = !soldOut && stock <= 5;

  const imageAspect =
    variant === "compact" ? "aspect-[4/5]" : "aspect-[3/4]";

  const imageSizes =
    variant === "compact"
      ? "(min-width: 1280px) 260px, (min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
      : "(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

  const contentPadding =
    variant === "compact" ? "px-3 pb-4 pt-3" : "px-4 pb-5 pt-4 sm:px-5";

  const titleSize =
    variant === "compact" ? "text-sm" : "text-base sm:text-[1.05rem]";

  const outerState = soldOut ? "opacity-60 grayscale" : "opacity-100";

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden border border-zinc-200 bg-white transition duration-500 hover:border-zinc-300 hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)] ${outerState}`}
    >
      {!soldOut && (
        <Link
          href={`/product/${product.handle}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${product.title}`}
        >
          <span className="sr-only">View {product.title}</span>
        </Link>
      )}

      <div
        className={`relative w-full overflow-hidden bg-[#f1eee8] ${imageAspect}`}
        aria-label={soldOut ? `${product.title} - Sold out` : undefined}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={soldOut ? `${product.title} - Sold out` : product.title}
            fill
            priority={false}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            sizes={imageSizes}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            No image
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />

        {soldOut && (
          <div className="pointer-events-none absolute left-4 top-4 border border-white/40 bg-black/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            Sold out
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${contentPadding}`}>
        <div>
          {!!product.badge && (
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              {product.badge}
            </p>
          )}

          <h3
            className={`line-clamp-2 font-medium leading-snug tracking-[-0.01em] text-zinc-900 transition-colors duration-300 group-hover:text-zinc-600 ${titleSize}`}
          >
            {product.title}
          </h3>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-zinc-100 pt-4">
          <div className="flex min-w-0 flex-col">
            <span className="text-sm font-medium tracking-wide text-zinc-900">
              {product.priceText}
            </span>

            {lowStock && (
              <span className="mt-1 text-[11px] text-amber-700">
                {`Only ${stock} left`}
              </span>
            )}
          </div>

          {soldOut ? (
            <span
              className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400"
              aria-disabled="true"
            >
              Sold out
            </span>
          ) : (
            <span className="flex shrink-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-900">
              View Candle
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}