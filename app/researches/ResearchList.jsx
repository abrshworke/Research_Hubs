

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function ResearchList({ researches }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Agricultural', 'Industrial', 'Technological'];

  const filteredResearches = researches.filter(research => {
    const categoryMatch =
      selectedCategory === 'all' || research.category === selectedCategory;
    const searchMatch = research.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📚 Explore Research Publications
      </h1>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-semibold shadow-sm ${
              selectedCategory === category
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-xl flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Search research titles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none placeholder-gray-400 text-gray-800"
          />
        </div>
      </div>

      {/* Research Cards */}
      {filteredResearches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResearches.map(research => (

            <div
      key={research._id}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-500 transform hover:-translate-y-1 transition-all duration-300 ease-in-out group"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
        {research.title}
      </h2>

      {/* Metadata */}
      <div className="text-sm text-gray-600 space-y-1 mb-5">
        <p>
          <span className="font-medium text-gray-700">📂 Category:</span>{' '}
          <span className="capitalize">{research.category}</span>
        </p>
        <p>
          <span className="font-medium text-gray-700">👤 Researcher:</span>{' '}
          {research.researcher}
        </p>
      </div>

      {/* Read More Link */}
      <Link
        href={`/researches/${research._id}`}
        className="inline-block text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full shadow-md hover:from-blue-600 hover:to-purple-600 transition-colors"
      >
        Read More →
      </Link>
    </div>



          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-16 text-lg">
          <p>😕 No research matches your filters. Try a different category or keyword.</p>
        </div>
      )}
    </div>
  );
}
