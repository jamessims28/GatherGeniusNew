import { calculateAcquisitionScore } from "./acquisitionScore";
import { trackDemoEvent, getDemoMetrics } from "./demoMetrics";

export function runLiveDemoRuntime({
  userKey = "anonymous_preview",
  event = "orb_click",
  message = "",
  integrations = {}
} = {}) {
  const tracked = trackDemoEvent({
    userKey,
    event,
    metadata: { message }
  });

  const metrics = getDemoMetrics();
  const acquisition = calculateAcquisitionScore({
    betaUsers: metrics.betaUsers,
    totalEvents: metrics.totalEvents,
    voiceReady: Boolean(integrations.voiceReady || process.env.OPENAI_API_KEY),
    memoryReady: Boolean(integrations.memoryReady || process.env.NEXT_PUBLIC_SUPABASE_URL),
    stripeReady: Boolean(integrations.stripeReady || process.env.STRIPE_SECRET_KEY),
    calendarReady: Boolean(integrations.calendarReady || process.env.GOOGLE_CALENDAR_CLIENT_ID),
    orbQuality: 100
  });

  return {
    ok: true,
    layer: "phase15_live_demo_acquisition_metrics",
    hiddenFromLandingPage: true,
    tracked,
    metrics,
    acquisition,
    investorStatus: acquisition.status,
    response:
      acquisition.status === "acquisition_demo_ready"
        ? `Acquisition demo is ready. Score: ${acquisition.score}.`
        : `Live demo metrics are tracking. Acquisition score: ${acquisition.score}.`,
    createdAt: new Date().toISOString()
  };
}
