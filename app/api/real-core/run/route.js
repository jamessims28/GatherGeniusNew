import { NextResponse } from "next/server";
import { runInvisibleIntelligence } from "../../../../lib/real-core/invisibleIntelligence";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const result = await runInvisibleIntelligence({
    message: body.message || body.request || "",
    userKey: body.userKey || "anonymous_preview",
    clientState: body.clientState || {},
    approvals: body.approvals || {}
  });
  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    name: "GatherGenius Real Ambient Core",
    status: "memory voice coordination execution awareness proactive invisible intelligence ready"
  });
}
