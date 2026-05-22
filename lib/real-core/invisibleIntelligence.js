import { buildMemoryContext } from "./memoryStore";
import { buildVoiceRuntime } from "./voiceRuntime";
import { coordinate } from "./coordinationEngine";
import { buildExecutionQueue, executeApprovedQueue } from "./protectedExecutionQueue";
import { buildRealtimeAwareness } from "./realtimeAwareness";
import { runProactiveBehavior } from "./proactiveBehavior";

export async function runInvisibleIntelligence({
  message = "",
  userKey = "anonymous",
  clientState = {},
  approvals = {}
} = {}) {
  const awareness = buildRealtimeAwareness({ message, clientState });
  const memory = await buildMemoryContext({ userKey, message });
  const voice = buildVoiceRuntime({ message });
  const coordination = coordinate({ message, memory, awareness });
  const executionQueue = buildExecutionQueue({ coordination, approvals });
  const execution = executeApprovedQueue({ queue: executionQueue.queue });
  const proactive = runProactiveBehavior({ awareness, memory, coordination });

  return {
    ok: true,
    layer: "invisible_intelligence_runtime",
    hiddenFromLandingPage: true,
    awareness,
    memory,
    voice,
    coordination,
    executionQueue,
    execution,
    proactive,
    response: buildResponse({ voice, coordination, executionQueue, proactive }),
    createdAt: new Date().toISOString()
  };
}

function buildResponse({ voice, coordination, executionQueue, proactive }) {
  if (executionQueue.heldCount > 0) {
    return `I prepared ${coordination.plan.length} background step(s). ${executionQueue.heldCount} protected action(s) need approval before I execute.`;
  }

  if (proactive.shouldAct) {
    return proactive.message;
  }

  return "GatherGenius is running quietly in the background with memory, voice, coordination, execution protection, realtime awareness, and proactive intelligence active.";
}
