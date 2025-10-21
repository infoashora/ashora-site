// app/product/content.ts
// Central product catalogue for ASHORA
// - pricePence is an integer (in pence) used for math/checkout
// - priceText is for display (with the £ sign)
// - descriptionHtml holds rich copy for the PDP Description accordion.

import type { IntentionKey } from "@/app/intention/content";

export type Product = {
  handle: string;
  title: string;
  image?: string;            // legacy primary image (kept for compatibility)
  images?: string[];         // multi-image gallery support (order matters)
  priceText: string;
  pricePence: number; // pence
  badge?: string;
  intention?: "manifestation" | "love-self-love" | "wealth-abundance" | "peace-healing";
  kind: "candle" | "herb-box" | "ritual-box";
  descriptionHtml?: string;
  /** Optional, shown in PDP "How to Use" when present (e.g., herb boxes). */
  waysHtml?: string;
  /**
   * Current available stock.
   * 0 or less = sold out (UI greys out & disables add-to-cart).
   * Adjust these numbers as you produce inventory.
   */
  stock: number;
};

const p = (gbp: number) => Math.round(gbp * 100);

// Shared candle price (edit here if needed)
const CANDLE_PRICE_TEXT = "£19.99";
const CANDLE_PRICE_PENCE = p(19.99);

// ---------------------------------------------------------------------------
// Descriptions (HTML)

const DESCRIPTIONS: Record<string, string> = {
  // Candles
  "manifestation-candle": `
    <p>Transform your dreams into reality with the ASHORA Manifestation Candle. Hand-poured with pure intention and infused with Clear Quartz for amplification and Citrine for abundance.</p>
    <ul>
      <li>Genuine Clear Quartz &amp; Citrine crystals</li>
      <li>Bay Leaf, Cinnamon, and Rosemary herbs</li>
      <li>Premium soy wax blend</li>
      <li>Includes a collectible A5 Manifestation Affirmation Card</li>
      <li>Vegan, eco-conscious, hand-poured in small batches</li>
    </ul>
  `,
  "love-self-love-candle": `
    <p>Open your heart to compassion, connection, and self-worth. Infused with Rose Quartz for unconditional love and Moonstone for emotional balance.</p>
    <ul>
      <li>Genuine Rose Quartz &amp; Moonstone crystals</li>
      <li>Rose petals, Lavender, and Cornflower herbs</li>
      <li>Premium soy wax blend</li>
      <li>Includes a collectible A5 Love &amp; Self-Love Affirmation Card</li>
      <li>Vegan, eco-conscious, hand-poured in small batches</li>
    </ul>
  `,
  "wealth-abundance-candle": `
    <p>Attract prosperity and success. Infused with Green Aventurine for opportunity and Citrine for success; blended with herbs that support growth and flow.</p>
    <ul>
      <li>Genuine Green Aventurine &amp; Citrine crystals</li>
      <li>Cinnamon, Basil, and Peppermint herbs</li>
      <li>Premium soy wax blend</li>
      <li>Includes a collectible A5 Wealth &amp; Abundance Affirmation Card</li>
      <li>Vegan, eco-conscious, hand-poured in small batches</li>
    </ul>
  `,
  // Candle uses Selenite (your current catalog)
  "peace-healing-candle": `
    <p>Restore balance and calm. Infused with Amethyst for inner peace and Selenite for cleansing clarity; a sanctuary in a jar.</p>
    <ul>
      <li>Genuine Amethyst &amp; Selenite crystals</li>
      <li>Lavender, Chamomile, and Rosemary herbs</li>
      <li>Premium soy wax blend</li>
      <li>Includes a collectible A5 Peace &amp; Healing Affirmation Card</li>
      <li>Vegan, eco-conscious, hand-poured in small batches</li>
    </ul>
  `,

  // Herb Boxes — updated with your Word doc copy
  "manifestation-herb-box": `
    <p><strong>Awaken your creative power and call your dreams into reality.</strong></p>
    <p>This Manifestation Herb Box is infused with the energy of focus, clarity, and attraction — helping you align your thoughts and actions with what you truly desire. Each herb is chosen to amplify your intentions and bring momentum to your manifestations.</p>
    <p><em>Herbs include:</em> Bay Leaf · Cinnamon · Rosemary</p>
  `,
  "love-self-love-herb-box": `
    <p><strong>Open your heart and connect to softness, trust, and devotion.</strong></p>
    <p>This Love &amp; Self-Love Herb Box is designed to nurture compassion — for yourself and others — and to remind you that you are already whole, worthy, and radiant. A beautiful ritual companion for healing the heart and inviting love in all forms.</p>
    <p><em>Herbs include:</em> Rose Petals · Lavender · Cornflower</p>
  `,
  "wealth-abundance-herb-box": `
    <p><strong>Call in prosperity and the energy of flow.</strong></p>
    <p>The Wealth &amp; Abundance Herb Box helps you step into a mindset of gratitude and growth, inviting opportunities, luck, and abundance into your daily life. Each herb carries vibrations of success, expansion, and financial flow.</p>
    <p><em>Herbs include:</em> Cinnamon · Basil · Peppermint</p>
  `,
  "peace-healing-herb-box": `
    <p><strong>Soothe your spirit and return to balance.</strong></p>
    <p>The Peace &amp; Healing Herb Box supports emotional rest, energy clearing, and inner harmony — perfect for grounding after overwhelm or releasing what no longer serves you. Each blend carries calming and restorative properties.</p>
    <p><em>Herbs include:</em> Lavender · Chamomile · Rosemary</p>
  `,

  // Ritual Boxes
  "manifestation-ritual-box": `
    <p>Create a powerful manifestation portal with a premium collection of intention-setting tools.</p>
    <ul>
      <li>Includes Manifestation Candle &amp; Herb Box, 2× A5 Affirmation Cards</li>
      <li>Blessed Ritual Salt in reusable glass vial</li>
      <li>Full ritual instructions, Candle Care &amp; Jar Reuse card</li>
      <li>Intuitively chosen crystal</li>
    </ul>
  `,
  "love-self-love-ritual-box": `
    <p>A sacred collection to support compassion, healing, and meaningful connections.</p>
    <ul>
      <li>Includes Love &amp; Self-Love Candle &amp; Herb Box, 2× A5 Affirmation Cards</li>
      <li>Blessed Ritual Salt, ritual instructions, care card</li>
      <li>Intuitively chosen crystal</li>
    </ul>
  `,
  "wealth-abundance-ritual-box": `
    <p>Align with success, growth, and financial flow.</p>
    <ul>
      <li>Includes Wealth &amp; Abundance Candle &amp; Herb Box, 2× A5 Affirmation Cards</li>
      <li>Blessed Ritual Salt, ritual instructions, care card</li>
      <li>Intuitively chosen crystal</li>
    </ul>
  `,
  "peace-healing-ritual-box": `
    <p>Release stress, protect your energy, and create space for healing.</p>
    <ul>
      <li>Includes Peace &amp; Healing Candle &amp; Herb Box, 2× A5 Affirmation Cards</li>
      <li>Blessed Ritual Salt, ritual instructions, care card</li>
      <li>Intuitively chosen crystal</li>
    </ul>
  `,
};

