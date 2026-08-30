"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  handle: string;
  title: string;
  images: string[];
  index: number;
  outerClassName?: string;
  mediaBoxClassName?: string;
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

  const href = (imageIndex: number) =>
    count > 1 ? `${base}?img=${imageIndex}` : base;

  const next = count > 0 ? (index + 1) % count : 0;
  const prev = count > 0 ? (index - 1 + count) % count : 0;
  const current = images[index] || images[0];

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    const touchPoint = event.changedTouches[0];

    touch.current = {
      x: touchPoint.clientX,
      y: touchPoint.clientY,
      t: Date.now(),
    };
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (!touch.current || count <= 1) {
      touch.current = null;
      return;
    }

    const start = touch.current;
    const touchPoint = event.changedTouches[0];

    const dx = touchPoint.clientX - start.x;
    const dy = touchPoint.clientY - start.y;
    const duration = Date.now() - start.t;

    const isHorizontal = Math.abs(dx) > Math.abs(dy);
    const travelledEnough = Math.abs(dx) > 40;
    const wasQuickEnough = duration < 600;

    if (isHorizontal && travelledEnough && wasQuickEnough) {
      const target = dx < 0 ? next : prev;
      router.push(href(target), { scroll: false });
    }

    touch.current = null;
  };

  return (
    <div className={`w-full ${outerClassName || ""}`}>
      <div className="flex flex-col gap-3 lg:flex-row">
        {count > 1 && (
          <div className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:w-[76px] lg:flex-col lg:overflow-visible lg:pb-0">
            {images.map((src, imageIndex) => (
              <Link
                key={`${src}-${imageIndex}`}
                href={href(imageIndex)}
                scroll={false}
                aria-label={`Show ${title} image ${imageIndex + 1}`}
                aria-current={imageIndex === index ? "true" : undefined}
                className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md border bg-white transition ${
                  imageIndex === index
                    ? "border-zinc-900 ring-1 ring-zinc-900"
                    : "border-zinc-200 hover:border-zinc-400"
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} thumbnail ${imageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </Link>
            ))}
          </div>
        )}

        <div
          className={`order-1 relative min-w-0 flex-1 overflow-hidden rounded-lg bg-zinc-50 lg:order-2 ${
            mediaBoxClassName || ""
          }`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative h-[28rem] sm:h-[34rem] lg:h-[39rem]">
            {current ? (
              <Image
                src={current}
                alt={title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                No image
              </div>
            )}
          </div>

          {count > 1 && (
            <>
              <Link
                href={href(prev)}
                scroll={false}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-xl text-zinc-900 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white hover:shadow-md"
              >
                <span aria-hidden="true">‹</span>
              </Link>

              <Link
                href={href(next)}
                scroll={false}
                aria-label="Next image"
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-xl text-zinc-900 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white hover:shadow-md"
              >
                <span aria-hidden="true">›</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}