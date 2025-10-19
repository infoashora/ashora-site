"use client";

import { useEffect, useState } from "react";

const KEY = "ashora:wishlist";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeWishlist(handles: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(handles));
  } catch {}
}

export default function WishlistButton({ handle }: { handle: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const all = readWishlist();
    setSaved(all.includes(handle));
  }, [handle]);

  function toggle() {
    const all = readWishlist();
    const next = all.includes(handle) ? all.filter(h => h !== handle) : [...all, handle];
    writeWishlist(next);
    setSaved(!saved);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={saved ? "Remove from wishlist" : "Add to wishlist"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white/95 text-zinc-900 shadow-sm backdrop-blur transition hover:border-[#D1A954] hover:text-[#D1A954] focus:outline-none focus:ring-2 focus:ring-[#D1A954]/30"
      aria-pressed={saved}
    >
      {/* Heart icon with internal padding so strokes don't clip */}
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        {saved ? (
          // Filled heart (Heroicons path, fits well within 24x24)
          <path
            d="M12.001 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.43 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.57 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53l-1.45 1.32z"
            fill="currentColor"
          />
        ) : (
          // Outline heart with stroke inside bounds
          <path
            d="M12.001 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.43 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.57 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53l-1.45 1.32z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
