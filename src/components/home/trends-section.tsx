"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { Story } from "../stories/StoriesGrid";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function TrendsSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.offsetWidth / 2; // scroll half container width
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className='py-10 sm:py-16 px-4 sm:px-6'>
        <div className='max-w-7xl mx-auto text-center text-white'>Loading stories...</div>
      </section>
    );
  }

  return (
    <section className='py-10 sm:py-16 px-4 sm:px-6 relative z-10'>
      <div className='max-w-7xl mx-auto relative'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Trending Picks for you</h2>
          <div className='hidden md:flex space-x-2'>
            <button
              onClick={() => scroll("left")}
              className='p-2 bg-gray-800 rounded-full hover:bg-gray-700'
            >
              <ChevronLeft className='w-6 h-6 text-white' />
            </button>
            <button
              onClick={() => scroll("right")}
              className='p-2 bg-gray-800 rounded-full hover:bg-gray-700'
            >
              <ChevronRight className='w-6 h-6 text-white' />
            </button>
          </div>
        </div>

        <div ref={containerRef} className='overflow-x-auto scrollbar-hide flex gap-3 sm:gap-4 pb-2'>
          {stories.map((story) => (
            <Link key={story._id} href={`/stories/${story.slug}`}>
              <Card className='relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer bg-transparent border-0 min-w-[180px] sm:min-w-[200px] md:min-w-[250px]'>
                <CardContent className='p-0'>
                  <div className='w-full h-[260px] sm:h-[280px] md:h-[320px] relative'>
                    {story.coverUrl ? (
                      <Image
                        src={story.coverUrl}
                        alt={story.title}
                        fill
                        sizes='(max-width: 640px) 180px, (max-width: 768px) 200px, 250px'
                        className='object-cover rounded-xl'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center bg-gray-700'>
                        <BookOpen className='h-12 w-12 text-gray-400' />
                      </div>
                    )}
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
