import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import {
  type Product as AshoraProduct,
} from "@/app/product/live";

import AddToCartButton from "@/app/components/AddToCartButton";
import ProductNavigation from "@/app/product/components/ProductNavigation";
import SwipeGallery from "@/app/product/components/SwipeGallery";

const GOLD = "#B99752";
const DEEP_GOLD = "#9D7B38";
const SOFT_GOLD = "#F7F1E5";

type NavigationItem = {
  label: string;
  href: string;
};

type ProductHeroProps = {
  product: AshoraProduct;
  gallery: string[];
  selectedImageIndex: number;
  navigationItems?: NavigationItem[];
};

type TrustItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const trustItems: TrustItem[] = [
  {
    title: "Hand-Poured",
    description: "Made in small batches in Essex",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 4h6M10 4v3h4V4M8 8h8v11H8V8Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11c1.4 1.4 1.8 2.4 1.8 3.2A1.8 1.8 0 0 1 12 16a1.8 1.8 0 0 1-1.8-1.8c0-.8.4-1.8 1.8-3.2Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Vegan Soy Wax",
    description: "A clean and considered burn",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M19 5c-6 .3-10.2 3.5-10.2 8.2 0 2.8 1.8 4.8 4.3 4.8 4.2 0 6.2-4.8 5.9-13Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 19c2.3-4.4 5.5-7.5 10-9.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Crystal Infused",
    description: "Created with intentional energy",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m12 3 5 5-2 11H9L7 8l5-5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="m7 8 5 3 5-3M12 11v8"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Ritual Card",
    description: "An affirmation card is included",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="5"
          y="4"
          width="14"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M8 9h8M8 12h8M8 15h5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const defaultNavigationItems: NavigationItem[] = [
  { label: "Why This Candle", href: "#why-this-candle" },
  { label: "Inside Your Candle", href: "#inside-your-candle" },
  { label: "Why You'll Love It", href: "#why-youll-love-it" },
  { label: "Smells Like", href: "#smells-like" },
  { label: "Your Ritual", href: "#your-ritual" },
  { label: "Candle Care", href: "#candle-care" },
];

export default function ProductHero({
  product,
  gallery,
  selectedImageIndex,
  navigationItems = defaultNavigationItems,
}: ProductHeroProps) {
  const soldOut = !product.stock || product.stock <= 0;
  const priceGBP = (product.pricePence / 100).toFixed(2);

  const joinHref = `/join?product=${encodeURIComponent(
    product.handle
  )}&title=${encodeURIComponent(product.title)}`;

  const goldStyle = {
    ["--gold" as string]: GOLD,
    ["--deep-gold" as string]: DEEP_GOLD,
    ["--soft-gold" as string]: SOFT_GOLD,
  } as CSSProperties;

  return (
    <section
      className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:gap-16 xl:gap-20"
      style={goldStyle}
    >
      <div className="min-w-0">
        <SwipeGallery
          handle={product.handle}
          title={product.title}
          images={gallery}
          index={selectedImageIndex}
          outerClassName={soldOut ? "opacity-75 grayscale" : ""}
        />
      </div>

      <div className="flex min-w-0 flex-col lg:sticky lg:top-28">
        <div className="flex flex-wrap items-center gap-2">
          {product.intention && (
            <span className="inline-flex items-center rounded-full border border-[var(--gold)]/40 bg-[var(--soft-gold)] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--deep-gold)]">
              {product.intention.replaceAll("-", " ")}
            </span>
          )}

          {soldOut && (
            <span className="inline-flex items-center rounded-full bg-zinc-900 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
              Sold out
            </span>
          )}

          {!soldOut &&
            typeof product.stock === "number" &&
            product.stock <= 5 && (
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-amber-900">
                Only {product.stock} left
              </span>
            )}
        </div>

        <div className="mt-6 border-b border-zinc-200 pb-7">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.32em] text-zinc-400">
            ASHORA Intention Candle
          </p>

          <h1 className="max-w-2xl font-cormorant text-[2.75rem] font-medium leading-[0.98] tracking-[-0.025em] text-zinc-900 sm:text-6xl lg:text-[4rem]">
            {product.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <p className="font-cormorant text-3xl font-medium tracking-tight text-zinc-900">
              £{priceGBP}
            </p>

            <p className="pb-1 text-xs tracking-wide text-zinc-500">
              Shipping calculated at checkout
            </p>
          </div>
        </div>

        <div className="mt-7">
          {soldOut ? (
            <Link
              href={joinHref}
              aria-label={`Join ASHORA Circle for restock updates on ${product.title}`}
              className="flex min-h-14 w-full items-center justify-center rounded-sm border border-zinc-300 bg-zinc-100 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 transition duration-300 hover:border-zinc-900 hover:bg-white hover:text-zinc-900"
            >
              Join our circle for restock updates
            </Link>
          ) : (
            <AddToCartButton
              handle={product.handle}
              stock={product.stock}
              className="min-h-14 w-full rounded-sm border border-[var(--gold)] bg-[var(--gold)] px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_32px_rgba(185,151,82,0.2)] transition duration-300 hover:border-[var(--deep-gold)] hover:bg-[var(--deep-gold)] hover:shadow-[0_16px_38px_rgba(157,123,56,0.24)]"
              style={goldStyle}
            />
          )}
        </div>

        {!soldOut && typeof product.stock === "number" && (
          <div className="mt-3 flex items-center justify-center gap-2 text-center">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
              aria-hidden="true"
            />

            <p className="text-[11px] tracking-wide text-zinc-500">
              {product.stock} candles currently available
            </p>
          </div>
        )}

        <div className="mt-9 grid grid-cols-2 gap-3">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="group flex min-h-32 flex-col justify-between rounded-sm border border-zinc-200 bg-[#FCFBF8] p-4 transition duration-300 hover:border-[var(--gold)]/50 hover:bg-white hover:shadow-[0_12px_30px_rgba(24,24,27,0.05)] sm:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-white text-[var(--gold)] transition duration-300 group-hover:border-[var(--gold)]">
                {item.icon}
              </span>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-800">
                  {item.title}
                </p>

                <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {navigationItems.length > 0 && (
          <ProductNavigation items={navigationItems} />
        )}

        <Link
          href="/shop"
          className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 transition hover:text-[var(--deep-gold)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m15 6-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Continue Shopping
        </Link>
      </div>
    </section>
  );
}