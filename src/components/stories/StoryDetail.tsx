"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, ChevronRight } from "lucide-react";

interface Chapter {
  chapterNumber: number;
  title: string;
  content: string;
}

interface Story {
  _id: string;
  slug: string;
  title: string;
  authorName: string;
  coverUrl?: string;
  tags?: string[];
  chapters?: Chapter[];
}

export default function StoryDetail({ story }: { story: Story }) {
  const router = useRouter();

  return (
    <div className='min-h-screen text-white p-8'>
      <div className='max-w-5xl mx-auto'>
        <Button
          onClick={() => router.back()}
          className='mb-6 bg-gray-800 hover:bg-gray-700 text-white'
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back to Stories
        </Button>

        <Card className='bg-black border border-gray-800'>
          <CardContent className='p-0'>
            <div className='w-full h-96 relative'>
              <img
                src={story.coverUrl}
                alt={story.title}
                className='object-contain w-full h-full'
              />
            </div>

            <div className='p-6'>
              <h2 className='text-3xl font-bold text-white'>{story.title}</h2>
              <p className='text-gray-400 text-sm mt-2'>By {story.authorName}</p>

              <div className='mt-4 flex flex-wrap gap-2'>
                {story.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className='px-3 py-1 text-xs bg-gray-800 rounded-full text-gray-300 border border-gray-700'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className='text-xl text-white font-semibold mt-8 mb-4'>Chapters</h3>

              <div className='flex flex-col gap-3'>
                {story.chapters?.map((chapter) => (
                  <button
                    key={chapter.chapterNumber}
                    className='flex items-center justify-between px-4 py-3  text-gray-200 rounded-lg hover:bg-gray-700 transition'
                    onClick={() =>
                      router.push(`/stories/${story.slug}/chapter/${chapter.chapterNumber}`)
                    }
                  >
                    <span className='flex items-center'>
                      <BookOpen className='h-5 w-5 mr-3 text-blue-400' />
                      {chapter.title}
                    </span>
                    <ChevronRight className='h-4 w-4' />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
