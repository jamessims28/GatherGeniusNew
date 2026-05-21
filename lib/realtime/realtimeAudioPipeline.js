
export class RealtimeAudioPipeline {
  constructor({
    onEvent = () => {},
    onTranscript = () => {},
    onAudioState = () => {},
    onError = () => {}
  } = {}) {
    this.onEvent = onEvent;
    this.onTranscript = onTranscript;
    this.onAudioState = onAudioState;
    this.onError = onError;
    this.connected = false;
    this.mode = "browser_preview";
  }

  async connect() {
    try {
      this.onAudioState("checking_browser_audio");

      if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
        throw new Error("Browser speech synthesis is unavailable.");
      }

      this.connected = true;
      this.onEvent({ type: "connected", mode: this.mode });
      this.onAudioState("connected");

      return {
        ok: true,
        status: "connected",
        mode: this.mode,
        message: "Realtime pipeline connected in browser preview mode."
      };
    } catch (error) {
      this.connected = false;
      this.onError(error);
      return {
        ok: false,
        status: "unavailable",
        message: error.message
      };
    }
  }

  async sendText(text = "") {
    if (!this.connected) {
      return { ok: false, message: "Pipeline is not connected." };
    }

    this.onTranscript({ type: "transcript", text, delta: text });
    return { ok: true, text };
  }

  close() {
    this.connected = false;
    this.onAudioState("closed");
    this.onEvent({ type: "closed" });
    return { ok: true, status: "closed" };
  }
}

export function createRealtimeAudioPipeline(options = {}) {
  return new RealtimeAudioPipeline(options);
}

export default RealtimeAudioPipeline;
