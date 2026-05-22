import { saveMemory, recallMemory } from "./memory";
import { getRealtimeVoiceStatus } from "./voice";
import { getCalendarStatus, prepareCalendarAction } from "./calendar";
import { getStripeStatus, getPlans } from "./stripe";
import { trackBetaEvent, getRetentionMetrics } from "./betaRetention";
import { buildInvestorDemo } from "./investorDemo";

export async function runAcquisitionReadyRuntime({ message = "", userKey = "anonymous_preview", clientState = {} } = {}) {
  const startedAt = Date.now();
  await trackBetaEvent({ userKey, event: "api_run", metadata: { message, clientState } });

  const memorySave = await saveMemory({ userKey, type: "ambient_request", content: message });
  const memoryRecall = await recallMemory({ userKey });

  const voice = getRealtimeVoiceStatus();
  const calendar = getCalendarStatus();
  const stripe = getStripeStatus();
  const retention = await getRetentionMetrics();
  const investor = await buildInvestorDemo({ userKey });

  const wantsCalendar = /calendar|schedule|remind|meeting/i.test(message);
  const wantsPayment = /pay|stripe|subscription|premium|enterprise/i.test(message);

  const preparedActions = [];
  if (wantsCalendar) preparedActions.push(prepareCalendarAction({ description: message }));
  if (wantsPayment) preparedActions.push({ type: "stripe_plan_review", plans: getPlans(), requiresApproval: true, status: "prepared_for_approval" });

  const latencyMs = Date.now() - startedAt;

  return {
    ok: true,
    layer: "acquisition_ready_runtime",
    latencyMs,
    memory: { save: memorySave, recall: memoryRecall },
    voice,
    calendar,
    stripe,
    retention,
    investor,
    preparedActions,
    protectedExecution: {
      allExternalActionsRequireApproval: true,
      heldActions: preparedActions.filter((x) => x.requiresApproval)
    },
    response: buildResponse({ message, voice, investor, preparedActions, latencyMs }),
    createdAt: new Date().toISOString()
  };
}

function buildResponse({ message, voice, investor, preparedActions, latencyMs }) {
  if (preparedActions.length) return `I prepared ${preparedActions.length} protected action(s) for approval. Runtime response: ${latencyMs}ms.`;
  if (/investor|acquire|demo/i.test(message)) return `Investor demo is ready. Readiness score: ${investor.investorReadinessScore}%.`;
  if (/voice|speak/i.test(message)) return voice.capabilities.streamingAudio ? "OpenAI realtime voice is ready." : "Browser voice is active; OpenAI realtime is ready once the API key is added.";
  return `GatherGenius acquisition-ready core is active. Runtime response: ${latencyMs}ms.`;
}
