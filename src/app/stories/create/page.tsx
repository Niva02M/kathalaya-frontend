"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateStoryPage() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [tags, setTags] = useState("");
  const [chapters, setChapters] = useState([{ chapterNumber: 1, title: "", content: "" }]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in first");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  const handleAddChapter = () => {
    setChapters((prev) => [...prev, { chapterNumber: prev.length + 1, title: "", content: "" }]);
  };

  const handleChapterChange = (index: number, field: "title" | "content", value: string) => {
    setChapters((prev) => prev.map((ch, idx) => (idx === index ? { ...ch, [field]: value } : ch)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const body = {
      title,
      coverUrl,
      authorId: user.id,
      authorName: user.name,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      chapters,
    };

    try {
      const res = await fetch("/api/create-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Story uploaded successfully!");

        setTitle("");
        setCoverUrl("");
        setTags("");
        setChapters([{ chapterNumber: 1, title: "", content: "" }]);
      } else {
        toast.error("Story upload failed!. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal Error occurred. Try again.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setCoverUrl(data.url);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  return (
    <div className='min-h-screen text-white p-36 max-w-5xl mx-auto'>
      <h1 className='text-4xl font-bold mb-8 text-yellow-400'>Create a New Story</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <input
          type='text'
          placeholder='Story Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='p-3 rounded-lg bg-gray-800 text-white'
          required
        />

        <div className='flex flex-col gap-2'>
          <label className='flex items-center gap-2 text-gray-300'>
            <ImageIcon className='h-5 w-5' /> Cover Image
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='p-2 rounded-lg bg-gray-800 text-white'
          />
          {coverUrl && (
            <img
              src={coverUrl}
              alt='Cover Preview'
              className='mt-2 w-48 h-64 object-cover rounded-lg'
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
          {chapters.map((ch, idx) => (
            <div key={idx} className='flex flex-col gap-2 p-4 bg-gray-900 rounded-xl'>
              <h2 className='text-yellow-400 font-semibold'>Chapter {ch.chapterNumber}</h2>
              <input
                type='text'
                placeholder='Chapter Title'
                value={ch.title}
                onChange={(e) => handleChapterChange(idx, "title", e.target.value)}
                className='p-2 rounded-lg bg-gray-800 text-white'
                required
              />
              <textarea
                rows={6}
                placeholder='Chapter Content'
                value={ch.content}
                onChange={(e) => handleChapterChange(idx, "content", e.target.value)}
                className='p-2 rounded-lg bg-gray-800 text-white'
                required
              />
            </div>
          ))}

          <Button
            type='button'
            onClick={handleAddChapter}
            className='flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full'
          >
            <Plus className='h-4 w-4' /> Add Chapter
          </Button>
        </div>

        <Button
          type='submit'
          className='bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold'
        >
          Create Story
        </Button>
      </form>
    </div>
  );
}
