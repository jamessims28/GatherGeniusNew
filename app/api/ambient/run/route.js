import { NextResponse } from "next/server";
import { runPhaseRuntime } from "../../../../lib/ambient/phaseRuntime";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const result = runPhaseRuntime({
    message: body.message || body.request || "",
    context: body.context || {}
  });
  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    name: "GatherGenius Ambient AI Operating System",
    phases: "1-7",
    status: "ready"
  });
}
