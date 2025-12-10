"use client";

import { useRouter } from "next/navigation";

interface TagsListProps {
  tags: string[];
}

export default function TagsList({ tags }: TagsListProps) {
  const router = useRouter();
  const allTags = ["All", ...tags];
  const maxVisible = 10;
  const visibleTags = allTags.slice(0, maxVisible);
  const hasMore = allTags.length > maxVisible;
  const handleTagClick = (tag: string) => {
    router.push(`/stories?tag=${encodeURIComponent(tag.toLowerCase())}`);
  };

  const formatTag = (tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

  return (
    <div className='p-6'>
      <h4 className='text-yellow-200 font-semibold mb-2'>Tags</h4>
      <div className='grid grid-cols-5 gap-4'>
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className='text-sm text-gray-100 hover:underline text-left'
          >
            {formatTag(tag)}
          </button>
        ))}

        {hasMore && (
          <button
            onClick={() => router.push("/stories")}
            className='text-sm text-gray-100 hover:underline col-span-5 mt-2 text-left'
          >
            More...
          </button>
        )}
      </div>
    </div>
  );
}
