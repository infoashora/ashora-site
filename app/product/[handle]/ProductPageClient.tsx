// app/product/[handle]/ProductPageClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { getProduct } from "../content";
import { useCart } from "../../components/CartProvider";

export default function ProductPageClient({ handle }: { handle: string }) {
  const product = useMemo(() => getProduct(handle), [handle]);
  const { add } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-zinc-600">
          This item isn’t available. <Link className="underline" href="/shop">Back to shop</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-zinc-200 bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">
              No image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="text-sm uppercase tracking-wide text-zinc-500">
            {product.badge ?? product.kind.replace("-", " ")}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{product.title}</h1>

          <div className="mt-3 text-xl font-semibold">{product.priceText}</div>

          {product.intention && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600">
              Intention: {product.intention.replace("-", " ")}
            </div>
          )}

          <button
            onClick={() => add(product.handle)}
            className="mt-6 h-12 rounded-md bg-amber-700 px-6 text-white transition hover:bg-amber-800"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>

          <div className="mt-6 text-sm text-zinc-600">
            <Link href="/shop" className="underline">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
