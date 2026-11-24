
"use client";

// components/CartDrawer.tsx

import { useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useCart,
  PERSONALISATION_PRICE_PENCE,
} from "@/app/components/CartProvider";
import { PRODUCTS_MAP } from "@/app/product/content";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const { items, remove, setQty, subtotalPence } = useCart();

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

  const formatGBP = (pence: number) =>
    `£${(pence / 100).toFixed(2)}`;

  async function onCheckout(e?: MouseEvent<HTMLButtonElement>) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!hasItems || checkingOut) return;

    setCheckingOut(true);

    try {
      const payload = {
        items: items.map((item) => ({
          handle: item.handle,
          quantity: item.qty,
          personalisationName: item.personalisationName,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const message = await res.text();

        throw new Error(
          message || `Checkout failed (${res.status})`
        );
      }

      const data = await res.json();

      if (!data?.url) {
        throw new Error("Checkout URL was not returned.");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout exception", err);

      alert(
        err instanceof Error
          ? err.message
          : "Could not start checkout. Please try again."
      );
    } finally {
      setCheckingOut(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => setOpen(false)}
      />

      {/* Cart panel */}
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Your shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-widest">
            Your Cart
          </h2>

          <button
            type="button"
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        {/* Cart items */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
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
            <ul className="space-y-4">
              {items.map((item) => {
                const product = PRODUCTS_MAP[item.handle];

                const personalised = Boolean(
                  item.personalisationName
                );

                const unitPrice =
                  item.pricePence +
                  (personalised
                    ? PERSONALISATION_PRICE_PENCE
                    : 0);

                const lineTotal = unitPrice * item.qty;

                return (
                  <li
                    key={item.id}
                    className="flex gap-3 rounded-lg border border-zinc-200 p-3"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-50">
                      <Image
                        src="/hero/hero1.jpg"
                        alt={product?.title || "ASHORA candle"}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-zinc-900">
                        {product?.title || item.handle}
                      </div>

                      <div className="mt-1 text-sm font-medium text-zinc-900">
                        {formatGBP(lineTotal)}
                      </div>

                      {personalised && (
                        <div className="mt-3 border-l-2 border-[#b79850] pl-3">
                          <p className="text-[10px] uppercase tracking-widest text-[#9c7b35]">
                            Personalised Box
                          </p>

                          <p className="mt-1 break-words text-sm text-zinc-800">
                            {item.personalisationName}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            Includes £5.00 personalisation
                          </p>
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-2">
                        {personalised ? (
                          <span className="text-xs text-zinc-600">
                            1 personalised box
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="rounded border border-zinc-300 px-3 py-1 text-sm disabled:opacity-40"
                              onClick={() =>
                                setQty(
                                  item.id,
                                  Math.max(1, item.qty - 1)
                                )
                              }
                              disabled={item.qty <= 1}
                              aria-label="Decrease quantity"
                            >
                              –
                            </button>

                            <span className="min-w-[1.5rem] text-center text-sm">
                              {item.qty}
                            </span>

                            <button
                              type="button"
                              className="rounded border border-zinc-300 px-3 py-1 text-sm"
                              onClick={() =>
                                setQty(item.id, item.qty + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          className="ml-auto text-xs text-zinc-500 underline underline-offset-4 hover:text-zinc-800"
                          onClick={() => remove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Order summary */}
        <div className="shrink-0 border-t border-zinc-200 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">
              Subtotal
            </span>

            <span className="font-semibold text-zinc-900">
              {formatGBP(subtotalPence)}
            </span>
          </div>

          <p className="mt-2 text-xs text-zinc-500">
            Shipping is calculated at checkout.
          </p>

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-[48px] w-full items-center justify-center border border-zinc-300 text-xs font-medium uppercase tracking-widest text-zinc-800 transition hover:bg-zinc-50"
          >
            View Shopping Bag
          </Link>

          <button
            type="button"
            onClick={onCheckout}
            disabled={!hasItems || checkingOut}
            className="mt-3 flex min-h-[52px] w-full items-center justify-center bg-[#b79850] px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checkingOut
              ? "Preparing Checkout..."
              : "Checkout"}
          </button>
        </div>
      </aside>
    </div>
  );
}
