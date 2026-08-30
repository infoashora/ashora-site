// components/Footer.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GOLD = "#D1A954";

export default function Footer() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const query = email ? `?email=${encodeURIComponent(email)}` : "";
    router.push(`/join${query}`);
  }

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:gap-12">
          {/* ASHORA Circle */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1A954]">
              Stay Close
            </p>

            <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Join the ASHORA Circle.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-400">
              Receive intention-led guidance, early access to new candle
              releases and thoughtful rituals created for everyday life.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-5 flex max-w-md border-b border-zinc-700"
            >
              <input
                type="email"
                inputMode="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 min-w-0 flex-1 bg-transparent pr-4 text-sm text-white outline-none placeholder:text-zinc-500"
                aria-label="Email address"
                required
              />

              <button
                type="submit"
                className="group inline-flex h-12 shrink-0 items-center gap-3 text-sm font-medium text-white transition-colors hover:text-[#D1A954]"
              >
                Join the Circle
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </form>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D1A954]">
              Explore
            </p>

            <ul className="mt-5 space-y-3 text-sm text-zinc-300">
              <li>
                <Link
                  href="/shop"
                  className="transition-colors hover:text-white"
                >
                  Shop Candles
                </Link>
              </li>

              <li>
                <Link
                  href="/quiz"
                  className="transition-colors hover:text-white"
                >
                  Find Your Intention
                </Link>
              </li>

              <li>
                <Link
                  href="/collections"
                  className="transition-colors hover:text-white"
                >
                  Explore Intentions
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  Our Story
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D1A954]">
              Information
            </p>

            <ul className="mt-5 space-y-3 text-sm text-zinc-300">
              <li>
                <Link
                  href="/shipping"
                  className="transition-colors hover:text-white"
                >
                  Shipping
                </Link>
              </li>

              <li>
                <Link
                  href="/returns"
                  className="transition-colors hover:text-white"
                >
                  Returns
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <a
                  href="mailto:info@ashora.co.uk"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold tracking-[0.2em] text-white">
                ASHORA
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                Intentional candles for meaningful everyday rituals.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/ashorauk?igsh=dDVlNmM4eWpucWNq"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-[#D1A954] hover:text-[#D1A954]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    fill="none"
                    stroke="currentColor"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.5"
                    fill="none"
                    stroke="currentColor"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@ashorauk?_t=ZN-8zyBqjbDw1e&_r=1"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-[#D1A954] hover:text-[#D1A954]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M15 3c.3 2.3 1.7 3.8 4 4v3.1c-1.6.2-3-.2-4-1.1V15a6 6 0 11-6-6c.3 0 .6 0 1 .1V12a3 3 0 103 3V3h2z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-zinc-900 pt-4 text-[11px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ASHORA. All rights reserved.</p>

            <a
              href="mailto:info@ashora.co.uk"
              className="transition-colors hover:text-zinc-300"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              info@ashora.co.uk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}