// Product data + helpers for Ashora

export type Product = {
  id: string;
  slug: string;
  name: string;
  intention: string;
  description: string; // bougie, nurturing, mystical
  price: number; // pence
  waxColor: string;
  crystals: string[];
  herbs: string[];
  images: string[];
};

export type IntentionMeta = {
  slug: "manifestation" | "love-self-love" | "wealth-abundance" | "peace-healing";
  name: string;
  tile: string;
  color: string;
  excerpt: string;
  long: string;
};

// ----- Intention metadata -----
export const intentions: IntentionMeta[] = [
  {
    slug: "manifestation",
    name: "Manifestation",
    tile: "/featured/tile-manifestation.png",
    color: "gold",
    excerpt: "Amplify your desires and call in aligned opportunities.",
    long:
      "This pathway supports clarity, momentum, and courage to act. Clear Quartz and Citrine are traditionally used to amplify and focus intention, while a warm herb blend anchors your ritual in the present moment.",
  },
  {
    slug: "love-self-love",
    name: "Love & Self-Love",
    tile: "/featured/tile-love-self-love.png",
    color: "accentPink",
    excerpt: "Open the heartâ€”invite softness, devotion, and connection.",
    long:
      "A tender space for compassionâ€”toward yourself and others. Rose Quartz and Moonstone are paired with florals that encourage openness, self-worth, and balanced receptivity.",
  },
  {
    slug: "wealth-abundance",
    name: "Wealth & Abundance",
    tile: "/featured/tile-wealth-abundance.png",
    color: "accentGreen",
    excerpt: "Welcome flow, expansion, and confident action.",
    long:
      "This intention celebrates growth with grounded optimism. Green Aventurine and Citrine pair with bright herbs to energise your ritual and anchor consistent steps toward prosperity.",
  },
  {
    slug: "peace-healing",
    name: "Peace & Healing",
    tile: "/featured/tile-peace-healing.png",
    color: "accentBlue",
    excerpt: "Exhale tensionâ€”return to calm, clarity, and ease.",
    long:
      "For soothing the nervous system and restoring balance. Amethyst and Howlite are paired with calming botanicals to invite rest, introspection, and gentle repair.",
  },
];

