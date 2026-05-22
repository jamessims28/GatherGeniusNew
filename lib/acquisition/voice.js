export function getRealtimeVoiceStatus() {
  const hasKey = Boolean(process.env.OPENAI_API_KEY);
  return {
    ok: true,
    provider: hasKey ? "openai_realtime_ready" : "browser_fallback",
    model: process.env.OPENAI_REALTIME_MODEL || "gpt-4o-realtime-preview",
    capabilities: {
      streamingAudio: hasKey,
      interruptionHandling: true,
      browserSpeechFallback: true,
      lowLatencyPrepared: true
    }
  };
}

export function createRealtimeSessionConfig({ userKey = "anonymous" } = {}) {
  return {
    model: process.env.OPENAI_REALTIME_MODEL || "gpt-4o-realtime-preview",
    voice: "alloy",
    modalities: ["text", "audio"],
    instructions: `You are GatherGenius, an ambient AI operating system. User: ${userKey}. Be calm, fast, concise, proactive, and protective.`
  };
}
