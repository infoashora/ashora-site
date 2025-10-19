"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../lib/cart-store";
import { useUIStore } from "../lib/ui-store";
import Price from "./Price";

export default function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const close = useUIStore((s) => s.closeCart);

  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const list = useMemo(() => Object.values(items), [items]);
  const subtotal = useMemo(
    () => list.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [list]
  );

  const panelRef = useRef<HTMLDivElement | null>(null);

  // Lock scroll + focus handling + ESC close
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      panelRef.current?.focus();

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open, close]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={close}
        aria-hidden={open ? "false" : "true"}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`fixed right-0 top-0 h-full w-full max-w-md z-[101] bg-white shadow-xl transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="h-16 px-5 border-b border-ink/10 flex items-center justify-between">
          <h2 className="text-lg font-medium">Your cart</h2>
          <button onClick={close} className="text-sm hover:text-gold no-underline">Close âœ•</button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto h-[calc(100%-8rem)]">
          {list.length === 0 ? (
            <div className="text-center mt-10 space-y-3">
              <p>Your cart is empty.</p>
              <Link href="/collections" onClick={close} className="btn bg-parchment hover:text-gold no-underline">
                Browse the collection
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {list.map((it) => (
                <div key={it.id} className="flex gap-3 items-center border border-ink/10 rounded-xl p-3">
                  <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden ring-1 ring-ink/10 bg-white">
                    <Image src={it.image} alt={it.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{it.name}</p>
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
                    <button className="text-xs opacity-70 hover:text-gold no-underline" onClick={() => remove(it.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button className="text-xs opacity-70 hover:text-gold no-underline" onClick={() => clear()}>
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="h-16 px-5 border-t border-ink/10 flex items-center justify-between">
          <div className="text-sm">
            <span className="opacity-70 mr-2">Subtotal</span>
            <Price amount={subtotal} />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/cart" className="btn bg-parchment hover:text-gold no-underline" onClick={close}>
              View cart
            </Link>
            <button className="btn bg-ink/20 text-ink cursor-not-allowed" title="Stripe coming">
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
