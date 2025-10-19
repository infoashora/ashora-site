"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const GOLD = "#D1A954";

type Item = { label: string; href: string };

const EXPLORE_ITEMS: Item[] = [
  { label: "Shop All", href: "/shop" },
  { label: "Find Your Intention Quiz", href: "/quiz" },
  { label: "FAQ", href: "/faq" },
  { label: "Ritual FAQ", href: "/faq/ritual" },
  { label: "About", href: "/about" },
  { label: "Candles", href: "/collection/candles" },
  { label: "Herb Boxes", href: "/collection/herb-boxes" },
  { label: "Ritual Boxes", href: "/collection/ritual-boxes" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ddRef.current) return;
      if (!ddRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Left cluster */}
        <div className="flex items-center gap-6">
          {/* Explore dropdown */}
          <div ref={ddRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-sm font-medium text-zinc-900 transition hover:text-[var(--gold)] focus:outline-none"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              Explore ASHORA
            </button>

            {open && (
              <div
                role="menu"
                className="absolute left-0 mt-2 w-60 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg"
              >
                <ul>
                  {EXPLORE_ITEMS.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className="block px-4 py-2.5 text-sm text-zinc-800 transition hover:bg-zinc-50 hover:text-[var(--gold)]"
                        style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
                        onClick={() => setOpen(false)}
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link
            href="/#shop-by-intention"
            className="text-sm text-zinc-900 transition hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
          >
            Shop By Intention
          </Link>
        </div>

        {/* Center brand */}
        <div className="text-center leading-tight">
          <Link
            href="/"
            className="block text-lg font-semibold tracking-[0.35em] text-zinc-900 transition hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
          >
            A S H O R A
          </Link>
          <span className="block text-[11px] text-zinc-600">
            The Seed To The Garden You Can Grow
          </span>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-4">
          <Link
            href="/quiz"
            className="text-sm text-zinc-900 transition hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
          >
            Start Quiz
          </Link>

          {/* Wishlist */}
          <Link
            href="/account/wishlist"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            title="Wishlist"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d="M12.001 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.43 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.57 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53l-1.45 1.32z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Account icon â†’ Join ASHORA Circle */}
          <Link
            href="/join"
            title="Join ASHORA Circle"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" />
              <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" />
              <path d="M6.5 18c1.7-2.2 3.6-3.3 5.5-3.3S15.8 15.8 17.5 18" fill="none" stroke="currentColor" />
            </svg>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-zinc-300 px-3 text-sm text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            title="Cart"
          >
            <span aria-hidden>ðŸ›’</span>
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
