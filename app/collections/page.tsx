// app/collections/page.tsx
import ProductCard from "@/app/components/ProductCard";
import ShopByIntention from "@/app/components/ShopByIntention";
import { PRODUCTS } from "@/app/product/content";

export const metadata = {
  title: "Shop All | ASHORA",
  description:
    "Browse all ASHORA products—intention candles, ritual boxes, and herb boxes crafted for ritual.",
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <ShopByIntention />

      <section className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">
          All Products
        </h1>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
