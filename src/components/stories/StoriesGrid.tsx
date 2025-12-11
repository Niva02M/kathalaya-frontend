"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export interface Story {
  _id: string;
  title: string;
  authorName: string;
  slug: string;
  coverUrl?: string;
  tags?: string[];
  chapters?: any[];
}

interface StoriesGridProps {
  stories: Story[];
  loading: boolean;
}

export default function StoriesGrid({ stories, loading }: StoriesGridProps) {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag") || "all";

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const categories = useMemo(() => {
    const allTags = stories.flatMap((story) => story.tags || []);
    const uniqueTags = Array.from(new Set(allTags.map((t) => t.toLowerCase())));
    return ["all", ...uniqueTags].map(capitalize);
  }, [stories]);

  const selectedCategory =
    categories.find((c) => c.toLowerCase() === tagParam.toLowerCase()) || "All";

  const filteredStories =
    selectedCategory.toLowerCase() === "all"
      ? stories
      : stories.filter((story) =>
          story.tags?.some((t) => t.toLowerCase() === selectedCategory.toLowerCase())
        );

  if (loading) return <div className='text-gray-400 text-center py-12'>Loading stories...</div>;
  if (!filteredStories.length)
    return <div className='text-gray-400 text-center py-12'>No stories found</div>;

  return (
    <section className='py-16 px-6 max-w-7xl mx-auto'>
      {/* Category Tabs */}
      <div className='flex space-x-6 mb-8 overflow-x-auto pb-2'>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/stories?tag=${encodeURIComponent(category.toLowerCase())}`}
            className={`whitespace-nowrap pb-2 border-b-2 transition-colors ${
              selectedCategory === category
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
        {filteredStories.map((story) => (
          <Link key={story._id} href={`/stories/${story.slug}`}>
            <Card className='relativerounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group bg-transparent border-0'>
              <CardContent className='p-0'>
                <div className='w-full h-70 relative'>
                  {story.coverUrl ? (
                    <img
                      src={story.coverUrl}
                      alt={story.title}
                      className='w-full h-full object-cover rounded-xl'
                    />
                  ) : (
                    <div className='w-full h-48 flex items-center justify-center bg-gray-700 rounded-lg'>
                      <BookOpen className='h-12 w-12 text-gray-400' />
                    </div>
                  )}

                  <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3'>
                    <h3 className='text-white font-semibold text-sm line-clamp-2'>{story.title}</h3>
                  </div>
                  <div className='absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center p-4 rounded-lg'>
                    <h3 className='text-white font-bold text-base mb-2'>{story.title}</h3>
                    <p className='text-gray-300 text-sm'>{story.authorName}</p>
                    <p className='text-gray-400 text-xs mt-1'>
                      {story.chapters?.length || 0} chapters
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
