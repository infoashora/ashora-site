"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  handle: string;
  title: string;
  images: string[];  // ordered gallery (>=1)
  index: number;     // current index (0-based, clamped on server)
  // classes used to keep Ashora styling identical
  outerClassName?: string;   // wrapper with border/bg/rounded
  mediaBoxClassName?: string; // fixed height container
};

export default function SwipeGallery({
  handle,
  title,
  images,
  index,
  outerClassName,
  mediaBoxClassName,
}: Props) {
  const router = useRouter();
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const count = images.length;
  const base = `/product/${handle}`;
  const href = (i: number) => (count > 1 ? `${base}?img=${i}` : base);
  const next = (index + 1) % count;
  const prev = (index - 1 + count) % count;

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const t = e.changedTouches[0];
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!touch.current) return;
    const start = touch.current;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const dt = Date.now() - start.t;

    // Simple, reliable swipe: quick-ish, mostly horizontal, distance threshold
    const horizontal = Math.abs(dx) > Math.abs(dy);
    const farEnough = Math.abs(dx) > 40;
    const fastEnough = dt < 600;
    if (horizontal && farEnough && fastEnough && count > 1) {
      const target = dx < 0 ? next : prev; // left swipe -> next
      router.push(href(target), { scroll: false });
    }
    touch.current = null;
  };

  const current = images[index] || images[0];

  return (
    <div className={`relative w-full ${outerClassName || ""}`}>
      <div
        className={`relative overflow-hidden ${mediaBoxClassName || ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative">
          <div className="relative h-[28rem] sm:h-[32rem]">
            {current ? (
              <Image
                src={current}
                alt={title}
                fill
                className="object-contain"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-400">
                No image
              </div>
            )}
          </div>

          {count > 1 && (
            <>
              {/* Prev / Next buttons still available for non-touch users */}
              <Link
                href={href(prev)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
              >
                <span aria-hidden>‹</span>
              </Link>
              <Link
                href={href(next)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
              >
                <span aria-hidden>›</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
