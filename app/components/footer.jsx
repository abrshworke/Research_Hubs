'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo or Site Name */}
          <div className="text-xl font-semibold tracking-wide text-white">
            MyWebsite
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 text-lg">
            <Link href="https://twitter.com" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
              <FaTwitter />
            </Link>
            <Link href="https://facebook.com" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
              <FaFacebookF />
            </Link>
            <Link href="https://linkedin.com" className="hover:text-blue-300 transition-colors" aria-label="LinkedIn">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700" />

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
