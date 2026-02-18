"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Chapter {
  chapterNumber: number;
  title: string;
  content: string;
}

interface Story {
  _id: string;
  title: string;
  slug: string;
  coverUrl?: string;
  authorId: string;
  authorName: string;
  tags?: string[];
  chapters: Chapter[];
}

export default function EditStoryPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug;

  const [editorEmail, setEditorEmail] = useState("");
  const [story, setStory] = useState<Story | null>(null);
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [tags, setTags] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const hasValidForm = useMemo(
    () =>
      title.trim().length > 0 &&
      chapters.length > 0 &&
      chapters.every((c) => c.title.trim() && c.content.trim()),
    [title, chapters],
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Please log in first");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setEditorEmail(parsedUser.email || "");
  }, [router]);

  useEffect(() => {
    if (!slug) return;

    const fetchStory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/stories/${slug}`);
        const data = await res.json();

        if (!data.success) {
          toast.error("Story not found");
          router.push("/user");
          return;
        }

        const fetchedStory: Story = data.story;
        setStory(fetchedStory);
        setTitle(fetchedStory.title || "");
        setCoverUrl(fetchedStory.coverUrl || "");
        setTags((fetchedStory.tags || []).join(", "));
        setChapters(fetchedStory.chapters || []);
      } catch (error) {
        console.error("Failed to fetch story:", error);
        toast.error("Failed to load story");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug, router]);

  const handleAddChapter = () => {
    setChapters((prev) => [
      ...prev,
      { chapterNumber: prev.length + 1, title: "", content: "" },
    ]);
  };

  const handleDeleteChapter = (index: number) => {
    setChapters((prev) =>
      prev
        .filter((_, idx) => idx !== index)
        .map((chapter, idx) => ({ ...chapter, chapterNumber: idx + 1 })),
    );
  };

  const handleChapterChange = (index: number, field: "title" | "content", value: string) => {
    setChapters((prev) => prev.map((ch, idx) => (idx === index ? { ...ch, [field]: value } : ch)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorEmail) {
      toast.error("Please log in first");
      return;
    }

    if (!hasValidForm) {
      toast.error("Fill all chapter titles and contents");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/stories/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          coverUrl,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          chapters,
          editorEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.error || "Failed to update story");
        return;
      }

      toast.success("Story updated");
      router.push("/user");
    } catch (error) {
      console.error("Failed to update story:", error);
      toast.error("Failed to update story");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStory = async () => {
    if (!editorEmail) {
      toast.error("Please log in first");
      return;
    }

    const confirmed = window.confirm("Delete this story permanently?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/stories/${slug}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editorEmail }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "Failed to delete story");
        return;
      }

      toast.success("Story deleted");
      router.push("/user");
    } catch (error) {
      console.error("Failed to delete story:", error);
      toast.error("Failed to delete story");
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen py-24 px-4 text-white'>
        <div className='max-w-5xl mx-auto'>Loading story...</div>
      </div>
    );
  }

  if (!story) return null;

  return (
    <div className='min-h-screen text-white py-24 sm:py-32 px-4 sm:px-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='mb-6 flex items-center justify-between gap-4'>
          <h1 className='text-3xl sm:text-4xl font-bold text-yellow-400'>Edit Story</h1>
          <Button
            type='button'
            onClick={handleDeleteStory}
            className='bg-red-600 hover:bg-red-700 text-white'
          >
            Delete Story
          </Button>
        </div>

        <form onSubmit={handleSave} className='flex flex-col gap-6'>
          <input
            type='text'
            placeholder='Story Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-3 rounded-lg bg-gray-800 text-white'
            required
          />

          <div className='flex flex-col gap-2'>
            <label className='text-gray-300'>Cover URL</label>
            <input
              type='text'
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder='https://...'
              className='p-3 rounded-lg bg-gray-800 text-white'
            />
            {coverUrl && (
              <Image
                src={coverUrl}
                alt='Cover Preview'
                width={192}
                height={256}
                unoptimized
                className='mt-2 w-36 h-52 sm:w-48 sm:h-64 object-cover rounded-lg'
              />
            )}
          </div>

          <input
            type='text'
            placeholder='Tags (comma separated)'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='p-3 rounded-lg bg-gray-800 text-white'
          />

          <div className='space-y-4'>
            {chapters.map((chapter, idx) => (
              <div key={`${chapter.chapterNumber}-${idx}`} className='p-3 sm:p-4 bg-gray-900 rounded-xl'>
                <div className='mb-2 flex items-center justify-between'>
                  <h2 className='text-yellow-400 font-semibold'>Chapter {idx + 1}</h2>
                  <button
                    type='button'
                    onClick={() => handleDeleteChapter(idx)}
                    className='text-red-400 hover:text-red-300 disabled:opacity-40'
                    disabled={chapters.length <= 1}
                    aria-label={`Delete chapter ${idx + 1}`}
                  >
                    <Trash2 className='h-4 w-4' />
                  </button>
                </div>

                <div className='flex flex-col gap-2'>
                  <input
                    type='text'
                    placeholder='Chapter Title'
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(idx, "title", e.target.value)}
                    className='p-2 rounded-lg bg-gray-800 text-white'
                    required
                  />
                  <textarea
                    rows={6}
                    placeholder='Chapter Content'
                    value={chapter.content}
                    onChange={(e) => handleChapterChange(idx, "content", e.target.value)}
                    className='p-2 rounded-lg bg-gray-800 text-white'
                    required
                  />
                </div>
              </div>
            ))}

            <Button
              type='button'
              onClick={handleAddChapter}
              className='w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full'
            >
              <Plus className='h-4 w-4' /> Add Chapter
            </Button>
          </div>

          <div className='flex flex-col sm:flex-row gap-3'>
            <Button
              type='submit'
              disabled={saving || !hasValidForm}
              className='w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold disabled:opacity-60'
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type='button'
              onClick={() => router.push("/user")}
              className='w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold'
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
