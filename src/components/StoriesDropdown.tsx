"use client";

import { useState, useEffect } from "react";
import TagsList from "./TagsList";
interface Story {
  tags?: string[];
}
export default function StoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("/api/stories");
        const data = await res.json();

        if (data.success && Array.isArray(data.stories)) {
          const allTags: string[] = Array.from(
            new Set(data.stories.flatMap((story: Story) => story.tags || []))
          );

          setTags(allTags);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    }

    fetchTags();
  }, []);

  return (
    <div
      className='relative group'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className='text-gray-300 hover:text-white transition-colors cursor-default'>
        Stories
      </span>

      <div
        className={`absolute left-0 mt-4 w-[600px] bg-black rounded-lg shadow-xl transition-all duration-300 z-[200] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <TagsList tags={tags} />
      </div>
    </div>
  );
}
