import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "../../../components/ProductCard";
import {
  getAllIntentions,
  getIntention,
  getProductsForIntention,
  type IntentionMeta,
} from "../../../data/products";

type Params = { params: { slug: IntentionMeta["slug"] } };

export function generateStaticParams() {
  return getAllIntentions().map((i) => ({ slug: i.slug }));
}

export default function IntentionPage({ params }: Params) {
  const meta = getIntention(params.slug);
  if (!meta) return notFound();

  const { candle, ritualBox, herbBox } = getProductsForIntention(params.slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* Header */}
      <header className="grid gap-6 md:grid-cols-[320px,1fr] items-center">
        <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-ink/10 bg-white">
          <Image
            src={meta.tile}
            alt={`${meta.name} tile`}
            fill
            className="object-contain p-4"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">{meta.name}</h1>
          <p className="text-sm opacity-80">{meta.excerpt}</p>
          <p className="text-sm opacity-80">{meta.long}</p>
          <div>
            <Link href="/collections" className="btn bg-white hover:bg-white hover:text-gold">
              Shop all
            </Link>
          </div>
        </div>
      </header>

      {/* Linked products */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium">Explore the ritual</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ritualBox && <ProductCard product={ritualBox} contain />}
          {candle && <ProductCard product={candle} contain />}
          {herbBox && <ProductCard product={herbBox} contain />}
        </div>
      </section>
    </main>
  );
}
