"use client";

import { useState } from "react";

export default function TestCheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startCheckout() {
    try {
      setErr(null);
      setLoading(true);

      const payload = {
        items: [
          { id: "manifestation", quantity: 1 },
          { id: "love-self-love", quantity: 1 },
        ],
      };

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || `HTTP ${res.status}`);
        }
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
        throw new Error("No URL returned from Stripe.");
      } else {
        const text = await res.text();
        throw new Error(
          `Non-JSON response (status ${res.status}). Body:\n${text.slice(0, 600)}`
        );
      }
    } catch (e: any) {
      setErr(e?.message ?? "Unknown error");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-16 space-y-6">
      <h1 className="text-2xl font-semibold">Test Checkout</h1>
      <p className="text-sm opacity-80">
        Click the button below to create a Stripe Checkout session in test mode.
      </p>

      <button
        onClick={startCheckout}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
      >
        {loading ? "Creating session..." : "Start Test Checkout"}
      </button>

      {err && (
        <pre className="text-xs mt-4 whitespace-pre-wrap rounded bg-red-50 p-3 border border-red-200">
{err}
        </pre>
      )}

      <div className="text-xs opacity-70">
        <p>Make sure your <code>.env.local</code> contains:</p>
        <pre className="mt-2 rounded bg-black/5 p-3 overflow-auto">{`STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000`}</pre>
        <p className="mt-2">
          You can also visit <code>/api/create-checkout-session</code> directly in your
          browser (GET) to see a JSON health response.
        </p>
      </div>
    </main>
  );
}
