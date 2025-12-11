import ChapterReader from "@/components/stories/ChapterReader";
import { JSX } from "react";

async function getStory(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${base}/api/stories/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch story");
  return res.json();
}

interface ChapterPageProps {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

export default async function ChapterPage({ params }: ChapterPageProps): Promise<JSX.Element> {
  // Await the params promise
  const { slug, chapter } = await params;

  const data = await getStory(slug);

  if (!data.success) return <div>Story not found</div>;

  const chapterIndex = Number(chapter) - 1;

  return <ChapterReader story={data.story} initialChapter={chapterIndex} />;
}
