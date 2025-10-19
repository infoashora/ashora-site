// app/cart/page.tsx
import Link from "next/link";
import CartPanel from "@/components/CartPanel";

export const metadata = {
  title: "Your Cart · ASHORA",
  description: "Review your items and proceed to checkout.",
};

export default function CartPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-600">
        <Link href="/" className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800">
          Home
        </Link>{" "}
        / <span className="text-zinc-800">Cart</span>
      </nav>

      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Your Cart</h1>

      {/* IMPORTANT: CartPanel contains the fixed Checkout logic that POSTs /api/checkout */}
      <CartPanel />
    </main>
  );
}
