"use client";

import CartPanel from "../../components/CartPanel";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Your Cart</h1>
      <CartPanel />
    </main>
  );
}
