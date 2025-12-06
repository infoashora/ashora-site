"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const images = [
    "/hero/hero1.jpg",
    "/hero/hero2.jpg",
    "/hero/hero3.jpg",
    "/hero/hero4.jpg",
    "/hero/hero5.jpg",
    "/hero/hero6.jpg",
  ];

  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % images.length);
        setFade(true);
      }, 500);
    }, 6500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Slideshow */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${images[idx]})` }}
        />

        {/* Luxe Dark Overlay */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        {/* ✨ Golden Snowfall Overlay */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="snowflake-container">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="snowflake" />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-28">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
            A LITTLE MAGIC IN EVERY FLAME
          </p>

          <h1 className="magic-heading text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Every Candle Holds A Little Magic
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-balance text-white/90">
            ASHORA isn&apos;t just a brand — it&apos;s a service to the soul.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-md border border-white/70 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-[#D1A954] hover:bg-[#D1A954]/15 focus:outline-none focus:ring-2 focus:ring-[#D1A954]/50 active:bg-[#D1A954]/25 hover:shadow-[0_0_18px_3px_rgba(209,169,84,0.35)] active:shadow-[0_0_22px_5px_rgba(209,169,84,0.5)]"
            >
              Shop Intentional Candles
            </Link>
            <Link
              href="/join"
              className="rounded-md border border-white/70 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:border-[#D1A954] hover:bg-[#D1A954]/10 focus:outline-none focus:ring-2 focus:ring-[#D1A954]/50 active:bg-[#D1A954]/20 hover:shadow-[0_0_18px_3px_rgba(209,169,84,0.35)] active:shadow-[0_0_22px_5px_rgba(209,169,84,0.5)]"
            >
              Join ASHORA Circle
            </Link>
          </div>
        </div>

        {/* Effects Styles */}
        <style jsx>{`
          /* Magic Heading Hover Glow */
          .magic-heading {
            transition: text-shadow 200ms ease, -webkit-text-stroke-color 200ms ease;
            text-rendering: optimizeLegibility;
          }
          .magic-heading:hover {
            text-shadow: 0 0 6px rgba(209, 169, 84, 0.4),
              0 0 14px rgba(209, 169, 84, 0.35),
              0 0 28px rgba(209, 169, 84, 0.25);
            -webkit-text-stroke: 0.6px rgba(209, 169, 84, 0.9);
            text-stroke: 0.6px rgba(209, 169, 84, 0.9);
          }

          /* ✨ Golden Snowfall */
          .snowflake-container {
            position: absolute;
            inset: 0;
          }

          .snowflake {
            position: absolute;
            top: -12%;
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background: radial-gradient(
              circle,
              rgba(209, 169, 84, 0.95) 0%,
              rgba(209, 169, 84, 0.55) 40%,
              transparent 75%
            );
            opacity: 0.8;
            will-change: transform;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          /* Positions, sizes, durations & delays */
          .snowflake:nth-child(1) {
            left: 2%;
            width: 5px;
            height: 5px;
            animation-name: snow-left;
            animation-duration: 9s;
            animation-delay: -3s;
          }
          .snowflake:nth-child(2) {
            left: 5%;
            width: 7px;
            height: 7px;
            animation-name: snow-right;
            animation-duration: 10s;
            animation-delay: -6s;
          }
          .snowflake:nth-child(3) {
            left: 8%;
            width: 4px;
            height: 4px;
            animation-name: snow-left;
            animation-duration: 8s;
            animation-delay: -2s;
          }
          .snowflake:nth-child(4) {
            left: 11%;
            width: 6px;
            height: 6px;
            animation-name: snow-right;
            animation-duration: 11s;
            animation-delay: -7s;
          }
          .snowflake:nth-child(5) {
            left: 14%;
            width: 5px;
            height: 5px;
            animation-name: snow-left;
            animation-duration: 9s;
            animation-delay: -4s;
          }
          .snowflake:nth-child(6) {
            left: 17%;
            width: 8px;
            height: 8px;
            animation-name: snow-right;
            animation-duration: 12s;
            animation-delay: -8s;
          }
          .snowflake:nth-child(7) {
            left: 20%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 8.5s;
            animation-delay: -1s;
          }
          .snowflake:nth-child(8) {
            left: 23%;
            width: 4px;
            height: 4px;
            animation-name: snow-right;
            animation-duration: 9.5s;
            animation-delay: -5s;
          }
          .snowflake:nth-child(9) {
            left: 26%;
            width: 7px;
            height: 7px;
            animation-name: snow-left;
            animation-duration: 10.5s;
            animation-delay: -9s;
          }
          .snowflake:nth-child(10) {
            left: 29%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 8.5s;
            animation-delay: -2.5s;
          }
          .snowflake:nth-child(11) {
            left: 32%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 11s;
            animation-delay: -6.5s;
          }
          .snowflake:nth-child(12) {
            left: 35%;
            width: 4px;
            height: 4px;
            animation-name: snow-right;
            animation-duration: 9s;
            animation-delay: -3.5s;
          }
          .snowflake:nth-child(13) {
            left: 38%;
            width: 7px;
            height: 7px;
            animation-name: snow-left;
            animation-duration: 10s;
            animation-delay: -7.5s;
          }
          .snowflake:nth-child(14) {
            left: 41%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 8.2s;
            animation-delay: -1.8s;
          }
          .snowflake:nth-child(15) {
            left: 44%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 11.5s;
            animation-delay: -8.5s;
          }
          .snowflake:nth-child(16) {
            left: 47%;
            width: 4px;
            height: 4px;
            animation-name: snow-right;
            animation-duration: 9.2s;
            animation-delay: -4.2s;
          }
          .snowflake:nth-child(17) {
            left: 50%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 10.8s;
            animation-delay: -6.8s;
          }
          .snowflake:nth-child(18) {
            left: 53%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 9.8s;
            animation-delay: -3s;
          }
          .snowflake:nth-child(19) {
            left: 56%;
            width: 7px;
            height: 7px;
            animation-name: snow-left;
            animation-duration: 11.2s;
            animation-delay: -7.2s;
          }
          .snowflake:nth-child(20) {
            left: 59%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 8.6s;
            animation-delay: -2.2s;
          }
          .snowflake:nth-child(21) {
            left: 62%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 10.4s;
            animation-delay: -5.4s;
          }
          .snowflake:nth-child(22) {
            left: 65%;
            width: 4px;
            height: 4px;
            animation-name: snow-right;
            animation-duration: 9.1s;
            animation-delay: -3.1s;
          }
          .snowflake:nth-child(23) {
            left: 68%;
            width: 7px;
            height: 7px;
            animation-name: snow-left;
            animation-duration: 10.2s;
            animation-delay: -6.2s;
          }
          .snowflake:nth-child(24) {
            left: 71%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 8.4s;
            animation-delay: -1.4s;
          }
          .snowflake:nth-child(25) {
            left: 74%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 11.3s;
            animation-delay: -7.3s;
          }
          .snowflake:nth-child(26) {
            left: 77%;
            width: 4px;
            height: 4px;
            animation-name: snow-right;
            animation-duration: 9.4s;
            animation-delay: -4.4s;
          }
          .snowflake:nth-child(27) {
            left: 80%;
            width: 7px;
            height: 7px;
            animation-name: snow-left;
            animation-duration: 10.6s;
            animation-delay: -6.6s;
          }
          .snowflake:nth-child(28) {
            left: 83%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 8.8s;
            animation-delay: -2.8s;
          }
          .snowflake:nth-child(29) {
            left: 86%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 11s;
            animation-delay: -8s;
          }
          .snowflake:nth-child(30) {
            left: 89%;
            width: 4px;
            height: 4px;
            animation-name: snow-right;
            animation-duration: 9.3s;
            animation-delay: -3.3s;
          }
          .snowflake:nth-child(31) {
            left: 92%;
            width: 7px;
            height: 7px;
            animation-name: snow-left;
            animation-duration: 10.1s;
            animation-delay: -5.1s;
          }
          .snowflake:nth-child(32) {
            left: 95%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 8.3s;
            animation-delay: -1.3s;
          }
          .snowflake:nth-child(33) {
            left: 7%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 10.7s;
            animation-delay: -7.7s;
          }
          .snowflake:nth-child(34) {
            left: 19%;
            width: 4px;
            height: 4px;
            animation-name: snow-right;
            animation-duration: 9.6s;
            animation-delay: -4.6s;
          }
          .snowflake:nth-child(35) {
            left: 31%;
            width: 7px;
            height: 7px;
            animation-name: snow-left;
            animation-duration: 10.9s;
            animation-delay: -6.9s;
          }
          .snowflake:nth-child(36) {
            left: 43%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 8.7s;
            animation-delay: -2.7s;
          }
          .snowflake:nth-child(37) {
            left: 55%;
            width: 6px;
            height: 6px;
            animation-name: snow-left;
            animation-duration: 11.1s;
            animation-delay: -8.1s;
          }
          .snowflake:nth-child(38) {
            left: 67%;
            width: 4px;
            height: 4px;
            animation-name: snow-right;
            animation-duration: 9.2s;
            animation-delay: -3.2s;
          }
          .snowflake:nth-child(39) {
            left: 79%;
            width: 7px;
            height: 7px;
            animation-name: snow-left;
            animation-duration: 10.3s;
            animation-delay: -5.3s;
          }
          .snowflake:nth-child(40) {
            left: 97%;
            width: 5px;
            height: 5px;
            animation-name: snow-right;
            animation-duration: 8.1s;
            animation-delay: -1.1s;
          }

          @keyframes snow-left {
            0% {
              transform: translate3d(12px, -120%, 0);
            }
            100% {
              transform: translate3d(-12px, 120vh, 0);
            }
          }

          @keyframes snow-right {
            0% {
              transform: translate3d(-12px, -120%, 0);
            }
            100% {
              transform: translate3d(12px, 120vh, 0);
            }
          }
        `}</style>
      </section>

      {/* Benefits Bar – divider gold for Christmas */}
      <section className="border-y border-amber-200 bg-white/70">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-6 py-4 text-center text-sm text-zinc-700 sm:grid-cols-4">
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-2">
            Vegan
          </li>
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-2">
            Eco-Conscious
          </li>
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-2">
            Hand-Poured
          </li>
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-2">
            Ritual Cards
          </li>
        </ul>
      </section>

      {/* Shop By Intention */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Shop By Intention
          </h2>
          <p className="mt-2 text-zinc-600">Choose What You Want to Invite In</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              slug: "manifestation",
              title: "Manifestation",
              img: "/intention/manifestation.jpg",
            },
            {
              slug: "love-self-love",
              title: "Love & Self-Love",
              img: "/intention/love-self-love.jpg",
            },
            {
              slug: "wealth-abundance",
              title: "Wealth & Abundance",
              img: "/intention/wealth-abundance.jpg",
            },
            {
              slug: "peace-healing",
              title: "Peace & Healing",
              img: "/intention/peace-healing.jpg",
            },
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
                <p className="mt-1 text-sm text-zinc-600">
                  Explore {c.title.toLowerCase()} rituals & candles
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
