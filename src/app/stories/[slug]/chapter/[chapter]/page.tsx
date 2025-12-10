// src/app/stories/[slug]/chapter/[chapter]/page.tsx
import ChapterReader from "@/components/stories/ChapterReader";

async function getStory(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${base}/api/stories/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch story");
  return res.json();
}

export default async function ChapterPage({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  const { slug, chapter } = params;
  const data = await getStory(slug);

  if (!data.success) return <div>Story not found</div>;

  const chapterIndex = Number(chapter) - 1;

  return <ChapterReader story={data.story} initialChapter={chapterIndex} />;
}
