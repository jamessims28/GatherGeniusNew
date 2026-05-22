import { runAcquirerFitEngine } from "./acquirerFitEngine";
import { buildDiligenceChecklist } from "./diligenceChecklist";
import { buildAcquisitionNarrative } from "./acquisitionNarrative";
import { buildTractionMilestones } from "./tractionMilestones";

export function runStrategicAcquisitionRuntime({ currentUsers = 0, currentRevenue = 0 } = {}) {
  const acquirerFit = runAcquirerFitEngine({});
  const diligence = buildDiligenceChecklist({ acquirerFit });
  const narrative = buildAcquisitionNarrative({ acquirerFit });
  const traction = buildTractionMilestones({ currentUsers, currentRevenue });

  return {
    ok: true,
    layer: "phase16_strategic_acquisition_readiness",
    hiddenFromLandingPage: true,
    acquirerFit,
    diligence,
    narrative,
    traction,
    response: `Strategic acquisition readiness is prepared. Acquirer fit score: ${acquirerFit.score}.`,
    createdAt: new Date().toISOString()
  };
}