// Optional waysHtml for Herb Boxes (shown on PDP "How to Use")
const WAYS: Record<string, string> = {
  "manifestation-herb-box": `
    <ul>
      <li>Add to manifestation rituals or candle spells to strengthen intention.</li>
      <li>Brew a light herbal tea (or gently simmer) while scripting or visualising.</li>
      <li>Sprinkle into spiritual baths for clarity and motivation.</li>
      <li>Create a charm jar or sachet to attract new opportunities and success.</li>
    </ul>
  `,
  "love-self-love-herb-box": `
    <ul>
      <li>Add to warm baths for heart-healing and emotional release.</li>
      <li>Blend into teas or simmer on the stove for gentle, loving energy.</li>
      <li>Sprinkle around candles or mirrors during self-love rituals.</li>
      <li>Use in spell jars or sachets to attract romantic or self-compassionate energy.</li>
    </ul>
  `,
  "wealth-abundance-herb-box": `
    <ul>
      <li>Add to money or abundance rituals for energetic attraction.</li>
      <li>Brew as a herbal tea or simmer to fill your space with prosperous energy.</li>
      <li>Use in charm bags, wallets, or business corners to magnetise success.</li>
      <li>Sprinkle into bath water for renewed motivation and self-belief.</li>
    </ul>
  `,
  "peace-healing-herb-box": `
    <ul>
      <li>Add to relaxing baths or foot soaks for deep calm.</li>
      <li>Brew into tea or simmer to invite peace into your home.</li>
      <li>Burn gently (in a safe dish) or add to smoke blends for cleansing energy.</li>
      <li>Use in jar spells or altar bowls to support emotional healing.</li>
    </ul>
  `,
};

