import Link from "next/link";
import Image from "next/image";
import HeroSlideshow from "../components/HeroSlideshow";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const featured = products;

  return (
    <>
      <HeroSlideshow />

      {/* Choose your intention (original look & images) */}
      <section id="intentions" className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-cormorant font-semibold tracking-tight">
            Choose your intention
          </h2>
          <Link href="/quiz" className="no-underline text-sm hover:text-gold">
            Not sure? Take the quiz â†’
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Manifestation */}
          <Link href="/intentions/manifestation" className="group block no-underline rounded-2xl overflow-hidden ring-1 ring-ink/10 bg-white">
            <div className="relative aspect-square">
              <Image
                src="/link-cards/Manifestation Link Image (2).png"
                alt="Manifestation"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="px-4 pb-4">
              <h3 className="font-cormorant text-lg font-semibold">Manifestation</h3>
              <p className="text-sm opacity-80">Transform your dreams into reality with our Manifestation collection.</p>
            </div>
          </Link>

          {/* Love & Self Love */}
          <Link href="/intentions/love" className="group block no-underline rounded-2xl overflow-hidden ring-1 ring-ink/10 bg-white">
            <div className="relative aspect-square">
              <Image
                src="/link-cards/Love & Self Love Link Image (2).png"
                alt="Love & Self Love"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="px-4 pb-4">
              <h3 className="font-cormorant text-lg font-semibold">Love &amp; Self Love</h3>
              <p className="text-sm opacity-80">Embrace the love you deserve with our Love & Self-Love collection.</p>
            </div>
          </Link>

          {/* Wealth & Abundance */}
          <Link href="/intentions/wealth" className="group block no-underline rounded-2xl overflow-hidden ring-1 ring-ink/10 bg-white">
            <div className="relative aspect-square">
              <Image
                src="/link-cards/Wealth & Abundance Link Image (2).png"
                alt="Wealth & Abundance"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="px-4 pb-4">
              <h3 className="font-cormorant text-lg font-semibold">Wealth &amp; Abundance</h3>
              <p className="text-sm opacity-80">Unlock your prosperity potential with our Wealth & Abundance collection.</p>
            </div>
          </Link>

          {/* Peace & Healing */}
          <Link href="/intentions/peace" className="group block no-underline rounded-2xl overflow-hidden ring-1 ring-ink/10 bg-white">
            <div className="relative aspect-square">
              <Image
                src="/link-cards/Peace & Healing Link Image (2).png"
                alt="Peace & Healing"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="px-4 pb-4">
              <h3 className="font-cormorant text-lg font-semibold">Peace &amp; Healing</h3>
              <p className="text-sm opacity-80">Find your inner sanctuary with our Peace & Healing collection.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="text-2xl md:text-3xl font-cormorant font-semibold tracking-tight">Featured</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} contain />
          ))}
        </div>
      </section>
    </>
  );
}
