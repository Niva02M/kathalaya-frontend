// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("kathalaya");
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    email: user.email,
    username: user.username,
    name: user.name || "",
    description: user.description || "",
    avatar: user.avatar || "",
    id: user._id.toString(),
  });
}
