"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { useWishlistStore } from "../lib/wishlist-store";
import { useCartStore } from "../lib/cart-store";
import { useUIStore } from "../lib/ui-store";

export default function WishlistView() {
  const itemsMap = useWishlistStore((s) => s.items);
  const clear = useWishlistStore((s) => s.clear);
  const items = Object.values(itemsMap);

  const add = useCartStore((s) => s.add);
  const openCart = useUIStore((s) => s.openCart);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20">
      <header className="pt-10 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
          <p className="opacity-70 text-sm">
            Save your favourites for later. {items.length} item{items.length !== 1 ? "s" : ""}.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (items.length === 0) return;
              items.forEach((it) =>
                add(
                  {
                    // minimal product shape for add()
                    id: it.id,
                    slug: it.slug,
                    name: it.name,
                    intention: "",
                    description: "",
                    price: it.price,
                    waxColor: "",
                    crystals: [],
                    herbs: [],
                    images: [it.image],
                  },
                  1
                )
              );
              openCart();
            }}
            className={
              "btn " +
              (items.length ? "bg-ink text-white hover:bg-ink/90" : "bg-ink/20 text-ink cursor-not-allowed")
            }
            disabled={items.length === 0}
          >
            Add all to cart
          </button>

          <button
            onClick={() => clear()}
            className={
              "btn " +
              (items.length ? "bg-parchment hover:text-gold" : "bg-ink/20 text-ink cursor-not-allowed")
            }
            disabled={items.length === 0}
          >
            Clear
          </button>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="mt-10 text-center space-y-3">
          <p>Your wishlist is empty.</p>
          <Link href="/shop" className="btn bg-parchment hover:text-gold no-underline">
            Shop all
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <ProductCard
              key={it.id}
              product={{
                id: it.id,
                slug: it.slug,
                name: it.name,
                intention: it.intention,
                description: "",
                price: it.price,
                waxColor: "",
                crystals: [],
                herbs: [],
                images: [it.image],
              }}
              contain
              showBadge={false}
              quickAdd
            />
          ))}
        </div>
      )}
    </main>
  );
}
