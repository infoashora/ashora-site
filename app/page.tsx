"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
  "/hero/hero5.jpg",
  "/hero/hero6.jpg",
];

const INTENTIONS = [
  {
    slug: "manifestation",
    title: "Manifestation",
    description: "Clarity · Confidence · New Beginnings",
    image: "/intention/manifestation.png",
  },
  {
    slug: "love-self-love",
    title: "Love & Self-Love",
    description: "Compassion · Connection · Self-Worth",
    image: "/intention/love-self-love.png",
  },
  {
    slug: "wealth-abundance",
    title: "Wealth & Abundance",
    description: "Opportunity · Expansion · Growth",
    image: "/intention/wealth-abundance.png",
  },
  {
    slug: "peace-healing",
    title: "Peace & Healing",
    description: "Stillness · Restoration · Reflection",
    image: "/intention/peace-healing.png",
  },
];

const FEATURED_INTENTIONS = INTENTIONS.slice(0, 3);

const BENEFITS = [
  "Vegan",
  "Eco-Conscious",
  "Hand-Poured",
  "Crystal Infused",
];

export default function Home() {
  const [activeImage, setActiveImage] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let fadeTimeout: number | undefined;

    const interval = window.setInterval(() => {
      setVisible(false);

      fadeTimeout = window.setTimeout(() => {
        setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
        setVisible(true);
      }, 500);
    }, 6500);

    return () => {
      window.clearInterval(interval);

      if (fadeTimeout !== undefined) {
        window.clearTimeout(fadeTimeout);
      }
    };
  }, []);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[430px] overflow-hidden bg-zinc-900 sm:min-h-[480px]">
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={HERO_IMAGES[activeImage]}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-black/28" />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.84)_24%,rgba(0,0,0,0.58)_44%,rgba(0,0,0,0.22)_68%,rgba(0,0,0,0.06)_100%)]" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />
        </div>

        <div className="relative mx-auto flex min-h-[430px] max-w-6xl items-end px-6 pb-10 pt-20 sm:min-h-[480px] sm:pb-12 sm:pt-24 lg:pb-14">
          <div className="w-full">
            <div className="border-y border-white/40 py-8 sm:py-10">
              <div className="max-w-[620px]">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f0d99f]">
                  A LITTLE MAGIC IN EVERY FLAME
                </p>

                <h1 className="mt-5 max-w-[620px] text-balance text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                  Every Candle Holds A Little Magic
                </h1>

                <p className="mt-5 max-w-md text-base font-medium leading-7 text-white">
                  ASHORA isn&apos;t just a brand — it&apos;s a service to the
                  soul.
                </p>

                <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <Link
                    href="/shop"
                    className="group inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-semibold text-white transition-colors hover:border-[#D1A954] hover:text-[#e2c779]"
                  >
                    Shop Intentional Candles
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>

                  <Link
                    href="/join"
                    className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-[#e2c779]"
                  >
                    Join ASHORA Circle
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-[2px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                Intentional Candles · Hand-Poured in Small Batches
              </p>

              <p className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:block">
                ASHORA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Intention */}
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:py-16">
          <div className="border-y border-zinc-300">
            <div className="grid gap-8 py-8 sm:py-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                  Begin Here
                </p>

                <h2 className="mt-4 max-w-md text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                  Not sure where to begin?
                </h2>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                <div className="space-y-4 text-base leading-7 text-zinc-600">
                  <p>
                    Every season of life asks something different from us.
                  </p>

                  <p>
                    Whether you&apos;re seeking clarity, calling in abundance,
                    opening your heart or creating space for peace, our guided
                    Intention Quiz helps you discover the candle that best
                    aligns with where you are today.
                  </p>

                  <p>
                    Rather than choosing for you, it simply helps you uncover
                    the intention that feels right for this chapter of your
                    journey.
                  </p>
                </div>

                <div className="flex flex-col justify-between border-l border-zinc-300 pl-6 lg:pl-8">
                  <p className="max-w-xs text-xl font-medium leading-8 tracking-tight text-zinc-900">
                    Discover the candle created for where you are today.
                  </p>

                  <Link
                    href="/quiz"
                    className="group mt-8 inline-flex w-fit items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
                  >
                    Find Your Intention
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Principles */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <ul className="grid grid-cols-2 border-x border-zinc-200 sm:grid-cols-4">
            {BENEFITS.map((benefit, index) => (
              <li
                key={benefit}
                className={`flex min-h-[68px] items-center justify-center px-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700 ${
                  index % 2 !== 0 ? "border-l border-zinc-200" : ""
                } ${
                  index > 1 ? "border-t border-zinc-200 sm:border-t-0" : ""
                } ${index > 0 ? "sm:border-l sm:border-zinc-200" : ""}`}
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Editor's Selection */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:py-16">
          <div className="grid gap-8 border-b border-zinc-300 pb-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b793d]">
                Editor&apos;s Selection
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Our Current Rituals
              </h2>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-md text-base leading-7 text-zinc-600">
                A curated selection of intentions chosen to support the moments
                people are embracing this season.
              </p>

              <Link
                href="/collections"
                className="group mt-5 inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
              >
                Explore All Intentions
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {FEATURED_INTENTIONS.map((intention, index) => (
              <Link
                key={intention.slug}
                href={`/intention/${intention.slug}`}
                className={`group mx-auto block w-full max-w-[270px] ${
                  index === 1 ? "md:translate-y-6" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#eee9df]">
                  <Image
                    src={intention.image}
                    alt={intention.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    sizes="(min-width: 768px) 270px, 100vw"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                  />
                </div>

                <div className="border-b border-zinc-300 pb-4 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                        Intention
                      </p>

                      <h3 className="mt-2 text-lg font-medium tracking-tight text-zinc-950">
                        {intention.title}
                      </h3>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-1 text-sm text-zinc-400 transition duration-300 group-hover:translate-x-1 group-hover:text-zinc-900"
                    >
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {intention.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-4xl border-t border-zinc-300 pt-7 md:mt-18">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-zinc-600">
                Looking for Peace &amp; Healing? Explore the complete Ashora
                intention collection.
              </p>

              <Link
                href="/intention/peace-healing"
                className="group inline-flex w-fit items-center gap-3 text-sm font-medium text-zinc-900"
              >
                Discover Peace &amp; Healing
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-zinc-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1A954]">
              More Than A Candle
            </p>

            <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Every ritual begins with intention.
            </h2>
          </div>

          <div className="max-w-2xl">
            <div className="space-y-4 text-base leading-7 text-zinc-300">
              <p>
                Ashora was created from the belief that the smallest rituals
                often become the most meaningful.
              </p>

              <p>
                Each candle is hand-poured in small batches using luxurious
                vegan soy wax and thoughtfully infused with crystals,
                botanicals and an affirmation card, creating moments of
                stillness, reflection and intention within everyday life.
              </p>

              <p className="font-medium text-[#D1A954]">
                We don&apos;t believe a candle changes your life.
              </p>

              <p className="font-medium text-[#D1A954]">
                We believe the moments you create around it can.
              </p>
            </div>

            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-medium text-white transition-colors hover:text-zinc-300"
            >
              Read Our Story
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}