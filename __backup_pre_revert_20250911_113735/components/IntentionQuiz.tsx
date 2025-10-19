"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type IntentionSlug = "manifestation" | "love-self-love" | "wealth-abundance" | "peace-healing";

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
      { label: "New opportunities & momentum", to: "manifestation" },
      { label: "Deeper self-love & connection", to: "love-self-love" },
      { label: "Financial flow & expansion", to: "wealth-abundance" },
      { label: "Calm, clarity & rest", to: "peace-healing" },
    ],
  },
  {
    id: "q2",
    title: "Which feeling do you want your space to hold?",
    options: [
      { label: "Spark & forward motion", to: "manifestation" },
      { label: "Soft, heart-open devotion", to: "love-self-love" },
      { label: "Grounded confidence", to: "wealth-abundance" },
      { label: "Quiet clarity", to: "peace-healing" },
    ],
  },
  {
    id: "q3",
    title: "Choose a blend youâ€™re drawn to:",
    options: [
      { label: "Bay Leaf â€¢ Cinnamon â€¢ Rosemary", to: "manifestation" },
      { label: "Rose â€¢ Cornflower â€¢ Lavender", to: "love-self-love" },
      { label: "Cinnamon Shards â€¢ Basil â€¢ Peppermint", to: "wealth-abundance" },
      { label: "Lavender â€¢ Chamomile â€¢ Rosemary", to: "peace-healing" },
    ],
  },
  {
    id: "q4",
    title: "After your ritual, youâ€™d like to feelâ€¦",
    options: [
      { label: "Motivated & aligned", to: "manifestation" },
      { label: "Cherished & receptive", to: "love-self-love" },
      { label: "Abundant & in flow", to: "wealth-abundance" },
      { label: "Restored & soothed", to: "peace-healing" },
    ],
  },
  {
    id: "q5",
    title: "Pick a colour that speaks to you:",
    options: [
      { label: "Soft gold / white", to: "manifestation" },
      { label: "Blush pink", to: "love-self-love" },
      { label: "Fresh green", to: "wealth-abundance" },
      { label: "Baby blue", to: "peace-healing" },
    ],
  },
];

const INTENTION_COPY: Record<
  IntentionSlug,
  { name: string; excerpt: string; color: string }
> = {
  manifestation: {
    name: "Manifestation",
    excerpt: "Amplify your desires and call in aligned opportunities.",
    color: "gold",
  },
  "love-self-love": {
    name: "Love & Self-Love",
    excerpt: "Open the heartâ€”invite softness, devotion, and connection.",
    color: "accentPink",
  },
  "wealth-abundance": {
    name: "Wealth & Abundance",
    excerpt: "Welcome flow, expansion, and confident action.",
    color: "accentGreen",
  },
  "peace-healing": {
    name: "Peace & Healing",
    excerpt: "Exhale tensionâ€”return to calm, clarity, and ease.",
    color: "accentBlue",
  },
};

function toRitualSlug(slug: IntentionSlug) {
  return `ritual-box-${slug}`;
}

export default function IntentionQuiz() {
  const [step, setStep] = useState(0); // 0..QUESTIONS.length (result screen after last)
  const [answers, setAnswers] = useState<IntentionSlug[]>(Array(QUESTIONS.length).fill(null) as any);

  const progress = Math.round((step / QUESTIONS.length) * 100);

  const canNext = step < QUESTIONS.length && answers[step] != null;
  const canPrev = step > 0;

  const result = useMemo(() => {
    if (step < QUESTIONS.length) return null;

    const score: Record<IntentionSlug, number> = {
      manifestation: 0,
      "love-self-love": 0,
      "wealth-abundance": 0,
      "peace-healing": 0,
    };

    answers.forEach((slug, idx) => {
      if (!slug) return;
      // Slight extra weight to Q1 as it's the clearest signal
      score[slug] += idx === 0 ? 1.4 : 1;
    });

    const winner = (Object.keys(score) as IntentionSlug[]).sort(
      (a, b) => score[b] - score[a]
    )[0];

    return winner;
  }, [answers, step]);

  if (step >= QUESTIONS.length && result) {
    const meta = INTENTION_COPY[result];
    return (
      <section className="mx-auto max-w-3xl px-6 py-14 space-y-6">
        <header className="space-y-2">
          <p className="text-sm opacity-70">Your result</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {meta.name}
          </h1>
          <p className="text-sm opacity-80">{meta.excerpt}</p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href={`/intention/${result}`} className="btn bg-parchment hover:text-gold no-underline">
            Learn about {meta.name}
          </Link>
          <Link href={`/product/${result}`} className="btn bg-ink text-white hover:bg-ink/90 no-underline">
            Shop the Candle
          </Link>
          <Link href={`/product/${toRitualSlug(result)}`} className="btn bg-parchment hover:text-gold no-underline">
            Explore the Ritual Box
          </Link>
          <Link href="/collections#herb-boxes" className="btn bg-parchment hover:text-gold no-underline">
            Browse Herb Boxes
          </Link>
        </div>

        <div className="pt-4">
          <button
            className="text-sm opacity-80 hover:text-gold no-underline"
            onClick={() => {
              setAnswers(Array(QUESTIONS.length).fill(null) as any);
              setStep(0);
            }}
          >
            Retake the quiz
          </button>
        </div>
      </section>
    );
  }

  const q = QUESTIONS[step];

  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-70">Question {step + 1} of {QUESTIONS.length}</p>
          <p className="text-sm opacity-70">{progress}%</p>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-ink/10">
          <div
            className="h-1.5 rounded-full bg-gold transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h1 className="text-xl font-medium">{q.title}</h1>

        <div className="grid gap-3">
          {q.options.map((opt) => {
            const active = answers[step] === opt.to;
            return (
              <button
                key={opt.label}
                onClick={() => {
                  const next = [...answers];
                  next[step] = opt.to;
                  setAnswers(next as any);
                }}
                className={
                  "text-left rounded-xl border px-4 py-3 " +
                  (active
                    ? "border-ink bg-white shadow-sm"
                    : "border-ink/10 bg-white hover:ring-1 hover:ring-gold/40")
                }
                aria-pressed={active}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between pt-2">
          <button
            className="text-sm opacity-80 hover:text-gold no-underline"
            onClick={() => canPrev && setStep((s) => Math.max(0, s - 1))}
            disabled={!canPrev}
          >
            â† Back
          </button>

          {step < QUESTIONS.length - 1 ? (
            <button
              className={"btn " + (canNext ? "bg-ink text-white hover:bg-ink/90" : "bg-ink/20 text-ink cursor-not-allowed")}
              onClick={() => canNext && setStep((s) => s + 1)}
              disabled={!canNext}
            >
              Next
            </button>
          ) : (
            <button
              className={"btn " + (canNext ? "bg-gold text-ink hover:bg-gold/90" : "bg-ink/20 text-ink cursor-not-allowed")}
              onClick={() => canNext && setStep((s) => s + 1)}
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
