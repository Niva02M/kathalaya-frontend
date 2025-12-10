"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface Chapter {
  chapterNumber: number;
  title: string;
  content: string;
}

interface Story {
  _id: string;
  title: string;
  authorName: string;
  chapters?: Chapter[];
}

interface ChapterReaderProps {
  story: Story;
  initialChapter: number;
}

export default function ChapterReader({ story, initialChapter }: ChapterReaderProps) {
  const router = useRouter();
  const [currentChapter, setCurrentChapter] = useState(initialChapter);

  const chapter = story.chapters?.[currentChapter];
  const hasNext = currentChapter < (story.chapters?.length || 0) - 1;
  const hasPrev = currentChapter > 0;

  if (!chapter) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white p-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <p className='text-gray-400'>Chapter not found</p>
          <Button onClick={() => router.back()} className='mt-4 bg-gray-800 hover:bg-gray-700'>
            Back to Story
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen text-white p-8'>
      <div className='max-w-4xl mx-auto'>
        <Button
          onClick={() => router.back()}
          className='mb-6 bg-gray-800 hover:bg-gray-700 text-white'
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back to Story
        </Button>

        {/* Chapter Header */}
        <div className='mb-8'>
          <p className='text-yellow-400 font-semibold mb-2'>Chapter {chapter.chapterNumber}</p>
          <h1 className='text-3xl font-bold mb-2'>{chapter.title}</h1>
          <p className='text-gray-400'>
            {story.title} by {story.authorName}
          </p>
        </div>

        <div className='prose prose-invert prose-lg max-w-none mb-12'>
          <div className='bg-gray-900/90 rounded-xl p-8 leading-relaxed'>
            {chapter.content.split("\n").map(
              (paragraph, idx) =>
                paragraph.trim() && (
                  <p key={idx} className='mb-4 text-gray-300'>
                    {paragraph}
                  </p>
                )
            )}
          </div>
        </div>

        <div className='flex justify-between items-center pt-8 border-t border-gray-800'>
          <Button
            onClick={() => setCurrentChapter(currentChapter - 1)}
            disabled={!hasPrev}
            className='bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ChevronLeft className='h-4 w-4 mr-2' />
            Previous Chapter
          </Button>

          <span className='text-gray-400'>
            {currentChapter + 1} / {story.chapters?.length || 0}
          </span>

          <Button
            onClick={() => setCurrentChapter(currentChapter + 1)}
            disabled={!hasNext}
            className='bg-yellow-400 hover:bg-yellow-500 text-black disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next Chapter
            <ChevronRight className='h-4 w-4 ml-2' />
          </Button>
        </div>
      </div>
    </div>
  );
}
