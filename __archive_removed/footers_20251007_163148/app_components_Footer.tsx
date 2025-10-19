"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GOLD = "#D1A954";

export default function Footer() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = email ? `?email=${encodeURIComponent(email)}` : "";
    router.push(`/join${q}`);
  }

  return (
    <footer className="mt-14 border-t border-zinc-200 bg-white">
      {/* Slim band */}
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
        {/* Left: CTA + tiny form */}
        <div className="max-w-xl">
          <h3 className="text-sm font-semibold tracking-tight">Join ASHORA Circle</h3>
          <p className="mt-1 text-xs text-zinc-600">
            Intention-led drops, ritual guidance, and members-only perks.
          </p>

          <form onSubmit={onSubmit} className="mt-3 flex gap-2">
            <input
              type="email"
              inputMode="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 w-full max-w-xs rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-[var(--gold)]"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              className="h-9 rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              Join
            </button>
            <Link
              href="/join"
              className="h-9 rounded-md border border-transparent px-2 text-sm text-zinc-700 underline decoration-amber-300 underline-offset-4 hover:text-zinc-900"
            >
              Learn more
            </Link>
          </form>
        </div>

        {/* Center: quick links (compact) */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-zinc-700 md:grid-cols-4">
          <li><Link className="hover:underline" href="/shop">Shop All</Link></li>
          <li><Link className="hover:underline" href="/collection/candles">Candles</Link></li>
          <li><Link className="hover:underline" href="/collection/herb-boxes">Herb Boxes</Link></li>
          <li><Link className="hover:underline" href="/collection/ritual-boxes">Ritual Boxes</Link></li>
          <li><Link className="hover:underline" href="/quiz">Find Your Intention Quiz</Link></li>
          <li><Link className="hover:underline" href="/faq">FAQ</Link></li>
          <li><Link className="hover:underline" href="/faq/ritual">Ritual FAQ</Link></li>
          <li><Link className="hover:underline" href="/about">About</Link></li>
        </ul>

        {/* Right: socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/ashorauk?igsh=dDVlNmM4eWpucWNq"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            aria-label="ASHORA on Instagram"
            title="Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" />
              <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@ashorauk?_t=ZN-8zyBqjbDw1e&_r=1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            aria-label="ASHORA on TikTok"
            title="TikTok"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d="M15 3c.3 2.3 1.7 3.8 4 4v3.1c-1.6.2-3-.2-4-1.1V15a6 6 0 11-6-6c.3 0 .6 0 1 .1V12a3 3 0 103 3V3h2z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom micro bar */}
      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-[11px] text-zinc-600 md:flex-row">
          <p>Â© {new Date().getFullYear()} ASHORA. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link className="hover:underline" href="/policies/shipping">Shipping</Link>
            <Link className="hover:underline" href="/policies/returns">Returns</Link>
            <Link className="hover:underline" href="/policies/privacy">Privacy</Link>
            <Link className="hover:underline" href="/policies/terms">Terms</Link>
            <a className="hover:underline" href="mailto:info@ashora.co.uk">info@ashora.co.uk</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
