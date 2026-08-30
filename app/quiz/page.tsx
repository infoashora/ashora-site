"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { INTENTIONS } from "@/app/intention/content";
import * as ProductContent from "@/app/product/content";

import { QUESTIONS, type IntentionKey } from "./content";

type StepAnswer = Record<string, IntentionKey>;

export default function QuizPage() {
  const [answers, setAnswers] = useState<StepAnswer>({});
  const [submitted, setSubmitted] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  const shimmerRef = useRef<number | null>(null);

  useEffect(() => {
    if (submitted) {
      setShimmer(true);

      shimmerRef.current = window.setTimeout(() => {
        setShimmer(false);
      }, 1800);
    }

    return () => {
      if (shimmerRef.current) {
        window.clearTimeout(shimmerRef.current);
      }
    };
  }, [submitted]);

  const result: IntentionKey | null = useMemo(() => {
    const counts: Record<IntentionKey, number> = {
      manifestation: 0,
      "love-self-love": 0,
      "wealth-abundance": 0,
      "peace-healing": 0,
    };

    Object.values(answers).forEach((slug) => {
      counts[slug] = (counts[slug] ?? 0) + 1;
    });

    const entries = Object.entries(counts) as [IntentionKey, number][];

    entries.sort((a, b) => b[1] - a[1]);

    const topResult = entries[0];

    if (!topResult || topResult[1] === 0) {
      return null;
    }

    return topResult[0];
  }, [answers]);

  const resultData = result ? INTENTIONS[result] : null;

  const products = useMemo(() => {
    if (!result) {
      return [];
    }

    const getProductsByIntention = (ProductContent as any)
      ?.getProductsByIntention;

    return typeof getProductsByIntention === "function"
      ? getProductsByIntention(result as IntentionKey)
      : [];
  }, [result]);

  const answeredCount = QUESTIONS.filter(
    (question) => !!answers[question.id]
  ).length;

  const incomplete = answeredCount !== QUESTIONS.length;

  const progressPercentage = Math.round(
    (answeredCount / QUESTIONS.length) * 100
  );

  function choose(questionId: string, intention: IntentionKey) {
    setAnswers((current) => ({
      ...current,
      [questionId]: intention,
    }));
  }

  function submitQuiz() {
    if (incomplete) {
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retakeQuiz() {
    setSubmitted(false);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function formatGBP(pence: number) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format((pence || 0) / 100);
  }

  return (
    <main className="bg-[#faf8f4]">
      {!submitted && (
        <>
          {/* Introduction */}
          <section className="border-b border-zinc-200 bg-[#f7f4ee]">
            <div className="mx-auto max-w-6xl px-6 py-9 sm:py-11 lg:py-12">
              <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                    Begin Here
                  </p>

                  <h1 className="mt-3 max-w-xl font-cormorant text-4xl font-semibold leading-[1] tracking-tight text-zinc-950 sm:text-5xl">
                    Find Your Intention
                  </h1>
                </div>

                <div className="border-l border-zinc-300 pl-5 sm:pl-7">
                  <p className="max-w-xl text-sm leading-7 text-zinc-600">
                    Three gentle questions designed to help you discover the
                    intention that best aligns with where you are today.
                  </p>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                    There are no wrong answers. Choose the response that feels
                    most natural and let your intuition guide you.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Progress */}
          <section className="border-b border-zinc-200 bg-white">
            <div className="mx-auto max-w-6xl px-6 py-4">
              <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                    Your Progress
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    {answeredCount} of {QUESTIONS.length} answered
                  </p>
                </div>

                <div
                  role="progressbar"
                  aria-label="Quiz progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progressPercentage}
                  className="h-px overflow-hidden bg-zinc-300"
                >
                  <div
                    className="h-full bg-[#D1A954] transition-all duration-500"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  />
                </div>

                <p className="text-xs font-medium text-zinc-950">
                  {progressPercentage}%
                </p>
              </div>
            </div>
          </section>

          {/* Questions */}
          <section className="bg-[#faf8f4]">
            <div className="mx-auto max-w-6xl px-6 py-9 sm:py-11 lg:py-12">
              <div className="space-y-10 sm:space-y-12">
                {QUESTIONS.map((question, questionIndex) => (
                  <article
                    key={question.id}
                    className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14"
                  >
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                        Question 0{questionIndex + 1}
                      </p>

                      <h2 className="mt-3 max-w-md font-cormorant text-2xl font-semibold leading-[1.08] tracking-tight text-zinc-950 sm:text-3xl">
                        {question.prompt}
                      </h2>
                    </div>

                    <div className="grid border-x border-b border-zinc-300 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => {
                        const active =
                          answers[question.id] === option.intention;

                        return (
                          <button
                            key={`${question.id}-${optionIndex}`}
                            type="button"
                            onClick={() =>
                              choose(question.id, option.intention)
                            }
                            aria-pressed={active}
                            className={`group min-h-[112px] border-t border-zinc-300 p-5 text-left transition-colors ${
                              optionIndex % 2 !== 0
                                ? "sm:border-l sm:border-zinc-300"
                                : ""
                            } ${
                              active
                                ? "bg-zinc-900 text-white"
                                : "bg-white text-zinc-950 hover:bg-[#f7f4ee]"
                            }`}
                          >
                            <div className="flex h-full flex-col justify-between gap-5">
                              <div className="flex items-start justify-between gap-4">
                                <p
                                  className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
                                    active
                                      ? "text-[#D1A954]"
                                      : "text-zinc-400"
                                  }`}
                                >
                                  0{optionIndex + 1}
                                </p>

                                <span
                                  aria-hidden="true"
                                  className={`inline-flex h-4 w-4 items-center justify-center rounded-full border text-[8px] transition-colors ${
                                    active
                                      ? "border-[#D1A954] bg-[#D1A954] text-zinc-950"
                                      : "border-zinc-300 text-transparent group-hover:border-[#9b793d]"
                                  }`}
                                >
                                  ✓
                                </span>
                              </div>

                              <p
                                className={`max-w-sm text-sm leading-6 ${
                                  active ? "text-white" : "text-zinc-700"
                                }`}
                              >
                                {option.label}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-zinc-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/"
                  className="group inline-flex w-fit items-center gap-3 text-sm font-medium text-zinc-600 transition-colors hover:text-[#9b793d]"
                >
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                  Back to Home
                </Link>

                <button
                  type="button"
                  onClick={submitQuiz}
                  disabled={incomplete}
                  title={
                    incomplete
                      ? "Please answer all questions"
                      : "See your intention"
                  }
                  className="group inline-flex h-11 items-center justify-center gap-3 bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-[#9b793d] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
                >
                  See Your Intention

                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Reassurance */}
          <section className="bg-zinc-900">
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 sm:py-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D1A954]">
                A Gentle Reminder
              </p>

              <p className="max-w-3xl font-cormorant text-2xl font-medium leading-[1.2] tracking-tight text-white sm:text-3xl">
                Your result is not a rule. It is simply an invitation to notice
                what your inner world may be asking for.
              </p>
            </div>
          </section>
        </>
      )}

      {/* Result */}
      {submitted && result && resultData && (
        <>
          <section className="relative overflow-hidden bg-zinc-900">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#D1A954]/10 blur-3xl transition-opacity duration-1000 ${
                shimmer ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-18">
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D1A954]">
                    Your Intention
                  </p>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Based on the answers that felt most aligned with you.
                  </p>
                </div>

                <div>
                  <h1 className="max-w-3xl font-cormorant text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
                    {resultData.title}
                  </h1>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
                    {resultData.blurb}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-6">
                    <Link
                      href={`/intention/${result}`}
                      className="group inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-medium text-white transition-colors hover:border-[#D1A954] hover:text-[#D1A954]"
                    >
                      Explore {resultData.title}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>

                    <Link
                      href="/shop"
                      className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-300 transition-colors hover:text-[#D1A954]"
                    >
                      Shop All Candles
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {products.length > 0 && (
            <section className="bg-[#faf8f4]">
              <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12 lg:py-14">
                <div className="grid gap-7 border-b border-zinc-300 pb-7 lg:grid-cols-[1fr_0.75fr] lg:items-end">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                      Chosen For You
                    </p>

                    <h2 className="mt-3 max-w-xl font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
                      A candle aligned with {resultData.title}
                    </h2>
                  </div>

                  <p className="max-w-md text-sm leading-6 text-zinc-600 lg:justify-self-end">
                    Thoughtfully created to help you bring this intention into
                    your everyday ritual.
                  </p>
                </div>

                <div className="mt-8 max-w-3xl">
                  {products.slice(0, 1).map((product: any, index: number) => {
                    const image =
                      product.image || product.images?.[0] || undefined;

                    const pricePence =
                      typeof product.pricePence === "number"
                        ? product.pricePence
                        : typeof product.price === "number"
                        ? product.price
                        : 0;

                    return (
                      <Link
                        key={
                          product.handle ??
                          product.id ??
                          product.title ??
                          index
                        }
                        href={`/product/${product.handle}`}
                        className="group grid border-y border-zinc-300 py-6 sm:grid-cols-[220px_1fr] sm:items-stretch sm:gap-8"
                      >
                        <div className="relative aspect-square overflow-hidden bg-[#eee9df] sm:aspect-auto sm:min-h-[230px]">
                          {image ? (
                            <Image
                              src={image}
                              alt={product.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                              sizes="(min-width: 640px) 220px, 100vw"
                            />
                          ) : null}
                        </div>

                        <div className="flex flex-col justify-between pt-5 sm:pt-1">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                              Recommended Intention Candle
                            </p>

                            <h3 className="mt-3 font-cormorant text-3xl font-semibold tracking-tight text-zinc-950">
                              {product.title}
                            </h3>

                            {product.description ? (
                              <p className="mt-4 max-w-md text-sm leading-7 text-zinc-600">
                                {product.description}
                              </p>
                            ) : (
                              <p className="mt-4 max-w-md text-sm leading-7 text-zinc-600">
                                A carefully crafted candle designed to support
                                the intention revealed through your answers.
                              </p>
                            )}
                          </div>

                          <div className="mt-7 flex items-end justify-between gap-6 border-t border-zinc-300 pt-5">
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                                Price
                              </p>

                              <p className="mt-1 text-base font-medium text-zinc-950">
                                {formatGBP(pricePence)}
                              </p>
                            </div>

                            <span className="inline-flex items-center gap-3 text-sm font-medium text-zinc-950 transition-colors group-hover:text-[#9b793d]">
                              View Candle
                              <span
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              >
                                →
                              </span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          <section className="border-t border-zinc-200 bg-[#f7f4ee]">
            <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
              <div className="grid gap-7 border-y border-zinc-300 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                    Begin Again
                  </p>

                  <h2 className="mt-3 max-w-xl font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950">
                    Your intention may change as life changes.
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={retakeQuiz}
                  className="group inline-flex h-11 w-fit items-center justify-center gap-3 bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-[#9b793d]"
                >
                  Retake Quiz
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Edge Case */}
      {submitted && !result && (
        <section className="min-h-[50vh] bg-[#faf8f4]">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
            <div className="border-y border-zinc-300 py-10 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                No Clear Result
              </p>

              <h1 className="mt-3 font-cormorant text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Let&apos;s begin again.
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-600">
                We could not determine a clear intention from those answers.
                Retake the quiz and choose the responses that feel most natural
                to you.
              </p>

              <button
                type="button"
                onClick={retakeQuiz}
                className="group mt-7 inline-flex h-11 items-center justify-center gap-3 bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-[#9b793d]"
              >
                Retake Quiz
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}