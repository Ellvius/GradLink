"use client";

import Footer from '@/components/footer';
import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  MessageCircle, 
  Star, 
  Search, 
  Filter, 
  ArrowRight 
} from 'lucide-react';

const AlumniDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  
  // Mock data - in a real application, this would come from backend
  const alumniProfile = {
    name: "Emily Rodriguez",
    graduationYear: 2022,
    major: "Computer Science",
    currentRole: "Software Engineer",
    company: "TechInnovate Solutions"
  };

  const jobOpportunities = [
    {
      id: 1,
      title: "Senior Software Developer",
      company: "Global Tech Inc.",
      location: "San Francisco, CA",
      alumniNetwork: true
    },
    {
      id: 2,
      title: "Data Science Specialist",
      company: "DataWorks Enterprise",
      location: "New York, NY",
      alumniNetwork: false
    }
  ];

  const forumTopics = [
    {
      id: 1,
      title: "Tech Career Transitions",
      participants: 150,
      newPosts: 12
    },
    {
      id: 2,
      title: "Startup Entrepreneurship",
      participants: 87,
      newPosts: 5
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">GradLink Alumni Dashboard</h1>
                <p className="text-gray-500">Welcome, {alumniProfile.name}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                className={`px-4 py-2 rounded ${
                  activeSection === 'overview' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveSection('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-4 py-2 rounded ${
                  activeSection === 'opportunities' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveSection('opportunities')}
              >
                Opportunities
              </button>
            </div>
          </div>
        </div>

        {/* Profile & Network Overview */}
        <div className="grid grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="text-blue-600" size={48} />
              </div>
              <h2 className="text-xl font-bold">{alumniProfile.name}</h2>
              <p className="text-gray-600">{alumniProfile.currentRole} @ {alumniProfile.company}</p>
              <p className="text-gray-500">Graduated {alumniProfile.graduationYear}</p>
            </div>
          </div>

          {/* Job Opportunities */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <Briefcase className="mr-2 text-blue-600" size={20} />
                Job Opportunities
              </h3>
              <div className="flex space-x-2">
                <button className="bg-gray-200 p-2 rounded">
                  <Filter size={16} />
                </button>
                <button className="bg-gray-200 p-2 rounded">
                  <Search size={16} />
                </button>
              </div>
            </div>
            {jobOpportunities.map(job => (
              <div 
                key={job.id} 
                className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
              >
                <div>
                  <h4 className="font-semibold">{job.title}</h4>
                  <p className="text-gray-600">{job.company} • {job.location}</p>
                  {job.alumniNetwork && (
                    <span className="text-green-600 text-sm font-medium">
                      Alumni Network Opportunity
                    </span>
                  )}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                  Apply <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Community Forums */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
            <h3 className="text-lg font-bold flex items-center mb-4">
              <MessageCircle className="mr-2 text-blue-600" size={20} />
              Community Forums
            </h3>
            {forumTopics.map(forum => (
              <div 
                key={forum.id} 
                className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
              >
                <div>
                  <h4 className="font-semibold">{forum.title}</h4>
                  <p className="text-gray-600">
                    {forum.participants} participants • {forum.newPosts} new posts
                  </p>
                </div>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
                  Join Discussion
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </div>
  );
};

export default AlumniDashboard;