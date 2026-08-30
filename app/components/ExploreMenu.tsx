"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ExploreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const itemClass =
    "px-4 py-2 transition hover:bg-zinc-50 hover:text-[#D1A954]";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="cursor-pointer text-sm text-zinc-800 transition hover:text-[#D1A954]"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Explore ASHORA
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 mt-2 w-56 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg"
          onClick={() => setOpen(false)}
        >
          <nav className="flex flex-col text-sm">
            <Link
              href="/shop"
              className={itemClass}
            >
              Shop All
            </Link>

            <Link
              href="/collection/candles"
              className={itemClass}
            >
              Candles
            </Link>

            <Link
              href="/quiz"
              className={itemClass}
            >
              Find Your Intention Quiz
            </Link>

            <Link
              href="/faq"
              className={itemClass}
            >
              FAQ
            </Link>

            <Link
              href="/about"
              className={itemClass}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}