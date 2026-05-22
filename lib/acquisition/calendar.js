export function getCalendarStatus() {
  const configured = Boolean(process.env.GOOGLE_CALENDAR_CLIENT_ID && process.env.GOOGLE_CALENDAR_CLIENT_SECRET);
  return {
    ok: true,
    configured,
    provider: "google_calendar",
    status: configured ? "ready_for_oauth" : "needs_env_keys",
    protectedAction: true
  };
}

export function prepareCalendarAction({ title = "GatherGenius Coordination", description = "", startTime = null } = {}) {
  return {
    ok: true,
    type: "calendar_invite",
    title,
    description,
    startTime,
    status: "prepared_for_approval",
    requiresApproval: true
  };
}
