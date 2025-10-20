// lib/stripe.ts
import Stripe from "stripe";

/** Lazily construct Stripe only when the secret exists. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY. Add it to Vercel env (and .env.local for dev) and restart."
    );
  }
  return new Stripe(key);
}
