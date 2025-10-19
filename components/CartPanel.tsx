// components/CartPanel.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useEffect, useState, MouseEvent } from "react";

// Zustand store (one system)
import { useCartStore } from "../lib/cart-store";

// Context hook (the other system, if present)
import { useCart as useCartHook } from "@/hooks/useCart";

// 🔑 Catalogue is the source of truth
import { PRODUCTS, getProductByHandle } from "@/app/product/content";

import Price from "./Price";

/** Find the matching catalogue product from a cart line (by handle or title). */
function findCatalogProduct(raw: any) {
  const handle =
    raw?.handle ??
    raw?.id ??
    (raw?.title || raw?.name
      ? String(raw.title ?? raw.name).toLowerCase().replace(/\s+/g, "-")
      : undefined);

  if (handle) {
    const byHandle = getProductByHandle(handle);
    if (byHandle) return byHandle;
  }

  const title = (raw?.title ?? raw?.name ?? "").toString().trim().toLowerCase();
  if (title) {
    const byTitle = PRODUCTS.find((p) => p.title.toLowerCase() === title);
    if (byTitle) return byTitle;
  }
  return undefined;
}

/** Normalise any cart item using catalogue values for title/image/price. */
function toLine(raw: any) {
  const catalog = findCatalogProduct(raw);

  const title = catalog?.title ?? raw?.title ?? raw?.name ?? "ASHORA Item";
  const qty = Math.max(1, Number(raw?.qty ?? raw?.quantity ?? 1));

  // 💰 PRICE IN PENCE (source of truth = catalogue)
  const unitPence =
    typeof catalog?.pricePence === "number"
      ? Math.max(0, Math.floor(catalog!.pricePence))
      : 0;

  const handle =
    catalog?.handle ??
    raw?.handle ??
    raw?.id ??
    String(title).toLowerCase().replace(/\s+/g, "-");

  const image =
    catalog?.image ??
    raw?.image ??
    raw?.img ??
    "/hero/ashora-hero-1.jpg";

  return {
    title,
    qty,            // quantity
    unitPence,      // price per unit in pence
    handle,
    image,
    _raw: raw,      // keep original for zustand controls
  };
}

/** ✅ Proper custom hook that safely reads the hook-cart if the provider exists. */
function useSafeCart(): { items: any[] } | undefined {
  // Try to read the hook cart; if the provider isn't mounted, it may throw.
  // We cannot put the try/catch *around* the hook call conditionally, so we keep it direct.
  // If your useCart() throws outside its provider, consider changing that implementation
  // to return a default { items: [] } instead of throwing.
  try {
    const h = useCartHook?.();
    if (h && Array.isArray((h as any).items)) return h as any;
  } catch {
    // ignore if the hook throws outside its provider
  }
  return undefined;
}

export default function CartPanel() {
  // --- Zustand store ---
  const zItems = useCartStore((s) => s.items);
  const zUpdateQuantity = useCartStore((s) => s.updateQuantity);
  const zRemove = useCartStore((s) => s.remove);
  const zClear = useCartStore((s) => s.clear);

  // --- Optional context hook (if present) ---
  const hookCart = useSafeCart();

  // --- Hydration guard ---
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  // Prefer hook items if present; else Zustand items
  const hookList = useMemo<any[]>(() => (hookCart?.items ?? []) as any[], [hookCart?.items]);
  const storeList = useMemo<any[]>(() => Object.values(zItems ?? {}), [zItems]);
  const usingHook = hookList.length > 0;

  // 🔧 Normalised with catalogue truth
  const lines = useMemo(
    () => (usingHook ? hookList : storeList).map(toLine),
    [usingHook, hookList, storeList]
  );

  // Subtotal IN PENCE for <Price />
  const subtotalPence = useMemo(
    () => lines.reduce((s, l) => s + l.unitPence * l.qty, 0),
    [lines]
  );

  async function onCheckout(e?: MouseEvent<HTMLButtonElement>) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!lines.length) return;

    try {
      const payload = {
        items: lines.map((l) => ({
          handle: l.handle,
          name: l.title,
          unitAmount: l.unitPence, // pence for Stripe
          quantity: l.qty,
          image: l.image,
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

      window.location.href = data.url as string;
    } catch (err) {
      console.error("Checkout exception", err);
      alert("Could not start checkout. Please try again.");
    }
  }

  if (!ready) {
    return (
      <div className="text-center space-y-4">
        <p>Loading cart…</p>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="text-center space-y-4">
        <p>Your cart is empty.</p>
        <Link href="/shop" className="btn bg-white hover:bg-white hover:text-gold">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {/* Items */}
      <div className="md:col-span-2 space-y-4">
        {lines.map((it, idx) => (
          <div key={(it.handle ?? it.title) + ":" + idx} className="card p-4 flex gap-4 items-center">
            <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden ring-1 ring-ink/10 bg-white">
              <Image src={it.image} alt={it.title} fill className="object-contain p-2" />
            </div>

            <div className="flex-1">
              <p className="font-medium">{it.title}</p>
              <p className="text-sm opacity-70">Qty</p>

              {usingHook ? (
                // read-only qty if using the hook cart
                <div className="mt-1 inline-flex items-center gap-2">
                  <span className="rounded-lg border border-ink/10 px-2 py-1 select-none">×</span>
                  <span className="w-12 text-center rounded-md border border-ink/10 py-1">{it.qty}</span>
                </div>
              ) : (
                // full controls if using Zustand store
                <div className="mt-1 inline-flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="rounded-lg border border-ink/10 px-2 py-1"
                    onClick={() =>
                      zUpdateQuantity(
                        it._raw.id,
                        Math.max(1, (Number(it._raw.quantity ?? it._raw.qty) || 1) - 1)
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
                    value={it.qty}
                    onChange={(e) => {
                      const v = parseInt(e.target.value || "1", 10);
                      zUpdateQuantity(it._raw.id, Number.isNaN(v) ? 1 : Math.max(1, v));
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="rounded-lg border border-ink/10 px-2 py-1"
                    onClick={() => zUpdateQuantity(it._raw.id, (Number(it._raw.quantity ?? it._raw.qty) || 1) + 1)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            <div className="text-right">
              {/* Pass pence to <Price /> */}
              <Price amount={it.unitPence * it.qty} />
              {!usingHook && (
                <div>
                  <button
                    type="button"
                    className="text-sm opacity-70 hover:text-gold"
                    onClick={() => zRemove(it._raw.id)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {!usingHook && (
          <button type="button" className="text-sm opacity-70 hover:text-gold" onClick={() => zClear()}>
            Clear cart
          </button>
        )}
      </div>

      {/* Summary */}
      <aside className="card p-5 h-fit">
        <h2 className="text-lg font-medium mb-3">Order summary</h2>
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          {/* Subtotal in pence */}
          <Price amount={subtotalPence} />
        </div>
        <p className="mt-2 text-xs opacity-70">Shipping & tax calculated at checkout.</p>

        <button
          type="button"
          onClick={onCheckout}
          className="btn bg-amber-600 text-white mt-4 hover:bg-amber-700"
          title="Proceed to checkout"
        >
          Checkout
        </button>

        <p className="mt-2 text-xs opacity-70">
          You’ll select shipping in Stripe. Taxes (if applicable) are calculated there.
        </p>
      </aside>
    </div>
  );
}
