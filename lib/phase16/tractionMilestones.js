export function buildTractionMilestones({ currentUsers = 0, currentRevenue = 0 } = {}) {
  return {
    layer: "traction_milestones",
    milestones: [
      { id: "m1", target: "Deploy live Vercel demo", status: "ready" },
      { id: "m2", target: "Connect Supabase persistent memory", status: "ready_for_keys" },
      { id: "m3", target: "Connect OpenAI realtime voice", status: "ready_for_keys" },
      { id: "m4", target: "Recruit first 25 beta users", status: currentUsers >= 25 ? "complete" : "next" },
      { id: "m5", target: "Reach 100 beta users", status: currentUsers >= 100 ? "complete" : "target" },
      { id: "m6", target: "Show 30-day retention", status: "pending_live_usage" },
      { id: "m7", target: "Activate paid premium users", status: currentRevenue > 0 ? "complete" : "pending" }
    ],
    currentUsers,
    currentRevenue
  };
}
