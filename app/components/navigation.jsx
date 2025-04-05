
'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        {/* Logo */}
        <Link href="/" passHref>
          <span className="text-2xl font-bold tracking-tight cursor-pointer hover:text-blue-300 transition">
            Research Hub
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {session ? (
            <>
              
              <Link href="/page/contact" passHref>
                <span className="hover:text-gray-300 transition">Contact</span>
              </Link>

              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="hover:text-gray-300 flex items-center gap-1 focus:outline-none"
                >
                  <span>Profile</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg overflow-hidden z-20">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      My Researches
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>

            <Link href="/page/about" passHref>
              <span className="hover:text-gray-300 transition">About</span>
            </Link>

              <Link href="/signup" passHref>
                <span className="hover:text-gray-300 transition">Register</span>
              </Link>


            </>
          )}
        </div>
      </div>
    </nav>
  );
}
