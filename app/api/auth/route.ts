import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

export async function GET() {
  const user = await currentUser();

  return NextResponse.json(user);
}
