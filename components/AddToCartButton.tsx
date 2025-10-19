// components/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/app/components/CartProvider";
import { getProductByHandle } from "@/app/product/content";
import { useCartStore } from "@/lib/cart-store";

type Props = {
  handle: string;
  qty?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function AddToCartButton({
  handle,
  qty = 1,
  className = "",
  children = "Add to Cart",
}: Props) {
  // Context cart (one system)
  const ctx = useCart();
  // Zustand cart (other system)
  const storeAdd = useCartStore((s) => (s as any)?.add);

  const [busy, setBusy] = useState(false);

  const onAdd = () => {
    if (busy) return;
    setBusy(true);

    // Look up the product so both carts get consistent data
    const p = getProductByHandle(handle);

    // 1) Add to the context cart (existing behaviour)
    try {
      ctx?.add?.(handle, qty);
    } catch {
      /* ignore */
    }

    // 2) Add to the Zustand store with correct fields (title, image, GBP price)
    try {
      if (storeAdd && p) {
        // many stores use { id, name, price (GBP), image, quantity }
        storeAdd(p.handle, {
          id: p.handle,
          name: p.title,
          price:
            typeof p.pricePence === "number"
              ? p.pricePence / 100
              : Number((p as any).price ?? 0),
          image: p.image ?? "/hero/ashora-hero-1.jpg",
          quantity: qty,
        });
      }
    } catch {
      /* ignore */
    }

    // 3) Update legacy listeners (header count fallback)
    try {
      window.dispatchEvent(
        new CustomEvent("ashora:cart:add", { detail: { qty } })
      );
    } catch {
      /* ignore */
    }

    // 4) Open cart drawer
    try {
      window.dispatchEvent(new Event("ashora:cart:open"));
    } catch {
      /* ignore */
    }

    // debounce guard
    setTimeout(() => setBusy(false), 350);
  };

  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={busy}
      className={className}
      aria-busy={busy}
    >
      {children}
    </button>
  );
}
