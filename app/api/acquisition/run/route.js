import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const message = body.message || body.request || "";

  return NextResponse.json({
    ok: true,
    layer: "fast_acquisition_runtime",
    response: buildFastResponse(message),
    latencyMode: "instant",
    background: {
      memory: "queued",
      retention: "queued",
      investorDemo: "available_on_demand",
      protectedExecution: "approval_required"
    },
    createdAt: new Date().toISOString()
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    name: "GatherGenius Fast Runtime",
    status: "ready"
  });
}

function buildFastResponse(message = "") {
  if (/voice|speak|talk/i.test(message)) {
    return "Voice is active. I am listening.";
  }

  if (/investor|demo|acquire/i.test(message)) {
    return "Investor demo is ready in the background.";
  }

  if (/calendar|stripe|payment|email/i.test(message)) {
    return "Protected action prepared. Approval required.";
  }

  return "I am active and ready.";
}
