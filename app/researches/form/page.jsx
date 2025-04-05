'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ResearchForm() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    researcher: '',
    abstract: '',
    image: '',
    date: '',
    fullDescription: ''
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/researches/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
          user: session?.user?.id,
        }),
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        alert('Failed to submit research.');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-xl p-8 sm:p-10 border border-blue-200">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
          🚀 Submit New Research
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reusable Input Group */}
          {[
            { label: 'Title', name: 'title', type: 'text' },
            { label: 'Researcher Name', name: 'researcher', type: 'text' },
            { label: 'Image URL', name: 'image', type: 'url' },
            { label: 'Date', name: 'date', type: 'date' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          ))}

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            >
              <option value="">Select Category</option>
              <option value="Agricultural">🌾 Agricultural</option>
              <option value="Industrial">🏭 Industrial</option>
              <option value="Technological">💻 Technological</option>
            </select>
          </div>

          {/* Abstract */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Abstract</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 h-28 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Description</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 h-40 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Research'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
