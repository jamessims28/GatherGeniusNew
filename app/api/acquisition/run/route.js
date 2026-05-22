import { NextResponse } from "next/server";
import { runAcquisitionReadyRuntime } from "../../../../lib/acquisition/acquisitionRuntime";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const result = await runAcquisitionReadyRuntime({
    message: body.message || body.request || "",
    userKey: body.userKey || "anonymous_preview",
    clientState: body.clientState || {}
  });
  return NextResponse.json(result);
}

export async function GET() {
  const result = await runAcquisitionReadyRuntime({
    message: "investor demo status",
    userKey: "health_check"
  });
  return NextResponse.json(result);
}
