// app/intention/content.ts

export type IntentionKey =
  | "manifestation"
  | "love-self-love"
  | "wealth-abundance"
  | "peace-healing";

export type IntentionData = {
  slug: IntentionKey;
  title: string;
  blurb: string;
  crystals: string;
  herbs: string;
  affirmations: string[];
  rituals: string[];
  /** Informal, useful guidance about where this helps on a spiritual journey. */
  journeyHtml: string;
  /** When to reach for this intention (simple scenarios). */
  whenToUse: string[];
};

export const INTENTIONS: Record<IntentionKey, IntentionData> = {
  manifestation: {
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
    journeyHtml: `
      <p><strong>Why this matters now:</strong> Manifestation is most helpful when you’re moving from wishing to <em>doing</em>. 
      Clarifying goals, visualising outcomes, and taking small aligned steps can boost focus, motivation and follow-through — a grounded complement to spiritual practice.</p>
      <p>Use this when you’re setting a fresh intention, shaping a new season in your life, or calling momentum into a project. Pair intention-setting with one simple, next-step action to honour the ritual.</p>
    `,
    whenToUse: [
      "New beginnings (career moves, studies, launches)",
      "Re-focusing after a lull or dip in motivation",
      "Clarifying goals before a big decision or milestone",
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
    journeyHtml: `
      <p><strong>Why this matters now:</strong> Self-love and compassion build emotional steadiness and healthier choices. 
      Treating yourself with warmth (especially during setbacks) supports resilience and more authentic connection with others.</p>
      <p>Use this when you’re rebuilding trust with yourself, tending to the heart after change, or inviting gentler patterns in love and friendship.</p>
    `,
    whenToUse: [
      "Healing after a breakup or transition",
      "Quieting harsh self-talk; building self-worth",
      "Deepening intimacy and emotional availability",
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
    journeyHtml: `
      <p><strong>Why this matters now:</strong> An abundance mindset pairs gratitude with practical clarity. 
      When you honour what’s working and name your next step, you create momentum — spiritually and financially.</p>
      <p>Use this to refresh money energy, plan with confidence, and invite opportunities that match your standards.</p>
    `,
    whenToUse: [
      "Calling in clients, sales, or career opportunities",
      "Shifting out of scarcity loops into steady action",
      "Setting income goals and celebrating progress",
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
    journeyHtml: `
      <p><strong>Why this matters now:</strong> Calm is a skill. Breath, stillness, and simple ritual help downshift stress and create space for the body’s natural repair. 
      Peace supports clearer thinking — and kinder choices.</p>
      <p>Use this for decompression, gentle recovery, and clearing stagnant emotion from your space and system.</p>
    `,
    whenToUse: [
      "Overwhelm, anxious spirals, or busy seasons",
      "Creating a bedtime wind-down or digital sunset",
      "Grief work and gentle emotional processing",
    ],
  },
};

export function listIntentions() {
  return Object.values(INTENTIONS);
}

export function getIntention(slug: IntentionKey) {
  return INTENTIONS[slug];
}
