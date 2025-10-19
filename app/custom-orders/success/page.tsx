// app/custom-orders/success/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const GOLD = "#D1A954";

export default function CustomOrderSuccessPage() {
  const [mounted, setMounted] = useState(false);

  // simple mount fade-in
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative">
      {/* Soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(209,169,84,0.08), transparent 60%), radial-gradient(45% 50% at 100% 10%, rgba(209,169,84,0.05), transparent 55%)",
        }}
      />

      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-16">
        {/* Gold hairline */}
        <div
          className="mb-6 h-px w-40 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
          aria-hidden
        />

        <h1
          className={`font-cormorant text-center text-3xl font-semibold tracking-tight text-zinc-900 transition-opacity duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          Thank you, lovely ✨
        </h1>

        <p
          className={`mx-auto mt-3 max-w-xl text-center text-sm text-zinc-700 transition-opacity delay-100 duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          We’ve received your <span className="font-medium">Custom Order request</span>. Our team will review your
          intention and email you within <span className="font-medium">48 business hours</span> with a quote and timeline.
        </p>

        {/* Summary note */}
        <p
          className={`mx-auto mt-4 max-w-xl text-center text-xs text-zinc-500 transition-opacity delay-200 duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          If you need to share anything else, reply to our email at <span className="font-medium">info@ashora.co.uk</span>.
        </p>

        {/* Actions */}
        <div
          className={`mt-8 flex gap-3 transition-opacity delay-300 duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href="/shop"
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
          >
            Browse the Shop
          </Link>
          <Link
            href="/"
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
