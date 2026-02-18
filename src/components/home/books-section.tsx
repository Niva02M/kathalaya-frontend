"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StoriesGrid, { Story } from "@/components/stories/StoriesGrid";
import { ChevronRight } from "lucide-react";

// Hook to get current window width
function useWindowWidth() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function BooksSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const width = useWindowWidth();

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

  const getVisibleCount = () => {
    if (width < 640) return 2; 
    if (width < 1024) return 3; 
    if (width < 1280) return 5; 
    return 6;
  };

  const visibleStories = stories.slice(0, getVisibleCount());

  return (
    <section className='py-10 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl sm:text-3xl font-bold'>Books</h2>
        <Link
          href='/stories'
          className='text-yellow-400 hover:text-yellow-300 flex items-center space-x-2'
        >
          <span>See more</span>
          <ChevronRight className='h-4 w-4' />
        </Link>
      </div>
      <StoriesGrid stories={visibleStories} loading={loading} compact />
    </section>
  );
}
