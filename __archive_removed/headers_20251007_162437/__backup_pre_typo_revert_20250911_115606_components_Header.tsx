"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "../lib/cart-store";
import { useWishlistStore } from "../lib/wishlist-store";

const navLink = "text-sm hover:text-gold no-underline transition-colors";

export default function Header() {
  const cartCount = Object.values(useCartStore((s) => s.items)).reduce(
    (n, it) => n + it.quantity,
    0
  );
  const wishCount = Object.keys(useWishlistStore((s) => s.items)).length;

  const [desktopExploreOpen, setDesktopExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const desktopMenuRef = useRef<HTMLDivElement | null>(null);

  // Close desktop Explore on outside click/ESC
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!desktopMenuRef.current) return;
      if (!desktopMenuRef.current.contains(e.target as Node))
        setDesktopExploreOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDesktopExploreOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "";
    }
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-stone-200/90 backdrop-blur border-b border-stone-400">
      {/* Top bar */}
      <div className="mx-auto max-w-7xl px-3 md:px-4 h-14 md:h-16 grid grid-cols-3 items-center gap-2">
        {/* LEFT â€” mobile: menu button / desktop: Shop + Explore */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile hamburger */}
          <button
            className="md:hidden h-9 w-9 grid place-items-center rounded-md ring-1 ring-ink/10 bg-white/70"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/shop" className={navLink}>Shop</Link>

            <div ref={desktopMenuRef} className="relative">
              <div
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={desktopExploreOpen}
                className="inline-flex items-center gap-1 cursor-pointer select-none text-sm hover:text-gold"
                onClick={() => setDesktopExploreOpen((v) => !v)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  setDesktopExploreOpen((v) => !v)
                }
              >
                <span>Explore Ashora</span>
                <span
                  aria-hidden
                  className={`transition-transform ${desktopExploreOpen ? "rotate-180" : ""}`}
                >
                  â–¾
                </span>
              </div>

              {desktopExploreOpen && (
                <div
                  role="menu"
                  className="absolute left-0 mt-3 w-56 rounded-xl border border-ink/10 bg-white shadow-lg p-1"
                >
                  <Link href="/quiz" className="block px-3 py-2 rounded-md hover:bg-parchment no-underline">
                    Find your intention (Quiz)
                  </Link>
                  <Link href="/#intentions" className="block px-3 py-2 rounded-md hover:bg-parchment no-underline">
                    Choose your intention
                  </Link>
                  <Link href="/collections" className="block px-3 py-2 rounded-md hover:bg-parchment no-underline">
                    All products (sections)
                  </Link>
                  <Link href="/collections#candles" className="block px-3 py-2 rounded-md hover:bg-parchment no-underline">
                    Candles
                  </Link>
                  <Link href="/collections#ritual-boxes" className="block px-3 py-2 rounded-md hover:bg-parchment no-underline">
                    Ritual Boxes
                  </Link>
                  <Link href="/collections#herb-boxes" className="block px-3 py-2 rounded-md hover:bg-parchment no-underline">
                    Herb Boxes
                  </Link>
                  <Link href="/about" className="block px-3 py-2 rounded-md hover:bg-parchment no-underline">
                    About Ashora
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTER â€” logo + poetic line */}
        <div className="justify-self-center text-center leading-tight">
          <Link href="/" className="no-underline block">
            <span className="tracking-[0.35em] text-[13px] md:text-base font-semibold text-ink hover:text-gold transition-colors">
              A&nbsp;S&nbsp;H&nbsp;O&nbsp;R&nbsp;A
            </span>
            <span className="sr-only">Ashora home</span>
          </Link>
        <p className="block text-[10px] sm:text-[11px] md:text-sm italic text-ink/80 mt-0.5 leading-snug">
            The seed to the garden you can grow
          </p>
        </div>

        {/* RIGHT â€” mobile: Cart only / desktop: Account + Wishlist + Cart */}
        <div className="flex items-center justify-end gap-3 md:gap-6">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/account" className={navLink}>Account</Link>
            <Link href="/wishlist" className={navLink}>
              Wishlist{wishCount > 0 ? ` (${wishCount})` : ""}
            </Link>
            <Link href="/cart" className={navLink}>
              Cart{cartCount > 0 ? ` (${cartCount})` : ""}
            </Link>
          </div>

          {/* Mobile Cart (compact) */}
          <Link
            href="/cart"
            className="md:hidden inline-flex items-center gap-1 no-underline text-sm hover:text-gold"
            aria-label="View cart"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M3 6h2l2.4 9.2A2 2 0 0 0 9.3 16h6.9a2 2 0 0 0 2-1.6L20 8H6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="19" r="1.6" fill="currentColor" />
              <circle cx="17" cy="19" r="1.6" fill="currentColor" />
            </svg>
            <span>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</span>
          </Link>
        </div>
      </div>

      {/* MOBILE MENU (drawer) */}
      <div
        className={`fixed inset-0 z-[100] transition ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      >
        {/* overlay (darker + blur) */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
        {/* panel (solid bg, border, shadow, scrollable) */}
        <nav
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className={`absolute left-0 top-0 h-full w-[82%] max-w-sm bg-white/95 shadow-2xl border-r border-ink/10 p-4 transition-transform z-[101] ${mobileOpen ? "translate-x-0" : "-translate-x-full"} overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Menu</span>
            <button
              aria-label="Close menu"
              className="h-9 w-9 grid place-items-center rounded-md ring-1 ring-ink/10 bg-white/80"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <ul className="space-y-1 text-sm">
            <li><Link href="/shop" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>Shop all</Link></li>
            <li><Link href="/quiz" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>Find your intention (Quiz)</Link></li>
            <li><Link href="/#intentions" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>Choose your intention</Link></li>
            <li><Link href="/collections" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>All products</Link></li>
            <li><Link href="/collections#candles" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>Candles</Link></li>
            <li><Link href="/collections#ritual-boxes" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>Ritual Boxes</Link></li>
            <li><Link href="/collections#herb-boxes" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>Herb Boxes</Link></li>
            <li className="pt-2"><Link href="/about" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>About Ashora</Link></li>

            <li className="pt-2"><Link href="/account" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>Account</Link></li>
            <li>
              <Link href="/wishlist" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>
                Wishlist{wishCount > 0 ? ` (${wishCount})` : ""}
              </Link>
            </li>
            <li>
              <Link href="/cart" className="block px-2 py-2 rounded-md hover:bg-parchment no-underline" onClick={() => setMobileOpen(false)}>
                Cart{cartCount > 0 ? ` (${cartCount})` : ""}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
