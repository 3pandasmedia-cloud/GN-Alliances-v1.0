import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("NEW LEAD:", data);

  return NextResponse.json({
    success: true,
  });
}