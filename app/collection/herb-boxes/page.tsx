import Link from "next/link";
import { PRODUCTS, type Product } from "@/app/product/content";

const TITLE = "Herb Boxes";
const SUB = "Intention-aligned herb blends with crystal chips in a pouch.";

function imgFor(p: Product) {
  const map: Record<string, string> = {
    "manifestation": "/intention/manifestation.jpg",
    "love-self-love": "/intention/love-self-love.jpg",
    "wealth-abundance": "/intention/wealth-abundance.jpg",
    "peace-healing": "/intention/peace-healing.jpg",
  };
  // Prefer explicit product images; fall back to intention image; final fallback to hero
  return p.image || p.images?.[0] || (p.intention ? map[p.intention] : undefined) || "/hero/ashora-hero-1.jpg";
}

const KIND_LABEL: Record<Product["kind"], string> = {
  "candle": "Candle",
  "herb-box": "Herb Box",
  "ritual-box": "Ritual Box",
};

export default function HerbBoxesCollectionPage() {
  // match your Product.kind union ('herb-box' in lowercase)
  const items = PRODUCTS.filter((p) => p.kind === "herb-box");

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <nav className="text-sm text-zinc-600">
        <Link
          href="/"
          className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
        >
          Home
        </Link>
        {" / "}
        <span className="text-zinc-800">{TITLE}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{TITLE}</h1>
        <p className="mt-1 text-sm text-zinc-600">{SUB}</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Link
            key={p.handle}
            href={`/product/${p.handle}`}
            className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-[#D1A954] hover:shadow-md"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={imgFor(p)}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                {KIND_LABEL[p.kind]}
              </div>
              <h3 className="mt-1 line-clamp-1 font-medium text-zinc-900">{p.title}</h3>
              {p.priceText && (
                <div className="mt-1 text-sm text-zinc-700">{p.priceText}</div>
              )}
              <div className="mt-2 text-sm text-zinc-600 transition group-hover:text-[#D1A954]">
                View details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
