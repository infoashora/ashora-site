// components/CartDrawer.tsx
"use client";

import { useEffect, useMemo, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../lib/cart-store";
import Price from "./Price";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  // Wire to your existing cart store
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  // Listen for a global event to open the drawer if your site dispatches it
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    window.addEventListener("ashora:cart:open", onOpen);
    window.addEventListener("ashora:cart:close", onClose);
    return () => {
      window.removeEventListener("ashora:cart:open", onOpen);
      window.removeEventListener("ashora:cart:close", onClose);
    };
  }, []);

  const list = useMemo(() => Object.values(items), [items]);

  const subtotal = useMemo(
    () =>
      list.reduce(
        (sum, it: any) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 1),
        0
      ),
    [list]
  );

  async function onCheckout(e?: MouseEvent<HTMLButtonElement>) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!list.length) return;

    try {
      const lineItems = list.map((it: any) => ({
        handle:
          it.handle ??
          it.id ??
          (it.name ? String(it.name).toLowerCase().replace(/\s+/g, "-") : "ashora-item"),
        name: it.name ?? "ASHORA Item",
        unitAmount: Math.max(0, Math.round((Number(it.price) || 0) * 100)), // pence
        quantity: Math.max(1, Number(it.quantity) || 1),
        image: it.image,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lineItems }),
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok || !data?.url) {
        console.error("Checkout failed", data);
        alert(data?.error || `Checkout failed (${res.status})`);
        return;
      }

      window.location.href = data.url as string; // Stripe Checkout
    } catch (err) {
      console.error("Checkout exception", err);
      alert("Could not start checkout. Please try again.");
    }
  }

  return (
    <>
      {/* Toggle lives elsewhere in your UI; we render the sheet here */}
      <div
        className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-zinc-200 p-4">
            <h2 className="text-sm font-semibold tracking-wide">Your Cart</h2>
            <button
              type="button"
              className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          {/* Items */}
          <div className="flex h-[calc(100%-160px)] flex-col overflow-y-auto p-4">
            {list.length === 0 ? (
              <div className="py-8 text-center text-sm text-zinc-600">
                Your cart is empty.
                <div className="mt-3">
                  <Link href="/shop" className="underline underline-offset-4 hover:text-zinc-900">
                    Continue shopping
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="space-y-3">
                {list.map((it: any) => (
                  <li key={it.id ?? it.handle ?? it.name} className="flex gap-3 rounded-lg border border-zinc-200 p-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-zinc-50">
                      <Image
                        src={it.image ?? "/hero/ashora-hero-1.jpg"}
                        alt={it.name ?? "Item"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-zinc-900">
                        {it.name ?? "ASHORA Item"}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-500">£{Number(it.price || 0).toFixed(2)}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded border border-zinc-300 px-2 text-xs"
                          onClick={() => updateQuantity(it.id, Math.max(1, (Number(it.quantity) || 1) - 1))}
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm">{it.quantity ?? 1}</span>
                        <button
                          type="button"
                          className="rounded border border-zinc-300 px-2 text-xs"
                          onClick={() => updateQuantity(it.id, (Number(it.quantity) || 1) + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="ml-auto text-xs text-zinc-500 underline underline-offset-4 hover:text-zinc-800"
                          onClick={() => remove(it.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Summary + Checkout */}
          <div className="border-t border-zinc-200 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-medium text-zinc-900">£{subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">Shipping & tax calculated at checkout.</p>

            <button
              type="button"
              onClick={onCheckout}
              className="mt-3 w-full rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
              title="Proceed to checkout"
            >
              Checkout
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
