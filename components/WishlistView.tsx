"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { useWishlistStore } from "../lib/wishlist-store";
import { useCart } from "@/app/components/CartProvider";
import { PRODUCTS_MAP, type Product } from "@/app/product/content";

/** Best-effort: derive a product handle from a legacy slug like "product/manifestation-candle" */
function handleFromSlug(slug?: string) {
  if (!slug) return "";
  const s = slug.replace(/^\//, "");
  const m = s.match(/^product\/(.+)$/i);
  return m ? m[1] : "";
}

export default function WishlistView() {
  const itemsMap = useWishlistStore((s) => s.items);
  const clear = useWishlistStore((s) => s.clear);
  const items = Object.values(itemsMap);

  const { add, open } = useCart(); // use unified cart provider

  // Resolve wishlist items to our central Product type where possible
  const resolved: Product[] = items
    .map((it) => {
      // Try: explicit handle on item -> central catalogue
      // Fallback: parse handle from legacy slug "product/<handle>"
      const h =
        (it as any).handle ||
        handleFromSlug(it.slug) ||
        ""; // last resort: no match

      return h && PRODUCTS_MAP[h] ? PRODUCTS_MAP[h] : undefined;
    })
    .filter(Boolean) as Product[];

  const count = resolved.length;

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20">
      <header className="flex flex-col gap-3 pt-10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
          <p className="text-sm opacity-70">
            Save your favourites for later. {count} item{count !== 1 ? "s" : ""}.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (count === 0) return;
              // Add one of each resolved product to cart
              resolved.forEach((p) => add(p.handle, 1));
              open();
            }}
            className={
              "btn " +
              (count ? "bg-ink text-white hover:bg-ink/90" : "cursor-not-allowed bg-ink/20 text-ink")
            }
            disabled={count === 0}
          >
            Add all to cart
          </button>

          <button
            onClick={() => clear()}
            className={
              "btn " +
              (count ? "bg-parchment hover:text-gold" : "cursor-not-allowed bg-ink/20 text-ink")
            }
            disabled={count === 0}
          >
            Clear
          </button>
        </div>
      </header>

      {count === 0 ? (
        <div className="mt-10 space-y-3 text-center">
          <p>Your wishlist is empty.</p>
          <Link href="/shop" className="btn bg-parchment no-underline hover:text-gold">
            Shop all
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resolved.map((p) => (
            <ProductCard key={p.handle} product={p} variant="compact" />
          ))}
        </div>
      )}
    </main>
  );
}
