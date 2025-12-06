import Link from "next/link";
import { getLiveProducts, type Product } from "@/app/product/live";
import ProductCard from "@/app/components/ProductCard";

const GOLD = "#D1A954";

export default async function ShopAllPage() {
  // Pull live products (overlays ./data/stock.json when present)
  const live = await getLiveProducts();

  // Order: candle → herb-box → ritual-box, then Title A–Z
  const orderMap: Record<Product["kind"], number> = {
    candle: 0,
    "herb-box": 1,
    "ritual-box": 2,
  };

  const items = live.slice().sort((a, b) => {
    const byKind = orderMap[a.kind] - orderMap[b.kind];
    if (byKind !== 0) return byKind;
    return a.title.localeCompare(b.title);
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-600">
        <Link
          href="/"
          className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
        >
          Home
        </Link>{" "}
        / <span className="text-zinc-800">Shop All</span>
      </nav>

      {/* Header */}
      <header className="mt-3 mb-4">
        <h1 className="font-cormorant text-3xl font-semibold tracking-tight">
          Shop All
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Luxe, intentional pieces — kept close and curated.
        </p>

        <div
          className="mt-4 h-px w-full rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          }}
          aria-hidden
        />
      </header>

      {/* Grid with subtle golden particles */}
      <section className="relative mt-4">
        {/* Floating golden particles layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="shop-sparkle-container">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="shop-sparkle" />
            ))}
          </div>
        </div>

        {/* Actual product grid */}
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      {/* Seasonal note */}
      <section className="mt-8 border-t border-zinc-200 pt-4 text-center text-xs text-zinc-600">
        Christmas season offer: 10% off Intention Candles when you buy two or
        more. Discount is applied automatically at checkout.
      </section>
    </main>
  );
}
