import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronRight } from "lucide-react";

import book1 from "@/public/assets/book1.jpeg";
import book2 from "@/public/assets/book2.jpeg";
import book3 from "@/public/assets/book3.jpeg";
import book4 from "@/public/assets/book5.jpg";

export default function TrendsSection() {
  const trends = [
    {
      title: "Meditation Mastery",
      author: "Various Authors",
      rating: 4.6,
      category: "MEDITATIONS",
      cover: book1,
    },
    {
      title: "Soul & Spirit",
      author: "Deepak Chopra",
      rating: 4.8,
      category: "SPIRITUALITY",
      cover: book2,
    },
    {
      title: "Legendary Tales",
      author: "Joseph Campbell",
      rating: 4.9,
      category: "MYTHOLOGY",
      cover: book3,
    },
    {
      title: "My First Love",
      author: "Nicholas Sparks",
      rating: 4.3,
      category: "ROMANCE",
      cover: book4,
    },
    {
      title: "Mindful Living",
      author: "Thich Nhat Hanh",
      rating: 4.7,
      category: "PHILOSOPHY",
      cover: book1,
    },
  ];

  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending Picks for you</h2>
          <button className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2">
            <span>See more</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-4">
          {trends.map((book, index) => (
            <Card
              key={index}
              className="bg-gray-900 border-gray-800 min-w-[200px] hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="w-full h-48 relative rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
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
  );
}
