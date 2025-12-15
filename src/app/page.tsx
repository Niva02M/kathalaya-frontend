import BooksSection from "@/components/home/books-section";
import TrendsSection from "@/components/home/trends-section";
import HeroSection, { Story } from "@/components/home/hero-section";

async function fetchStory(): Promise<Story | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stories`, {
      next: { revalidate: 60 }, 
    });
    const data = await res.json();
    return data.stories.find((s: Story) => s._id === "693956ac719ac1331a7810c7") || null;
  } catch (err) {
    console.error("Failed to fetch story", err);
    return null;
  }
}

export default async function Page() {
  const story = await fetchStory();

  if (!story) return <p className='text-white text-center mt-20'>Story not found</p>;

  return (
    <div className='min-h-screen bg-black text-white'>
      <HeroSection story={story} />
      <TrendsSection />
      <BooksSection />
    </div>
  );
}
