export default function StoryListPage() {
  return (
    <div className="min-h-screen py-20 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold  mb-4">Story List</h1>
        <p className="">
          This is a placeholder page for story listings. You can build a list of
          stories here with filters, categories, or recommendations.
        </p>

        {/* Example dummy cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2, 3].map((story) => (
            <div
              key={story}
              className="shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold  mb-2">
                Sample Story {story}
              </h2>
              <p className="text-sm ">
                A short description or excerpt from the story will appear here.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
