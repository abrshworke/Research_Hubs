
async function getResearchDetail(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/researches/${id}`);
  if (!res.ok) throw new Error('Failed to fetch research detail');
  return res.json();
}

export default async function ResearchDetail({ params }) {
  const research = await getResearchDetail(params.id);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        
        {/* Cover image with badge and overlay effect */}
        <div className="relative group">
          <img
            src={research.image}
            alt={research.title}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs shadow-lg">
            {research.category}
          </div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300" />
        </div>

        <div className="p-8 sm:p-10">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            {research.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap justify-between items-center text-gray-600 text-sm mb-8">
            <span className="flex items-center gap-2">
              <span className="font-semibold">📁 Category:</span> {research.category}
            </span>
            <span className="flex items-center gap-2">
              <span className="font-semibold">🗓️ Published:</span>{' '}
              {new Date(research.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Abstract Section */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
              🔍 Abstract
            </h2>
            <p className="text-gray-700 leading-relaxed text-md">{research.abstract}</p>
          </section>

          {/* Full Description Section */}
          <section className="mb-4">
            <h2 className="text-xl font-bold text-purple-700 mb-2 flex items-center gap-2">
              📖 Full Description
            </h2>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line text-md">
              {research.fullDescription}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}









