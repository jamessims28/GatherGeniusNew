import { getSupabaseServer } from "../integrations/supabaseServer";

const localMemory = new Map();

export async function saveMemory({ userKey = "anonymous", type = "session", content = "", metadata = {} } = {}) {
  const item = { user_key: userKey, type, content, metadata, created_at: new Date().toISOString() };
  const supabase = getSupabaseServer();

  if (supabase) {
    const { data, error } = await supabase.from("gg_memories").insert(item).select().single();
    if (!error) return { ok: true, provider: "supabase", memory: data };
  }

  const list = localMemory.get(userKey) || [];
  const local = { id: `mem_${Date.now()}`, ...item };
  localMemory.set(userKey, [...list, local].slice(-200));
  return { ok: true, provider: "local", memory: local };
}

export async function recallMemory({ userKey = "anonymous", limit = 10 } = {}) {
  const supabase = getSupabaseServer();

  if (supabase) {
    const { data, error } = await supabase
      .from("gg_memories")
      .select("*")
      .eq("user_key", userKey)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (!error) return { ok: true, provider: "supabase", memories: data || [] };
  }

  const memories = (localMemory.get(userKey) || []).slice(-limit).reverse();
  return { ok: true, provider: "local", memories };
}
