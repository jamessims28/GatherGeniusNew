export function runInvestorDemoPackage({ voice = {}, memory = {}, integrations = {}, agents = {}, beta = {}, monetization = {} } = {}) {
  const score =
    20 +
    (voice.enabled ? 15 : 8) +
    (memory.configured ? 15 : 8) +
    Math.min(20, (integrations.readyCount || 0) * 5) +
    Math.min(15, agents.activeAgents || 0 * 3) +
    (beta.enabled ? 10 : 0) +
    (monetization.enabled ? 10 : 0);

  return {
    phase: 14,
    layer: "investor_demo_package",
    enabled: process.env.INVESTOR_DEMO_MODE !== "false",
    investorReadinessScore: Math.min(100, score),
    assets: [
      "live_orb_demo",
      "voice_demo_path",
      "background_intelligence_api",
      "memory_story",
      "integration_roadmap",
      "monetization_plan",
      "beta_metrics_path"
    ],
    response: "Investor demo package is prepared around the Ambient AI Operating System story."
  };
}
