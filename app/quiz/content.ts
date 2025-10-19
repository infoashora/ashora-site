// Quiz content mapping answers to intention slugs.
// Keep slugs in sync with your Intention + Product catalogs.

export type IntentionKey =
  | "manifestation"
  | "love-self-love"
  | "wealth-abundance"
  | "peace-healing";

export type QuizOption = {
  label: string;
  intention: IntentionKey;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "goal",
    prompt: "What are you calling in right now?",
    options: [
      { label: "A specific desire or outcome", intention: "manifestation" },
      { label: "Deeper self-worth & love", intention: "love-self-love" },
      { label: "Prosperity & opportunity", intention: "wealth-abundance" },
      { label: "Calm, rest & healing", intention: "peace-healing" },
    ],
  },
  {
    id: "block",
    prompt: "What feels most in the way?",
    options: [
      { label: "Lack of clarity / focus", intention: "manifestation" },
      { label: "Self-criticism or loneliness", intention: "love-self-love" },
      { label: "Money stress / stagnation", intention: "wealth-abundance" },
      { label: "Anxious mind / low energy", intention: "peace-healing" },
    ],
  },
  {
    id: "practice",
    prompt: "What ritual vibe are you drawn to?",
    options: [
      { label: "Write it, see it, act on it", intention: "manifestation" },
      { label: "Soft, heart-led reflection", intention: "love-self-love" },
      { label: "Gratitude + bold action", intention: "wealth-abundance" },
      { label: "Breath, slow presence", intention: "peace-healing" },
    ],
  },
];
