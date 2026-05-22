export function coordinate({ message = "", memory = {}, awareness = {} } = {}) {
  const text = String(message).toLowerCase();

  const plan = [
    step("understand_intent", "Interpret the user intent and context.", "complete"),
    step("check_memory", "Use memory continuity without exposing private internals.", "complete"),
    step("protect_outcome", "Route protected actions through approval.", "complete")
  ];

  if (/calendar|schedule|time|remind/.test(text)) {
    plan.push(step("calendar_coordination", "Prepare calendar action for approval.", "prepared"));
  }

  if (/pay|payment|stripe|subscribe|buy/.test(text)) {
    plan.push(step("payment_coordination", "Prepare payment action but require approval.", "held"));
  }

  if (/email|message|contact|vendor|send/.test(text)) {
    plan.push(step("communication_coordination", "Prepare outbound message but require approval.", "held"));
  }

  if (/deploy|vercel|build|production/.test(text)) {
    plan.push(step("deployment_coordination", "Prepare build/deployment verification.", "prepared"));
  }

  return {
    ok: true,
    layer: "coordination_engine",
    plan,
    coordinationMode: "background",
    nextBestAction: plan.find((item) => item.status === "held") ? "ask_for_approval" : "continue_quietly",
    summary: `Prepared ${plan.length} coordination step(s) in the background.`
  };
}

function step(id, description, status) {
  return { id, description, status, createdAt: new Date().toISOString() };
}
