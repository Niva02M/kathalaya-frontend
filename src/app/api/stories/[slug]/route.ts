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
    console.error("Error fetching story:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch story" }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  let client;

  try {
    const body = await req.json();
    const { title, coverUrl, tags, chapters, editorEmail } = body;

    if (!editorEmail) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!title || !chapters?.length) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);

    const [story, user] = await Promise.all([
      db.collection("stories").findOne({ slug }),
      db.collection("users").findOne({ email: editorEmail }),
    ]);

    if (!story) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userId = user._id.toString();
    const isAuthor = story.authorId === userId || story.authorName === user.username;

    if (!isAuthor) {
      return NextResponse.json(
        { success: false, error: "You are not allowed to edit this story" },
        { status: 403 },
      );
    }

    const normalizedChapters = chapters.map((chapter: any, index: number) => ({
      chapterNumber: index + 1,
      title: chapter.title,
      content: chapter.content,
    }));

    await db.collection("stories").updateOne(
      { slug },
      {
        $set: {
          title,
          coverUrl: coverUrl || null,
          tags: Array.isArray(tags) ? tags : [],
          chapters: normalizedChapters,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ success: true, message: "Story updated" });
  } catch (error) {
    console.error("Error updating story:", error);
    return NextResponse.json({ success: false, error: "Failed to update story" }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  let client;

  try {
    const body = await req.json();
    const { editorEmail } = body;

    if (!editorEmail) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);

    const [story, user] = await Promise.all([
      db.collection("stories").findOne({ slug }),
      db.collection("users").findOne({ email: editorEmail }),
    ]);

    if (!story) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userId = user._id.toString();
    const isAuthor = story.authorId === userId || story.authorName === user.username;

    if (!isAuthor) {
      return NextResponse.json(
        { success: false, error: "You are not allowed to delete this story" },
        { status: 403 },
      );
    }

    await db.collection("stories").deleteOne({ slug });
    return NextResponse.json({ success: true, message: "Story deleted" });
  } catch (error) {
    console.error("Error deleting story:", error);
    return NextResponse.json({ success: false, error: "Failed to delete story" }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
