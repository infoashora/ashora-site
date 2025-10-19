"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const IMAGES = [
  "/hero/ashora-hero-1.jpg",
  "/hero/ashora-hero-2.jpg",
  "/hero/ashora-hero-3.jpg",
  "/hero/ashora-hero-4.jpg",
  "/hero/ashora-hero-5.jpg",
  "/hero/ashora-hero-6.jpg",
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[420px] w-full overflow-hidden md:h-[520px]">
      <Image
        key={IMAGES[index]}
        src={IMAGES[index]}
        alt="ASHORA hero"
        fill
        priority
        className="object-cover transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Every Candle Holds A Little Magic
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            ASHORA isn’t just a brand or product — it’s a service to the soul.
          </p>
        </div>
      </div>
    </div>
  );
}