// ----- Core candles (launch) -----
export const products: Product[] = [
  {
    id: "candle-manifestation",
    slug: "manifestation",
    name: "Manifestation Candle",
    intention: "Manifestation",
    description:
      "Call in aligned opportunities with a soft golden glow. Clear Quartz and Citrine amplify your desires while a warm herb blend anchors the ritual.",
    price: 1999,
    waxColor: "White with soft gold",
    crystals: ["Clear Quartz", "Citrine"],
    herbs: ["Bay Leaf", "Cinnamon", "Rosemary"],
    images: ["/products/candle-manifestation-label.png"],
  },
  {
    id: "candle-love",
    slug: "love-self-love",
    name: "Love & Self-Love Candle",
    intention: "Love & Self-Love",
    description:
      "A blush-pink aura for compassion and devotion. Rose Quartz and Moonstone soothe the heart while florals open gentle pathways to love.",
    price: 1999,
    waxColor: "Baby pink",
    crystals: ["Rose Quartz", "Moonstone"],
    herbs: ["Rose Petals", "Cornflower", "Lavender"],
    images: ["/products/candle-love-self-love-label.png"],
  },
  {
    id: "candle-wealth",
    slug: "wealth-abundance",
    name: "Wealth & Abundance Candle",
    intention: "Wealth & Abundance",
    description:
      "A fresh green flame for flow and expansion. Green Aventurine and Citrine invite prosperity as herbs kindle momentum and confidence.",
    price: 1999,
    waxColor: "Light green (with optional gold shimmer)",
    crystals: ["Green Aventurine", "Citrine"],
    herbs: ["Cinnamon stick shards", "Basil", "Peppermint"],
    images: ["/products/candle-wealth-abundance-label.png"],
  },
  {
    id: "candle-peace",
    slug: "peace-healing",
    name: "Peace & Healing Candle",
    intention: "Peace & Healing",
    description:
      "A baby-blue calm for restoration. Amethyst and Howlite soften the mind while a soothing herbal trio steadies the spirit.",
    price: 1999,
    waxColor: "Baby blue",
    crystals: ["Amethyst", "Howlite"],
    herbs: ["Lavender", "Chamomile", "Rosemary"],
    images: ["/products/candle-peace-healing-label.png"],
  },

  // ----- Ritual Boxes -----
  {
    id: "ritual-manifestation",
    slug: "ritual-box-manifestation",
    name: "Ritual Box â€” Manifestation",
    intention: "Manifestation",
    description:
      "Everything for a potent practice. Includes: candle, herb pack, ritual salt, 2 affirmation cards, candle care guide, and 1 hand-selected crystal (chosen for you by Caitlin).",
    price: 1499,
    waxColor: "â€”",
    crystals: ["Clear Quartz", "Citrine"],
    herbs: ["Bay Leaf", "Cinnamon", "Rosemary"],
    images: ["/featured/tile-manifestation.png"],
  },
  {
    id: "ritual-love",
    slug: "ritual-box-love-self-love",
    name: "Ritual Box â€” Love & Self-Love",
    intention: "Love & Self-Love",
    description:
      "Everything for a heart-led ritual. Includes: candle, herb pack, ritual salt, 2 affirmation cards, candle care guide, and 1 hand-selected crystal (chosen for you by Caitlin).",
    price: 1499,
    waxColor: "â€”",
    crystals: ["Rose Quartz", "Moonstone"],
    herbs: ["Rose Petals", "Cornflower", "Lavender"],
    images: ["/featured/tile-love-self-love.png"],
  },
  {
    id: "ritual-wealth",
    slug: "ritual-box-wealth-abundance",
    name: "Ritual Box â€” Wealth & Abundance",
    intention: "Wealth & Abundance",
    description:
      "Everything for expansion. Includes: candle, herb pack, ritual salt, 2 affirmation cards, candle care guide, and 1 hand-selected crystal (chosen for you by Caitlin).",
    price: 1499,
    waxColor: "â€”",
    crystals: ["Green Aventurine", "Citrine"],
    herbs: ["Cinnamon stick shards", "Basil", "Peppermint"],
    images: ["/featured/tile-wealth-abundance.png"],
  },
  {
    id: "ritual-peace",
    slug: "ritual-box-peace-healing",
    name: "Ritual Box â€” Peace & Healing",
    intention: "Peace & Healing",
    description:
      "Everything for gentle restoration. Includes: candle, herb pack, ritual salt, 2 affirmation cards, candle care guide, and 1 hand-selected crystal (chosen for you by Caitlin).",
    price: 1499,
    waxColor: "â€”",
    crystals: ["Amethyst", "Howlite"],
    herbs: ["Lavender", "Chamomile", "Rosemary"],
    images: ["/featured/tile-peace-healing.png"],
  },

  // ----- Herb Boxes -----
  {
    id: "herb-manifestation",
    slug: "herb-box-manifestation",
    name: "Herb Box â€” Manifestation",
    intention: "Manifestation",
    description:
      "Curated herb blend with crystal chips in a pouch to amplify manifestation rituals. Pair with your candle or use solo.",
    price: 899,
    waxColor: "â€”",
    crystals: ["Clear Quartz", "Citrine"],
    herbs: ["Bay Leaf", "Cinnamon", "Rosemary"],
    images: ["/products/herb-manifestation-label.png"],
  },
  {
    id: "herb-love",
    slug: "herb-box-love-self-love",
    name: "Herb Box â€” Love & Self-Love",
    intention: "Love & Self-Love",
    description:
      "Romantic floral blend with crystal chips in a pouch for heart-led rituals. Beautiful alone or alongside the candle.",
    price: 899,
    waxColor: "â€”",
    crystals: ["Rose Quartz", "Moonstone"],
    herbs: ["Rose Petals", "Cornflower", "Lavender"],
    images: ["/products/herb-love-self-love-label.png"], // <â€” updated to your label
  },
  {
    id: "herb-wealth",
    slug: "herb-box-wealth-abundance",
    name: "Herb Box â€” Wealth & Abundance",
    intention: "Wealth & Abundance",
    description:
      "A bright, energising blend with crystal chips to invite flow and opportunity. Perfect partner to your abundance candle.",
    price: 899,
    waxColor: "â€”",
    crystals: ["Green Aventurine", "Citrine"],
    herbs: ["Cinnamon stick shards", "Basil", "Peppermint"],
    images: ["/products/herb-wealth-abundance-label.png"],
  },
  {
    id: "herb-peace",
    slug: "herb-box-peace-healing",
    name: "Herb Box â€” Peace & Healing",
    intention: "Peace & Healing",
    description:
      "A soothing botanical blend with crystal chips for gentle, restorative ritual work. Use with or without your candle.",
    price: 899,
    waxColor: "â€”",
    crystals: ["Amethyst", "Howlite"],
    herbs: ["Lavender", "Chamomile", "Rosemary"],
    images: ["/products/herb-peace-healing-label.png", "/products/herb-peace-healing-alt.png"],
  },
];

// ----- Helpers -----
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(count = 4): Product[] {
  const slugs = ["manifestation", "love-self-love", "wealth-abundance", "peace-healing"];
  const list = slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as Product[];
  return list.slice(0, count);
}

export function getIntention(slug: IntentionMeta["slug"]): IntentionMeta | undefined {
  return intentions.find((i) => i.slug === slug);
}

export function getProductsForIntention(slug: IntentionMeta["slug"]): {
  candle?: Product;
  ritualBox?: Product;
  herbBox?: Product;
} {
  const intentName = getIntention(slug)?.name;
  const candle = products.find((p) => p.id.startsWith("candle-") && p.intention === intentName);
  const ritualBox = products.find((p) => p.slug.startsWith("ritual-box-") && p.intention === intentName);
  const herbBox = products.find((p) => p.slug.startsWith("herb-box-") && p.intention === intentName);
  return { candle, ritualBox, herbBox };
}

export function getAllIntentions(): IntentionMeta[] {
  return intentions;
}
