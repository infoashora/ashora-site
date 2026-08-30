"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

type ProductNavigationProps = {
  items: NavigationItem[];
};

export default function ProductNavigation({
  items,
}: ProductNavigationProps) {
  const [activeHref, setActiveHref] = useState<string>(
    items[0]?.href ?? ""
  );

  useEffect(() => {
    const sections = items
      .map((item) => {
        const id = item.href.replace("#", "");
        return document.getElementById(id);
      })
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio
          );

        const mostVisible = visibleEntries[0];

        if (mostVisible?.target.id) {
          setActiveHref(`#${mostVisible.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.05, 0.15, 0.3, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const section = document.getElementById(href.replace("#", ""));

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);
    setActiveHref(href);
  };

  return (
    <nav
      className="mt-9 border-t border-zinc-200"
      aria-label="Product page sections"
    >
      {items.map((item, index) => {
        const active = activeHref === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(event) =>
              handleNavigation(event, item.href)
            }
            aria-current={active ? "location" : undefined}
            className={`group flex min-h-14 items-center justify-between border-b py-4 text-sm transition duration-300 ${
              active
                ? "border-[#B99752]/60 text-[#9D7B38]"
                : "border-zinc-200 text-zinc-800 hover:border-[#B99752]/50 hover:text-[#9D7B38]"
            }`}
          >
            <span className="flex items-center gap-4">
              <span
                className={`w-5 text-[10px] font-medium tracking-[0.12em] transition ${
                  active
                    ? "text-[#B99752]"
                    : "text-zinc-400 group-hover:text-[#B99752]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="font-medium tracking-[0.01em]">
                {item.label}
              </span>
            </span>

            <span className="flex items-center gap-3">
              {active && (
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#B99752]"
                  aria-hidden="true"
                />
              )}

              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 transition duration-300 ${
                  active
                    ? "translate-x-1 text-[#B99752]"
                    : "text-zinc-400 group-hover:translate-x-1 group-hover:text-[#B99752]"
                }`}
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m9 6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}