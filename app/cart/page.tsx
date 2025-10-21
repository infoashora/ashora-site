// app/cart/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/components/CartProvider";
import { PRODUCTS_MAP } from "@/app/product/content";

const GOLD = "#D1A954";

export default function CartPage() {
  const { items, setQty, remove, clear, subtotalPence } = useCart();
  const [loading, setLoading] = useState(false);

  const hasItems = items.length > 0;

  const handleClearAll = () => {
    if (!hasItems) return;
    const ok = window.confirm("Remove all items from your cart?");
    if (ok) clear();
  };

  const formatGBP = (pence: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format((pence || 0) / 100);

  const handleCheckout = async () => {
    if (!hasItems || loading) return;
    setLoading(true);
    try {
      // Build the payload expected by /api/checkout
      const payload = {
        items: items.map((i) => {
          const prod = PRODUCTS_MAP[i.handle];
          return {
            handle: i.handle,
            name: prod?.title || i.handle, // <-- use Product.title
            unitAmount: i.pricePence, // already in pence
            quantity: i.qty,
            image: prod?.image || prod?.images?.[0] || undefined,
          };
        }),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Checkout failed");
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("Checkout URL missing");
      }
    } catch (err: any) {
      console.error("[cart] checkout error", err);
      alert(
        "Checkout failed. Please try again in a moment or contact info@ashora.co.uk."
      );
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-600">
        <Link
          href="/"
          className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
        >
          Home
        </Link>{" "}
        / <span className="text-zinc-800">Cart</span>
      </nav>

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Your Cart</h1>

        <button
          type="button"
          onClick={handleClearAll}
          disabled={!hasItems}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          title={hasItems ? "Clear all items" : "Cart is empty"}
        >
          Clear All
        </button>
      </div>

      {!hasItems ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-zinc-600">
          <p>Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm"
            style={{ backgroundColor: GOLD }}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <section className="space-y-4">
            {items.map((i) => {
              const prod = PRODUCTS_MAP[i.handle];
              const title = prod?.title || i.handle; // <-- use Product.title
              const img = prod?.image || prod?.images?.[0];
              const price = i.pricePence;

              return (
                <div
                  key={i.handle}
                  className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4"
                >
                  {/* Image */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="truncate text-base font-medium text-zinc-900">
                        {title}
                      </h3>
                      <div className="text-sm font-medium text-zinc-900">
                        {formatGBP(price)}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                      <label className="text-sm text-zinc-600">Qty</label>
                      <input
                        type="number"
                        min={1}
                        step={1}
                        value={i.qty}
                        onChange={(e) =>
                          setQty(i.handle, Number(e.currentTarget.value || 1))
                        }
                        className="w-16 rounded-md border border-zinc-300 px-2 py-1 text-sm"
                      />

                      <button
                        type="button"
                        onClick={() => remove(i.handle)}
                        className="ml-2 text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Summary */}
          <aside className="h-max rounded-2xl border border-zinc-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-zinc-900">
              Order Summary
            </h2>

            <dl className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-zinc-600">Subtotal</dt>
                <dd className="font-medium text-zinc-900">
                  {formatGBP(subtotalPence)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-zinc-600">Shipping</dt>
                <dd className="text-zinc-500">Calculated at checkout</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-zinc-600">Tax</dt>
                <dd className="text-zinc-500">Added at checkout</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={!hasItems || loading}
              className="mt-4 w-full rounded-md px-4 py-2.5 text-sm font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: GOLD }}
            >
              {loading ? "Redirecting..." : "Checkout"}
            </button>

            <p className="mt-2 text-center text-xs text-zinc-500">
              You’ll see shipping & VAT on the next step.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
