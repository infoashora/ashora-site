"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const GOLD = "#D1A954";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export default function JoinPage() {
  const searchParams = useSearchParams();

  const initialEmail = useMemo(
    () => searchParams.get("email") ?? "",
    [searchParams]
  );

  const utm_source = searchParams.get("utm_source") ?? "";
  const utm_medium = searchParams.get("utm_medium") ?? "";
  const utm_campaign = searchParams.get("utm_campaign") ?? "";
  const utm_content = searchParams.get("utm_content") ?? "";
  const utm_term = searchParams.get("utm_term") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [website, setWebsite] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState(
    "Thanks for joining ASHORA Circle. Check your inbox for a confirmation."
  );

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setTouched(true);

      if (website || !isValidEmail(email) || !consent) {
        return;
      }

      try {
        setLoading(true);

        const payload = {
          email,
          consent,
          website,
          meta: {
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            utm_term,
            referrer:
              typeof document !== "undefined" ? document.referrer : "",
            page:
              typeof window !== "undefined" ? window.location.href : "",
          },
        };

        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        let data: { ok?: boolean; error?: string } | null = null;

        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok || data?.ok === false) {
          setToastText(
            data?.error ||
              "Something went wrong. Please try again in a moment."
          );
          setShowToast(true);
          return;
        }

        setToastText(
          "Thanks for joining ASHORA Circle. Check your inbox for a confirmation."
        );
        setShowToast(true);
        setEmail("");
        setTouched(false);
      } catch {
        setToastText(
          "Something went wrong. Please try again in a moment."
        );
        setShowToast(true);
      } finally {
        setLoading(false);

        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          setShowToast(false);
          timeoutRef.current = null;
        }, 3000);
      }
    },
    [
      consent,
      email,
      website,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    ]
  );

  const emailInvalid = touched && !isValidEmail(email);
  const consentInvalid = touched && !consent;
  const disabled = loading || !isValidEmail(email) || !consent;

  const goldStyle = {
    ["--gold" as string]: GOLD,
  } as React.CSSProperties;

  return (
    <main className="bg-[#faf8f4]">
      {/* Introduction */}
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-7 sm:py-9">
          <nav className="flex items-center gap-2 text-xs text-zinc-500">
            <Link
              href="/"
              className="transition-colors hover:text-[#9b793d]"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-zinc-900">Join ASHORA Circle</span>
          </nav>
        </div>

        <div className="border-t border-zinc-200">
          <div className="mx-auto grid max-w-6xl lg:grid-cols-[0.88fr_1.12fr]">
            <div className="flex flex-col justify-between bg-zinc-950 px-6 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[520px] lg:px-12 lg:py-14">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D1A954]">
                  Stay Close
                </p>

                <h1 className="mt-5 max-w-lg font-cormorant text-5xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Join the ASHORA Circle.
                </h1>

                <p className="mt-6 max-w-lg text-base leading-8 text-zinc-300">
                  A quieter place to receive intention-led guidance, early
                  access to new candles and thoughtful rituals for everyday
                  life.
                </p>
              </div>

              <div className="mt-10 border-t border-zinc-700 pt-6">
                <p className="max-w-md font-cormorant text-2xl font-medium leading-[1.25] tracking-tight text-white">
                  Small reminders to pause, reconnect and move through life
                  with greater intention.
                </p>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  With love &amp; intention, ASHORA
                </p>
              </div>
            </div>

            <div className="flex items-center bg-[#faf8f4] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <div className="w-full">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                  Circle Membership
                </p>

                <h2 className="mt-4 max-w-xl font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
                  Thoughtful emails, created to feel worth opening.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">
                  Join for early collection access, ritual guidance, members-only
                  offers and calm inspiration from the world of ASHORA.
                </p>

                <div className="mt-7 grid border-y border-zinc-300 sm:grid-cols-2">
                  {[
                    {
                      number: "01",
                      title: "Early Access",
                      description:
                        "Be first to discover new candle releases and limited drops.",
                    },
                    {
                      number: "02",
                      title: "Ritual Guidance",
                      description:
                        "Receive simple practices designed for real everyday life.",
                    },
                    {
                      number: "03",
                      title: "Circle Offers",
                      description:
                        "Access occasional members-only rewards and announcements.",
                    },
                    {
                      number: "04",
                      title: "Quiet Inspiration",
                      description:
                        "Intentional notes created to nurture reflection and calm.",
                    },
                  ].map((perk, index) => (
                    <div
                      key={perk.number}
                      className={`py-5 ${
                        index % 2 !== 0
                          ? "sm:border-l sm:border-zinc-300 sm:pl-6"
                          : "sm:pr-6"
                      } ${
                        index > 1
                          ? "border-t border-zinc-300"
                          : index === 1
                            ? "border-t border-zinc-300 sm:border-t-0"
                            : ""
                      }`}
                    >
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9b793d]">
                        {perk.number}
                      </p>

                      <h3 className="mt-2 text-sm font-medium text-zinc-950">
                        {perk.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-zinc-500">
                        {perk.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-up */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
              Become Part Of The Circle
            </p>

            <h2 className="mt-3 max-w-md font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
              Begin with your email.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
              We keep our emails considered and intentional. No noise, no
              pressure and no endless inbox clutter.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="border-t border-zinc-300 pt-6"
            style={goldStyle}
          >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>

              <input
                id="website"
                name="website"
                type="text"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => setTouched(true)}
                required
                aria-invalid={emailInvalid || undefined}
                aria-describedby={emailInvalid ? "email-error" : undefined}
                placeholder="you@example.com"
                className={`mt-3 h-14 w-full border bg-white px-4 text-base text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--gold)] ${
                  emailInvalid ? "border-red-400" : "border-zinc-300"
                }`}
              />

              {emailInvalid && (
                <p
                  id="email-error"
                  className="mt-2 text-xs text-red-600"
                >
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <label className="mt-5 flex items-start gap-3 border-y border-zinc-200 py-5 text-sm leading-6 text-zinc-600">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                aria-invalid={consentInvalid || undefined}
                className="mt-1 h-4 w-4 accent-[#9b793d]"
              />

              <span>
                I agree to receive emails from ASHORA about candles, rituals,
                releases and occasional offers. I can unsubscribe at any time.
              </span>
            </label>

            {consentInvalid && (
              <p className="mt-2 text-xs text-red-600">
                Please confirm your consent to join.
              </p>
            )}

            <input type="hidden" name="utm_source" value={utm_source} />
            <input type="hidden" name="utm_medium" value={utm_medium} />
            <input type="hidden" name="utm_campaign" value={utm_campaign} />
            <input type="hidden" name="utm_content" value={utm_content} />
            <input type="hidden" name="utm_term" value={utm_term} />

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={disabled}
                className="group inline-flex h-12 items-center justify-center gap-3 bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-[#9b793d] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
              >
                {loading ? "Joining…" : "Join ASHORA Circle"}

                {!loading && (
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                )}
              </button>

              <p className="text-xs leading-5 text-zinc-500">
                Privacy respected. Unsubscribe at any time.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Closing Note */}
      <section className="bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
          <div className="grid gap-7 border-y border-zinc-300 py-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
              A Gentle Invitation
            </p>

            <p className="max-w-3xl font-cormorant text-2xl font-medium leading-[1.25] tracking-tight text-zinc-950 sm:text-3xl">
              There is no perfect time to begin. Sometimes intention starts
              with one quiet choice to stay connected to what matters.
            </p>
          </div>
        </div>
      </section>

      {/* Toast */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-4 z-[9999] flex justify-center px-4 transition-opacity duration-300 ${
          showToast ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
        role="status"
      >
        <div className="pointer-events-auto border border-zinc-700 bg-zinc-950 px-5 py-3 text-sm text-white shadow-xl">
          {toastText}
        </div>
      </div>
    </main>
  );
}