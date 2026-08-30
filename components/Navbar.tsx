"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function getStoredCount(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const value = window.localStorage.getItem("ashora:cartCount");

  return value ? Math.max(0, parseInt(value, 10) || 0) : 0;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCount(getStoredCount());

    const handleAdd = (event: Event) => {
      const customEvent = event as CustomEvent<{ qty?: number }>;
      const quantity = Math.max(1, customEvent.detail?.qty ?? 1);
      const nextCount = getStoredCount() + quantity;

      window.localStorage.setItem(
        "ashora:cartCount",
        String(nextCount)
      );

      setCount(nextCount);
    };

    const handleSet = (event: Event) => {
      const customEvent = event as CustomEvent<{ count: number }>;
      const nextCount = Math.max(0, customEvent.detail.count);

      window.localStorage.setItem(
        "ashora:cartCount",
        String(nextCount)
      );

      setCount(nextCount);
    };

    window.addEventListener(
      "ashora:cart:add",
      handleAdd as EventListener
    );

    window.addEventListener(
      "ashora:cart:set",
      handleSet as EventListener
    );

    return () => {
      window.removeEventListener(
        "ashora:cart:add",
        handleAdd as EventListener
      );

      window.removeEventListener(
        "ashora:cart:set",
        handleSet as EventListener
      );
    };
  }, []);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!open) {
        return;
      }

      const target = event.target as Node;

      if (
        desktopMenuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleDocumentClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-[#FAF8F4]/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-2 sm:px-6">
        <div className="justify-self-start">
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex items-center gap-2 px-1 text-sm font-medium text-zinc-800 transition hover:text-[#D1A954]"
            title="Explore ASHORA"
          >
            Explore ASHORA

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
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

        <div className="justify-self-center text-center">
          <Link
            href="/"
            aria-label="ASHORA"
            className="group block leading-none"
            title="ASHORA — Home"
          >
            <span className="block text-lg font-semibold tracking-[0.45em] text-zinc-900 transition group-hover:text-[#D1A954] sm:text-xl">
              A&nbsp;S&nbsp;H&nbsp;O&nbsp;R&nbsp;A
            </span>

            <span className="mt-0.5 block text-[11px] leading-tight text-zinc-600 transition group-hover:text-[#D1A954] sm:text-xs">
              The Seed To The Garden You Can Grow
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-self-end gap-2">
          <button
            type="button"
            aria-label="Open Cart"
            title="Cart"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new Event("ashora:cart:open")
                );
              }
            }}
            className="relative inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:border-[#D1A954] hover:text-[#D1A954]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M6 6h14l-1.4 8.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.5L5 4H3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />

              <circle
                cx="9.5"
                cy="20"
                r="1"
                fill="currentColor"
              />

              <circle
                cx="17"
                cy="20"
                r="1"
                fill="currentColor"
              />
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
                  type="button"
                  className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs transition hover:border-[#D1A954] hover:text-[#D1A954]"
                  onClick={() => setOpen(false)}
                  aria-label="Close Explore"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-1">
                <MenuLink
                  onNavigate={() => setOpen(false)}
                  href="/shop"
                  label="Shop All"
                />

                <MenuLink
                  onNavigate={() => setOpen(false)}
                  href="/collection/candles"
                  label="Candles"
                />

                <MenuLink
                  onNavigate={() => setOpen(false)}
                  href="/quiz"
                  label="Find Your Intention Quiz"
                />

                <MenuLink
                  onNavigate={() => setOpen(false)}
                  href="/faq"
                  label="FAQ"
                />

                <MenuLink
                  onNavigate={() => setOpen(false)}
                  href="/about"
                  label="About"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative mx-auto hidden max-w-6xl px-4 sm:block sm:px-6">
        {open && (
          <div
            ref={desktopMenuRef}
            role="menu"
            aria-label="Explore ASHORA"
            className="absolute left-0 top-0 mt-1 w-[min(92vw,22rem)] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl"
          >
            <div className="grid gap-1 p-2 text-sm">
              <MenuLink
                href="/shop"
                label="Shop All"
              />

              <MenuLink
                href="/collection/candles"
                label="Candles"
              />

              <MenuLink
                href="/quiz"
                label="Find Your Intention Quiz"
              />

              <MenuLink
                href="/faq"
                label="FAQ"
              />

              <MenuLink
                href="/about"
                label="About"
              />
            </div>

            <div className="border-t border-zinc-200 bg-zinc-50/50 px-3 py-2 text-xs text-zinc-600">
              Explore ASHORA — Vegan, Eco-Conscious,
              Spiritual-Meets-Luxury
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

      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
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