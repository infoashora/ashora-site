"use client";

import type { Product } from "../data/products";
import { useWishlistStore } from "../lib/wishlist-store";

type Props = {
  product: Product;
  variant?: "icon" | "button";
  className?: string;
};

export default function WishlistButton({
  product,
  variant = "icon",
  className = "",
}: Props) {
  const items = useWishlistStore((s) => s.items);
  const toggle = useWishlistStore((s) => s.toggle);
  const saved = !!items[product.id];

  if (variant === "button") {
    return (
      <button
        onClick={() => toggle(product)}
        className={
          "btn inline-flex items-center gap-2 " +
          (saved
            ? "bg-parchment text-ink"
            : "bg-white text-ink ring-1 ring-ink/10 hover:text-gold") +
          (className ? " " + className : "")
        }
        aria-pressed={saved}
      >
        <HeartIcon saved={saved} className="h-4 w-4" />
        {saved ? "Saved" : "Save for later"}
      </button>
    );
  }

  // icon variant
  return (
    <button
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      onClick={(e) => {
        e.preventDefault(); // avoid triggering parent Link
        toggle(product);
      }}
      className={
        "h-9 w-9 grid place-items-center rounded-full bg-white/95 ring-1 ring-ink/10 shadow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold " +
        (className ? className : "")
      }
      aria-pressed={saved}
      title={saved ? "Saved" : "Save"}
    >
      <HeartIcon saved={saved} className="h-5 w-5" />
    </button>
  );
}

function HeartIcon({ saved, className = "" }: { saved: boolean; className?: string }) {
  // Professional, smooth heart (Material-esque). Fills when saved; outline when not.
  // Uses currentColor for easy theming.
  const colorClass = saved ? "text-gold" : "text-ink";
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${colorClass}`}
      aria-hidden
      style={{ vectorEffect: "non-scaling-stroke" }}
    >
      {/* outline path */}
      <path
        d="M12 21.35l-1.45-1.32C6 15.9 3 13.02 3 9.5 3 7.02 5.02 5 7.5 5c1.55 0 3.04.78 3.95 2.05a.75.75 0 0 0 1.1 0C13.46 5.78 14.95 5 16.5 5 18.98 5 21 7.02 21 9.5c0 3.52-3 6.4-7.55 10.53L12 21.35z"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={saved ? 0 : 1.6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
