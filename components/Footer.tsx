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
    const q = email ? `?email=${encodeURIComponent(email)}` : "";
    router.push(`/join${q}`);
  }

  return (
    <footer className="mt-12 border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Top band: join + nav links + socials */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left: join circle */}
          <div className="w-full max-w-md text-center md:text-left">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
              Join ASHORA Circle
            </h3>
            <p className="mt-1 text-xs text-zinc-600">
              Intention-led drops, ritual guidance, and members-only perks.
            </p>
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-3 flex w-full max-w-xs gap-2 md:mx-0 md:max-w-none"
            >
              <input
                type="email"
                inputMode="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 w-full rounded-md border border-zinc-300 bg-white px-3 text-xs outline-none transition placeholder:text-zinc-400 focus:border-[var(--gold)]"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
                aria-label="Email address"
                required
              />
              <button
                type="submit"
                className="h-9 shrink-0 rounded-md border border-zinc-300 bg-white px-3 text-xs font-medium text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              >
                Join
              </button>
            </form>
          </div>

          {/* Middle: compact links */}
          <ul className="grid w-full max-w-xs grid-cols-1 gap-y-2 text-center text-xs text-zinc-700 md:max-w-none md:grid-cols-2 md:gap-x-6 md:text-left">
            <li>
              <Link
                className="transition hover:text-[var(--gold)]"
                href="/shop"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-[var(--gold)]"
                href="/quiz"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              >
                Find Your Intention
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-[var(--gold)]"
                href="/faq"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-[var(--gold)]"
                href="/about"
                style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              >
                About
              </Link>
            </li>
          </ul>

          {/* Right: socials */}
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <a
              href="https://www.instagram.com/ashorauk?igsh=dDVlNmM4eWpucWNq"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
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
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  d="M15 3c.3 2.3 1.7 3.8 4 4v3.1c-1.6.2-3-.2-4-1.1V15a6 6 0 11-6-6c.3 0 .6 0 1 .1V12a3 3 0 103 3V3h2z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-3 text-[11px] text-zinc-600 md:flex-row">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} ASHORA. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:justify-end">
            <Link
              className="transition hover:text-[var(--gold)]"
              href="/shipping"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              Shipping
            </Link>
            <Link
              className="transition hover:text-[var(--gold)]"
              href="/returns"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              Returns
            </Link>
            <Link
              className="transition hover:text-[var(--gold)]"
              href="/privacy"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              Privacy
            </Link>
            <Link
              className="transition hover:text-[var(--gold)]"
              href="/terms"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              Terms
            </Link>
            <a
              className="transition hover:text-[var(--gold)]"
              href="mailto:info@ashora.co.uk"
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
