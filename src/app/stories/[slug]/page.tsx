import StoryDetail from "@/components/stories/StoryDetail";

interface StoryPageProps {
  params: { slug: string };
}

async function getStory(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/stories/${slug}`, { cache: "no-store" });
  return res.json();
}

export default async function StoryPage({ params }: StoryPageProps) {
  const slug = params?.slug;

  if (!slug) {
    return <div className='text-white p-8'>Invalid story slug</div>;
  }

  const data = await getStory(slug);

  if (!data.success) {
    return <div className='text-white p-8'>Story not found</div>;
  }

  return <StoryDetail story={data.story} />;
}
