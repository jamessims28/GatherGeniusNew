import { getRealtimeVoiceStatus } from "./voice";
import { getStripeStatus, getPlans } from "./stripe";
import { getCalendarStatus } from "./calendar";
import { getRetentionMetrics } from "./betaRetention";

export async function buildInvestorDemo({ userKey = "anonymous" } = {}) {
  const voice = getRealtimeVoiceStatus();
  const stripe = getStripeStatus();
  const calendar = getCalendarStatus();
  const retention = await getRetentionMetrics();

  const score =
    20 +
    (voice.capabilities.streamingAudio ? 20 : 10) +
    (stripe.configured ? 15 : 6) +
    (calendar.configured ? 15 : 6) +
    Math.min(20, retention.activationPercent) +
    20;

  return {
    ok: true,
    layer: "investor_demo",
    investorReadinessScore: Math.min(100, score),
    story: "GatherGenius is an Ambient AI Operating System with a living orb interface, memory, voice, protected execution, integrations, retention tracking, and monetization readiness.",
    demoFlow: [
      "Open clean landing page",
      "Watch the orb move like a living ambient layer",
      "Click or speak to activate intelligence",
      "Show memory and voice readiness",
      "Show protected Calendar and Stripe actions",
      "Show beta user and retention metrics",
      "Show monetization plans"
    ],
    voice,
    stripe,
    calendar,
    plans: getPlans(),
    retention
  };
}
