"use client";
import { useEffect, useState } from "react";
import { readCart, totalQty } from "@/app/lib/cart";

export default function CartButton() {
  const [qty, setQty] = useState(0);
  useEffect(() => {
    const sync = () => setQty(totalQty(readCart()));
    sync();
    const onChanged = () => sync();
    window.addEventListener("ashora:cart:changed", onChanged as EventListener);
    return () => window.removeEventListener("ashora:cart:changed", onChanged as EventListener);
  }, []);
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("ashora:cart:open"))}
      className="relative inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm transition hover:border-[#D1A954] hover:text-[#D1A954]"
      title="Open Cart"
    >
      <span>Cart</span>
      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-300 px-1 text-xs" data-ashora-cart-count="true">
        {qty}
      </span>
    </button>
  );
}
