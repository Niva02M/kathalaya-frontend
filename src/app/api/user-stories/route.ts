import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const authorId = url.searchParams.get("authorId");

  if (!authorId) {
    return NextResponse.json({ success: false, error: "Missing authorId" }, { status: 400 });
  }

  let client;
  try {
    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);

    const stories = await db
      .collection("stories")
      .find({ authorId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      stories: stories.map((story) => ({
        _id: story._id.toString(),
        title: story.title,
        slug: story.slug,
        coverUrl: story.coverUrl,
        authorId: story.authorId,
        authorName: story.authorName,
        chapters: story.chapters || [],
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch stories" }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}
