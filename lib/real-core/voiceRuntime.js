export function buildVoiceRuntime({ message = "" } = {}) {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);

  return {
    ok: true,
    provider: hasOpenAI ? "openai_realtime_ready" : "browser_voice_fallback",
    realtimeModel: process.env.OPENAI_REALTIME_MODEL || "gpt-4o-realtime-preview",
    capabilities: {
      speechRecognition: true,
      speechSynthesis: true,
      realtimeStreaming: hasOpenAI,
      interruption: true,
      bargeIn: true
    },
    clientInstructions: {
      browserFallback: "Use Web Speech API for preview.",
      production: "Use OpenAI Realtime API websocket/session when OPENAI_API_KEY is connected."
    },
    response: hasOpenAI
      ? "Realtime voice provider is ready for OpenAI session wiring."
      : "Browser voice fallback is active until OpenAI realtime is connected."
  };
}

export function createRealtimeSessionPayload({ userKey = "anonymous", instructions = "" } = {}) {
  return {
    model: process.env.OPENAI_REALTIME_MODEL || "gpt-4o-realtime-preview",
    voice: "alloy",
    userKey,
    instructions: instructions || "You are GatherGenius, a calm ambient AI operating system. Be concise, proactive, protective, and helpful.",
    modalities: ["text", "audio"]
  };
}
