"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { src: "/hero/hero_ground_stones.jpeg", alt: "Crystals on stone" },
  { src: "/hero/hero_stones_hands.jpeg", alt: "Crystals in hands" },
  { src: "/hero/IMG_0158.jpeg", alt: "Candle close-up" },
  { src: "/hero/IMG_0159.jpeg", alt: "Candle box" },
  { src: "/hero/4A26E7AC-37DB-424D-9BAA-8EC0BA6F8CED.jpeg", alt: "Candle flame" },
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== index}
        >
          <Image src={s.src} alt={s.alt} fill priority={i === 0} className="object-cover" />
          {/* darker overlay you liked */}
          <div className="absolute inset-0 bg-black/65" />
          {/* soft radial lift */}
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_20%,rgba(0,0,0,0.18),transparent_70%)]" />
        </div>
      ))}

      {/* Centered content */}
      <div className="relative z-10 h-full grid place-items-center px-6 text-center">
        <div className="max-w-3xl space-y-5">
          <h1 className="font-cormorant text-white text-3xl md:text-5xl font-medium tracking-wide">
            Every candle holds a little magic
          </h1>

          <p className="text-base md:text-lg text-white/95 italic">
            Ashora isn’t just a brand or product—it's a service to the soul.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            {/* Beige primary (no underline; turns text gold on hover) */}
            <Link
              href="/collections"
              className="no-underline inline-flex items-center rounded-full px-5 py-2.5 text-sm md:text-base bg-parchment text-ink hover:text-gold shadow-sm"
            >
              Shop Candles
            </Link>

            {/* White secondary (keep square white on hover; text goes gold) */}
            <a
              href="#intentions"
              className="no-underline inline-flex items-center rounded-full px-5 py-2.5 text-sm md:text-base bg-white text-ink ring-1 ring-white/30 hover:text-gold"
            >
              Choose your intention
            </a>

            {/* Gold accent */}
            <Link
              href="/quiz"
              className="no-underline inline-flex items-center rounded-full px-5 py-2.5 text-sm md:text-base bg-gold text-ink hover:bg-gold/90"
            >
              Take the quiz
            </Link>
          </div>
        </div>
      </div>

      {/* subtle divider line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-white/15" />
    </section>
  );
}
