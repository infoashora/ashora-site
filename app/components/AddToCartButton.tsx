// app/components/AddToCartButton.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useCart } from "@/app/components/CartProvider";

type Props = {
  handle: string;
  qty?: number;
  /** Pass the known stock when you have it (e.g., on the PDP). */
  stock?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function AddToCartButton({
  handle,
  qty = 1,
  stock,
  className,
  children,
}: Props) {
  const { items, add } = useCart();
  const [note, setNote] = useState<string | null>(null);

  // How many of this item are already in the cart?
  const inCartQty = useMemo(
    () => items.find((i) => i.handle === handle)?.qty ?? 0,
    [items, handle]
  );

  const finiteStock =
    typeof stock === "number" && Number.isFinite(stock) ? Math.max(0, stock) : undefined;

  const remaining =
    typeof finiteStock === "number" ? Math.max(0, finiteStock - inCartQty) : undefined;

  const soldOut = typeof finiteStock === "number" && finiteStock <= 0;
  const cannotAdd =
    typeof remaining === "number" ? remaining <= 0 : false; // if stock is unknown, we don't block

  function handleAdd() {
    setNote(null);

    // If we know stock, enforce it.
    if (typeof remaining === "number") {
      if (remaining <= 0) {
        setNote("Sold out or max in cart.");
        return;
      }

      const addQty = Math.min(qty, remaining);
      add(handle, addQty);

      if (addQty < qty || remaining - addQty === 0) {
        setNote("That’s all we have right now.");
      } else {
        setNote(null);
      }
      return;
    }

    // Fallback (no stock info provided) — behave as before
    add(handle, qty);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut || cannotAdd}
        aria-disabled={soldOut || cannotAdd}
        className={
          className ??
          "h-11 w-full rounded-md bg-[var(--gold)] text-white font-medium hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-60"
        }
        title={soldOut ? "Sold out" : undefined}
      >
        {children ?? (soldOut ? "Sold out" : "Add to Cart")}
      </button>

      {/* Gentle inline note */}
      {note && (
        <p className="mt-2 text-center text-xs text-zinc-600">
          {note}
        </p>
      )}

      {/* Tiny helper line when we know stock and some already in cart */}
      {typeof finiteStock === "number" && finiteStock > 0 && (
        <p className="mt-1 text-center text-[11px] text-zinc-500">
          {remaining ?? 0} available • {inCartQty} in your cart
        </p>
      )}
    </div>
  );
}