// ---------------------------------------------------------------------------
// Products

export const PRODUCTS: Product[] = [
  // Candles
  {
    handle: "manifestation-candle",
    title: "Manifestation Candle",
    image: "/products/manifestation/01-hero.jpg",
    images: [
      "/products/manifestation/01-hero.jpg",
      "/products/manifestation/02-box-angled.jpg",
      "/products/manifestation/03-top.jpg",
      "/products/manifestation/04-box-top.jpg",
    ],
    priceText: CANDLE_PRICE_TEXT,
    pricePence: CANDLE_PRICE_PENCE,
    badge: "Intention",
    intention: "manifestation",
    kind: "candle",
    descriptionHtml: DESCRIPTIONS["manifestation-candle"],
    stock: 10,
  },
  {
    handle: "love-self-love-candle",
    title: "Love & Self-Love Candle",
    image: "/products/love-self-love/01-hero.jpg",
    images: [
      "/products/love-self-love/01-hero.jpg",
      "/products/love-self-love/02-top.jpg",
      "/products/love-self-love/03-box-angled.jpg",
      "/products/love-self-love/04-box-top.jpg",
    ],
    priceText: CANDLE_PRICE_TEXT,
    pricePence: CANDLE_PRICE_PENCE,
    badge: "Intention",
    intention: "love-self-love",
    kind: "candle",
    descriptionHtml: DESCRIPTIONS["love-self-love-candle"],
    stock: 10,
  },
  {
    handle: "wealth-abundance-candle",
    title: "Wealth & Abundance Candle",
    image: "/products/wealth-abundance/01-hero.jpg",
    images: [
      "/products/wealth-abundance/01-hero.jpg",
      "/products/wealth-abundance/02-top.jpg",
      "/products/wealth-abundance/03-box-angled.jpg",
      "/products/wealth-abundance/04-box-top.jpg",
    ],
    priceText: CANDLE_PRICE_TEXT,
    pricePence: CANDLE_PRICE_PENCE,
    badge: "Intention",
    intention: "wealth-abundance",
    kind: "candle",
    descriptionHtml: DESCRIPTIONS["wealth-abundance-candle"],
    stock: 10,
  },
  {
    handle: "peace-healing-candle",
    title: "Peace & Healing Candle",
    image: "/products/peace-healing/01-hero.jpg",
    images: [
      "/products/peace-healing/01-hero.jpg",
      "/products/peace-healing/02-box-angled.jpg",
      "/products/peace-healing/03-box-top.jpg",
      "/products/peace-healing/04-top.jpg",
    ],
    priceText: CANDLE_PRICE_TEXT,
    pricePence: CANDLE_PRICE_PENCE,
    badge: "Intention",
    intention: "peace-healing",
    kind: "candle",
    descriptionHtml: DESCRIPTIONS["peace-healing-candle"],
    stock: 10,
  },

  // Herb Boxes — £11.99 (with waysHtml)
  {
    handle: "manifestation-herb-box",
    title: "Manifestation Herb Box",
    image: "/products/manifestation-herb-box/01-hero.jpg",
    images: ["/products/manifestation-herb-box/01-hero.jpg"],
    priceText: "£11.99",   // display
    pricePence: p(11.99),  // integer pence (fixed)
    badge: "Herb Box",
    intention: "manifestation",
    kind: "herb-box",
    descriptionHtml: DESCRIPTIONS["manifestation-herb-box"],
    waysHtml: WAYS["manifestation-herb-box"],
    stock: 10,
  },
  {
    handle: "love-self-love-herb-box",
    title: "Love & Self-Love Herb Box",
    image: "/products/love-self-love-herb-box/01-hero.jpg",
    images: ["/products/love-self-love-herb-box/01-hero.jpg"],
    priceText: "£11.99",
    pricePence: p(11.99),
    badge: "Herb Box",
    intention: "love-self-love",
    kind: "herb-box",
    descriptionHtml: DESCRIPTIONS["love-self-love-herb-box"],
    waysHtml: WAYS["love-self-love-herb-box"],
    stock: 10,
  },
  {
    handle: "wealth-abundance-herb-box",
    title: "Wealth & Abundance Herb Box",
    image: "/products/wealth-abundance-herb-box/01-hero.jpg",
    images: ["/products/wealth-abundance-herb-box/01-hero.jpg"],
    priceText: "£11.99",
    pricePence: p(11.99),
    badge: "Herb Box",
    intention: "wealth-abundance",
    kind: "herb-box",
    descriptionHtml: DESCRIPTIONS["wealth-abundance-herb-box"],
    waysHtml: WAYS["wealth-abundance-herb-box"],
    stock: 10,
  },
  {
    handle: "peace-healing-herb-box",
    title: "Peace & Healing Herb Box",
    image: "/products/peace-healing-herb-box/01-hero.jpg",
    images: ["/products/peace-healing-herb-box/01-hero.jpg"],
    priceText: "£11.99",
    pricePence: p(11.99),
    badge: "Herb Box",
    intention: "peace-healing",
    kind: "herb-box",
    descriptionHtml: DESCRIPTIONS["peace-healing-herb-box"],
    waysHtml: WAYS["peace-healing-herb-box"],
    stock: 10,
  },

  // Ritual Boxes — £39.99
  {
    handle: "manifestation-ritual-box",
    title: "Manifestation Ritual Box",
    image: "/products/manifestation-ritual-box/01-hero.jpg",
    images: ["/products/manifestation-ritual-box/01-hero.jpg"], // ✅ manifestation image
    priceText: "£39.99",
    pricePence: p(39.99),
    badge: "Ritual Box",
    intention: "manifestation",
    kind: "ritual-box",
    descriptionHtml: DESCRIPTIONS["manifestation-ritual-box"],
    stock: 10,
  },
  {
    handle: "love-self-love-ritual-box",
    title: "Love & Self-Love Ritual Box",
    image: "/products/love-self-love-ritual-box/01-hero.jpg",
    images: ["/products/love-self-love-ritual-box/01-hero.jpg"], // ✅ love & self-love image
    priceText: "£39.99",
    pricePence: p(39.99),
    badge: "Ritual Box",
    intention: "love-self-love",
    kind: "ritual-box",
    descriptionHtml: DESCRIPTIONS["love-self-love-ritual-box"],
    stock: 10,
  },
  {
    handle: "wealth-abundance-ritual-box",
    title: "Wealth & Abundance Ritual Box",
    image: "/products/wealth-abundance-ritual-box/01-hero.jpg",
    images: ["/products/wealth-abundance-ritual-box/01-hero.jpg"],
    priceText: "£39.99",
    pricePence: p(39.99),
    badge: "Ritual Box",
    intention: "wealth-abundance",
    kind: "ritual-box",
    descriptionHtml: DESCRIPTIONS["wealth-abundance-ritual-box"],
    stock: 10,
  },
  {
    handle: "peace-healing-ritual-box",
    title: "Peace & Healing Ritual Box",
    image: "/products/peace-healing-ritual-box/01-hero.jpg",
    images: ["/products/peace-healing-ritual-box/01-hero.jpg"],
    priceText: "£39.99",
    pricePence: p(39.99),
    badge: "Ritual Box",
    intention: "peace-healing",
    kind: "ritual-box",
    descriptionHtml: DESCRIPTIONS["peace-healing-ritual-box"],
    stock: 10,
  },
];

// ---------------------------------------------------------------------------
// Helpers

export const PRODUCTS_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.handle, p])
);

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS_MAP[handle];
}

// simple related: other items that share intention (or first 4 if none)
export function getRelatedProducts(handle: string): Product[] {
  const current = PRODUCTS_MAP[handle];
  if (!current) return PRODUCTS.slice(0, 4);
  const sameIntention = PRODUCTS.filter(
    (p) => p.handle !== handle && p.intention && p.intention === current.intention
  );
  return (sameIntention.length ? sameIntention : PRODUCTS.filter((p) => p.handle !== handle)).slice(0, 4);
}

// List products by intention (used by quiz/intention pages)
export function getProductsByIntention(slug: IntentionKey): Product[] {
  return PRODUCTS.filter((p) => p.intention === slug);
}

// Derived helpers
export function isOutOfStock(product: Product): boolean {
  return !product || typeof product.stock !== "number" || product.stock <= 0;
}
