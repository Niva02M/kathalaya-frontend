"use client";

import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShowHeader = isVisible || isHovering || scrollY < 100;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-20 z-50 pointer-events-auto"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 ease-in-out ${
          shouldShowHeader ? "translate-y-0" : "-translate-y-full"
        } ${
          scrollY > 50
            ? "bg-black/80 backdrop-blur-md border-gray-800"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-white">KATHA/LAYA</div>

              {/* Navigation - Hidden on mobile */}
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Books
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Categories
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <ShoppingBag className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <User className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                Sign Up
              </Button>

              <Menu className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors md:hidden" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
