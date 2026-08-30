import type { ProductStorytelling } from "./types";

import { loveSelfLoveStorytelling } from "./love-self-love";
import { manifestationStorytelling } from "./manifestation";
import { peaceHealingStorytelling } from "./peace-healing";
import { wealthAbundanceStorytelling } from "./wealth-abundance";

export type {
  ProductStorytelling,
  StorytellingCareItem,
  StorytellingFragranceNote,
  StorytellingIngredient,
  StorytellingPoint,
  StorytellingReview,
} from "./types";

export const PRODUCT_STORYTELLING: Record<
  string,
  ProductStorytelling
> = {
  "manifestation-candle": manifestationStorytelling,
  "love-self-love-candle": loveSelfLoveStorytelling,
  "wealth-abundance-candle": wealthAbundanceStorytelling,
  "peace-healing-candle": peaceHealingStorytelling,
};

export function getProductStorytelling(
  handle: string
): ProductStorytelling | undefined {
  return PRODUCT_STORYTELLING[handle];
}