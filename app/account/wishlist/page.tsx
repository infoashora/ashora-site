"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PRODUCTS, type Product } from "@/app/product/content";
import ProductCard from "@/components/ProductCard";

const KEY = "ashora:wishlist";

function readWishlist(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function WishlistPage() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const handles = readWishlist();
    const found = handles
      .map((h) => PRODUCTS.find((p) => p.handle === h))
      .filter(Boolean) as Product[];
    setItems(found);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-600">
        <Link href="/" className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800">
          Home
        </Link>{" "}
        / <span className="text-zinc-800">Wishlist</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Your Wishlist</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Save the pieces you love. Theyâ€™ll stay here until youâ€™re ready.
        </p>
      </header>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-700">
          Your wishlist is empty.{" "}
          <Link href="/shop" className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-900">
            Browse the collection
          </Link>
          .
        </div>
      )}
    </main>
  );
}
