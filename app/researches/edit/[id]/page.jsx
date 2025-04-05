

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { use } from 'react';

export default function EditResearchPage({ params }) {
  const { id } = use(params); 
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      const fetchResearch = async () => {
        try {
          const res = await fetch(`/api/researches/${params.id}`);
          if (res.ok) {
            const data = await res.json();
            setFormData(data);
          } else {
            console.error('Failed to fetch research');
          }
        } catch (err) {
          console.error('Error fetching research:', err);
        }
      };

      fetchResearch();
    }
  }, [status, params.id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/researches/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
        }),
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        console.error('Error updating research');
      }
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!formData)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading research data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">📝 Edit Research</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Category</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Industrial">Industrial</option>
              <option value="Technological">Technological</option>
            </select>
          </div>

          {/* Researcher */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Researcher Name</label>
            <input
              type="text"
              name="researcher"
              value={formData.researcher}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Abstract */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm h-28 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date?.slice(0, 10)}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm h-40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition disabled:bg-gray-400"
          >
            {submitting ? 'Updating...' : '✅ Update Research'}
          </button>
        </form>
      </div>
    </div>
  );
}










