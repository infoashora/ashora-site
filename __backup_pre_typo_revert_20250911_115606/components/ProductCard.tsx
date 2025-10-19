"use client";

import Image from "next/image";
import Link from "next/link";
import IntentionBadge from "./IntentionBadge";
import Price from "./Price";
import type { Product } from "../data/products";
import { useCartStore } from "../lib/cart-store";
import { useUIStore } from "../lib/ui-store";
import WishlistButton from "./WishlistButton";

type Props = {
  product: Product;
  imageOverride?: string;
  contain?: boolean;
  showBadge?: boolean;
  quickAdd?: boolean;
};

export default function ProductCard({
  product,
  imageOverride,
  contain = true,
  showBadge = true,
  quickAdd = true,
}: Props) {
  const add = useCartStore((s) => s.add);
  const openCart = useUIStore((s) => s.openCart);
  const img = imageOverride ?? product.images[0];

  return (
    <div className="group relative rounded-2xl bg-white ring-1 ring-ink/10 shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-2xl"
      >
        <div className={(contain ? "aspect-square" : "aspect-[4/3]") + " relative bg-parchment"}>
          <Image
            src={img}
            alt={product.name}
            fill
            className={contain ? "object-contain p-4" : "object-cover"}
            sizes="(min-width:1024px) 400px, 100vw"
          />

        {/* Heart (wishlist) */}
        <div className="absolute top-3 right-3">
          <WishlistButton product={product} variant="icon" />
        </div>

          {/* Quick add (desktop) */}
          {quickAdd && (
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={(e) => {
                e.preventDefault();
                add(product, 1);
                openCart();
              }}
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-ink text-white h-10 w-10 grid place-items-center shadow"
            >
              +
            </button>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="font-medium leading-tight hover:text-gold no-underline"
          >
            {product.name}
          </Link>
          <Price amount={product.price} className="shrink-0 hover:text-gold transition-colors" />
        </div>

        {showBadge && <IntentionBadge intention={product.intention} />}
      </div>
    </div>
  );
}
