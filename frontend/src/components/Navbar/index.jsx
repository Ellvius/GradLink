import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            GradLink
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/forums" className="hover:text-gray-300 transition">
            Forums
          </Link>
          <Link href="/alumni" className="hover:text-gray-300 transition">
            Alumni
          </Link>
          <Link href="/jobs" className="hover:text-gray-300 transition">
            Jobs & Internships
          </Link>
          <Link href="/events" className="hover:text-gray-300 transition">
            Events
          </Link>
        </div>
        
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;