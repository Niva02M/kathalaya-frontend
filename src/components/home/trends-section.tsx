"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Story } from "../stories/StoriesGrid";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

export default function TrendsSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      if (data.success) setStories(data.stories);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className='py-16 px-6'>
        <div className='max-w-7xl mx-auto text-center text-white'>Loading stories...</div>
      </section>
    );
  }

  return (
    <section className='py-16 px-6 relative z-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold'>Trending Picks for you</h2>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
          {stories.map((story) => (
            <Link key={story._id} href={`/stories/${story.slug}`}>
              <Card className='relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer bg-transparent border-0'>
                <CardContent className='p-0'>
                  <div className='w-full h-70 relative'>
                    {story.coverUrl ? (
                      <img
                        src={story.coverUrl}
                        alt={story.title}
                        className='w-full h-full object-cover rounded-xl'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center bg-gray-700'>
                        <BookOpen className='h-12 w-12 text-gray-400' />
                      </div>
                    )}

                    {/* Dark gradient overlay for title */}
                    <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3'>
                      <h3 className='text-white font-semibold text-sm line-clamp-2'>
                        {story.title}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
