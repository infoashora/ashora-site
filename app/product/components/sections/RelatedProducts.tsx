import type { Product as AshoraProduct } from "@/app/product/live";

import ProductCard from "@/app/components/ProductCard";

type RelatedProductsProps = {
  eyebrow?: string;
  heading: string;
  products: AshoraProduct[];
};

export default function RelatedProducts({
  eyebrow = "You May Also Like",
  heading,
  products,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      id="related-products"
      className="scroll-mt-28 border-t border-zinc-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="flex flex-col gap-6 border-b border-zinc-200 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#B99752]">
              {eyebrow}
            </p>

            <h2 className="mt-5 max-w-2xl font-cormorant text-4xl font-medium leading-tight tracking-[-0.02em] text-zinc-900 sm:text-5xl">
              {heading}
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-zinc-500">
            Discover another intention candle created to support your rituals,
            reflection and everyday wellbeing.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.handle}
              product={product}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
}