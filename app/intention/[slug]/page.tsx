import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import { getLiveProductsByIntention, type Product as AshoraProduct } from "@/app/product/live";

type IntentionSlug =
  | "manifestation"
  | "love-self-love"
  | "wealth-abundance"
  | "peace-healing";

type PageProps = { params: { slug: IntentionSlug } };

const TITLES: Record<IntentionSlug, string> = {
  manifestation: "Manifestation",
  "love-self-love": "Love & Self-Love",
  "wealth-abundance": "Wealth & Abundance",
  "peace-healing": "Peace & Healing",
};

// (keep your existing INTENTION_COPY & BLURBS content here)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = TITLES[params.slug] ?? "Shop by Intention";
  const BLURBS: Record<IntentionSlug, string> = {
    manifestation: "Tools to amplify focus and call your desires into form.",
    "love-self-love": "Nurture compassion, connection, and self-worth.",
    "wealth-abundance": "Align with prosperity, opportunity, and growth.",
    "peace-healing": "Create space for calm, cleansing, and renewal.",
  };
  const description = BLURBS[params.slug as IntentionSlug] ?? "Intention-led ritual tools by ASHORA.";
  return {
    title: `${title} · ASHORA`,
    description,
  };
}

export default async function IntentionPage({ params }: PageProps) {
  const slug = params.slug;

  // Live products filtered by intention
  const products: AshoraProduct[] = await getLiveProductsByIntention(slug);
  const aligned = products.slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* paste your existing JSX sections here unchanged, using `aligned` for the grid */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {aligned.map((p) => (
          <ProductCard key={p.handle} product={p} variant="compact" />
        ))}
      </div>
    </main>
  );
}
