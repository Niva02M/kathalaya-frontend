import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Play, Info, ChevronRight } from "lucide-react";
import Image from "next/image";
import bookstore from "@/assets/bookstore.jpg";
import book1 from "@/assets/book1.jpeg";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent">
            <Image
              src={bookstore}
              alt="Library background"
              fill
              className="object-cover opacity-40"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                The Art of
                <br />
                <span className="text-yellow-400">Mindful Reading</span>
              </h1>
              <p className="text-gray-300 text-lg mb-2">
                By Thrift Kitab Collection
              </p>

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
                  fill
                  className="object-cover "
                />
              </div>

              {/* Caption below the image box */}
              <p className="text-sm text-gray-200 mt-4">Featured Book</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trends Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trends</h2>
            <button className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2">
              <span>See more</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-4">
            {[
              {
                title: "Meditation Mastery",
                author: "Various Authors",
                rating: 4.6,
                category: "MEDITATIONS",
              },
              {
                title: "Soul & Spirit",
                author: "Deepak Chopra",
                rating: 4.8,
                category: "SPIRITUALITY",
              },
              {
                title: "Legendary Tales",
                author: "Joseph Campbell",
                rating: 4.9,
                category: "MYTHOLOGY",
              },
              {
                title: "My First Love",
                author: "Nicholas Sparks",
                rating: 4.3,
                category: "ROMANCE",
              },
              {
                title: "Mindful Living",
                author: "Thich Nhat Hanh",
                rating: 4.7,
                category: "PHILOSOPHY",
              },
            ].map((book, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 min-w-[200px] hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-24 h-32 bg-gray-600 rounded"></div>
                  </div>
                  <div className="text-xs text-yellow-400 mb-2 font-semibold">
                    {book.category}
                  </div>
                  <h3 className="font-bold text-white mb-1 text-sm">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-2">{book.author}</p>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-yellow-400 text-xs ml-1">
                      {book.rating}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Books</h2>
            <button className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2">
              <span>See more</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-8 mb-8 overflow-x-auto">
            {[
              "All",
              "Romance",
              "Literature",
              "Fiction",
              "Thriller",
              "Biographies",
            ].map((category, index) => (
              <button
                key={category}
                className={`whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  index === 0
                    ? "border-yellow-400 text-yellow-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { title: "Loving Adventure", author: "Sarah Johnson" },
              { title: "Soul Spirit", author: "Marcus Webb" },
              { title: "Look Inside", author: "David Ellis" },
              { title: "Ocean Waves", author: "Lisa Chen" },
              { title: "Mountain High", author: "Alex Rivera" },
              { title: "City Lights", author: "Emma Stone" },
            ].map((book, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="w-full h-40 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-16 h-24 bg-gray-600 rounded"></div>
                  </div>
                  <h3 className="font-bold text-white mb-1 text-sm">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 text-xs">{book.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
