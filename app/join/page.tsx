"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const GOLD = "#D1A954";

function isValidEmail(v: string) {
  // Simple, friendly validation (keeps UX light)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export default function JoinPage() {
  const sp = useSearchParams();

  // Prefill from ?email=
  const initialEmail = useMemo(() => sp.get("email") ?? "", [sp]);

  // Capture UTM & source context (optional but useful when wiring ESP)
  const utm_source = sp.get("utm_source") ?? "";
  const utm_medium = sp.get("utm_medium") ?? "";
  const utm_campaign = sp.get("utm_campaign") ?? "";
  const utm_content = sp.get("utm_content") ?? "";
  const utm_term = sp.get("utm_term") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [consent, setConsent] = useState(true); // checked by default; adjust if you prefer opt-in
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState(
    "Thanks for joining ASHORA Circle. Check your inbox for a confirmation."
  );
  const timeoutRef = useRef<number | null>(null);

  // Honeypot
  const [website, setWebsite] = useState(""); // if bots fill this, we'll ignore submit

  // Keep in sync if URL changes
  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  // Cleanup toast timer
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTouched(true);

      if (website) return; // honeypot tripped — silently ignore
      if (!isValidEmail(email) || !consent) return;

      try {
        setLoading(true);

        // Real submit to API → n8n (welcome email)
        const payload = {
          email,
          consent,
          website, // honeypot
          meta: {
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            utm_term,
            referrer: (typeof document !== "undefined" && document.referrer) || "",
            page: (typeof window !== "undefined" && window.location?.href) || "",
          },
        };

        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // Try to parse JSON either way
        let data: any = null;
        try {
          data = await res.json();
        } catch {
          // ignore non-JSON
        }

        if (!res.ok || data?.ok === false) {
          const errorMsg =
            (data?.error as string) ||
            "Something went wrong. Please try again in a moment.";
          setToastText(errorMsg);
          setShowToast(true);
          return;
        }

        // Success UX
        setToastText(
          "Thanks for joining ASHORA Circle. Check your inbox for a confirmation."
        );
        setShowToast(true);
        setEmail("");
        setTouched(false);
      } catch (err) {
        setToastText("Something went wrong. Please try again in a moment.");
        setShowToast(true);
      } finally {
        setLoading(false);
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setShowToast(false);
          timeoutRef.current = null;
        }, 3000);
      }
    },
    [
      email,
      consent,
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

  return (
    <main className="relative">
      {/* Soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(209,169,84,0.08), transparent 60%), radial-gradient(45% 50% at 100% 10%, rgba(209,169,84,0.05), transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-zinc-600">
          <Link
            href="/"
            className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
          >
            Home
          </Link>{" "}
          / <span className="text-zinc-800">Join ASHORA Circle</span>
        </nav>

        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="font-cormorant text-3xl font-semibold tracking-tight text-zinc-900">
            Join ASHORA Circle
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600">
            Intention-led drops, ritual guidance, and members-only perks — crafted with love.
          </p>
          <div
            className="mx-auto mt-5 h-px w-40 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }}
            aria-hidden
          />
        </header>

        {/* Perks strip */}
        <ul className="mx-auto mb-4 flex flex-wrap justify-center gap-2 text-[12px] text-zinc-700">
          <li className="rounded-full border border-zinc-300 bg-white px-3 py-1">
            Early drops
          </li>
          <li className="rounded-full border border-zinc-300 bg-white px-3 py-1">
            Ritual guides
          </li>
          <li className="rounded-full border border-zinc-300 bg-white px-3 py-1">
            Exclusive offers
          </li>
          <li className="rounded-full border border-zinc-300 bg-white px-3 py-1">
            Calm, gold-kissed emails
          </li>
        </ul>

        {/* Sign-up form */}
        <form
          className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          onSubmit={onSubmit}
          noValidate
        >
          {/* Honeypot (hidden from users) */}
          <div className="hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          {/* Email */}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-900"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            required
            aria-invalid={emailInvalid || undefined}
            aria-describedby={emailInvalid ? "email-error" : undefined}
            className={`mt-2 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-[${GOLD}] ${
              emailInvalid ? "border-red-400" : "border-zinc-300"
            }`}
            placeholder="you@example.com"
          />
          {emailInvalid && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              Please enter a valid email address.
            </p>
          )}

          {/* Consent */}
          <label className="mt-4 flex items-start gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              className="mt-0.5"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={consentInvalid || undefined}
            />
            <span>
              I agree to receive emails from ASHORA about products, rituals, and
              offers. You can unsubscribe anytime.
            </span>
          </label>
          {consentInvalid && (
            <p className="mt-1 text-xs text-red-600">
              Please confirm your consent to join.
            </p>
          )}

          {/* Hidden meta (captured if you later submit to your ESP) */}
          <input type="hidden" name="utm_source" value={utm_source} />
          <input type="hidden" name="utm_medium" value={utm_medium} />
          <input type="hidden" name="utm_campaign" value={utm_campaign} />
          <input type="hidden" name="utm_content" value={utm_content} />
          <input type="hidden" name="utm_term" value={utm_term} />
          {/* Referrer will be sent from client on actual wiring */}

          <button
            type="submit"
            disabled={loading || !isValidEmail(email) || !consent}
            className={`mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[${GOLD}]/30 ${
              loading || !isValidEmail(email) || !consent
                ? "cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-400"
                : "border border-zinc-300 bg-white text-zinc-900 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            }`}
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
          >
            {loading ? "Joining…" : "Join ASHORA Circle"}
          </button>

          <p className="mt-3 text-xs text-zinc-600">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>

        {/* Toast */}
        <div
          className={`pointer-events-none fixed inset-x-0 bottom-4 flex justify-center px-4 transition ${
            showToast ? "opacity-100" : "opacity-0"
          }`}
          aria-live="polite"
          role="status"
        >
          <div className="pointer-events-auto rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-lg">
            {toastText}
          </div>
        </div>
      </div>
    </main>
  );
}
