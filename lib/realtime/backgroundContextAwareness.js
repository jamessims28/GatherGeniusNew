
export function buildBackgroundContextSnapshot({
  conversation = [],
  readiness = {},
  world = {},
  permissions = {}
} = {}) {
  const lastMessage = conversation.length ? conversation[conversation.length - 1] : null;
  const inferredReason =
    readiness.ready && permissions.voice
      ? "Ambient voice context is active."
      : readiness.ready
        ? "Ambient core is ready without voice permission."
        : "Ambient core is waiting for realtime readiness.";

  return {
    layer: "background_context_awareness",
    conversationCount: conversation.length,
    lastMessage,
    readiness,
    world,
    permissions,
    inferredState: {
      status: readiness.ready ? "ready" : "warming_up",
      reason: inferredReason,
      intent: lastMessage?.text || "ambient_coordination"
    },
    createdAt: new Date().toISOString()
  };
}

export function createBackgroundContextAwareness(initial = {}) {
  return {
    summarize() {
      return buildBackgroundContextSnapshot(initial);
    }
  };
}

export default buildBackgroundContextSnapshot;
