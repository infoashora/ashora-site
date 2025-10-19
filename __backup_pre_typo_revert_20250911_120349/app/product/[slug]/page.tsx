import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Price from "../../../components/Price";
import {
  products,
  getProduct,
  getAllIntentions,
  getProductsForIntention,
  type IntentionMeta,
} from "../../../data/products";

const AddToCartButton = dynamic(
  () => import("../../../components/AddToCartButton"),
  { ssr: false }
);
const ProductCardClient = dynamic(
  () => import("../../../components/ProductCard"),
  { ssr: false }
);
const WishlistButton = dynamic(
  () => import("../../../components/WishlistButton"),
  { ssr: false }
);

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  const intentionMeta = getAllIntentions().find((i) => i.name === product.intention);
  const herbBox =
    intentionMeta && getProductsForIntention(intentionMeta.slug as IntentionMeta["slug"]).herbBox;

  const img = product.images[0];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-ink/10 bg-white">
          <Image src={img} alt={product.name} fill className="object-contain p-6" priority />
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>

          <div className="flex items-center gap-3">
            <Price amount={product.price} />
            <span className="text-xs opacity-70">incl. VAT</span>
          </div>

          <p className="text-sm opacity-85 max-w-prose">{product.description}</p>

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl border border-ink/10 bg-white p-3">
              <p className="opacity-60 text-xs">Wax</p>
              <p>{product.waxColor}</p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-white p-3">
              <p className="opacity-60 text-xs">Crystals</p>
              <p>{product.crystals.join(", ")}</p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-white p-3">
              <p className="opacity-60 text-xs">Herbs</p>
              <p>{product.herbs.join(", ")}</p>
            </div>
          </div>

          <p className="text-xs opacity-70">
            Includes ritual card + herb pouch. CLP-compliant safety labelling beneath each candle.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <AddToCartButton product={product} />
            <WishlistButton product={product} variant="button" />
            <Link href="/collections" className="btn bg-parchment hover:text-gold no-underline">
              Continue shopping
            </Link>
          </div>

          <ul className="text-xs opacity-80 grid grid-cols-2 gap-2 pt-3">
            <li>✓ Vegan & eco-conscious</li>
            <li>✓ Hand-poured in small batches</li>
            <li>✓ Herbs & crystals curated with intention</li>
            <li>✓ CLP-compliant labelling</li>
          </ul>
        </div>
      </div>

      {herbBox && (
        <>
          <div className="my-12 h-px bg-ink/5" />
          <section className="space-y-4">
            <h2 className="text-xl font-medium">Complete the ritual</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProductCardClient product={herbBox} contain />
            </div>
          </section>
        </>
      )}
    </main>
  );
}
