import type { Metadata } from "next";
import Link from "next/link";

import {
  getLiveProductByHandle,
  getLiveRelatedProducts,
  type Product as AshoraProduct,
} from "@/app/product/live";
import { getProductStorytelling } from "@/app/product/storytelling";

import ProductHero from "../components/ProductHero";
import SectionDivider from "../components/SectionDivider";
import SectionReveal from "../components/SectionReveal";
import CandleCare from "../components/sections/CandleCare";
import EditorialLifestyle from "../components/sections/EditorialLifestyle";
import FinalThought from "../components/sections/FinalThought";
import InsideYourCandle from "../components/sections/InsideYourCandle";
import RelatedProducts from "../components/sections/RelatedProducts";
import ReviewSection from "../components/sections/ReviewSection";
import SmellsLike from "../components/sections/SmellsLike";
import WhyThisCandle from "../components/sections/WhyThisCandle";
import WhyYoullLoveIt from "../components/sections/WhyYoullLoveIt";
import YourRitual from "../components/sections/YourRitual";

type PageProps = {
  params: {
    handle: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

type NavigationItem = {
  label: string;
  href: string;
};

type EditorialImage = {
  image: string;
  alt: string;
};

const editorialImages: Record<string, EditorialImage> = {
  "manifestation-candle": {
    image: "/editorial/Manifestation-Editorial-03.png",
    alt: "Manifestation intention candle styled in a luxury editorial setting",
  },
  "love-self-love-candle": {
    image: "/editorial/Love-Editorial-02.png",
    alt: "Love and Self-Love intention candle styled in a soft luxury editorial setting",
  },
  "wealth-abundance-candle": {
    image: "/editorial/Wealth-Editorial-02.png",
    alt: "Wealth and Abundance intention candle styled in an elegant luxury editorial setting",
  },
  "peace-healing-candle": {
    image: "/editorial/Peace-Editorial-03.png",
    alt: "Peace and Healing intention candle styled in a calm luxury editorial setting",
  },
};

export async function generateMetadata({
  params,
}: {
  params: {
    handle: string;
  };
}): Promise<Metadata> {
  const product = (await getLiveProductByHandle(params.handle)) || null;

  const title = product
    ? `${product.title} · ASHORA`
    : "Product · ASHORA";

  const description = product
    ? `${product.title} — ASHORA`
    : "Intention-led candles by ASHORA.";

  return {
    title,
    description,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: PageProps) {
  const product = (await getLiveProductByHandle(params.handle)) || null;

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm text-zinc-600">Product not found.</p>

        <Link
          href="/shop"
          className="mt-4 inline-block text-zinc-800 underline underline-offset-4"
        >
          Back to shop
        </Link>
      </main>
    );
  }

  const suggestions: AshoraProduct[] = (
    await getLiveRelatedProducts(product.handle)
  ).slice(0, 3);

  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const imageCount = gallery.length;

  const selectedImageIndex = (() => {
    const raw = searchParams?.img;
    const value = Array.isArray(raw) ? raw[0] : raw;
    const index = Number(value);

    return Number.isFinite(index) && index >= 0 && index < imageCount
      ? index
      : 0;
  })();

  const storytelling = getProductStorytelling(product.handle);
  const editorialImage = editorialImages[product.handle];

  const navigationItems: NavigationItem[] = storytelling
    ? [
        {
          label: "Why This Candle",
          href: "#why-this-candle",
        },
        {
          label: "Inside Your Candle",
          href: "#inside-your-candle",
        },
        {
          label: "Why You'll Love It",
          href: "#why-youll-love-it",
        },
        {
          label: "Smells Like",
          href: "#smells-like",
        },
        {
          label: "Your Ritual",
          href: "#your-ritual",
        },
        {
          label: "Candle Care",
          href: "#candle-care",
        },
        ...(storytelling.reviews.reviews.length > 0
          ? [
              {
                label: "Reviews",
                href: "#reviews",
              },
            ]
          : []),
      ]
    : [];

  return (
    <main className="overflow-x-hidden">
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:py-16">
        <ProductHero
          product={product}
          gallery={gallery}
          selectedImageIndex={selectedImageIndex}
          navigationItems={navigationItems}
        />
      </section>

      {storytelling ? (
        <>
          <SectionReveal>
            <WhyThisCandle
              eyebrow={storytelling.whyThisCandle.eyebrow}
              heading={storytelling.whyThisCandle.heading}
              paragraphs={storytelling.whyThisCandle.paragraphs}
            />
          </SectionReveal>

          <SectionReveal>
            <SectionDivider />
          </SectionReveal>

          <SectionReveal>
            <InsideYourCandle
              eyebrow={storytelling.insideYourCandle.eyebrow}
              heading={storytelling.insideYourCandle.heading}
              introduction={storytelling.insideYourCandle.introduction}
              ingredients={storytelling.insideYourCandle.ingredients}
              waxDescription={storytelling.insideYourCandle.waxDescription}
              burnTime={storytelling.insideYourCandle.burnTime}
              affirmationCard={storytelling.insideYourCandle.affirmationCard}
            />
          </SectionReveal>

          <SectionReveal>
            <SectionDivider />
          </SectionReveal>

          <SectionReveal>
            <WhyYoullLoveIt
              eyebrow={storytelling.whyYoullLoveIt.eyebrow}
              heading={storytelling.whyYoullLoveIt.heading}
              points={storytelling.whyYoullLoveIt.points}
            />
          </SectionReveal>

          <SectionReveal>
            <SectionDivider />
          </SectionReveal>

          <SectionReveal>
            <SmellsLike
              eyebrow={storytelling.smellsLike.eyebrow}
              heading={storytelling.smellsLike.heading}
              notes={storytelling.smellsLike.notes}
              paragraphs={storytelling.smellsLike.paragraphs}
            />
          </SectionReveal>

          <SectionReveal>
            <SectionDivider />
          </SectionReveal>

          <SectionReveal>
            <YourRitual
              eyebrow={storytelling.ritual.eyebrow}
              heading={storytelling.ritual.heading}
              paragraphs={storytelling.ritual.paragraphs}
              closingLine={storytelling.ritual.closingLine}
            />
          </SectionReveal>

          {editorialImage && (
            <SectionReveal>
              <EditorialLifestyle
                image={editorialImage.image}
                alt={editorialImage.alt}
              />
            </SectionReveal>
          )}

          <SectionReveal>
            <SectionDivider />
          </SectionReveal>

          <SectionReveal>
            <CandleCare
              eyebrow={storytelling.candleCare.eyebrow}
              heading={storytelling.candleCare.heading}
              introduction={storytelling.candleCare.introduction}
              items={storytelling.candleCare.items}
              closingLine={storytelling.candleCare.closingLine}
            />
          </SectionReveal>

          {storytelling.reviews.reviews.length > 0 && (
            <>
              <SectionReveal>
                <SectionDivider />
              </SectionReveal>

              <SectionReveal>
                <ReviewSection
                  eyebrow={storytelling.reviews.eyebrow}
                  heading={storytelling.reviews.heading}
                  introduction={storytelling.reviews.introduction}
                  reviews={storytelling.reviews.reviews}
                />
              </SectionReveal>
            </>
          )}

          <SectionReveal>
            <SectionDivider />
          </SectionReveal>

          <SectionReveal>
            <RelatedProducts
              eyebrow={storytelling.relatedProducts.eyebrow}
              heading={storytelling.relatedProducts.heading}
              products={suggestions}
            />
          </SectionReveal>

          <SectionReveal>
            <FinalThought />
          </SectionReveal>
        </>
      ) : (
        <>
          <SectionReveal>
            <RelatedProducts
              heading="Explore more intention candles."
              products={suggestions}
            />
          </SectionReveal>

          <SectionReveal>
            <FinalThought />
          </SectionReveal>
        </>
      )}
    </main>
  );
}