import { NextResponse } from "next/server";
import { runLiveDemoRuntime } from "../../../../lib/phase15/liveDemoRuntime";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const result = runLiveDemoRuntime({
    userKey: body.userKey || "anonymous_preview",
    event: body.event || "orb_click",
    message: body.message || body.request || "",
    integrations: body.integrations || {}
  });

  return NextResponse.json(result);
}

export async function GET() {
  const result = runLiveDemoRuntime({
    userKey: "investor_demo_view",
    event: "api_run",
    message: "phase 15 status"
  });

  return NextResponse.json(result);
}
