// components/CartDrawer.tsx
"use client";

import { useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  // Use the same cart context as the rest of the site
  const { items, remove, setQty, subtotalPence } = useCart();

  // Listen for a global event to open/close the drawer
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

  const hasItems = items.length > 0;

  const formatGBP = (pence: number) => `£${(pence / 100).toFixed(2)}`;

  async function onCheckout(e?: MouseEvent<HTMLButtonElement>) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!hasItems) return;

    try {
      const payload = {
        items: items.map((i) => ({
          handle: i.handle,
          name: i.handle,
          unitAmount: i.pricePence, // pence
          quantity: i.qty,
          image: undefined as string | undefined,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        className={`fixed inset-0 z-50 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
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
            {!hasItems ? (
              <div className="py-8 text-center text-sm text-zinc-600">
                Your cart is empty.
                <div className="mt-3">
                  <Link
                    href="/shop"
                    className="underline underline-offset-4 hover:text-zinc-900"
                    onClick={() => setOpen(false)}
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="space-y-3">
                {items.map((i) => (
                  <li
                    key={i.handle}
                    className="flex gap-3 rounded-lg border border-zinc-200 p-3"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-zinc-50">
                      {/* No image originally, leave blank or wire later */}
                      <Image
                        src="/hero/hero1.jpg"
                        alt="Item"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-zinc-900">
                        {i.handle}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-500">
                        {formatGBP(i.pricePence)}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded border border-zinc-300 px-2 text-xs"
                          onClick={() =>
                            setQty(i.handle, Math.max(1, i.qty - 1))
                          }
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm">
                          {i.qty}
                        </span>
                        <button
                          type="button"
                          className="rounded border border-zinc-300 px-2 text-xs"
                          onClick={() => setQty(i.handle, i.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="ml-auto text-xs text-zinc-500 underline underline-offset-4 hover:text-zinc-800"
                          onClick={() => remove(i.handle)}
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
              <span className="font-medium text-zinc-900">
                {formatGBP(subtotalPence)}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Shipping is calculated at checkout.
            </p>

            <button
              type="button"
              onClick={onCheckout}
              className="mt-3 w-full rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed"
              title="Proceed to checkout"
              disabled={!hasItems}
            >
              Checkout
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
