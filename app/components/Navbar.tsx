"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Item = {
  label: string;
  href: string;
};

const EXPLORE_ITEMS: Item[] = [
  {
    label: "Shop All",
    href: "/shop",
  },
  {
    label: "Candles",
    href: "/collection/candles",
  },
  {
    label: "Find Your Intention Quiz",
    href: "/quiz",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Ritual FAQ",
    href: "/faq/ritual",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!dropdownRef.current) {
        return;
      }

      if (!dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#fbfaf7]/95 backdrop-blur-md">
      <nav className="mx-auto grid min-h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        {/* Left Navigation */}
        <div className="flex items-center gap-7">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition-colors hover:text-[#9b793d] focus:outline-none"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <span className="hidden sm:inline">Explore ASHORA</span>
              <span className="sm:hidden">Explore</span>

              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <path
                  d="M2.25 4.25 6 8l3.75-3.75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {open && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-5 w-[280px] border border-zinc-200 bg-[#fffefa] shadow-[0_20px_50px_rgba(24,24,27,0.12)]"
              >
                <div className="border-b border-zinc-200 px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b793d]">
                    Discover ASHORA
                  </p>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Explore intentional candles, guided rituals and the story
                    behind the collection.
                  </p>
                </div>

                <ul className="py-2">
                  {EXPLORE_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between px-5 py-3 text-sm text-zinc-700 transition-colors hover:bg-[#f7f4ee] hover:text-zinc-950"
                      >
                        <span>{item.label}</span>

                        <span
                          aria-hidden="true"
                          className="text-xs text-zinc-300 transition duration-300 group-hover:translate-x-1 group-hover:text-[#9b793d]"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link
            href="/collections"
            className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition-colors hover:text-[#9b793d] lg:block"
          >
            Shop By Intention
          </Link>
        </div>

        {/* Centre Brand */}
        <div className="text-center leading-tight">
          <Link href="/" className="group block">
            <span className="block text-lg font-semibold tracking-[0.32em] text-zinc-950 transition-colors group-hover:text-[#9b793d] sm:text-xl">
              ASHORA
            </span>

            <span className="mt-1 hidden text-[9px] uppercase tracking-[0.16em] text-zinc-500 sm:block">
              The Seed To The Garden You Can Grow
            </span>
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/quiz"
            className="mr-2 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition-colors hover:text-[#9b793d] lg:block"
          >
            Start Quiz
          </Link>

          <Link
            href="/account/wishlist"
            title="Wishlist"
            aria-label="Wishlist"
            className="hidden h-9 w-9 items-center justify-center text-zinc-700 transition-colors hover:text-[#9b793d] sm:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            >
              <path
                d="M12.001 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.43 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.57 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53l-1.45 1.32z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link
            href="/join"
            title="Join ASHORA Circle"
            aria-label="Join ASHORA Circle"
            className="hidden h-9 w-9 items-center justify-center text-zinc-700 transition-colors hover:text-[#9b793d] sm:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
              />

              <circle
                cx="12"
                cy="9.5"
                r="2.75"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
              />

              <path
                d="M7 17.5c1.55-2 3.2-3 5-3s3.45 1 5 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          <Link
            href="/cart"
            title="Cart"
            aria-label="Cart"
            className="inline-flex h-9 items-center gap-2 border-l border-zinc-300 pl-3 text-zinc-800 transition-colors hover:text-[#9b793d] sm:pl-4"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            >
              <path
                d="M3.5 4.5h2l2.1 9.6a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L20.3 8H6.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle cx="10" cy="19" r="1.1" fill="currentColor" />
              <circle cx="18" cy="19" r="1.1" fill="currentColor" />
            </svg>

            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.15em] sm:inline">
              Cart
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}