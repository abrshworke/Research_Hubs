'use client';

import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userResearches, setUserResearches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if unauthenticated
  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  // Fetch user's research
  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const res = await fetch('/api/researches');
        if (!res.ok) throw new Error('Failed to fetch researches');
        const data = await res.json();
        const filtered = data.filter(
          (item) => item.researcherEmail === session?.user?.email
        );
        setUserResearches(filtered);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching researches:', err);
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchResearches();
    }
  }, [session]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this research?')) return;

    try {
      const res = await fetch(`/api/researches/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');

      setUserResearches((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Delete error:', err.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-600 text-lg">Redirecting...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-800">Welcome, {session?.user?.name || 'User'} 👋</h1>
            <p className="text-gray-600 mt-1">Manage your research work here.</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition"
          >
            Sign Out
          </button>
        </div>

        {/* Create New */}
        <div className="mb-6">
          <Link
            href="/researches/form"
            className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-2 rounded-full hover:from-green-600 hover:to-teal-600 shadow-lg transition"
          >
            ➕ Create New Research
          </Link>
        </div>

        {/* Research List */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 My Researches</h2>

        {loading ? (
          <p className="text-gray-500">Loading your data...</p>
        ) : userResearches.length === 0 ? (
          <p className="text-gray-500">No research found. Start by adding one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userResearches.map((research) => (
              <div
                key={research._id}
                className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800 mb-1">{research.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Category:</strong> {research.category}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">{research.abstract}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/researches/${research._id}`}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      href={`/researches/edit/${research._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-full transition"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(research._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-full transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
