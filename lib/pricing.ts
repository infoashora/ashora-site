// lib/pricing.ts
// Simple UK pricing helpers (display-side only)

export type ShippingMethod = "standard" | "express" | "free";

export const SHIPPING_PRICES_GBP: Record<ShippingMethod, number> = {
  standard: 3.99, // UK: £3.99 standard
  express: 5.99,  // UK: £5.99 express
  free: 0,
};

// UK VAT standard rate (most goods): 20%
// NOTE: This is an on-page estimate. Stripe's final total may differ
// if automatic tax/shipping are configured there.
export const UK_VAT_RATE = 0.2;

export function toPounds(n: number) {
  return `£${n.toFixed(2)}`;
}

export function calcVat(amountExVat: number, rate = UK_VAT_RATE) {
  return Math.max(0, amountExVat * rate);
}
