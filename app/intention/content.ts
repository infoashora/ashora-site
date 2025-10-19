// app/intention/content.ts
export type IntentionKey =
  | "manifestation"
  | "love-self-love"
  | "wealth-abundance"
  | "peace-healing";

type IntentionData = {
  slug: IntentionKey;
  title: string;
  blurb: string;
  crystals: string;
  herbs: string;
  affirmations: string[];
  rituals: string[];
};

export const INTENTIONS: Record<IntentionKey, IntentionData> = {
  "manifestation": {
    slug: "manifestation",
    title: "Manifestation",
    blurb:
      "Align thought, word, and action. Set a clear intention and let your energy call it in.",
    crystals: "Clear Quartz, Citrine",
    herbs: "Bay Leaf, Cinnamon, Rosemary",
    affirmations: [
      "I am a powerful creator.",
      "What I focus on grows.",
      "I welcome aligned opportunities with ease.",
    ],
    rituals: [
      "Write your intention on a bay leaf and place it beside the candle.",
      "Light the candle and visualize your outcome for 2–3 minutes.",
      "Repeat your affirmation 9 times and take one inspired action today.",
    ],
  },
  "love-self-love": {
    slug: "love-self-love",
    title: "Love & Self-Love",
    blurb:
      "Soften into compassion and magnetize loving connections—starting with yourself.",
    crystals: "Rose Quartz, Moonstone",
    herbs: "Rose Petals, Cornflower, Lavender",
    affirmations: [
      "I choose myself with kindness.",
      "I am worthy of deep, nourishing love.",
      "I give and receive love freely.",
    ],
    rituals: [
      "Hold the candle at your heart and breathe slowly for 10 counts.",
      "Write a love note to yourself and place it under the candle.",
      "Repeat your affirmation each time you notice your reflection today.",
    ],
  },
  "wealth-abundance": {
    slug: "wealth-abundance",
    title: "Wealth & Abundance",
    blurb:
      "Invite in prosperity through gratitude, clarity, and consistent action.",
    crystals: "Green Aventurine, Citrine",
    herbs: "Cinnamon, Basil, Peppermint",
    affirmations: [
      "Money flows to me in expected and unexpected ways.",
      "I am open to abundance in all forms.",
      "I take aligned action toward my goals.",
    ],
    rituals: [
      "List three things you’re grateful for financially—big or small.",
      "Anoint the candle rim with a tiny pinch of cinnamon (optional).",
      "Visualize your next income milestone for one minute daily.",
    ],
  },
  "peace-healing": {
    slug: "peace-healing",
    title: "Peace & Healing",
    blurb:
      "Soothe the nervous system and return to calm, centered presence.",
    crystals: "Amethyst, Howlite",
    herbs: "Lavender, Chamomile, Rosemary",
    affirmations: [
      "I am safe to rest and receive.",
      "Peace fills my body and mind.",
      "I release what no longer serves me.",
    ],
    rituals: [
      "Practice box-breathing: inhale 4, hold 4, exhale 4, hold 4 (×4).",
      "As the candle burns, journal one gentle thing you can do today.",
      "Close with gratitude for one thing your body has healed.",
    ],
  },
};

export function listIntentions() {
  return Object.values(INTENTIONS);
}
