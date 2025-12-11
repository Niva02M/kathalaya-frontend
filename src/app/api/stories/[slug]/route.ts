import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  let client;

  try {
    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);

    const story = await db.collection("stories").findOne({ slug });

    if (!story) {
      return NextResponse.json({ success: false, message: "Story not found" });
    }

    return NextResponse.json({
      success: true,
      story: {
        _id: story._id.toString(),
        title: story.title,
        slug: story.slug,
        coverUrl: story.coverUrl,
        authorId: story.authorId,
        authorName: story.authorName,
        tags: story.tags || [],
        chapters: story.chapters || [],
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch story" }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
