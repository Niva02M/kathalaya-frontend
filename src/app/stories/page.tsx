"use client";

import { useEffect, useState } from "react";
import StoriesGrid, { Story } from "@/components/stories/StoriesGrid";

export default function StoriesPage() {
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

  return (
    <div className='min-h-screen'>
      <StoriesGrid stories={stories} loading={loading} />
    </div>
  );
}
