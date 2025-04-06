'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GradlinkIcon from '../Icon/GradLinkIcon';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
  };

  const role = localStorage.getItem('role');
  const goToDashboard = () => {
    if(!role) alert('Please login to view dashboard');
    if (role) router.push(`/${role}`);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <button
        onClick={goToDashboard}
        className="flex items-center space-x-2 pr-2 text-white text-3xl font-extrabold hover:text-gray-300 transition"
      >
        <span>GradLink</span>
        <div className='text-white'>
          <GradlinkIcon/>
        </div>
      </button>
        
        <div className="hidden md:flex space-x-6 items-center text-xl">
          <button onClick={goToDashboard} className="hover:text-gray-300 transition">Dashboard</button>
          {/* <Link href="/forums" className="hover:text-gray-300 transition">Forums</Link> */}
          <Link href="/jobs" className="hover:text-gray-300 transition">Jobs & Internships</Link>
          <Link href="/events" className="hover:text-gray-300 transition">Events</Link>
          
          <div className="relative">
            <button onClick={toggleProfileDropdown} className="flex items-center hover:text-gray-300 focus:outline-none">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 py-1 z-10">
                {role === 'alumni' && (<Link href="/alumni/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-400">View Profile</Link>)}
                
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-400">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;