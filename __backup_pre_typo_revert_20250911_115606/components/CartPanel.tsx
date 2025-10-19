"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { useCartStore } from "../lib/cart-store";
import Price from "./Price";

export default function CartPanel() {
  // --- Stable selectors (no object wrappers) ---
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  // --- Hydration flag (do NOT early-return before hooks) ---
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  // Always call hooks; compute from store every render
  const list = useMemo(() => Object.values(items), [items]);
  const subtotal = useMemo(
    () => list.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [list]
  );

  // Optional lightweight placeholder before hydration completes
  if (!ready) {
    return (
      <div className="text-center space-y-4">
        <p>Loading cartâ€¦</p>
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p>Your cart is empty.</p>
        <Link href="/collections" className="btn bg-white hover:bg-white hover:text-gold">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {/* Items */}
      <div className="md:col-span-2 space-y-4">
        {list.map((it) => (
          <div key={it.id} className="card p-4 flex gap-4 items-center">
            <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden ring-1 ring-ink/10 bg-white">
              <Image src={it.image} alt={it.name} fill className="object-contain p-2" />
            </div>

            <div className="flex-1">
              <p className="font-medium">{it.name}</p>
              <p className="text-sm opacity-70">Qty</p>
              <div className="mt-1 inline-flex items-center gap-2">
                <button
                  aria-label="Decrease quantity"
                  className="rounded-lg border border-ink/10 px-2 py-1"
                  onClick={() => updateQuantity(it.id, Math.max(1, it.quantity - 1))}
                >
                  âˆ’
                </button>
                <input
                  aria-label="Quantity"
                  className="w-12 text-center rounded-md border border-ink/10 py-1"
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) => {
                    const v = parseInt(e.target.value || "1", 10);
                    updateQuantity(it.id, isNaN(v) ? 1 : Math.max(1, v));
                  }}
                />
                <button
                  aria-label="Increase quantity"
                  className="rounded-lg border border-ink/10 px-2 py-1"
                  onClick={() => updateQuantity(it.id, it.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <Price amount={it.price * it.quantity} />
              <div>
                <button
                  className="text-sm opacity-70 hover:text-gold"
                  onClick={() => remove(it.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="text-sm opacity-70 hover:text-gold" onClick={() => clear()}>
          Clear cart
        </button>
      </div>

      {/* Summary */}
      <aside className="card p-5 h-fit">
        <h2 className="text-lg font-medium mb-3">Order summary</h2>
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <Price amount={subtotal} />
        </div>
        <p className="mt-2 text-xs opacity-70">No tax calculated at this stage.</p>

        {/* Checkout disabled until Stripe keys are set */}
        <button disabled className="btn bg-ink/20 text-ink mt-4 cursor-not-allowed">
          Checkout (Stripe coming)
        </button>
        <p className="mt-2 text-xs opacity-70">
          Weâ€™ll enable checkout once your Stripe keys are configured.
        </p>
      </aside>
    </div>
  );
}
