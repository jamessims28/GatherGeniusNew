import { NextResponse } from "next/server";
import { runPhase8to14Runtime } from "../../../../lib/phase8to14/phase8to14Runtime";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json(runPhase8to14Runtime({
    message: body.message || body.request || "",
    userKey: body.userKey || "anonymous_preview"
  }));
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    name: "GatherGenius Phase 8-14 Runtime",
    status: "ready"
  });
}
