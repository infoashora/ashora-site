import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">Checkout cancelled</h1>
      <p className="mt-2 text-zinc-600">No worries â€” your cart is saved.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link
          href="/cart"
          className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-[#D1A954] hover:text-[#D1A954] focus:outline-none focus:ring-2 focus:ring-[#D1A954]/30"
        >
          Return to Cart
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-md border border-transparent px-3 py-2 text-sm text-zinc-700 underline decoration-amber-300 underline-offset-4"
        >
          Browse Collection
        </Link>
      </div>
    </main>
  );
}
