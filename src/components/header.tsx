"use client";

import { Search, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import StoriesDropdown from "./StoriesDropdown";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (!hasMounted) return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasMounted, isMobileMenuOpen]);

  useEffect(() => {
    const closeMobileMenuOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeMobileMenuOnDesktop);
    return () => window.removeEventListener("resize", closeMobileMenuOnDesktop);
  }, []);

  useEffect(() => {
    if (!isSearchOpen || !hasMounted || window.innerWidth >= 768) return;
    mobileSearchInputRef.current?.focus();
  }, [isSearchOpen, hasMounted]);

  const shouldShowHeader =
    isVisible || isHovering || scrollY < 100 || isMobileMenuOpen || isSearchOpen;

  return (
    <>
      <div
        className='fixed top-0 left-0 right-0 h-20 z-50 pointer-events-auto hidden md:block'
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
        <div className='py-4 px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-6'>
              <Link href='/' className='text-xl sm:text-2xl font-bold text-white'>
                KATHA/LAYA
              </Link>
              <nav className='hidden md:flex items-center gap-8 relative'>
                <StoriesDropdown />
              </nav>
            </div>

            <div className='relative flex items-center gap-3 sm:gap-4'>
              <button
                type='button'
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsMobileMenuOpen(false);
                  }
                  setIsSearchOpen((prev) => !prev);
                }}
                className='text-gray-300 hover:text-white cursor-pointer'
                aria-label='Toggle search'
              >
                <Search className='h-5 w-5' />
              </button>

              {isLoggedIn ? (
                <>
                  {/* <Heart className='hidden md:block h-5 w-5 text-gray-300 hover:text-white cursor-pointer' /> */}
                  <Link
                    href='/user'
                    className='hidden md:flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer'
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt='avatar'
                        width={20}
                        height={20}
                        className='h-5 w-5 rounded-full object-cover'
                      />
                    ) : (
                      <User className='h-5 w-5' />
                    )}

                    <span className='hidden md:inline'>{user.username}</span>
                  </Link>{" "}
                  <Link href='/stories/create' className='hidden md:inline-flex'>
                    <Button className='bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold'>
                      Write
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href='/login' className='hidden md:inline-flex'>
                  <Button className='bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold'>
                    Sign In
                  </Button>
                </Link>
              )}

              <button
                type='button'
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className='md:hidden text-gray-300 hover:text-white cursor-pointer'
                aria-label='Toggle menu'
              >
                {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
              </button>

              {hasMounted && (
                <div
                  className={`absolute top-full right-0 mt-3 z-50 hidden md:block transition-all duration-300 ease-in-out transform ${
                    isSearchOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-2 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className='relative w-64'>
                    <input
                      type='text'
                      placeholder='Search stories...'
                      className='w-full px-4 py-2 pr-10 rounded-md bg-gray-800/30 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition'
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isSearchOpen ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className='relative'>
              <input
                ref={mobileSearchInputRef}
                type='text'
                placeholder='Search stories...'
                className='w-full px-4 py-2 pr-10 rounded-md bg-gray-800/30 text-white border border-gray-600 focus:outline-none'
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition'
                aria-label='Close search'
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? "max-h-[70vh] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <nav className='rounded-lg border border-gray-800 bg-black/95 p-4 space-y-4'>
              <Link
                href='/'
                onClick={() => setIsMobileMenuOpen(false)}
                className='block text-gray-200 hover:text-white'
              >
                Home
              </Link>
              <Link
                href='/stories'
                onClick={() => setIsMobileMenuOpen(false)}
                className='block text-gray-200 hover:text-white'
              >
                Stories
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href='/stories/create'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='block text-gray-200 hover:text-white'
                  >
                    Write
                  </Link>
                  <Link
                    href='/user'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='block text-gray-200 hover:text-white'
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <Link
                  href='/login'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='inline-flex'
                >
                  <Button className='bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold'>
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
