"use client";

import { ReactNode } from "react";
import { useCartStore } from "../lib/cart-store";
import { useUIStore } from "../lib/ui-store";
import type { Product } from "../data/products";

type Props = {
  product: Product;
  quantity?: number;
  className?: string;
  children?: ReactNode;
};

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "btn bg-ink text-white hover:bg-ink/90 no-underline",
  children = "Add to cart",
}: Props) {
  const add = useCartStore((s) => s.add);
  const openCart = useUIStore((s) => s.openCart);

  return (
    <button
      className={className}
      onClick={() => {
        add(product, quantity);
        openCart();
      }}
    >
      {children}
    </button>
  );
}
