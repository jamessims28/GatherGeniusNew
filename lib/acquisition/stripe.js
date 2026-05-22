import Stripe from "stripe";

export function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function getStripeStatus() {
  return {
    ok: true,
    configured: Boolean(process.env.STRIPE_SECRET_KEY),
    provider: "stripe",
    status: process.env.STRIPE_SECRET_KEY ? "ready" : "needs_env_key",
    protectedAction: true
  };
}

export function getPlans() {
  return [
    { id: "preview", name: "Preview", priceMonthly: 0 },
    { id: "premium", name: "Premium", priceMonthly: 49 },
    { id: "enterprise", name: "Enterprise", priceMonthly: 499 }
  ];
}
