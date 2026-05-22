export function runProactiveBehavior({ awareness = {}, memory = {}, coordination = {} } = {}) {
  const shouldAct =
    awareness.shouldInterrupt ||
    coordination.nextBestAction === "ask_for_approval" ||
    /high_attention/.test(awareness.state || "");

  const message =
    awareness.shouldInterrupt
      ? "This looks urgent. I can help coordinate the safest next step."
      : coordination.nextBestAction === "ask_for_approval"
        ? "I prepared protected actions and need approval before execution."
        : "I will stay quiet and continue monitoring in the background.";

  return {
    ok: true,
    layer: "proactive_behavior",
    enabled: process.env.PROACTIVE_BEHAVIOR_ENABLED !== "false",
    shouldAct,
    message,
    timing: shouldAct ? "now" : "quiet",
    visibility: shouldAct ? "minimal_prompt" : "invisible"
  };
}
