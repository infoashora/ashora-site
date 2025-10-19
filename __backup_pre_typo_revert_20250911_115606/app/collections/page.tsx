import { products } from "../../data/products";
import Link from "next/link";
import ProductsGallery from "../../components/ProductsGallery";

export const metadata = {
  title: "Shop All | Ashora",
  description:
    "Explore Ashoraâ€™s intentional collection â€” Candles, Ritual Boxes, and Herb Boxes crafted with herbs & crystals.",
};

export default function CollectionsPage() {
  const candles = products.filter((p) => p.id.startsWith("candle-"));
  const ritualBoxes = products.filter((p) => p.id.startsWith("ritual-"));
  const herbBoxes = products.filter((p) => p.id.startsWith("herb-"));

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20">
      {/* Page title */}
      <header className="pt-10 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">All Products</h1>
        <p className="opacity-70 text-sm max-w-prose">
          Intentional pieces for your practice â€” hand-poured candles, complete ritual boxes,
          and curated herb blends.
        </p>
      </header>

      {/* Sticky sub-nav */}
      <nav
        aria-label="Shop sections"
        className="sticky top-16 z-40 -mx-6 px-6 py-3 bg-parchment/90 backdrop-blur border-y border-ink/5"
      >
        <ul className="flex flex-wrap items-center gap-4 text-sm">
          <li><a href="#candles" className="no-underline hover:text-gold">Candles</a></li>
          <li><a href="#ritual-boxes" className="no-underline hover:text-gold">Ritual Boxes</a></li>
          <li><a href="#herb-boxes" className="no-underline hover:text-gold">Herb Boxes</a></li>
          <li className="ml-auto">
            <Link href="/#intentions" className="no-underline hover:text-gold">
              Choose your intention â†’
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sections with their own filters/sorting */}
      <div className="pt-10 space-y-12">
        <ProductsGallery items={candles} title="Candles" anchorId="candles" />
        <div className="my-2 h-px bg-ink/5" />
        <ProductsGallery items={ritualBoxes} title="Ritual Boxes" anchorId="ritual-boxes" />
        <div className="my-2 h-px bg-ink/5" />
        <ProductsGallery items={herbBoxes} title="Herb Boxes" anchorId="herb-boxes" />
      </div>
    </main>
  );
}
