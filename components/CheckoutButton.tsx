"use client";

import { useState, MouseEvent } from "react";
import { useCart } from "../hooks/useCart";

export default function CheckoutButton() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  async function onCheckout(e?: MouseEvent<HTMLButtonElement>) {
    // Hard-stop any accidental form submit / wrapper clicks
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (loading) return;
    if (!items?.length) return;

    try {
      setLoading(true);

      // Build payload expected by /api/checkout
      const lineItems = items.map((i: any) => {
        const unitAmount =
          typeof i.pricePence === "number"
            ? Math.max(0, Math.floor(i.pricePence))
            : Math.max(0, Math.round(((i.price ?? 0) as number) * 100));

        return {
          handle: i.handle,
          name: i.title ?? i.name ?? "ASHORA Item",
          unitAmount, // pence (integer)
          quantity: Math.max(1, Number(i.qty ?? 1)),
          image: i.image,
        };
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lineItems }),
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok || !data?.url) {
        console.error("Checkout failed", data);
        throw new Error(data?.error || `Checkout failed (${res.status})`);
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url as string;
    } catch (err: any) {
      alert(err?.message || "Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"                  // ⬅️ prevents form submit
      onClick={onCheckout}
      disabled={loading || items.length === 0}
      className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
      title={items.length === 0 ? "Your cart is empty" : "Proceed to checkout"}
      aria-busy={loading}
    >
      {loading ? "Starting checkout…" : "Checkout"}
    </button>
  );
}
