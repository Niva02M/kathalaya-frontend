"use client";

import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import Image from "next/legacy/image";
import bookstore from "@/public/assets/bookstore.jpg";
import { useEffect, useState } from "react";

interface Story {
  _id: string;
  title: string;
  authorName: string;
  coverUrl?: string;
  slug: string;
  chapters?: any[];
}

export default function HeroSection() {
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await fetch("/api/stories");
        const data = await res.json();
        if (data.success && Array.isArray(data.stories)) {
          const targetStory = data.stories.find((s: Story) => s._id === "693956ac719ac1331a7810c7");
          if (targetStory) setStory(targetStory);
        }
      } catch (err) {
        console.error("Failed to fetch story", err);
      }
    }

    fetchStory();
  }, []);

  if (!story) return null;

  return (
    <section className='relative min-h-screen flex items-center z-0'>
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 z-[-1]'>
          <Image
            src={bookstore}
            layout='fill'
            alt='Library background'
            className='object-cover'
            priority
          />
          <div className='absolute h-full inset-0 bg-gradient-to-r from-black via-black/80 to-transparent'></div>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black'></div>
        </div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24'>
        <div className='space-y-8'>
          <div>
            <h1 className='text-5xl lg:text-7xl font-bold mb-4 leading-tight'>{story.title}</h1>
            <p className='text-gray-300 text-lg mb-2'>By {story.authorName}</p>
            <p className='text-gray-400 text-lg mb-2'>{story.chapters?.length || 0} chapters</p>
          </div>

          <p className='text-gray-300 text-lg leading-relaxed max-w-lg'>
            In a bustling Kathmandu café, a young girl notices a stranger quietly crying. A small,
            hurriedly folded note, a silent cry of her emotions, slips into her hand, sparking
            curiosity, suspense, and unanswered questions.
          </p>

          <div className='flex items-center space-x-4'>
            <Button
              className='bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold'
              onClick={() => (window.location.href = `/stories/${story.slug}/chapter/1`)}
            >
              <Play className='h-4 w-4 mr-2' />
              Start Reading
            </Button>
            <Button
              variant='outline'
              className='border-gray-600 text-white hover:bg-gray-800 px-8 py-3 rounded-full bg-transparent'
              onClick={() => (window.location.href = `/stories/${story.slug}`)}
            >
              <Info className='h-4 w-4 mr-2' />
              More Info
            </Button>
          </div>
        </div>

        <div className='flex justify-center lg:justify-end'>
          <div className='relative text-center'>
            <div className='w-80 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden relative'>
              {story.coverUrl ? (
                <Image src={story.coverUrl} alt={story.title} layout='fill' objectFit='cover' />
              ) : null}
            </div>
            <p className='text-sm text-gray-200 mt-4'>Featured Book</p>
          </div>
        </div>
      </div>
    </section>
  );
}
