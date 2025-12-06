// components/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/app/components/CartProvider";
import { getProductByHandle } from "@/app/product/content";

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
  // Single source of truth: CartProvider
  const ctx = useCart();
  const [busy, setBusy] = useState(false);

  const onAdd = () => {
    if (busy) return;
    setBusy(true);

    // Optional: still look up product if you ever want to use details in events
    const p = getProductByHandle(handle);

    // 1) Add to CartProvider cart
    try {
      ctx?.add?.(handle, qty);
    } catch {
      /* ignore */
    }

    // 2) Fire legacy events for any listeners (safe to keep / future use)
    try {
      window.dispatchEvent(
        new CustomEvent("ashora:cart:add", {
          detail: { qty, handle, product: p ?? null },
        })
      );
    } catch {
      /* ignore */
    }

    // 3) Open cart drawer, if your CartDrawer listens for this
    try {
      window.dispatchEvent(new Event("ashora:cart:open"));
    } catch {
      /* ignore */
    }

    // Simple debounce
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
