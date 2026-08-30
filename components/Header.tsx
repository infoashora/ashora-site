// components/Header.tsx
"use client";

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { CartContext } from "@/app/components/CartProvider";

const GOLD = "#D1A954";

function BagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M7 9V7a5 5 0 0110 0v2M5.5 9h13l-.9 10.2a2 2 0 01-2 1.8H8.4a2 2 0 01-2-1.8L5.5 9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" {...props}>
      <path
        d="M2.25 4.25 6 8l3.75-3.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MENU_ITEMS = [
  {
    label: "Shop Candles",
    href: "/shop",
  },
  {
    label: "Find Your Intention",
    href: "/quiz",
  },
  {
    label: "Explore Intentions",
    href: "/collections",
  },
  {
    label: "Our Story",
    href: "/about",
  },
  {
    label: "Candle & Ritual FAQs",
    href: "/ritual-faqs",
  },
  {
    label: "Custom Orders",
    href: "/custom-orders",
  },
];

export default function Header() {
  const cart = useContext(CartContext);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  function go(href: string) {
    try {
      router.push(href);

      window.setTimeout(() => {
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== href
        ) {
          window.location.assign(href);
        }
      }, 0);
    } catch {
      if (typeof window !== "undefined") {
        window.location.assign(href);
      }
    }
  }

  useEffect(() => {
    if (!cart) {
      setCount(0);
      return;
    }

    setCount(cart.items.reduce((total, item) => total + item.qty, 0));
  }, [cart?.items]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!open) {
        return;
      }

      const target = event.target as Node;

      if (
        menuButtonRef.current?.contains(target) ||
        desktopMenuRef.current?.contains(target) ||
        mobileMenuRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
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
  }, [open]);

  return (
    <header
      className="sticky top-0 z-[9999] border-b border-zinc-200 bg-[#fbfaf7]/95 backdrop-blur-md"
      style={{ willChange: "transform" }}
    >
      <div className="mx-auto grid min-h-[70px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        {/* Left Navigation */}
        <div className="relative justify-self-start">
          <button
            ref={menuButtonRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition-colors hover:text-[#9b793d] focus:outline-none"
            title="Explore ASHORA"
          >
            <span className="hidden sm:inline">Explore ASHORA</span>
            <span className="sm:hidden">Explore</span>

            <ChevronDownIcon
              className={`h-3 w-3 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Desktop Menu */}
          {open && (
            <div
              ref={desktopMenuRef}
              role="menu"
              className="absolute left-0 top-full mt-4 hidden w-[320px] border border-zinc-200 bg-[#fffefa] shadow-[0_22px_55px_rgba(24,24,27,0.13)] sm:block"
            >
              <div className="border-b border-zinc-200 px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b793d]">
                  Discover ASHORA
                </p>

                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Explore intentional candles and discover the ritual that
                  feels right for you.
                </p>
              </div>

              <div className="py-1.5">
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setOpen(false);
                      go(item.href);
                    }}
                    className="group flex w-full items-center justify-between gap-5 px-5 py-3 text-left transition-colors hover:bg-[#f7f4ee]"
                  >
                    <span className="text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-950">
                      {item.label}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-sm text-zinc-300 transition duration-300 group-hover:translate-x-1 group-hover:text-[#9b793d]"
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Centre Brand */}
        <div className="-translate-y-px justify-self-center text-center leading-none">
          <Link
            href="/"
            aria-label="ASHORA homepage"
            className="group block"
            prefetch={false}
          >
            <span className="block text-lg font-semibold tracking-[0.32em] text-zinc-950 transition-colors group-hover:text-[#9b793d] sm:text-xl">
              ASHORA
            </span>

            <span className="mt-1.5 hidden text-[9px] uppercase tracking-[0.14em] text-zinc-500 transition-colors group-hover:text-zinc-700 sm:block">
              The Seed To The Garden You Can Grow
            </span>
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center justify-self-end gap-3">
          <Link
            href="/quiz"
            className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition-colors hover:text-[#9b793d] lg:block"
          >
            Start Quiz
          </Link>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-zinc-300 lg:block"
          />

          <button
            type="button"
            onClick={() => go("/join")}
            className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition-colors hover:text-[#9b793d] md:block"
            title="Join ASHORA Circle"
            aria-label="Join ASHORA Circle"
          >
            Join
          </button>

          <button
            type="button"
            onClick={() => go("/cart")}
            className="relative inline-flex items-center gap-2 text-zinc-800 transition-colors hover:text-[#9b793d]"
            title="Cart"
            aria-label="Cart"
          >
            <BagIcon className="h-[19px] w-[19px]" />

            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] sm:inline">
              Cart
            </span>

            {count > 0 && (
              <span className="absolute -right-2.5 -top-2 inline-flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#D1A954] px-1 text-[9px] font-semibold leading-none text-zinc-950">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={mobileMenuRef}
          role="menu"
          aria-label="Explore ASHORA"
          className="border-t border-zinc-200 bg-[#fffefa] shadow-xl sm:hidden"
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                  Discover ASHORA
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Explore the collection and find your intention.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600 transition-colors hover:text-[#9b793d]"
                aria-label="Close Explore menu"
              >
                Close
              </button>
            </div>

            <div className="divide-y divide-zinc-200">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    go(item.href);
                  }}
                  className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-sm font-medium text-zinc-900">
                    {item.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-sm text-zinc-400 transition duration-300 group-hover:translate-x-1 group-hover:text-[#9b793d]"
                  >
                    →
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  go("/join");
                }}
                className="border border-zinc-300 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-800 transition-colors hover:border-[#D1A954] hover:text-[#9b793d]"
              >
                Join ASHORA
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  go("/cart");
                }}
                className="inline-flex items-center justify-center gap-2 border border-zinc-300 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-800 transition-colors hover:border-[#D1A954] hover:text-[#9b793d]"
              >
                <BagIcon className="h-4 w-4" />
                Cart {count > 0 ? `(${count})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}