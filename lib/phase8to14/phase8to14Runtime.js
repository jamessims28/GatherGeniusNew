import { runRealtimeVoiceFoundation } from "./realtimeVoiceFoundation";
import { runSupabaseMemoryWiring } from "./supabaseMemoryWiring";
import { runRealIntegrationsRouter } from "./realIntegrationsRouter";
import { runProductionAgentSystem } from "./productionAgentSystem";
import { runBetaTestingTelemetry } from "./betaTestingTelemetry";
import { runMonetizationReadiness } from "./monetizationReadiness";
import { runInvestorDemoPackage } from "./investorDemoPackage";

export function runPhase8to14Runtime({ message = "", userKey = "anonymous_preview" } = {}) {
  const voice = runRealtimeVoiceFoundation({ message });
  const memory = runSupabaseMemoryWiring({ message, userKey });
  const integrations = runRealIntegrationsRouter({ message });
  const agents = runProductionAgentSystem({ message, memory, integrations });
  const beta = runBetaTestingTelemetry({ message, userKey });
  const monetization = runMonetizationReadiness({ message });
  const investor = runInvestorDemoPackage({ voice, memory, integrations, agents, beta, monetization });

  return {
    ok: true,
    layer: "phase_8_to_14_runtime",
    hiddenFromLandingPage: true,
    voice,
    memory,
    integrations,
    agents,
    beta,
    monetization,
    investor,
    response: `Phases 8 through 14 are active in the background. Investor readiness score: ${investor.investorReadinessScore}%.`,
    createdAt: new Date().toISOString()
  };
}
