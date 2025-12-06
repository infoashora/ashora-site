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
  const stock = typeof product.stock === "number" ? product.stock : 0;
  const soldOut = stock <= 0;
  const lowStock = !soldOut && stock <= 5;

  // Intention Candle heuristic – adjust if you add explicit type later
  const isIntentionCandle =
    typeof product.badge === "string" &&
    product.badge.toLowerCase().includes("intention");

  // Image sizing/layout per variant
  const imgHeights =
    variant === "compact"
      ? "h-48 sm:h-52 lg:h-48 xl:h-52"
      : "h-80 sm:h-96 lg:h-[22rem] xl:h-[24rem]";
  const imgPadding = variant === "compact" ? "p-2 sm:p-2.5" : "p-2.5 sm:p-3";
  const outerState = soldOut ? "opacity-60 grayscale" : "opacity-100";

  return (
    <div className="group relative h-full">
      {/* ✧ Soft golden glow behind card on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(209,169,84,0.32), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Actual card */}
      <div
        className={`relative z-10 flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white ${outerState}`}
      >
        {/* SOLD OUT STATE */}
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
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-400">
                    No image
                  </div>
                )}
              </div>
            </div>

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
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-400">
                    No image
                  </div>
                )}
              </div>
            </div>

            {/* ✧ Diagonal SALE Ribbon – Intention Candles only */}
            {isIntentionCandle && (
              <div className="pointer-events-none absolute left-2 top-6 -rotate-45">
                <div
                  className="inline-block border text-[7.5px] sm:text-[8.5px] font-semibold uppercase tracking-[0.18em] text-amber-50 px-4 py-1 shadow-md"
                  style={{
                    background:
                      "linear-gradient(90deg, #5B1F2A 0%, #7A2837 50%, #5B1F2A 100%)",
                    borderColor: "#D1A954",
                  }}
                >
                  SALE
                </div>
              </div>
            )}

            {/* Wishlist Heart */}
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
                className={`h-5 w-5 ${
                  wished
                    ? "fill-rose-500 stroke-rose-500"
                    : "fill-none stroke-zinc-700"
                }`}
                strokeWidth="1.6"
              >
                <path d="M12.1 20.3c-.2.1-.5.1-.7 0C7 17.4 4 14.9 2.6 12.1 1.6 10 1.9 7.5 3.6 6.1 5.1 4.9 7.3 5 8.8 6.3c.7.6 1.2 1.3 1.5 2 .3-.7.8-1.4 1.5-2 1.5-1.3 3.7-1.4 5.2-.2 1.7 1.4 2 3.9 1 6-1.4 2.8-4.4 5.3-8.9 8.2z" />
              </svg>
            </button>
          </Link>
        )}

        {/* Bottom info */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="min-h-[3.25rem]">
            {!!product.badge && (
              <p className="text-xs text-zinc-500">{product.badge}</p>
            )}
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
    </div>
  );
}
