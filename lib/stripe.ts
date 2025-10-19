import Stripe from "stripe";

/** Lazily construct Stripe only when the secret exists. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY. Add it to .env.local and restart the dev server."
    );
  }
  return new Stripe(key, { apiVersion: "2024-06-20" });
}
