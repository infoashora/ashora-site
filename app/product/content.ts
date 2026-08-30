// app/product/content.ts
// Central product catalogue for ASHORA
// - pricePence is an integer (in pence) used for math/checkout
// - priceText is for display (with the £ sign)
// - descriptionHtml holds rich copy for the PDP Description accordion.

import type { IntentionKey } from "@/app/intention/content";

export type Product = {
  handle: string;
  title: string;
  image?: string; // legacy primary image (kept for compatibility)
  images?: string[]; // multi-image gallery support (order matters)
  priceText: string;
  pricePence: number; // pence
  badge?: string;
  intention?:
    | "manifestation"
    | "love-self-love"
    | "wealth-abundance"
    | "peace-healing";
  kind: "candle";
  descriptionHtml?: string;
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
    <h3>Trust Icons</h3>
    <ul>
      <li>Hand-Poured in Essex</li>
      <li>Vegan Soy Wax</li>
      <li>Crystal Infused</li>
      <li>Affirmation Card Included</li>
    </ul>

    <h3>Why This Candle</h3>

    <p>The most meaningful relationship you'll ever have is the one you have with yourself.</p>

    <p>The Love &amp; Self-Love Candle was created to encourage moments of compassion, connection and gentle reflection. Whether you're practising self-care, journalling, unwinding after a long day or simply taking a quiet moment to reconnect with yourself, this candle is designed to transform everyday routines into meaningful rituals.</p>

    <p>Hand-poured in small batches in Essex using luxurious vegan soy wax, each candle is thoughtfully infused with carefully selected crystals, botanicals and a beautifully comforting fragrance. Together, these elements create a warm and nurturing atmosphere that encourages presence, kindness and emotional wellbeing.</p>

    <p>Because the love we give ourselves becomes the foundation for everything that follows.</p>

    <h3>Inside Your Candle</h3>

    <p>Every element within the Love &amp; Self-Love Candle has been thoughtfully chosen to support meaningful rituals of compassion, connection and self-reflection.</p>

    <h4>Rose Aura Quartz</h4>
    <p>Often associated with love, compassion and emotional warmth, Rose Aura Quartz encourages moments of self-kindness and gentle reflection, making it a beautiful companion for rituals centred around love in all its forms.</p>

    <h4>Moonstone</h4>
    <p>Traditionally linked with intuition, balance and new beginnings, Moonstone brings a calming presence that encourages you to reconnect with yourself and approach each moment with openness.</p>

    <h4>Rose Petals</h4>
    <p>Long regarded as a symbol of love, beauty and compassion, Rose Petals add a delicate touch that reflects the gentle intention behind this collection.</p>

    <h4>Lavender</h4>
    <p>Chosen for its beautifully calming aroma, Lavender has been cherished for generations for the peaceful atmosphere it helps create, making it the perfect companion for moments of rest and self-care.</p>

    <h4>Cornflower</h4>
    <p>Selected for its delicate beauty, Cornflower symbolises hope and gentle encouragement, reflecting the quiet strength that grows through self-love and compassion.</p>

    <h4>Luxurious Vegan Soy Wax</h4>
    <p>Hand-poured using a premium vegan soy wax, carefully selected for its clean, even burn and beautiful fragrance throw.</p>

    <h4>Approx. 40–50 Hour Burn Time</h4>
    <p>Designed to accompany many meaningful rituals, allowing you to return to moments of self-care, connection and reflection time and time again.</p>

    <h4>Includes an A5 Love &amp; Self-Love Affirmation Card</h4>
    <p>Every candle is accompanied by a beautifully designed affirmation card, offering gentle words of encouragement to support your journey of self-love, compassion and connection.</p>

    <h3>Why You'll Love It</h3>
    <ul>
      <li>Create meaningful moments of compassion, connection and self-love.</li>
      <li>Hand-poured in Essex using luxurious vegan soy wax.</li>
      <li>Thoughtfully infused with Rose Aura Quartz, Moonstone and carefully selected botanicals.</li>
      <li>Fill your home with a soft, comforting fragrance you'll look forward to lighting.</li>
      <li>Thoughtfully designed to accompany your rituals of self-care, compassion and connection.</li>
    </ul>

    <h3>Smells Like</h3>

    <h4>Top Notes</h4>
    <p>Soft Rose</p>

    <h4>Heart Notes</h4>
    <p>Delicate Freesia</p>

    <h4>Base Notes</h4>
    <p>Warm Amber</p>

    <p>Soft rose opens the fragrance with delicate floral elegance, creating a beautifully gentle first impression. As the candle burns, fresh freesia unfolds with graceful softness, while warm amber lingers beneath the florals to create a comforting finish that feels both luxurious and inviting.</p>

    <p>The result is a beautifully balanced fragrance designed to accompany moments of self-care, gentle reflection and emotional wellbeing.</p>

    <h3>Your Ritual</h3>

    <p>As you light your Love &amp; Self-Love Candle, allow yourself to slow down and gently return to yourself.</p>

    <p>Take a deep breath and watch the gentle flicker of the flame. As the fragrance begins to fill the room, let yourself soften into the present moment. Whether you're journalling, practising self-care, unwinding after a long day or simply enjoying a few quiet moments alone, allow this ritual to become an act of compassion towards yourself.</p>

    <p>There is no perfect way to practise self-love. Simply allow this ritual to unfold in a way that feels meaningful to you, returning to it whenever you wish to reconnect with kindness, compassion and intention.</p>

    <p>The love we give ourselves becomes the foundation for everything that follows.</p>

    <h3>Candle Care</h3>

    <p>To enjoy the most beautiful burn and fragrance experience, we recommend following these simple care guidelines.</p>

    <h4>Trim the Wick</h4>
    <p>Before each burn, trim the wick to approximately 5mm to encourage a clean, even flame and help reduce soot.</p>

    <h4>Allow a Full Melt Pool</h4>
    <p>During your first burn, allow the wax to melt evenly across the entire surface of the candle. This helps prevent tunnelling and encourages an even burn throughout the life of your candle.</p>

    <h4>Burn Responsibly</h4>
    <p>Burn your candle for no more than four hours at a time, allowing it to cool completely before relighting.</p>

    <h4>Burn Safely</h4>
    <p>Always place your candle on a heat-resistant surface, away from drafts, children, pets and anything that could catch fire. Never leave a burning candle unattended.</p>

    <h4>Enjoy Every Ritual</h4>
    <p>Every Ashora candle is hand-poured with care to accompany many moments of intention, reflection and quiet wellbeing.</p>

    <p>A little care ensures every ritual feels just as beautiful as the first.</p>
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
};

