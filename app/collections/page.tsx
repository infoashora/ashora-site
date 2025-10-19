// app/collections/page.tsx
import ProductCard from "../../components/ProductCard";
import ShopByIntention from "../../components/ShopByIntention";
import { products } from "../../data/products";

export const metadata = {
  title: "Shop All | ASHORA",
  description:
    "Browse all ASHORA productsâ€”intention candles, ritual boxes, and herb boxes crafted for ritual.",
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
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
