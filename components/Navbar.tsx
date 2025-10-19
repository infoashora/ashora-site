"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function getStoredCount(): number {
  if (typeof window === "undefined") return 0;
  const v = window.localStorage.getItem("ashora:cartCount");
  return v ? Math.max(0, parseInt(v, 10) || 0) : 0;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number>(0);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const deskMenuRef = useRef<HTMLDivElement | null>(null);

  // Init + subscribe to cart events for live badge updates
  useEffect(() => {
    setCount(getStoredCount());

    const onAdd = (e: Event) => {
      const ce = e as CustomEvent<{ qty?: number }>;
      const qty = Math.max(1, ce.detail?.qty ?? 1);
      const next = getStoredCount() + qty;
      window.localStorage.setItem("ashora:cartCount", String(next));
      setCount(next);
    };
    const onSet = (e: Event) => {
      const ce = e as CustomEvent<{ count: number }>;
      const next = Math.max(0, ce.detail.count);
      window.localStorage.setItem("ashora:cartCount", String(next));
      setCount(next);
    };

    window.addEventListener("ashora:cart:add", onAdd as EventListener);
    window.addEventListener("ashora:cart:set", onSet as EventListener);
    return () => {
      window.removeEventListener("ashora:cart:add", onAdd as EventListener);
      window.removeEventListener("ashora:cart:set", onSet as EventListener);
    };
  }, []);

  // Close desktop dropdown on outside click / Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (deskMenuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-[#FAF8F4]/90 backdrop-blur">
      {/* Top row: Explore on the left, logo center, actions right */}
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-2 sm:px-6">
        {/* Left: Explore ASHORA trigger (text button â€” no white circle) */}
        <div className="justify-self-start">
          <button
            ref={btnRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-1 text-sm font-medium text-zinc-800 transition hover:text-[#D1A954]"
            title="Explore ASHORA"
          >
            Explore ASHORA
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Center: Logo + Tagline (stacked) */}
        <div className="justify-self-center text-center">
          <Link
            href="/"
            aria-label="ASHORA"
            className="group block leading-none"
            title="ASHORA â€” Home"
          >
            <span className="block text-lg font-semibold tracking-[0.45em] text-zinc-900 transition group-hover:text-[#D1A954] sm:text-xl">
              A&nbsp;S&nbsp;H&nbsp;O&nbsp;R&nbsp;A
            </span>
            <span className="mt-0.5 block text-[11px] leading-tight text-zinc-600 transition group-hover:text-[#D1A954] sm:text-xs">
              The Seed To The Garden You Can Grow
            </span>
          </Link>
        </div>

        {/* Right: CART with badge + JOIN ASHORA */}
        <div className="flex items-center justify-self-end gap-2">
          <button
            type="button"
            aria-label="Open Cart"
            title="Cart"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("ashora:cart:open"));
              }
            }}
            className="relative inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:border-[#D1A954] hover:text-[#D1A954]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6h14l-1.4 8.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.5L5 4H3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="9.5" cy="20" r="1" fill="currentColor" />
              <circle cx="17" cy="20" r="1" fill="currentColor" />
            </svg>
            CART
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#D1A954] px-1 text-[11px] font-semibold text-zinc-900">
                {count}
              </span>
            )}
          </button>

          <Link
            href="/join"
            className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:border-[#D1A954] hover:text-[#D1A954]"
            title="Join ASHORA"
          >
            JOIN ASHORA
          </Link>
        </div>
      </div>

      {/* MOBILE SHEET (under sm) */}
      <div className="sm:hidden">
        {open && (
          <div
            role="menu"
            aria-label="Explore ASHORA"
            className="border-t border-zinc-200 bg-white shadow-xl"
          >
            <div className="mx-auto max-w-6xl px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-zinc-600">
                  Explore ASHORA
                </p>
                <button
                  className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs transition hover:border-[#D1A954] hover:text-[#D1A954]"
                  onClick={() => setOpen(false)}
                  aria-label="Close Explore"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-1">
                <MenuLink onNavigate={() => setOpen(false)} href="/shop" label="Shop All" />
                <MenuLink onNavigate={() => setOpen(false)} href="/quiz" label="Find Your Intention Quiz" />
                <MenuLink onNavigate={() => setOpen(false)} href="/faq" label="FAQ" />
                <MenuLink onNavigate={() => setOpen(false)} href="/about" label="About" />
                <MenuLink onNavigate={() => setOpen(false)} href="/candles" label="Candles" />
                <MenuLink onNavigate={() => setOpen(false)} href="/herb-boxes" label="Herb Boxes" />
                <MenuLink onNavigate={() => setOpen(false)} href="/ritual-boxes" label="Ritual Boxes" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP DROPDOWN (sm and up) */}
      <div className="relative mx-auto hidden max-w-6xl px-4 sm:block sm:px-6">
        {open && (
          <div
            ref={deskMenuRef}
            role="menu"
            aria-label="Explore ASHORA"
            className="absolute left-0 top-0 mt-1 w-[min(92vw,22rem)] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl"
          >
            <div className="grid gap-1 p-2 text-sm">
              <MenuLink href="/shop" label="Shop All" />
              <MenuLink href="/quiz" label="Find Your Intention Quiz" />
              <MenuLink href="/faq" label="FAQ" />
              <MenuLink href="/about" label="About" />
              <MenuLink href="/candles" label="Candles" />
              <MenuLink href="/herb-boxes" label="Herb Boxes" />
              <MenuLink href="/ritual-boxes" label="Ritual Boxes" />
            </div>

            <div className="border-t border-zinc-200 bg-zinc-50/50 px-3 py-2 text-xs text-zinc-600">
              Explore ASHORA â€” Vegan, Eco-Conscious, Spiritual-Meets-Luxury
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/** Menu item with gold-on-hover text */
function MenuLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex items-center justify-between rounded-md px-2 py-2 text-zinc-800 transition hover:bg-amber-50 hover:text-[#D1A954]"
      onClick={onNavigate}
    >
      <span>{label}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
