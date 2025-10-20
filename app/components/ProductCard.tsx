"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/app/product/content";

type Props = {
  product: Product;
  /** Visual variant. "compact" is used in tight spots (e.g. suggestions). */
  variant?: "default" | "compact";
};

export default function ProductCard({ product, variant = "default" }: Props) {
  const { add } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.handle);

  const soldOut = !product.stock || product.stock <= 0;

  /**
   * Tweaks:
   * - Increase image band height (makes product appear larger).
   * - Reduce inner padding (less white frame).
   * - Keep object-contain to preserve full product image without cropping.
   */
  const imgHeights =
    variant === "compact"
      ? "h-48 sm:h-52 lg:h-48 xl:h-52"
      : "h-80 sm:h-96 lg:h-[22rem] xl:h-[24rem]"; // larger on Shop All
  const imgPadding = variant === "compact" ? "p-2 sm:p-2.5" : "p-2.5 sm:p-3"; // tighter white space

  const outerState = soldOut ? "opacity-60 grayscale" : "opacity-100";

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white ${outerState}`}
      aria-busy={false}
      aria-live="polite"
    >
      {/* Top: image band (no crop) with tighter white breathing room */}
      {soldOut ? (
        // When sold out, keep layout but prevent navigation
        <div className="relative block w-full bg-zinc-50" aria-label={`${product.title} (Sold out)`}>
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

          {/* Sold out ribbon */}
          <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-zinc-900/90 px-3 py-1 text-xs font-medium text-white">
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

          {/* Wishlist heart (active on in-stock too) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(product.handle);
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 ${wished ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-zinc-700"}`}
              strokeWidth="1.6"
            >
              <path d="M12.1 20.3c-.2.1-.5.1-.7 0C7 17.4 4 14.9 2.6 12.1 1.6 10 1.9 7.5 3.6 6.1 5.1 4.9 7.3 5 8.8 6.3c.7.6 1.2 1.3 1.5 2 .3-.7.8-1.4 1.5-2 1.5-1.3 3.7-1.4 5.2-.2 1.7 1.4 2 3.9 1 6-1.4 2.8-4.4 5.3-8.9 8.2z" />
            </svg>
          </button>
        </Link>
      )}

      {/* Bottom: white info bar */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="min-h-[3.25rem]">
          {!!product.badge && <p className="text-xs text-zinc-500">{product.badge}</p>}
          <h3 className="line-clamp-2 text-sm font-medium text-zinc-900">{product.title}</h3>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-900">{product.priceText}</span>

          {soldOut ? (
            <span
              className="cursor-not-allowed rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-500"
              aria-disabled="true"
              title="This item is currently sold out"
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

      {/* If sold out, allow wishlist from image area too (overlay button) */}
      {soldOut && (
        <button
          type="button"
          onClick={() => toggle(product.handle)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${wished ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-zinc-700"}`}
            strokeWidth="1.6"
          >
            <path d="M12.1 20.3c-.2.1-.5.1-.7 0C7 17.4 4 14.9 2.6 12.1 1.6 10 1.9 7.5 3.6 6.1 5.1 4.9 7.3 5 8.8 6.3c.7.6 1.2 1.3 1.5 2 .3-.7.8-1.4 1.5-2 1.5-1.3 3.7-1.4 5.2-.2 1.7 1.4 2 3.9 1 6-1.4 2.8-4.4 5.3-8.9 8.2z" />
          </svg>
        </button>
      )}
    </div>
  );
}
