"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { QUESTIONS, type IntentionKey } from "./content";
import { INTENTIONS } from "@/app/intention/content";
// Import the whole module, then safely read the function if present
import * as ProductContent from "@/app/product/content";
import ProductCard from "@/components/ProductCard";

type StepAnswer = Record<string, IntentionKey>;

const GOLD = "#D1A954";

export default function QuizPage() {
  const [answers, setAnswers] = useState<StepAnswer>({});
  const [submitted, setSubmitted] = useState(false);

  // subtle highlight once on result
  const [shimmer, setShimmer] = useState(false);
  const shimmerRef = useRef<number | null>(null);

  useEffect(() => {
    if (submitted) {
      setShimmer(true);
      shimmerRef.current = window.setTimeout(() => setShimmer(false), 1800);
    }
    return () => {
      if (shimmerRef.current) window.clearTimeout(shimmerRef.current);
    };
  }, [submitted]);

  const result: IntentionKey | null = useMemo(() => {
    const counts: Record<IntentionKey, number> = {
      manifestation: 0,
      "love-self-love": 0,
      "wealth-abundance": 0,
      "peace-healing": 0,
    };
    Object.values(answers).forEach((slug) => (counts[slug] = (counts[slug] ?? 0) + 1));
    const entries = Object.entries(counts) as [IntentionKey, number][];
    entries.sort((a, b) => b[1] - a[1]);
    const top = entries[0];
    if (!top || top[1] === 0) return null;
    return top[0];
  }, [answers]);

  const data = result ? INTENTIONS[result] : null;

  // ✅ Safely derive products: only call if the function exists
  const products = useMemo(() => {
    if (!result) return [];
    const maybeFn = (ProductContent as any)?.getProductsByIntention;
    return typeof maybeFn === "function" ? maybeFn(result as IntentionKey) : [];
  }, [result]);

  const incomplete = QUESTIONS.some((q) => !answers[q.id]);
  const answeredCount = QUESTIONS.filter((q) => !!answers[q.id]).length;
  const progressPct = Math.round((answeredCount / QUESTIONS.length) * 100);

  function choose(qid: string, slug: IntentionKey) {
    setAnswers((prev) => ({ ...prev, [qid]: slug }));
  }

  function onSubmit() {
    setSubmitted(true);
  }

  return (
    <main className="relative mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-10">
      {/* background aura */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(80% 40% at 50% 0%, rgba(209,169,84,0.08), transparent 60%), radial-gradient(50% 50% at 100% 20%, rgba(209,169,84,0.06), transparent 50%)",
        }}
      />

      <header className="mb-6 sm:mb-8 a-fade-up" style={{ animationDelay: "60ms" } as any}>
        <nav className="text-xs sm:text-sm text-zinc-600">
          <Link href="/" className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800">
            Home
          </Link>{" "}
          / <span className="text-zinc-800">Find Your Intention Quiz</span>
        </nav>

        <h1 className="mt-2 sm:mt-3 font-cormorant text-[26px] sm:text-3xl font-semibold tracking-tight md:text-4xl">
          Find Your Intention
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
          Three gentle questions to match you with an intention. Minimal, calm, and gold-kissed.
        </p>

        {/* Progress */}
        {!submitted && (
          <div className="mt-5 a-fade-up" style={{ animationDelay: "120ms" } as any}>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200"
              aria-label="Quiz progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPct}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${GOLD}, rgba(209,169,84,0.7))`,
                }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-zinc-600">
              <span>
                Answered <span className="font-medium text-zinc-800">{answeredCount}</span> of{" "}
                <span className="font-medium text-zinc-800">{QUESTIONS.length}</span>
              </span>
              <div className="flex gap-1.5 sm:gap-2">
                {QUESTIONS.map((q) => {
                  const active = !!answers[q.id];
                  return (
                    <span
                      key={q.id}
                      className={`h-2 w-7 sm:w-8 rounded-full transition ${active ? "bg-zinc-800" : "bg-zinc-300"}`}
                      title={q.prompt}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Questions */}
      {!submitted && (
        <section className="space-y-4 sm:space-y-6">
          {QUESTIONS.map((q, qi) => (
            <div
              key={q.id}
              className="rounded-2xl border border-zinc-200 bg-white/90 p-4 sm:p-5 shadow-sm transition hover:shadow-md a-fade-up"
              style={{ animationDelay: `${160 + qi * 80}ms` } as any}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 flex-none items-center justify-center rounded-full border border-zinc-300 text-[11px] sm:text-xs font-medium text-zinc-700">
                  {qi + 1}
                </span>
                <h2 className="text-[15px] sm:text-[15px] font-medium text-zinc-900">{q.prompt}</h2>
              </div>

              <div className="mt-3 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                {q.options.map((opt, i) => {
                  const active = answers[q.id] === opt.intention;
                  return (
                    <button
                      key={i}
                      onClick={() => choose(q.id, opt.intention)}
                      className={`group rounded-xl border px-4 py-4 sm:py-5 text-left text-[13px] sm:text-sm transition ${
                        active
                          ? "border-[var(--gold)] bg-[var(--gold-soft)] text-zinc-900 shadow-sm"
                          : "border-zinc-300 bg-white hover:border-[var(--gold)] hover:shadow-sm"
                      }`}
                      style={
                        {
                          "--gold": GOLD,
                          "--gold-soft": "rgba(209,169,84,0.12)",
                        } as React.CSSProperties
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[11px] ${
                            active ? "border-[var(--gold)] bg-[var(--gold)] text-white" : "border-zinc-300 text-zinc-500"
                          }`}
                          aria-hidden="true"
                        >
                          {active ? "✓" : "•"}
                        </span>
                        <span className="leading-5">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div
            className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between a-fade-up"
            style={{ animationDelay: `${160 + QUESTIONS.length * 80}ms` } as any}
          >
            <Link href="/" className="text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900 text-center sm:text-left">
              Back to Home
            </Link>

            <button
              onClick={onSubmit}
              disabled={incomplete}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                incomplete
                  ? "cursor-not-allowed border border-zinc-300 bg-zinc-100 text-zinc-400"
                  : "border border-zinc-300 bg-white text-zinc-900 hover:border-[var(--gold)] hover:text-[var(--gold)]"
              }`}
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
              title={incomplete ? "Please answer all questions" : "See your intention"}
            >
              See Your Intention
            </button>
          </div>
        </section>
      )}

      {/* Result */}
      {submitted && result && data && (
        <section className="mt-6 space-y-6">
          <div
            className={`relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6 shadow-sm transition a-pop ${
              shimmer ? "ring-2 ring-[var(--gold)]/30" : ""
            }`}
            style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
          >
            {/* soft inner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0 60px rgba(209,169,84,0.08)",
                borderRadius: "1rem",
              }}
            />

            {/* shimmering flare when first shown */}
            {shimmer && (
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--gold)]/25 blur-2xl" />
            )}

            <div className="text-[11px] uppercase tracking-wide text-zinc-600">Your Result</div>
            <h2 className="mt-1 font-cormorant text-[24px] sm:text-[28px] font-semibold leading-tight tracking-tight text-zinc-900 md:text-[32px]">
              {data.title}
            </h2>

            {/* gold divider */}
            <div
              className="mt-3 h-[1px] w-full rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              }}
            />

            <p className="mt-3 text-sm text-zinc-700">{data.blurb}</p>

            <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
              <Link
                href={`/intention/${result}`}
                className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                Explore {data.title}
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                Shop All
              </Link>
            </div>
          </div>

          {/* Matching products (reuse ProductCard for consistent images/logic) */}
          {products.length > 0 && (
            <div className="a-fade-up" style={{ animationDelay: "120ms" } as any}>
              <h3 className="text-base font-medium text-zinc-900">Products Aligned With {data.title}</h3>
              {/* Mobile-first grid: 2-up on small, 3-up from sm: */}
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {products.map((p: any, idx: number) => (
                  <div key={p.handle ?? p.id ?? p.title ?? idx} className="a-fade-up" style={{ animationDelay: `${idx * 60}ms` } as any}>
                    <ProductCard product={p} variant="compact" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 a-fade-up" style={{ animationDelay: "160ms" } as any}>
            {/* Retake */}
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:shadow-md"
              style={{
                background: GOLD,
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              Retake Quiz
            </button>

            <Link
              href={`/intention/${result}`}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-center transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              style={{ ["--gold" as any]: GOLD } as React.CSSProperties}
            >
              Go to {data.title}
            </Link>
          </div>
        </section>
      )}

      {/* Edge case */}
      {submitted && !result && (
        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 a-fade-up">
          Couldn’t determine a clear intention. Please retake the quiz.
          <div className="mt-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:shadow-md"
              style={{
                background: GOLD,
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              Retake Quiz
            </button>
          </div>
        </section>
      )}

      {/* Local animation + result refinements */}
      <style jsx>{`
        .a-fade-up {
          opacity: 0;
          transform: translateY(8px);
          animation: fadeUp 520ms ease forwards;
        }
        .a-pop {
          opacity: 0;
          transform: translateY(6px) scale(0.98);
          animation: popIn 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes popIn {
          50% {
            opacity: 1;
            transform: translateY(0) scale(1.005);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  );
}
