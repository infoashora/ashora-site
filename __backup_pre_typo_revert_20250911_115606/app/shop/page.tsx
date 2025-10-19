import { products } from "../../data/products";
import ProductsGallery from "../../components/ProductsGallery";

export const metadata = {
  title: "Shop All | Ashora",
  description:
    "Explore every Ashora product â€” candles, ritual boxes, and herb boxes crafted with intention.",
};

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-20">
      <header className="pt-10 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Shop All</h1>
        <p className="opacity-70 text-sm max-w-prose">
          The full Ashora collection â€” hand-poured candles, complete ritual boxes, and
          intention-matched herb blends.
        </p>
      </header>

      <ProductsGallery items={products} />
    </main>
  );
}
