
export function createInterruptController() {
  let interruptedAt = null;

  return {
    interrupt({ pipeline = null, reason = "user_barge_in" } = {}) {
      interruptedAt = new Date().toISOString();

      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      if (pipeline?.sendText) {
        pipeline.sendText("[interrupted]");
      }

      return {
        ok: true,
        action: "Speech interrupted. Listening.",
        reason,
        interruptedAt
      };
    },

    speak(text = "", options = {}) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = options.rate || 0.82;
        msg.pitch = options.pitch || 1.08;
        msg.volume = options.volume || 0.94;
        window.speechSynthesis.speak(msg);
      }

      return {
        ok: true,
        action: "Speaking interruptibly.",
        text
      };
    },

    getState() {
      return { interruptedAt };
    }
  };
}

export function interruptSpeech(reason = "user_barge_in") {
  return createInterruptController().interrupt({ reason });
}

export default createInterruptController;
