// app/api/user/avatar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import clientPromise from "@/lib/mongodb";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email")?.toString();
    const file = formData.get("avatar") as File;

    if (!email || !file) {
      return NextResponse.json({ error: "Email and avatar required" }, { status: 400 });
    }

    // Convert file to buffer then to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "kathalaya/avatars",
      transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
    });

    // Update MongoDB
    const client = await clientPromise;
    const db = client.db("kathalaya");
    await db
      .collection("users")
      .updateOne({ email }, { $set: { avatar: uploadResponse.secure_url } });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (err) {
    console.error("Avatar upload error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
