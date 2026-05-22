import { NextResponse } from "next/server";
import { runStrategicAcquisitionRuntime } from "../../../../lib/phase16/strategicAcquisitionRuntime";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json(runStrategicAcquisitionRuntime({
    currentUsers: body.currentUsers || 0,
    currentRevenue: body.currentRevenue || 0
  }));
}

export async function GET() {
  return NextResponse.json(runStrategicAcquisitionRuntime({ currentUsers: 0, currentRevenue: 0 }));
}
