const memoryCache = new Map();

export async function remember({ userKey = "anonymous", type = "session", content = "", metadata = {} } = {}) {
  const item = {
    id: `mem_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    userKey,
    type,
    content,
    metadata,
    createdAt: new Date().toISOString()
  };

  const list = memoryCache.get(userKey) || [];
  memoryCache.set(userKey, [...list, item].slice(-200));

  return {
    ok: true,
    provider: process.env.MEMORY_PROVIDER || "local",
    item,
    persisted: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  };
}

export async function recall({ userKey = "anonymous", query = "", limit = 8 } = {}) {
  const list = memoryCache.get(userKey) || [];
  const q = String(query).toLowerCase();

  const matches = q
    ? list.filter((item) => `${item.type} ${item.content}`.toLowerCase().includes(q))
    : list;

  return {
    ok: true,
    provider: process.env.MEMORY_PROVIDER || "local",
    memories: matches.slice(-limit),
    count: matches.length
  };
}

export async function buildMemoryContext({ userKey = "anonymous", message = "" } = {}) {
  const recalled = await recall({ userKey, query: message, limit: 5 });

  if (message) {
    await remember({
      userKey,
      type: "conversation_signal",
      content: message,
      metadata: { source: "ambient_runtime" }
    });
  }

  return {
    ok: true,
    summary: recalled.memories.length
      ? `Recalled ${recalled.memories.length} memory item(s).`
      : "No prior memory found for this context.",
    memories: recalled.memories
  };
}
