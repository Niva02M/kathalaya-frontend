// app/api/user/avatar/route.ts
import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email")?.toString();
    const file = formData.get("avatar") as File;

    if (!email || !file) {
      return NextResponse.json(
        { error: "Email and avatar required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(filepath, buffer);

    const client = await clientPromise;
    const db = client.db("kathalaya");
    await db
      .collection("users")
      .updateOne({ email }, { $set: { avatar: `/uploads/${filename}` } });

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("Avatar upload error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
