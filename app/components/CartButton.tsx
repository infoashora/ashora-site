"use client";

import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";

export default function CartButton() {
  const { items } = useCart();
  const qty = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm transition hover:border-[#D1A954] hover:text-[#D1A954]"
      title="Open Cart"
    >
      <span>Cart</span>
      <span
        className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-300 px-1 text-xs"
        data-ashora-cart-count="true"
      >
        {qty}
      </span>
    </Link>
  );
}
