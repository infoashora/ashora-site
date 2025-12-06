// components/CartPanel.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";
import { PRODUCTS_MAP } from "@/app/product/content";
import Price from "./Price";

export default function CartPanel() {
  const { items, setQty, remove, clear, subtotalPence } = useCart();
  const hasItems = items.length > 0;

  if (!hasItems) {
    return (
      <div className="text-center space-y-4">
        <p>Your cart is empty.</p>
        <Link
          href="/shop"
          className="btn bg-white hover:bg-white hover:text-gold"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {/* Items */}
      <div className="md:col-span-2 space-y-4">
        {items.map((line) => {
          const prod = PRODUCTS_MAP[line.handle];
          const title = prod?.title || line.handle;
          const img = prod?.image || prod?.images?.[0] || "/hero/ashora-hero-1.jpg";
          const unitPence = line.pricePence;

          return (
            <div
              key={line.handle}
              className="card p-4 flex gap-4 items-center"
            >
              <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden ring-1 ring-ink/10 bg-white">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1">
                <p className="font-medium">{title}</p>
                <p className="text-sm opacity-70">Qty</p>

                <div className="mt-1 inline-flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="rounded-lg border border-ink/10 px-2 py-1"
                    onClick={() =>
                      setQty(
                        line.handle,
                        Math.max(1, (line.qty || 1) - 1)
                      )
                    }
                  >
                    –
                  </button>
                  <input
                    aria-label="Quantity"
                    className="w-12 text-center rounded-md border border-ink/10 py-1"
                    type="number"
                    min={1}
                    value={line.qty}
                    onChange={(e) => {
                      const v = parseInt(e.target.value || "1", 10);
                      setQty(
                        line.handle,
                        Number.isNaN(v) ? 1 : Math.max(1, v)
                      );
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="rounded-lg border border-ink/10 px-2 py-1"
                    onClick={() => setQty(line.handle, (line.qty || 1) + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Price amount={unitPence * line.qty} />
                <div>
                  <button
                    type="button"
                    className="text-sm opacity-70 hover:text-gold"
                    onClick={() => remove(line.handle)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className="text-sm opacity-70 hover:text-gold"
          onClick={() => clear()}
        >
          Clear cart
        </button>
      </div>

      {/* Summary */}
      <aside className="card p-5 h-fit">
        <h2 className="text-lg font-medium mb-3">Order summary</h2>
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <Price amount={subtotalPence} />
        </div>
        <p className="mt-2 text-xs opacity-70">
          Shipping and tax are calculated at checkout.
        </p>

        <Link
          href="/cart"
          className="btn bg-amber-600 text-white mt-4 hover:bg-amber-700 text-center"
          title="View cart and proceed to checkout"
        >
          View Cart and Checkout
        </Link>

        <p className="mt-2 text-xs opacity-70">
          You will select shipping in the next step. Taxes, if applicable, are calculated there.
        </p>
      </aside>
    </div>
  );
}
