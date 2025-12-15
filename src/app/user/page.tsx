"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const TABS = ["Your Stories", "Reading List", "Followers"];

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [activeTab, setActiveTab] = useState("Your Stories");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [stories, setStories] = useState<any[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Not logged in");
      return;
    }

    const { email } = JSON.parse(storedUser);

    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || "",
          description: data.description || "",
        });
      });
  }, [mounted]);

  useEffect(() => {
    if (user && activeTab === "Your Stories") {
      fetchUserStories();
    }
  }, [user, activeTab]);

  const fetchUserStories = async () => {
    if (!user?.id) return;
    setLoadingStories(true);
    try {
      const res = await fetch(`/api/user-stories?authorId=${user.id}`);

      const data = await res.json();

      if (data.success) {
        setStories(data.stories);
      } else {
        toast.error("Failed to load stories");
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
      toast.error("Failed to load stories");
    } finally {
      setLoadingStories(false);
    }
  };

  const handleUpdate = async () => {
    const res = await fetch("/api/user/update", {
      method: "POST",
      body: JSON.stringify({ ...formData, email: user.email }),
    });

    if (res.ok) toast.success("Profile updated");
    else toast.error("Failed to update");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setUser((prev: any) => ({
      ...prev,
      avatar: previewUrl,
    }));

    const form = new FormData();
    form.append("avatar", file);
    form.append("email", user.email);

    const res = await fetch("/api/user/avatar", {
      method: "POST",
      body: form,
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      toast.error("Failed to parse server response.");
      return;
    }

    if (!res.ok) {
      toast.error(data?.error || "Avatar upload failed");
      return;
    }

    if (data.url) {
      setUser((u: any) => {
        const updatedUser = { ...u, avatar: data.url };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });
      toast.success("Avatar uploaded");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (!mounted || !user) {
    return (
      <div className='min-h-screen py-40 px-8 bg-black text-white'>
        <div className='p-6 text-white'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-40 px-8 bg-black text-white'>
      <div className='max-w-6xl mx-auto flex gap-8'>
        <div className='w-1/3 p-6 rounded-lg shadow-lg space-y-6'>
          <div className='flex flex-col items-center gap-4'>
            <img
              src={user.avatar || "/default-avatar.png"}
              className='w-24 h-24 rounded-full object-cover border border-gray-500'
              alt='Avatar'
            />

            <label className='bg-white text-black text-sm px-4 py-1 rounded cursor-pointer hover:bg-black hover:text-white transition'>
              {user.avatar ? "Change Avatar" : "Upload Avatar"}
              <input
                type='file'
                accept='image/*'
                onChange={handleAvatarUpload}
                className='hidden'
              />
            </label>
          </div>

          <div className='space-y-4'>
            <div>
              <label className='text-gray-500 text-sm'>Email</label>
              <input
                disabled
                value={user.email}
                className='w-full p-2 bg-gray-800/60 text-gray-500 rounded border border-gray-600'
              />
            </div>
            <div>
              <label className='text-gray-400 text-sm'>Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder='Name'
                className='w-full p-2 bg-gray-800/20 rounded border border-gray-600'
              />
            </div>
            <div>
              <label className='text-gray-400 text-sm'>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder='Describe yourself'
                className='w-full p-2 bg-gray-800/20 rounded border border-gray-600'
              />
            </div>
            <button
              onClick={handleUpdate}
              className='bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 w-full rounded'
            >
              Save Changes
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className='mt-4 bg-red-600 hover:bg-red-700 p-2 rounded w-full font-semibold text-white'
            >
              Logout
            </button>
          </div>
        </div>

        <div className='w-2/3'>
          <div className='flex space-x-4 border-b border-gray-700 mb-6'>
            {TABS.map((tab) => (
              <button
                key={tab}
                className={clsx(
                  "px-4 py-2 font-semibold transition-colors",
                  activeTab === tab
                    ? "border-b-2 border-yellow-400 text-yellow-400"
                    : "text-gray-400 hover:text-white"
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {activeTab === "Your Stories" && (
              <div className='space-y-4'>
                {loadingStories ? (
                  <div className='text-gray-400'>Loading stories...</div>
                ) : stories.length === 0 ? (
                  <div className='text-gray-400'>
                    <p>You haven&apos;t written any stories yet.</p>
                    <button
                      onClick={() => router.push(`/stories/create`)}
                      className='mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded'
                    >
                      Write Your First Story
                    </button>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 gap-4'>
                    {stories.map((story) => (
                      <div
                        key={story.id}
                        className='bg-gray-800/40 rounded-lg p-4 border border-gray-700 hover:border-yellow-400 transition cursor-pointer'
                        onClick={() => router.push(`/stories/${story.slug}`)}
                      >
                        <div className='flex gap-4'>
                          {story.coverUrl && (
                            <img
                              src={story.coverUrl}
                              alt={story.title}
                              className='w-24 h-24 object-cover rounded'
                            />
                          )}
                          <div className='flex-1'>
                            <h3 className='text-xl font-semibold text-white mb-2'>{story.title}</h3>
                            <div className='flex items-center gap-4 text-sm text-gray-400'>
                              <span>{story.chapters?.length || 0} chapters</span>
                              <span>•</span>
                              <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                            </div>
                            {story.updatedAt && story.updatedAt !== story.createdAt && (
                              <div className='text-xs text-gray-500 mt-1'>
                                Updated: {new Date(story.updatedAt).toLocaleDateString()}
                              </div>
                            )}
                          </div>{" "}
                          <div className='flex items-center'>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("Update story:", story._id);
                              }}
                              className='bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition'
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "Reading List" && (
              <div className='space-y-2 text-gray-300'>
                <p>Your saved/liked stories will appear here. (Coming soon)</p>
              </div>
            )}
            {activeTab === "Followers" && (
              <div className='space-y-2 text-gray-300'>
                <p>These people follow you. (Coming soon)</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-black/80 rounded-lg p-6 max-w-sm w-full text-white shadow-lg'>
            <h2 className='text-lg font-semibold mb-4'>Confirm Logout</h2>
            <p className='mb-6'>Do you want to logout?</p>
            <div className='flex justify-end space-x-4'>
              <button
                onClick={() => setShowLogoutModal(false)}
                className='px-4 py-2 rounded bg-gray-700 hover:bg-gray-600'
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className='px-4 py-2 rounded bg-red-600 hover:bg-red-700'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
