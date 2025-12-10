import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "";

export async function GET() {
  let client;

  try {
    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);

    const stories = await db.collection("stories").find({}).sort({ createdAt: -1 }).toArray();

    console.log("Fetched stories from DB:", stories.length);

    return NextResponse.json({
      success: true,
      stories: stories.map((story) => ({
        _id: story._id.toString(),
        title: story.title,
        slug: story.slug, // <-- Add this
        coverUrl: story.coverUrl,
        authorId: story.authorId,
        authorName: story.authorName,
        tags: story.tags || [],
        chapters: story.chapters || [],
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch stories" }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
