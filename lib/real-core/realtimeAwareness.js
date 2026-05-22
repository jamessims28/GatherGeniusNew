export function buildRealtimeAwareness({ message = "", clientState = {} } = {}) {
  const now = new Date();
  const text = String(message).toLowerCase();

  const signals = {
    time: now.toISOString(),
    urgent: /urgent|asap|now|immediately|emergency/.test(text),
    silentMode: Boolean(clientState.silentMode),
    userIsSpeaking: Boolean(clientState.userIsSpeaking),
    orbActive: Boolean(clientState.orbActive),
    device: clientState.device || "web",
    page: clientState.page || "landing"
  };

  const state =
    signals.urgent ? "high_attention" :
    signals.userIsSpeaking ? "listening" :
    signals.orbActive ? "responding" :
    "quiet_monitoring";

  return {
    ok: true,
    layer: "realtime_awareness",
    state,
    signals,
    shouldInterrupt: signals.urgent && !signals.userIsSpeaking,
    shouldStayQuiet: !signals.urgent && signals.silentMode,
    summary: `Realtime awareness is ${state}.`
  };
}
