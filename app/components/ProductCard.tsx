// components/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";
import useWishlist from "@/hooks/useWishlist";
import type { Product } from "@/app/product/content";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { add } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const wished = isWishlisted(product.handle);
  const stock = typeof product.stock === "number" ? product.stock : 0;
  const soldOut = stock <= 0;
  const lowStock = !soldOut && stock <= 5;

  const ImageBlock = (
    <div className="relative block aspect-[4/5] w-full overflow-hidden rounded-b-none">
      <Image
        src={product.image || "/placeholder.png"}
        alt={product.title}
        fill
        className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${soldOut ? "grayscale opacity-80" : ""}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />

      {/* Badges */}
      {soldOut && (
        <span className="absolute left-3 top-3 rounded-full bg-zinc-900/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white shadow-sm">
          Sold out
        </span>
      )}
      {lowStock && (
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-900 shadow-sm"
          style={{ backgroundColor: "rgba(209,169,84,0.95)" }} // #D1A954
        >
          Low stock: {stock}
        </span>
      )}
    </div>
  );

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {/* Disable PDP click when sold out */}
      {soldOut ? (
        <div aria-disabled="true" className="cursor-not-allowed" title="This item is currently sold out">
          {ImageBlock}
        </div>
      ) : (
        <Link href={`/product/${product.handle}`} className="relative block">
          {ImageBlock}
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Title */}
        {soldOut ? (
          <div className="line-clamp-2 font-medium text-zinc-700">{product.title}</div>
        ) : (
          <Link href={`/product/${product.handle}`} className="line-clamp-2 font-medium">
            {product.title}
          </Link>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold">
              {`£${(product.pricePence / 100).toFixed(2)}`}
            </span>
            {lowStock && (
              <span className="text-xs text-amber-700">{`Only ${stock} left`}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!soldOut ? (
              <button
                type="button"
                onClick={() => add(product.handle, 1)}
                className="rounded-md bg-[var(--gold,#D1A954)] px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Add to Cart
              </button>
            ) : (
              <span className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-600" aria-hidden>
                Sold out
              </span>
            )}

            {/* Wishlist */}
            <button
              type="button"
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggle(product.handle)}
              className={`rounded-md border px-2 py-2 text-sm transition ${
                wished ? "border-zinc-300 bg-zinc-100" : "border-zinc-300 bg-white hover:bg-zinc-50"
              }`}
              title={wished ? "Wishlisted" : "Add to wishlist"}
            >
              {wished ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
