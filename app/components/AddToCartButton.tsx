
"use client";

// app/components/AddToCartButton.tsx

import React, { useMemo, useState } from "react";
import { useCart } from "@/app/components/CartProvider";

type Props = {
  handle: string;
  qty?: number;
  stock?: number;
  personalisationName?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function AddToCartButton({
  handle,
  qty = 1,
  stock,
  personalisationName,
  className,
  style,
  children,
}: Props) {
  const { items, add } = useCart();
  const [note, setNote] = useState<string | null>(null);

  const inCartQty = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + (item.handle === handle ? item.qty : 0),
        0
      ),
    [items, handle]
  );

  const finiteStock =
    typeof stock === "number" && Number.isFinite(stock)
      ? Math.max(0, stock)
      : undefined;

  const remaining =
    typeof finiteStock === "number"
      ? Math.max(0, finiteStock - inCartQty)
      : undefined;

  const soldOut =
    typeof finiteStock === "number" && finiteStock <= 0;

  const cannotAdd =
    typeof remaining === "number" && remaining <= 0;

  function handleAdd() {
    setNote(null);

    const requestedQty = Number.isFinite(qty)
      ? Math.max(1, Math.floor(qty))
      : 1;

    if (typeof remaining === "number") {
      if (remaining <= 0) {
        setNote("Sold out or maximum quantity in cart.");
        return;
      }

      const addQty = Math.min(requestedQty, remaining);

      add(handle, addQty, personalisationName);

      if (addQty < requestedQty || remaining - addQty === 0) {
        setNote("That's all we have available right now.");
      } else {
        setNote("Added to your cart.");
      }

      return;
    }

    add(handle, requestedQty, personalisationName);
    setNote("Added to your cart.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut || cannotAdd}
        aria-disabled={soldOut || cannotAdd}
        className={[
          "flex w-full items-center justify-center",
          "transition duration-200",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className ??
            "rounded-md bg-[var(--gold)] text-white font-medium hover:opacity-90",
        ].join(" ")}
        style={{
          ...style,
          minHeight: "52px",
          padding: "14px 24px",
        }}
        title={soldOut ? "Sold out" : undefined}
      >
        {children ??
          (soldOut ? "Sold out" : "Add to Cart")}
      </button>

      {note && (
        <p className="mt-2 text-center text-xs text-zinc-600">
          {note}
        </p>
      )}

      {typeof finiteStock === "number" && finiteStock > 0 && (
        <p className="mt-2 text-center text-[11px] text-zinc-500">
          {remaining ?? 0} available • {inCartQty} in your cart
        </p>
      )}
    </div>
  );
}
