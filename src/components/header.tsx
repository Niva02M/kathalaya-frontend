"use client";

import { Search, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { user } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    setHasMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShowHeader = isVisible || isHovering || scrollY < 100;

  const genres = [
    "Romance",
    "Mystery",
    "Thriller",
    "Fantasy",
    "Adventure",
    "Historical",
    "Sci-Fi",
    "Drama",
    "Non-Fiction",
    "Children's",
    "Young Adult",
    "Horror",
    "Comedy",
    "Poetry",
    "Self-Help",
  ];

  const authors = ["Author A", "Author B", "Author C", "Author D", "Author E"];
  const splitIndex = Math.floor(genres.length / 2);
  const firstHalf = genres.slice(0, splitIndex);
  const secondHalf = genres.slice(splitIndex);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-20 z-50 pointer-events-auto"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      <header
        className={`fixed top-0 left-0 right-0 z-[100] border-b transition-all duration-300 ease-in-out ${
          shouldShowHeader ? "translate-y-0" : "-translate-y-full"
        } ${
          scrollY > 50
            ? "bg-black/80 backdrop-blur-md border-gray-800"
            : "bg-transparent border-transparent"
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-white">
                KATHA/LAYA
              </Link>
              <nav className="hidden md:flex items-center space-x-8 relative">
                <div className="relative group">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-default">
                    Stories
                  </span>
                  <div className="absolute left-0 mt-4 w-[600px] bg-black rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-[200]">
                    <div className="grid grid-cols-3 gap-6 p-6">
                      <div>
                        <h4 className="text-yellow-200 font-semibold mb-2">
                          Genres
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-100">
                          {firstHalf.map((genre) => (
                            <li key={genre}>
                              <a
                                href={`/storylist?genre=${encodeURIComponent(
                                  genre.toLowerCase()
                                )}`}
                                className="hover:underline"
                              >
                                {genre}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-6 md:pt-0">
                        <ul className="space-y-1 text-sm text-gray-100">
                          {secondHalf.map((genre) => (
                            <li key={genre}>
                              <a
                                href={`/storylist?genre=${encodeURIComponent(
                                  genre.toLowerCase()
                                )}`}
                                className="hover:underline"
                              >
                                {genre}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-yellow-200 font-semibold mb-2">
                          Popular Authors
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-100">
                          {authors.map((author) => (
                            <li key={author}>
                              <a href="#" className="hover:underline">
                                {author}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Search
                className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />

              {isLoggedIn ? (
                <>
                  {" "}
                  <Heart className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                  <Link
                    href="/user"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                  >
                    <User className="h-5 w-5 " />
                    <span className="">{user.username} </span>
                  </Link>{" "}
                  <Link href="/write">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                      Write
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/login">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Sign Up
                  </Button>
                </Link>
              )}
              <Menu className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer md:hidden" />
            </div>
          </div>

          {hasMounted && (
            <div className="absolute right-6 top-20 z-50">
              <div
                className={`transition-all duration-300 ease-in-out transform ${
                  isSearchOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
              >
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search stories..."
                    className="w-full px-4 py-2 pr-10 rounded-md bg-gray-800/30 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
