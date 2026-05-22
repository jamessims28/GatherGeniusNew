import { getSupabaseServer } from "../integrations/supabaseServer";

const localEvents = [];

export async function trackBetaEvent({ userKey = "anonymous", event = "orb_click", metadata = {} } = {}) {
  const row = { user_key: userKey, event, metadata, created_at: new Date().toISOString() };
  const supabase = getSupabaseServer();

  if (supabase) {
    const { error } = await supabase.from("gg_beta_events").insert(row);
    if (!error) return { ok: true, provider: "supabase", event: row };
  }

  localEvents.push(row);
  return { ok: true, provider: "local", event: row };
}

export async function getRetentionMetrics({ userKey = null } = {}) {
  const target = Number(process.env.BETA_TARGET_USERS || 100);
  const events = userKey ? localEvents.filter((x) => x.user_key === userKey) : localEvents;
  const users = new Set(events.map((x) => x.user_key));

  return {
    ok: true,
    targetBetaUsers: target,
    betaUsersTracked: users.size,
    activationPercent: Math.min(100, Math.round((users.size / target) * 100)),
    totalEvents: events.length,
    coreEvents: ["orb_click", "voice_attempt", "memory_save", "api_run", "integration_interest"],
    status: users.size >= target ? "beta_target_reached" : "building_beta_base"
  };
}
