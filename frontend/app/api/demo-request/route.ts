import { NextResponse } from "next/server";
export async function POST(req: Request) {
 let data;
 try { data = await req.json(); } catch { return NextResponse.json({message:"Invalid request."},{status:400}); }
 try {
  const response = await fetch(`${process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:5000"}/api/website-settings/demo-request`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data),signal:AbortSignal.timeout(30000),cache:"no-store"});
  return NextResponse.json(await response.json(),{status:response.status});
 } catch { return NextResponse.json({message:"Demo requests are temporarily unavailable. Please contact us by phone or email."},{status:503}); }
}
