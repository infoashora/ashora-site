"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

// Use the images we KNOW exist now
const slides = [
  "/hero/hero-1.jpeg",
  "/hero/hero-2.jpeg",
  "/hero/hero-3.jpeg",
  "/hero/hero-4.jpeg",
  "/hero/hero-5.jpeg",
  "/hero/IMG_0158.jpeg",
  "/hero/IMG_0159.jpeg",
];

export default function HeroSlideshow() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((p) => (p + 1) % slides.length), []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-stone-900">
      {/* Single image (simpler, robust) */}
      <img
        src={slides[i]}
        alt="ASHORA hero"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        onError={next} // skip any missing slide
      />

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 h-full flex flex-col items-center justify-center text-center">
        <h1 className="font-cormorant text-white text-3xl md:text-5xl font-semibold tracking-tight">
          Every candle holds a little magic
        </h1>
        <p className="mt-2 text-white/90 text-sm md:text-base max-w-2xl">
          ASHORA isnâ€™t just a brand or product; itâ€™s a service to the soul.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/collections"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm md:text-base bg-white text-ink no-underline hover:text-gold shadow"
          >
            Shop Candles
          </Link>
          <Link
            href="/#intentions"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm md:text-base bg-white text-ink no-underline hover:text-gold shadow"
          >
            Choose Your Intention
          </Link>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 w-6 rounded-full transition-all ${
                idx === i ? "bg-white/90" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
          </div>
      </div>
    </section>
  );
}
