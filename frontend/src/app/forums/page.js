"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Search, MessageSquare, Users, Briefcase, BookOpen, ArrowUpRight } from 'lucide-react';
import Footer from '@/components/footer';
export default function ForumHome() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
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
      id: 'networking', 
      name: 'Networking & Events', 
      description: 'Connect with fellow students and alumni, discover networking events',
      icon: <ArrowUpRight className="h-6 w-6 text-purple-500" />,
      topics: 217,
      posts: 1032
    },
    { 
      id: 'academics', 
      name: 'Academic Resources', 
      description: 'Share study materials, academic advice, and learning resources',
      icon: <BookOpen className="h-6 w-6 text-amber-500" />,
      topics: 301,
      posts: 1487
    }
  ];

  const recentTopics = [
    { 
      id: 1, 
      title: 'Microsoft Summer 2025 Internship Application Thread',
      category: 'Internship Opportunities',
      author: 'techstudent22',
      replies: 34,
      views: 458,
      lastPost: '2 hours ago' 
    },
    { 
      id: 2, 
      title: 'Resume Review - Computer Science Graduate',
      category: 'Job Listings & Career Advice',
      author: 'gradseeker',
      replies: 12,
      views: 187,
      lastPost: '5 hours ago' 
    },
    { 
      id: 3, 
      title: 'Annual Tech Industry Networking Event - Sign up thread',
      category: 'Networking & Events',
      author: 'eventcoordinator',
      replies: 28,
      views: 323,
      lastPost: '1 day ago' 
    }
  ];

  return (
    <div>
    <div className="max-w-6xl mx-auto py-6 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">GradLink Forums</h1>
        <div className="relative w-1/3">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search forums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Forum Categories</h2>
          <Link href="/forums/categories" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            View All Categories
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link href={`/forums/categories/${category.id}`} key={category.id}>
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
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
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Discussions</h2>
          <Link href="/forums/recent" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            View All Recent Topics
          </Link>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Replies</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Post</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTopics.map((topic) => (
                <tr key={topic.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <Link href={`/forums/topics/${topic.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {topic.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">by {topic.author}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{topic.category}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{topic.replies}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{topic.views}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{topic.lastPost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
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
    <Footer className="mt-12" />
    </div>
  );
}