// ---------------------------------------------------------------------------
// Products

export const PRODUCTS: Product[] = [
  {
    handle: "manifestation-candle",
    title: "Manifestation Candle",
    image: "/shop-candles/manifestation.png",
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
    image: "/shop-candles/love-self-love.png",
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
    image: "/shop-candles/wealth-abundance.png",
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
    image: "/shop-candles/peace-healing.png",
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
];

// ---------------------------------------------------------------------------
// Helpers

export const PRODUCTS_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((product) => [product.handle, product])
);

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS_MAP[handle];
}

// simple related: other items that share intention (or first 4 if none)
export function getRelatedProducts(handle: string): Product[] {
  const current = PRODUCTS_MAP[handle];

  if (!current) {
    return PRODUCTS.slice(0, 4);
  }

  const sameIntention = PRODUCTS.filter(
    (product) =>
      product.handle !== handle &&
      product.intention &&
      product.intention === current.intention
  );

  return (
    sameIntention.length
      ? sameIntention
      : PRODUCTS.filter((product) => product.handle !== handle)
  ).slice(0, 4);
}

// List products by intention (used by quiz/intention pages)
export function getProductsByIntention(slug: IntentionKey): Product[] {
  return PRODUCTS.filter((product) => product.intention === slug);
}

// Derived helpers
export function isOutOfStock(product: Product): boolean {
  return !product || typeof product.stock !== "number" || product.stock <= 0;
}