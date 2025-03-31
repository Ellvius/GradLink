import React from 'react';
import Link from 'next/link';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfileOpen: false
    };
    this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleProfileDropdown() {
    this.setState(prevState => ({
      isProfileOpen: !prevState.isProfileOpen
    }));
  }

  handleLogout() {
    console.log("logout");
    localStorage.clear();
    // Add any additional logout logic here
  }

  render() {
    return (
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              GradLink
            </Link>
          </div>
         
          <div className="hidden md:flex space-x-6 items-center">
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
            
            {/* Profile dropdown */}
            <div className="relative">
              <button 
                onClick={this.toggleProfileDropdown}
                className="flex items-center hover:text-gray-300 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {this.state.isProfileOpen && (
                <div className="absolute right-1 mt-5 mr-0 w-48 bg-gray-800 py-1 z-10">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-400">
                    View Profile
                  </Link>
                  <a href ="/auth/login"><button 
                    onClick={this.handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-400"
                  >
                    Logout
                  </button></a>
                  
                </div>
              )}
            </div>
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
  }
}

export default Navbar;