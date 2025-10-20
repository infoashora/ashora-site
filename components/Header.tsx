// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";
import { CartContext } from "@/app/components/CartProvider";

const GOLD = "#D1A954";
const COUNT_KEY = "ashora:cartCount";

function getStoredCount(): number {
  if (typeof window === "undefined") return 0;
  const v = window.localStorage.getItem(COUNT_KEY);
  return v ? Math.max(0, parseInt(v, 10) || 0) : 0;
}

function BagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M7 9V7a5 5 0 0110 0v2M5.5 9h13l-.9 10.2a2 2 0 01-2 1.8H8.4a2 2 0 01-2-1.8L5.5 9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const cart = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number>(0);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const deskMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cart) {
      setCount(cart.items.reduce((s, i) => s + i.qty, 0));
      return;
    }
    setCount(getStoredCount());
  }, [cart?.items]);

  useEffect(() => {
    if (cart) return;
    const onAdd = (e: Event) => {
      const ce = e as CustomEvent<{ qty?: number }>;
      const qty = Math.max(1, ce.detail?.qty ?? 1);
      const next = getStoredCount() + qty;
      localStorage.setItem(COUNT_KEY, String(next));
      setCount(next);
    };
    const onSet = (e: Event) => {
      const ce = e as CustomEvent<{ count: number }>;
      const next = Math.max(0, ce.detail.count);
      localStorage.setItem(COUNT_KEY, String(next));
      setCount(next);
    };
    window.addEventListener("ashora:cart:add", onAdd as EventListener);
    window.addEventListener("ashora:cart:set", onSet as EventListener);
    return () => {
      window.removeEventListener("ashora:cart:add", onAdd as EventListener);
      window.removeEventListener("ashora:cart:set", onSet as EventListener);
    };
  }, [cart]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || sheetRef.current?.contains(t) || deskMenuRef.current?.contains(t)) return;
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
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#FAF8F4]/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-2 sm:py-3 sm:px-6">
        {/* Left: Explore */}
        <div className="relative justify-self-start">
          <button
            ref={btnRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-medium text-zinc-800 transition hover:text-[var(--gold)] sm:px-1 sm:py-0.5 sm:text-sm"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            title="Explore ASHORA"
          >
            <span className="hidden sm:inline">Explore ASHORA</span>
            <span className="sm:hidden">Explore</span>
            <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Desktop dropdown */}
          {open && (
            <div
              ref={deskMenuRef}
              className="absolute left-0 mt-2 hidden w-[min(92vw,22rem)] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl sm:block z-50"
              role="menu"
            >
              <div className="grid gap-1 p-2 text-sm">
                <MenuLink href="/shop" label="Shop All" onClick={() => setOpen(false)} />
                <MenuLink href="/quiz" label="Find Your Intention" onClick={() => setOpen(false)} />
                <MenuLink href="/about" label="About" onClick={() => setOpen(false)} />
                <MenuLink href="/faq" label="FAQ" onClick={() => setOpen(false)} />
                <MenuLink href="/ritual-faqs" label="Ritual FAQs" onClick={() => setOpen(false)} />
                <MenuLink href="/custom-orders" label="Custom Orders" onClick={() => setOpen(false)} />
              </div>
              <div className="border-t border-zinc-200 bg-zinc-50/50 px-3 py-2 text-xs text-zinc-600">
                Explore ASHORA — Vegan, Eco-Conscious, Spiritual-Meets-Luxury
              </div>
            </div>
          )}
        </div>

        {/* Center: Logo */}
        <div className="justify-self-center text-center leading-none">
          <Link href="/" aria-label="ASHORA" className="group block">
            <span className="block text-base font-semibold tracking-[0.42em] text-zinc-900 transition group-hover:text-[var(--gold)] sm:text-lg sm:tracking-[0.45em]">
              A&nbsp;S&nbsp;H&nbsp;O&nbsp;R&nbsp;A
            </span>
            <span className="mt-0.5 hidden text-[11px] leading-tight text-zinc-600 transition group-hover:text-[var(--gold)] sm:block">
              The Seed To The Garden You Can Grow
            </span>
          </Link>
        </div>

        {/* Right: Cart + Join */}
        <div className="flex items-center justify-self-end gap-1.5 sm:gap-2">
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-800 transition hover:border-[var(--gold)] hover:text-[var(--gold)] sm:px-3 sm:py-1.5 sm:text-sm"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            title="Cart"
            aria-label="Cart"
          >
            <BagIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            <span className="hidden sm:inline">CART</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-w-[16px] items-center justify-center rounded-full bg-[var(--gold)] px-1 text-[10px] font-semibold text-zinc-900 sm:min-w-[18px] sm:text-[11px]">
                {count}
              </span>
            )}
          </Link>

          <Link
            href="/join"
            className="rounded-full border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-800 transition hover:border-[var(--gold)] hover:text-[var(--gold)] sm:px-3 sm:py-1.5 sm:text-sm"
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            title="Join ASHORA"
            aria-label="Join ASHORA"
          >
            <span className="sm:hidden">Join</span>
            <span className="hidden sm:inline">JOIN ASHORA</span>
          </Link>
        </div>
      </div>

      {/* Mobile sheet */}
      <div className="sm:hidden">
        {open && (
          <div
            ref={sheetRef}
            role="menu"
            aria-label="Explore ASHORA"
            className="border-t border-zinc-200 bg-white shadow-xl z-50"
          >
            <div className="mx-auto max-w-6xl px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-wide text-zinc-600">Explore ASHORA</p>
                <button
                  className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-[11px] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
                  onClick={() => setOpen(false)}
                  aria-label="Close Explore"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-1">
                <MenuLink href="/shop" label="Shop All" onClick={() => setOpen(false)} />
                <MenuLink href="/quiz" label="Find Your Intention" onClick={() => setOpen(false)} />
                <MenuLink href="/about" label="About" onClick={() => setOpen(false)} />
                <MenuLink href="/faq" label="FAQ" onClick={() => setOpen(false)} />
                <MenuLink href="/ritual-faqs" label="Ritual FAQs" onClick={() => setOpen(false)} />
                <MenuLink href="/custom-orders" label="Custom Orders" onClick={() => setOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MenuLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className="flex items-center justify-between rounded-md px-2 py-2 text-zinc-800 transition hover:bg-amber-50 hover:text-[var(--gold)]"
      style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
    >
      <span>{label}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
