"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StoriesGrid, { Story } from "@/components/stories/StoriesGrid";
import { ChevronRight } from "lucide-react";

export default function BooksSection() {
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

  // Show only first 5 stories for one row
  const visibleStories = stories.slice(0, 5);

  return (
    <div className='min-h-screen py-16 px-6 max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-3xl font-bold'>Books</h2>
        <Link
          href='/stories'
          className='text-yellow-400 hover:text-yellow-300 flex items-center space-x-2'
        >
          <span>See more</span>
          <ChevronRight className='h-4 w-4' />
        </Link>
      </div>
      <StoriesGrid stories={visibleStories} loading={loading} />
    </div>
  );
}
