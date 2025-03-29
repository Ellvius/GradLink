"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Search, MessageSquare, Users, Briefcase, BookOpen, ArrowUpRight, ChevronRight, Bell } from 'lucide-react';

export default function ForumCategories() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const mainCategories = [
    {
      id: 'opportunities',
      name: 'Career Opportunities',
      subcategories: [
        { 
          id: 'internships', 
          name: 'Internship Opportunities', 
          description: 'Discover and discuss internship opportunities across various industries',
          icon: <Briefcase className="h-6 w-6 text-blue-500" />,
          topics: 432,
          posts: 2156
        },
        { 
          id: 'jobs', 
          name: 'Job Listings & Career Advice', 
          description: 'Browse job listings and get career advice from professionals',
          icon: <Users className="h-6 w-6 text-green-500" />,
          topics: 389,
          posts: 1894
        },
        { 
          id: 'startups', 
          name: 'Startup & Entrepreneurship', 
          description: 'Discuss startup opportunities, entrepreneurship, and innovation',
          icon: <ArrowUpRight className="h-6 w-6 text-red-500" />,
          topics: 187,
          posts: 942
        }
      ]
    },
    {
      id: 'community',
      name: 'Community',
      subcategories: [
        { 
          id: 'networking', 
          name: 'Networking & Events', 
          description: 'Connect with fellow students and alumni, discover networking events',
          icon: <ArrowUpRight className="h-6 w-6 text-purple-500" />,
          topics: 217,
          posts: 1032
        },
        { 
          id: 'mentorship', 
          name: 'Mentorship Programs', 
          description: 'Find mentors or become one, share mentorship experiences and advice',
          icon: <Users className="h-6 w-6 text-indigo-500" />,
          topics: 156,
          posts: 873
        }
      ]
    },
    {
      id: 'academic',
      name: 'Academic Resources',
      subcategories: [
        { 
          id: 'academics', 
          name: 'Study Materials & Resources', 
          description: 'Share study materials, academic advice, and learning resources',
          icon: <BookOpen className="h-6 w-6 text-amber-500" />,
          topics: 301,
          posts: 1487
        },
        { 
          id: 'research', 
          name: 'Research Opportunities', 
          description: 'Discuss research projects, opportunities, and academic collaborations',
          icon: <BookOpen className="h-6 w-6 text-teal-500" />,
          topics: 192,
          posts: 843
        }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/forums" className="text-gray-500 hover:text-gray-700">Forums</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="font-medium text-gray-800">Categories</span>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Forum Categories</h1>
        <div className="relative w-1/3">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {mainCategories.map((mainCategory) => (
        <div key={mainCategory.id} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{mainCategory.name}</h2>
          <div className="space-y-4">
            {mainCategory.subcategories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{category.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Link href={`/forums/categories/${category.id}`}>
                        <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800">{category.name}</h3>
                      </Link>
                      <button className="text-gray-400 hover:text-gray-600" title="Subscribe to notifications">
                        <Bell className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {category.topics} topics
                      </span>
                      <span className="mx-2">•</span>
                      <span>{category.posts} posts</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-8 text-center">
        <Link 
          href="/forums/post" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Create New Topic
        </Link>
      </div>
    </div>
  );
}