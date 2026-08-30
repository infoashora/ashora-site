"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type IntentionSlug =
  | "manifestation"
  | "love-self-love"
  | "wealth-abundance"
  | "peace-healing";

type Option = {
  label: string;
  to: IntentionSlug;
};

type Question = {
  id: string;
  title: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "What are you calling in right now?",
    options: [
      {
        label: "New opportunities & momentum",
        to: "manifestation",
      },
      {
        label: "Deeper self-love & connection",
        to: "love-self-love",
      },
      {
        label: "Financial flow & expansion",
        to: "wealth-abundance",
      },
      {
        label: "Calm, clarity & rest",
        to: "peace-healing",
      },
    ],
  },
  {
    id: "q2",
    title: "Which feeling do you want your space to hold?",
    options: [
      {
        label: "Spark & forward motion",
        to: "manifestation",
      },
      {
        label: "Soft, heart-open devotion",
        to: "love-self-love",
      },
      {
        label: "Grounded confidence",
        to: "wealth-abundance",
      },
      {
        label: "Quiet clarity",
        to: "peace-healing",
      },
    ],
  },
  {
    id: "q3",
    title: "Choose a blend you’re drawn to:",
    options: [
      {
        label: "Bay Leaf · Cinnamon · Rosemary",
        to: "manifestation",
      },
      {
        label: "Rose · Cornflower · Lavender",
        to: "love-self-love",
      },
      {
        label: "Cinnamon Shards · Basil · Peppermint",
        to: "wealth-abundance",
      },
      {
        label: "Lavender · Chamomile · Rosemary",
        to: "peace-healing",
      },
    ],
  },
  {
    id: "q4",
    title: "After your ritual, you’d like to feel…",
    options: [
      {
        label: "Motivated & aligned",
        to: "manifestation",
      },
      {
        label: "Cherished & receptive",
        to: "love-self-love",
      },
      {
        label: "Abundant & in flow",
        to: "wealth-abundance",
      },
      {
        label: "Restored & soothed",
        to: "peace-healing",
      },
    ],
  },
  {
    id: "q5",
    title: "Pick a colour that speaks to you:",
    options: [
      {
        label: "Soft gold / white",
        to: "manifestation",
      },
      {
        label: "Blush pink",
        to: "love-self-love",
      },
      {
        label: "Fresh green",
        to: "wealth-abundance",
      },
      {
        label: "Baby blue",
        to: "peace-healing",
      },
    ],
  },
];

const INTENTION_COPY: Record<
  IntentionSlug,
  {
    name: string;
    excerpt: string;
  }
> = {
  manifestation: {
    name: "Manifestation",
    excerpt: "Amplify your desires and call in aligned opportunities.",
  },
  "love-self-love": {
    name: "Love & Self-Love",
    excerpt:
      "Open the heart—invite softness, devotion, and connection.",
  },
  "wealth-abundance": {
    name: "Wealth & Abundance",
    excerpt: "Welcome flow, expansion, and confident action.",
  },
  "peace-healing": {
    name: "Peace & Healing",
    excerpt: "Exhale tension—return to calm, clarity, and ease.",
  },
};

function toCandleHandle(slug: IntentionSlug): string {
  return `${slug}-candle`;
}

export default function IntentionQuiz() {
  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState<Array<IntentionSlug | null>>(
    Array(QUESTIONS.length).fill(null)
  );

  const progress = Math.round((step / QUESTIONS.length) * 100);

  const canNext =
    step < QUESTIONS.length && answers[step] !== null;

  const canPrev = step > 0;

  const result = useMemo(() => {
    if (step < QUESTIONS.length) {
      return null;
    }

    const score: Record<IntentionSlug, number> = {
      manifestation: 0,
      "love-self-love": 0,
      "wealth-abundance": 0,
      "peace-healing": 0,
    };

    answers.forEach((slug, index) => {
      if (!slug) {
        return;
      }

      score[slug] += index === 0 ? 1.4 : 1;
    });

    return (Object.keys(score) as IntentionSlug[]).sort(
      (a, b) => score[b] - score[a]
    )[0];
  }, [answers, step]);

  if (step >= QUESTIONS.length && result) {
    const meta = INTENTION_COPY[result];

    return (
      <section className="mx-auto max-w-3xl space-y-6 px-6 py-14">
        <header className="space-y-2">
          <p className="text-sm opacity-70">
            Your result
          </p>

          <h1 className="text-2xl font-semibold tracking-tight">
            {meta.name}
          </h1>

          <p className="text-sm opacity-80">
            {meta.excerpt}
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/intention/${result}`}
            className="btn bg-parchment no-underline hover:text-gold"
          >
            Learn about {meta.name}
          </Link>

          <Link
            href={`/product/${toCandleHandle(result)}`}
            className="btn bg-ink text-white no-underline hover:bg-ink/90"
          >
            Shop the {meta.name} Candle
          </Link>

          <Link
            href="/shop"
            className="btn bg-parchment no-underline hover:text-gold sm:col-span-2"
          >
            Browse all candles
          </Link>
        </div>

        <div className="pt-4">
          <button
            type="button"
            className="text-sm opacity-80 hover:text-gold"
            onClick={() => {
              setAnswers(Array(QUESTIONS.length).fill(null));
              setStep(0);
            }}
          >
            Retake the quiz
          </button>
        </div>
      </section>
    );
  }

  const question = QUESTIONS[step];

  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-70">
            Question {step + 1} of {QUESTIONS.length}
          </p>

          <p className="text-sm opacity-70">
            {progress}%
          </p>
        </div>

        <div className="mt-2 h-1.5 w-full rounded-full bg-ink/10">
          <div
            className="h-1.5 rounded-full bg-gold transition-[width]"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-xl font-medium">
          {question.title}
        </h1>

        <div className="grid gap-3">
          {question.options.map((option) => {
            const active = answers[step] === option.to;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => {
                  const nextAnswers = [...answers];
                  nextAnswers[step] = option.to;
                  setAnswers(nextAnswers);
                }}
                className={`rounded-xl border px-4 py-3 text-left ${
                  active
                    ? "border-ink bg-white shadow-sm"
                    : "border-ink/10 bg-white hover:ring-1 hover:ring-gold/40"
                }`}
                aria-pressed={active}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            className="text-sm opacity-80 hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() =>
              canPrev &&
              setStep((current) => Math.max(0, current - 1))
            }
            disabled={!canPrev}
          >
            ← Back
          </button>

          {step < QUESTIONS.length - 1 ? (
            <button
              type="button"
              className={`btn ${
                canNext
                  ? "bg-ink text-white hover:bg-ink/90"
                  : "cursor-not-allowed bg-ink/20 text-ink"
              }`}
              onClick={() =>
                canNext && setStep((current) => current + 1)
              }
              disabled={!canNext}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className={`btn ${
                canNext
                  ? "bg-gold text-ink hover:bg-gold/90"
                  : "cursor-not-allowed bg-ink/20 text-ink"
              }`}
              onClick={() =>
                canNext && setStep((current) => current + 1)
              }
              disabled={!canNext}
            >
              See my match
            </button>
          )}
        </div>
      </div>
    </section>
  );
}