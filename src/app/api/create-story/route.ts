import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, coverUrl, authorId, authorName, tags, chapters } = body;

    if (!title || !authorId || !authorName || !chapters?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kathalaya");

    const story = {
      title,
      coverUrl: coverUrl || null,
      authorId,
      authorName,
      tags: tags || [],
      chapters,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("stories").insertOne(story);

    return NextResponse.json({ success: true, storyId: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 });
  }
}
