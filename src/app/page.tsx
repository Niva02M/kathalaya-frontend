import BooksSection from "@/components/home/books-section";
import TrendsSection from "@/components/home/trends-section";
import HeroSection from "@/components/home/hero-section";

export default function Page() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <HeroSection />
      <TrendsSection />
      <BooksSection />
    </div>
  );
}
