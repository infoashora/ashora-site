// data/products.ts
export type Category = "candle" | "herb-box" | "ritual-box";

export type Product = {
  id: string;
  slug: string;
  name: string;
  intention: "Manifestation" | "Love & Self-Love" | "Wealth & Abundance" | "Peace & Healing";
  category: Category;
  description: string; // bougie, nurturing, mystical tone
  price: number; // pence
  waxColor?: string;
  crystals?: string[];
  herbs?: string[];
  images: string[]; // paths under /public
  /** Optional “Smells like?” copy shown as a collapsible section on PDPs */
  smellsLike?: string;
};

const I = {
  MANIFESTATION: "manifestation",
  LOVE: "love-self-love",
  WEALTH: "wealth-abundance",
  PEACE: "peace-healing",
} as const;

const P = {
  CANDLE: 1999,
  HERB: 1199,
  RITUAL: 3999,
} as const;

const desc = {
  candle: (title: string) =>
    `${title} — a hand-poured, vegan intention candle infused with curated herbs and crystals. Comes with a ritual card to guide your practice.`,
  herb: (title: string) =>
    `${title} Herb Box — a sacred botanical blend with matching crystal chips, crafted to complement your candle ritual or to stand alone for altar work.`,
  ritual: (title: string) =>
    `${title} Ritual Box — a complete experience with a candle, herb pack, blessed ritual salt, two affirmation cards, and a personally selected crystal.`,
};

export const products: Product[] = [
  {
    id: "candle-manifestation",
    slug: `product/${I.MANIFESTATION}-candle`,
    name: "Manifestation Candle",
    intention: "Manifestation",
    category: "candle",
    description: desc.candle("Manifestation"),
    price: P.CANDLE,
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
    description: desc.candle("Love & Self-Love"),
    price: P.CANDLE,
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
    description: desc.candle("Wealth & Abundance"),
    price: P.CANDLE,
    waxColor: "Light green (gold shimmer optional)",
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
    description: desc.candle("Peace & Healing"),
    price: P.CANDLE,
    waxColor: "Baby blue",
    crystals: ["Amethyst", "Howlite"],
    herbs: ["Lavender", "Chamomile", "Rosemary"],
    images: ["/products/candles/candle-peace-healing.png"],
    // Brand spec uses Howlite (replacing Selenite); keeping copy aligned to spec:
    smellsLike:
      "Infused with Amethyst to calm the spirit and Howlite to soften the mind, this hand-poured blend of Lavender, Chamomile, and Rosemary soothes and restores the soul. A comforting fusion of tobacco, honey, and amber grounds the senses — releasing tension and guiding you back to inner harmony.",
  },

  {
    id: "herb-manifestation",
    slug: `product/${I.MANIFESTATION}-herb-box`,
    name: "Manifestation Herb Box",
    intention: "Manifestation",
    category: "herb-box",
    description: desc.herb("Manifestation"),
    price: P.HERB,
    images: ["/products/herb-boxes/herb-manifestation.png"],
  },
  {
    id: "herb-love",
    slug: `product/${I.LOVE}-herb-box`,
    name: "Love & Self-Love Herb Box",
    intention: "Love & Self-Love",
    category: "herb-box",
    description: desc.herb("Love & Self-Love"),
    price: P.HERB,
    images: ["/products/herb-boxes/herb-love-self-love.png"],
  },
  {
    id: "herb-wealth",
    slug: `product/${I.WEALTH}-herb-box`,
    name: "Wealth & Abundance Herb Box",
    intention: "Wealth & Abundance",
    category: "herb-box",
    description: desc.herb("Wealth & Abundance"),
    price: P.HERB,
    images: ["/products/herb-boxes/herb-wealth-abundance.png"],
  },
  {
    id: "herb-peace",
    slug: `product/${I.PEACE}-herb-box`,
    name: "Peace & Healing Herb Box",
    intention: "Peace & Healing",
    category: "herb-box",
    description: desc.herb("Peace & Healing"),
    price: P.HERB,
    images: ["/products/herb-boxes/herb-peace-healing.png"],
  },

  {
    id: "ritual-manifestation",
    slug: `product/${I.MANIFESTATION}-ritual-box`,
    name: "Manifestation Ritual Box",
    intention: "Manifestation",
    category: "ritual-box",
    description: desc.ritual("Manifestation"),
    price: P.RITUAL,
    images: ["/products/ritual-boxes/ritual-manifestation.png"],
  },
  {
    id: "ritual-love",
    slug: `product/${I.LOVE}-ritual-box`,
    name: "Love & Self-Love Ritual Box",
    intention: "Love & Self-Love",
    category: "ritual-box",
    description: desc.ritual("Love & Self-Love"),
    price: P.RITUAL,
    images: ["/products/ritual-boxes/ritual-love-self-love.png"],
  },
  {
    id: "ritual-wealth",
    slug: `product/${I.WEALTH}-ritual-box`,
    name: "Wealth & Abundance Ritual Box",
    intention: "Wealth & Abundance",
    category: "ritual-box",
    description: desc.ritual("Wealth & Abundance"),
    price: P.RITUAL,
    images: ["/products/ritual-boxes/ritual-wealth-abundance.png"],
  },
  {
    id: "ritual-peace",
    slug: `product/${I.PEACE}-ritual-box`,
    name: "Peace & Healing Ritual Box",
    intention: "Peace & Healing",
    category: "ritual-box",
    description: desc.ritual("Peace & Healing"),
    price: P.RITUAL,
    images: ["/products/ritual-boxes/ritual-peace-healing.png"],
  },
];

export function getFeaturedProducts(count = 4) {
  const pick = (cat: Category) => products.filter((p) => p.category === cat);
  const featured = [
    pick("candle")[0],
    pick("herb-box")[0],
    pick("ritual-box")[0],
    pick("candle")[1] ?? pick("herb-box")[1] ?? pick("ritual-box")[1],
  ].filter(Boolean);
  return featured.slice(0, count);
}

export function getProductsByCategory(category: Category) {
  return products.filter((p) => p.category === category);
}

export function getProductsByIntention(intentionSlug: string) {
  const map: Record<string, Product["intention"]> = {
    [I.MANIFESTATION]: "Manifestation",
    [I.LOVE]: "Love & Self-Love",
    [I.WEALTH]: "Wealth & Abundance",
    [I.PEACE]: "Peace & Healing",
  };
  const intent = map[intentionSlug];
  return intent ? products.filter((p) => p.intention === intent) : [];
}

export function findProductBySlug(slug: string) {
  return products.find((p) => p.slug.endsWith(slug) || p.slug === slug);
}
