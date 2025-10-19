"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const images = [
    "/hero/ashora-hero-1.jpg",
    "/hero/ashora-hero-2.jpg",
    "/hero/ashora-hero-3.jpg",
    "/hero/ashora-hero-4.jpg",
    "/hero/ashora-hero-5.jpg",
    "/hero/ashora-hero-6.jpg",
  ];

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 6000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-[background-image] duration-700"
          style={{ backgroundImage: `url(${images[idx]})` }}
        />
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-28">
          <h1 className="magic-heading text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Every Candle Holds A Little Magic
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-white/90">
            ASHORA Isn’t Just A Brand Or Product — It’s A Service To The Soul.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-md border border-white/70 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-[#D1A954] hover:bg-[#D1A954]/15 focus:outline-none focus:ring-2 focus:ring-[#D1A954]/50 active:bg-[#D1A954]/25 hover:shadow-[0_0_18px_3px_rgba(209,169,84,0.35)] active:shadow-[0_0_22px_5px_rgba(209,169,84,0.5)]"
            >
              Shop Candles
            </Link>
            <Link
              href="/join"
              className="rounded-md border border-white/70 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:border-[#D1A954] hover:bg-[#D1A954]/10 focus:outline-none focus:ring-2 focus:ring-[#D1A954]/50 active:bg-[#D1A954]/20 hover:shadow-[0_0_18px_3px_rgba(209,169,84,0.35)] active:shadow-[0_0_22px_5px_rgba(209,169,84,0.5)]"
            >
              Join ASHORA Circle
            </Link>
          </div>
        </div>

        <style jsx>{`
          .magic-heading {
            transition: text-shadow 200ms ease, -webkit-text-stroke-color 200ms ease;
            text-rendering: optimizeLegibility;
          }
          .magic-heading:hover {
            text-shadow: 0 0 6px rgba(209, 169, 84, 0.4), 0 0 14px rgba(209, 169, 84, 0.35), 0 0 28px rgba(209, 169, 84, 0.25);
            -webkit-text-stroke: 0.6px rgba(209, 169, 84, 0.9);
            text-stroke: 0.6px rgba(209, 169, 84, 0.9);
          }
        `}</style>
      </section>

      {/* Benefits */}
      <section className="border-y border-zinc-200 bg-white/70">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-6 py-4 text-center text-sm text-zinc-700 sm:grid-cols-4">
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-2">Vegan</li>
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-2">Eco-Conscious</li>
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-2">Hand-Poured</li>
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-2">Ritual Cards</li>
        </ul>
      </section>

      {/* Shop By Intention */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Shop By Intention</h2>
          <p className="mt-2 text-zinc-600">Choose What You Want to Invite In</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { slug: "manifestation", title: "Manifestation", img: "/intention/manifestation.jpg" },
            { slug: "love-self-love", title: "Love & Self-Love", img: "/intention/love-self-love.jpg" },
            { slug: "wealth-abundance", title: "Wealth & Abundance", img: "/intention/wealth-abundance.jpg" },
            { slug: "peace-healing", title: "Peace & Healing", img: "/intention/peace-healing.jpg" },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/intention/${c.slug}`}
              className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={c.img}
                  alt={`${c.title} card`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{c.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">Explore {c.title.toLowerCase()} rituals & candles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
