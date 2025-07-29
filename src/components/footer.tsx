import bookstore from "@/public/assets/bookstore.jpg";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-black py-6 text-gray-400">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src={bookstore}
          alt="Bookstore background"
          layout="fill"
          objectFit="cover"
          priority
          quality={75}
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Name & Description */}
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">KATHA/LAYA</h2>
          <p className="max-w-xl mx-auto">
            A space where writers share their stories, and readers find their
            next favorite tale. Express, inspire, and be heard.
          </p>
        </div>

        <div className="flex gap-6 flex-wrap justify-center text-sm mb-8">
          <a href="#" className="hover:text-white transition-colors">
            All Stories
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Trending
          </a>
          <a href="#" className="hover:text-white transition-colors">
            New Writers
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Genres
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-4 text-center text-sm">
          <div className="flex gap-6 mb-4 flex-wrap justify-center">
            <a href="#" className="hover:text-white transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Community Guidelines
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
          </div>
          <p>© 2025 Kathalaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
