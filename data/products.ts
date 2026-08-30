// data/products.ts
export type Category = "candle";

export type Product = {
  id: string;
  slug: string;
  name: string;
  intention:
    | "Manifestation"
    | "Love & Self-Love"
    | "Wealth & Abundance"
    | "Peace & Healing";
  category: Category;
  description: string;
  price: number;
  waxColor?: string;
  crystals?: string[];
  herbs?: string[];
  images: string[];
  smellsLike?: string;
};

const I = {
  MANIFESTATION: "manifestation",
  LOVE: "love-self-love",
  WEALTH: "wealth-abundance",
  PEACE: "peace-healing",
} as const;

const CANDLE_PRICE = 1999;

const candleDescription = (title: string) =>
  `${title} — a hand-poured, vegan intention candle infused with curated herbs and crystals. Comes with a ritual card to guide your practice.`;

export const products: Product[] = [
  {
    id: "candle-manifestation",
    slug: `product/${I.MANIFESTATION}-candle`,
    name: "Manifestation Candle",
    intention: "Manifestation",
    category: "candle",
    description: candleDescription("Manifestation"),
    price: CANDLE_PRICE,
    waxColor: "White with soft gold",
    crystals: ["Clear Quartz", "Citrine"],
    herbs: ["Bay Leaf", "Cinnamon", "Rosemary"],
    images: ["/products/candles/candle-manifestation.png"],
    smellsLike:
      "Infused with Clear Quartz for clarity and Citrine for abundance, this hand-poured blend of Bay Leaf, Cinnamon, and Rosemary aligns energy with purpose. A delicate fusion of pear, jasmine, and soft vanilla evokes focus and draws your manifestations into being.",
  },
  {
    id: "candle-love",
    slug: `product/${I.LOVE}-candle`,
    name: "Love & Self-Love Candle",
    intention: "Love & Self-Love",
    category: "candle",
    description: candleDescription("Love & Self-Love"),
    price: CANDLE_PRICE,
    waxColor: "Baby pink",
    crystals: ["Rose Quartz", "Moonstone"],
    herbs: ["Rose Petals", "Lavender", "Cornflower"],
    images: ["/products/candles/candle-love-self-love.png"],
    smellsLike:
      "Infused with Rose Aura Quartz to open the heart and Moonstone to restore inner harmony, this hand-poured blend of Rose Petals, Lavender, and Cornflower nurtures tenderness and devotion. A romantic fusion of rose, freesia, and amber envelops the senses — inviting love in all its forms and reminding you of your inherent worthiness.",
  },
  {
    id: "candle-wealth",
    slug: `product/${I.WEALTH}-candle`,
    name: "Wealth & Abundance Candle",
    intention: "Wealth & Abundance",
    category: "candle",
    description: candleDescription("Wealth & Abundance"),
    price: CANDLE_PRICE,
    waxColor: "Light green with optional gold shimmer",
    crystals: ["Green Aventurine", "Citrine"],
    herbs: ["Cinnamon", "Basil", "Peppermint"],
    images: ["/products/candles/candle-wealth-abundance.png"],
    smellsLike:
      "Infused with Green Aventurine to attract prosperity and Citrine to amplify success, this hand-poured blend of Cinnamon, Basil, and Peppermint channels opportunity and gratitude. A warm harmony of mandarin, rose, and amber awakens confidence — aligning your energy with abundance in every form.",
  },
  {
    id: "candle-peace",
    slug: `product/${I.PEACE}-candle`,
    name: "Peace & Healing Candle",
    intention: "Peace & Healing",
    category: "candle",
    description: candleDescription("Peace & Healing"),
    price: CANDLE_PRICE,
    waxColor: "Baby blue",
    crystals: ["Amethyst", "Howlite"],
    herbs: ["Lavender", "Chamomile", "Rosemary"],
    images: ["/products/candles/candle-peace-healing.png"],
    smellsLike:
      "Infused with Amethyst to calm the spirit and Howlite to soften the mind, this hand-poured blend of Lavender, Chamomile, and Rosemary soothes and restores the soul. A comforting fusion of tobacco, honey, and amber grounds the senses — releasing tension and guiding you back to inner harmony.",
  },
];

export function getFeaturedProducts(count = 4) {
  return products.slice(0, count);
}

export function getProductsByCategory(category: Category) {
  return products.filter((product) => product.category === category);
}

export function getProductsByIntention(intentionSlug: string) {
  const map: Record<string, Product["intention"]> = {
    [I.MANIFESTATION]: "Manifestation",
    [I.LOVE]: "Love & Self-Love",
    [I.WEALTH]: "Wealth & Abundance",
    [I.PEACE]: "Peace & Healing",
  };

  const intention = map[intentionSlug];

  return intention
    ? products.filter((product) => product.intention === intention)
    : [];
}

export function findProductBySlug(slug: string) {
  return products.find(
    (product) => product.slug.endsWith(slug) || product.slug === slug
  );
}