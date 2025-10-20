// app/thank-you/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useContext } from "react";

// Try both carts: Context + Zustand
import { useCartStore } from "@/lib/cart-store";
import { CartContext } from "@/app/components/CartProvider";

const GOLD = "#D1A954";
const COUNT_KEY = "ashora:cartCount";

function ClearCartOnMount() {
  const storeClear = useCartStore((s) => s.clear);
  const ctx = useContext(CartContext);

  useEffect(() => {
    try { storeClear?.(); } catch {}
    try { ctx?.clear?.(); } catch {}
    try {
      localStorage.setItem(COUNT_KEY, "0");
      window.dispatchEvent(new CustomEvent("ashora:cart:set", { detail: { count: 0 } }));
    } catch {}
  }, [storeClear, ctx]);

  return null;
}

export default function ThankYouPage() {
  return (
    // Ensure the main content is above any fixed overlays
    <main className="relative z-10 mx-auto max-w-3xl px-6 py-16">
      <ClearCartOnMount />

      {/* Soft gold background aura (kept behind; no pointer events) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(70% 40% at 50% 0%, rgba(209,169,84,0.08), transparent 60%), radial-gradient(40% 40% at 100% 10%, rgba(209,169,84,0.06), transparent 55%)",
        }}
        aria-hidden
      />

      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Thank You for Your Order
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Your purchase has been received and will be prepared with care, love & intention.
        </p>
      </header>

      {/* Confirmation card */}
      <section className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4">
          <h2 className="text-base font-semibold text-zinc-900">Order Confirmed</h2>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-4 text-sm leading-6 text-zinc-700">
            <p>
              A confirmation has been sent to your email. You’ll receive tracking details as soon as
              your order ships.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Please allow 2–4 business days for processing.</li>
              <li>Shipping and taxes (if applicable) were confirmed at checkout.</li>
              <li>If you need help, reply to your confirmation email or contact us below.</li>
            </ul>
          </div>

          {/* Actions (force pointer events on, in case a parent overlay exists) */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center pointer-events-auto">
            <Link
              href="/shop"
              className="inline-flex flex-1 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-white shadow-sm transition"
              style={{ backgroundColor: GOLD }}
              prefetch={false}
            >
              Continue Shopping
            </Link>
            <Link
              href="/faq"
              className="inline-flex flex-1 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              prefetch={false}
            >
              View FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Support strip */}
      <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-zinc-200 bg-white/70 px-5 py-4 text-center text-sm text-zinc-700">
        Need assistance? Email{" "}
        <a
          href="mailto:info@ashora.co.uk"
          className="underline decoration-[rgba(209,169,84,0.35)] underline-offset-4 transition hover:text-zinc-900"
        >
          info@ashora.co.uk
        </a>
        .
      </div>
    </main>
  );
}
