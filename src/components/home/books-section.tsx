import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

import book1 from "@/public/assets/book1.jpeg";
import book2 from "@/public/assets/book2.jpeg";
import book3 from "@/public/assets/book3.jpeg";
import book4 from "@/public/assets/book5.jpg";

export default function BooksSection() {
  const categories = [
    "All",
    "Romance",
    "Literature",
    "Fiction",
    "Thriller",
    "Biographies",
  ];
  const books = [
    { title: "Loving Adventure", author: "Sarah Johnson", cover: book1 },
    { title: "Soul Spirit", author: "Marcus Webb", cover: book2 },
    { title: "Look Inside", author: "David Ellis", cover: book3 },
    { title: "Ocean Waves", author: "Lisa Chen", cover: book4 },
    { title: "Mountain High", author: "Alex Rivera", cover: book3 },
    { title: "City Lights", author: "Emma Stone", cover: book2 },
  ];

  return (
    <section className="py-16 px-6 relative z-10">
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
          {categories.map((category, index) => (
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
          {books.map((book, index) => (
            <Card
              key={index}
              className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="w-full h-40 relative rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
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
  );
}
