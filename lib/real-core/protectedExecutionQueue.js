const protectedTypes = ["payment", "booking", "calendar_invite", "external_message", "data_export", "deployment"];

export function buildExecutionQueue({ coordination = {}, approvals = {} } = {}) {
  const queue = (coordination.plan || []).map((item) => {
    const type = classify(item.id);
    const protectedAction = protectedTypes.includes(type);
    return {
      id: `exec_${item.id}_${Date.now()}`,
      type,
      label: item.description,
      status: protectedAction ? "approval_required" : "ready",
      protected: protectedAction,
      approved: approvals[item.id] === true,
      canExecute: !protectedAction || approvals[item.id] === true
    };
  });

  return {
    ok: true,
    layer: "protected_execution_queue",
    queue,
    readyCount: queue.filter((item) => item.canExecute).length,
    heldCount: queue.filter((item) => !item.canExecute).length,
    executionPolicy: process.env.EXECUTION_REQUIRES_APPROVAL !== "false" ? "approval_required" : "auto_allowed"
  };
}

export function executeApprovedQueue({ queue = [] } = {}) {
  const executed = queue.filter((item) => item.canExecute).map((item) => ({
    ...item,
    executedAt: new Date().toISOString(),
    result: "simulated_safe_execution"
  }));

  return {
    ok: true,
    executed,
    blocked: queue.filter((item) => !item.canExecute),
    message: `${executed.length} action(s) executed; ${queue.length - executed.length} held for approval.`
  };
}

function classify(id = "") {
  if (/payment/.test(id)) return "payment";
  if (/calendar/.test(id)) return "calendar_invite";
  if (/communication/.test(id)) return "external_message";
  if (/deployment/.test(id)) return "deployment";
  return "internal_preparation";
}
