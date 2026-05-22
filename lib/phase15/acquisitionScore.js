export function calculateAcquisitionScore({
  betaUsers = 0,
  totalEvents = 0,
  voiceReady = false,
  memoryReady = false,
  stripeReady = false,
  calendarReady = false,
  orbQuality = 100
} = {}) {
  const betaScore = Math.min(25, Math.round((betaUsers / Number(process.env.TARGET_BETA_USERS || 100)) * 25));
  const usageScore = Math.min(20, Math.round(totalEvents / 5));
  const integrationScore =
    (voiceReady ? 10 : 5) +
    (memoryReady ? 10 : 5) +
    (stripeReady ? 10 : 4) +
    (calendarReady ? 10 : 4);
  const designScore = Math.min(20, Math.round((orbQuality / 100) * 20));

  const total = Math.min(100, betaScore + usageScore + integrationScore + designScore);

  return {
    layer: "acquisition_score",
    score: total,
    target: Number(process.env.TARGET_INVESTOR_SCORE || 85),
    status: total >= Number(process.env.TARGET_INVESTOR_SCORE || 85) ? "acquisition_demo_ready" : "building_to_target",
    breakdown: { betaScore, usageScore, integrationScore, designScore }
  };
}
