"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/app/components/CartProvider";
import type { Product } from "@/app/product/content";
import { useWishlist } from "@/hooks/useWishlist";

type Props = {
  product: Product;
  variant?: "default" | "compact";
};

export default function ProductCard({
  product,
  variant = "default",
}: Props) {
  const { add } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const wished = isWishlisted(product.handle);
  const stock = typeof product.stock === "number" ? product.stock : 0;
  const soldOut = stock <= 0;
  const lowStock = !soldOut && stock <= 5;

  const imageHeights =
    variant === "compact"
      ? "h-48 sm:h-52 lg:h-48 xl:h-52"
      : "h-80 sm:h-96 lg:h-[22rem] xl:h-[24rem]";

  const imagePadding =
    variant === "compact" ? "p-2 sm:p-2.5" : "p-2.5 sm:p-3";

  const cardState = soldOut ? "opacity-60 grayscale" : "opacity-100";

  return (
    <article className={`group relative h-full ${cardState}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-0 h-32 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(209,169,84,0.24), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {soldOut ? (
          <div
            className="relative block w-full overflow-hidden bg-[#eee9df]"
            aria-label={`${product.title} (Sold out)`}
          >
            <div className={`relative w-full ${imageHeights} ${imagePadding}`}>
              <div className="relative h-full w-full">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={`${product.title} - Sold out`}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-400">
                    No image
                  </div>
                )}
              </div>
            </div>

            <div className="pointer-events-none absolute left-3 top-3 bg-zinc-950 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Sold Out
            </div>
          </div>
        ) : (
          <Link
            href={`/product/${product.handle}`}
            className="relative block w-full overflow-hidden bg-[#eee9df]"
            aria-label={product.title}
          >
            <div className={`relative w-full ${imageHeights} ${imagePadding}`}>
              <div className="relative h-full w-full">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-400">
                    No image
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                toggle(product.handle);
              }}
              aria-label={
                wished ? "Remove from wishlist" : "Add to wishlist"
              }
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-zinc-300 bg-[#faf8f4]/90 text-zinc-700 backdrop-blur transition hover:border-[#9b793d] hover:text-[#9b793d]"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 ${
                  wished
                    ? "fill-rose-500 stroke-rose-500"
                    : "fill-none stroke-current"
                }`}
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M12.1 20.3c-.2.1-.5.1-.7 0C7 17.4 4 14.9 2.6 12.1 1.6 10 1.9 7.5 3.6 6.1 5.1 4.9 7.3 5 8.8 6.3c.7.6 1.2 1.3 1.5 2 .3-.7.8-1.4 1.5-2 1.5-1.3 3.7-1.4 5.2-.2 1.7 1.4 2 3.9 1 6-1.4 2.8-4.4 5.3-8.9 8.2z" />
              </svg>
            </button>
          </Link>
        )}

        <div className="flex flex-1 flex-col border-b border-zinc-300 pb-4 pt-4">
          <div className="min-h-[3.25rem]">
            {product.badge ? (
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b793d]">
                {product.badge}
              </p>
            ) : (
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b793d]">
                Intention Candle
              </p>
            )}

            <Link
              href={`/product/${product.handle}`}
              className="mt-2 block"
            >
              <h3 className="line-clamp-2 text-lg font-medium tracking-tight text-zinc-950 transition-colors hover:text-[#9b793d]">
                {product.title}
              </h3>
            </Link>
          </div>

          <div className="mt-5 flex items-end justify-between gap-5">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-950">
                {product.priceText}
              </span>

              {lowStock && (
                <span className="mt-1 text-xs text-[#9b793d]">
                  Only {stock} left
                </span>
              )}
            </div>

            {soldOut ? (
              <span
                className="cursor-not-allowed text-xs font-medium uppercase tracking-[0.14em] text-zinc-500"
                aria-disabled="true"
              >
                Sold Out
              </span>
            ) : (
              <button
                type="button"
                onClick={() => add(product.handle)}
                className="group/button inline-flex items-center gap-2 border-b border-zinc-900 pb-1 text-xs font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
                aria-label={`Add ${product.title} to cart`}
              >
                Add to Cart
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/button:translate-x-1"
                >
                  →
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}