"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/app/product/content";

type Props = {
  items: Product[];         // Use central Product shape
  title?: string;
  anchorId?: string;        // adds id + scroll margin for anchored jumps
};

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

const INTENTION_LABEL: Record<NonNullable<Product["intention"]>, string> = {
  "manifestation": "Manifestation",
  "love-self-love": "Love & Self-Love",
  "wealth-abundance": "Wealth & Abundance",
  "peace-healing": "Peace & Healing",
};

export default function ProductsGallery({ items, title, anchorId }: Props) {
  // preserve original order for "featured"
  const keyed = useMemo(() => items.map((p, i) => ({ p, i })), [items]);

  const intentionOptions = useMemo(() => {
    const set = new Set(
      items
        .map((p) => p.intention)
        .filter((v): v is NonNullable<Product["intention"]> => Boolean(v))
    );
    return ["All", ...Array.from(set)];
  }, [items]);

  const [intent, setIntent] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const base =
      intent === "All"
        ? keyed
        : keyed.filter(
            (k) =>
              k.p.intention &&
              k.p.intention.toString() === intent
          );

    const arr = [...base];
    switch (sortBy) {
      case "price-asc":
        arr.sort((a, b) => a.p.pricePence - b.p.pricePence);
        break;
      case "price-desc":
        arr.sort((a, b) => b.p.pricePence - a.p.pricePence);
        break;
      case "name-asc":
        arr.sort((a, b) => a.p.title.localeCompare(b.p.title));
        break;
      default:
        // featured = original order via index
        arr.sort((a, b) => a.i - b.i);
    }
    return arr.map((k) => k.p);
  }, [intent, sortBy, keyed]);

  return (
    <section id={anchorId} className={anchorId ? "scroll-mt-28" : undefined}>
      {title && (
        <header className="mb-4">
          <h2 className="text-xl font-medium">
            {title}{" "}
            <span className="opacity-60 text-sm">
              ({filtered.length}/{items.length})
            </span>
          </h2>
        </header>
      )}

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {intentionOptions.map((name) => {
            const active = intent === name;
            const label =
              name === "All"
                ? "All"
                : INTENTION_LABEL[name as keyof typeof INTENTION_LABEL] ?? name;
            return (
              <button
                key={name}
                onClick={() => setIntent(name)}
                className={
                  "rounded-full px-3 py-1.5 text-sm " +
                  (active
                    ? "bg-ink text-white"
                    : "bg-parchment ring-1 ring-ink/10 hover:text-gold")
                }
                aria-pressed={active}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div className="inline-flex items-center gap-2">
          <label htmlFor={`${anchorId ?? "gallery"}-sort`} className="text-sm opacity-70">
            Sort
          </label>
          <select
            id={`${anchorId ?? "gallery"}-sort`}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-md border border-ink/15 bg-white px-2 py-1.5 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.handle} product={p} variant="compact" />
        ))}
      </div>
    </section>
  );
}
