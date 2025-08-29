import { Button } from "@/components/ui/button";
import { Star, Play, Info } from "lucide-react";
import Image from "next/legacy/image";
import bookstore from "@/public/assets/bookstore.jpg";
import book1 from "@/public/assets/book1.jpeg";
import BooksSection from "@/components/home/books-section";
import TrendsSection from "@/components/home/trends-section";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen flex items-center z-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-[-1]">
            <Image
              src={bookstore}
              layout="fill"
              alt="Library background"
              className="object-cover "
              priority
            />
            <div className="absolute h-full inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                The Art of
                <br />
                <span className="text-yellow-400">Mindful Reading</span>
              </h1>
              <p className="text-gray-300 text-lg mb-2">By Author 1</p>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-white ml-2">4.8</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">Chapter 12</span>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              Discover the transformative power of mindful reading through our
              curated collection of pre-loved books. Each page holds wisdom
              waiting to be rediscovered.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold">
                <Play className="h-4 w-4 mr-2" />
                Start Reading
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 rounded-full bg-transparent"
              >
                <Info className="h-4 w-4 mr-2" />
                More Info
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative text-center">
              {/* Image container */}
              <div className="w-80 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden relative">
                <Image
                  src={book1}
                  alt="Featured Book"
                  className="object-cover "
                />
              </div>

              <p className="text-sm text-gray-200 mt-4">Featured Book</p>
            </div>
          </div>
        </div>
      </section>
      <TrendsSection />
      <BooksSection />
    </div>
  );
}
