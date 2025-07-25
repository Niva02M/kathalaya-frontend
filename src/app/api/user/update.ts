// app/api/user/update.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { email, ...updates } = await req.json();

  if (!email)
    return NextResponse.json({ error: "Email required" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("kathalaya");

  await db.collection("users").updateOne({ email }, { $set: updates });

  return NextResponse.json({ message: "User updated successfully" });
}
