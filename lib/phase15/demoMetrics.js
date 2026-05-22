const localMetrics = {
  events: [],
  users: new Set()
};

export function trackDemoEvent({ userKey = "anonymous_preview", event = "orb_click", metadata = {} } = {}) {
  const item = {
    userKey,
    event,
    metadata,
    createdAt: new Date().toISOString()
  };

  localMetrics.events.push(item);
  localMetrics.users.add(userKey);

  return {
    ok: true,
    item,
    totalEvents: localMetrics.events.length,
    betaUsers: localMetrics.users.size
  };
}

export function getDemoMetrics() {
  const events = localMetrics.events;
  const users = localMetrics.users.size;
  const voiceAttempts = events.filter((e) => e.event === "voice_attempt").length;
  const orbClicks = events.filter((e) => e.event === "orb_click").length;
  const apiRuns = events.filter((e) => e.event === "api_run").length;

  return {
    layer: "demo_metrics",
    betaUsers: users,
    totalEvents: events.length,
    voiceAttempts,
    orbClicks,
    apiRuns,
    activationRate: users ? Math.round((orbClicks / Math.max(1, users)) * 100) : 0,
    targetBetaUsers: Number(process.env.TARGET_BETA_USERS || 100)
  };
}
