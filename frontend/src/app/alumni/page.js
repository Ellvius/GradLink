"use client";

import Footer from '@/components/footer';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { 
  Users, 
  Briefcase, 
  MessageCircle, 
  Star, 
  Search, 
  Filter, 
  ArrowRight,
  User,
  MessageSquare,
  LogOut,
  Calendar
} from 'lucide-react';

const AlumniDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  
  // Mock data - in a real application, this would come from backend
  const alumniProfile = {
    name: "Emily Rodriguez",
    graduationYear: 2022,
    major: "Computer Science",
    currentRole: "Software Engineer",
    company: "TechInnovate Solutions",
    email: "emily.rodriguez@example.com",
    location: "San Francisco, CA"
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
  
  const events = [
    {
      id: 1,
      title: "Alumni Networking Mixer",
      date: "April 15, 2025",
      location: "Virtual",
      attendees: 45
    },
    {
      id: 2,
      title: "Industry Panel: Future of Tech",
      date: "May 2, 2025",
      location: "Campus Center",
      attendees: 120
    }
  ];

  return (
    <div className="flex-col min-h-screen">
    <div className="bg-gray-50 min-h-screen flex">
      {/* Left Sidebar - 20% width */}
      <div className="w-1/5 bg-white p-6 border-r border-gray-200 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">GradLink</h1>
        </div>
        
        {/* Navigation Items */}
        <nav className="space-y-6">
          <button 
            className={`w-full flex items-center p-3 rounded text-left ${
              activeSection === 'profile' 
                ? 'bg-blue-100 text-blue-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveSection('profile')}
          >
            <User className="mr-3" size={20} />
            <span>Profile</span>
          </button>
          
          <button 
            className={`w-full flex items-center p-3 rounded text-left ${
              activeSection === 'forums' 
                ? 'bg-blue-100 text-blue-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveSection('forums')}
          >
            <MessageCircle className="mr-3" size={20} />
            <span>Forums</span>
          </button>
          
          <button 
            className={`w-full flex items-center p-3 rounded text-left ${
              activeSection === 'messages' 
                ? 'bg-blue-100 text-blue-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveSection('messages')}
          >
            <MessageSquare className="mr-3" size={20} />
            <span>Messages</span>
          </button>
          
          <button 
            className="w-full flex items-center p-3 rounded text-gray-700 hover:bg-gray-100 text-left mt-auto"
          >
            <LogOut className="mr-3" size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
      
      {/* Main Content Area - 80% width */}
      <div className="w-4/5 p-6 flex flex-col h-screen">
        {/* Top Profile Section - 35% height */}
        <div className="h-2/5 bg-white rounded-lg shadow-md mb-6 flex overflow-hidden border border-gray-200">
          {/* Profile Details - Left */}
          <div className="w-3/5 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{alumniProfile.name}</h2>
            <div className="space-y-3 text-gray-700">
              <p><span className="text-blue-600 font-medium">Current Role:</span> {alumniProfile.currentRole}</p>
              <p><span className="text-blue-600 font-medium">Company:</span> {alumniProfile.company}</p>
              <p><span className="text-blue-600 font-medium">Major:</span> {alumniProfile.major}</p>
              <p><span className="text-blue-600 font-medium">Graduated:</span> {alumniProfile.graduationYear}</p>
              <p><span className="text-blue-600 font-medium">Email:</span> {alumniProfile.email}</p>
            </div>
          </div>
          
          {/* Profile Picture - Right */}
          <div className="w-2/5 flex items-center justify-center bg-gray-100">
            <div className="w-40 h-40 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="text-white" size={64} />
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Split into Jobs and Events */}
        <div className="h-3/5 flex gap-6">
          {/* Job Opportunities - Left */}
          <div className="w-1/2 bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center text-gray-800">
                <Briefcase className="mr-2 text-blue-600" size={20} />
                Jobs Posted
              </h3>
              <div className="flex space-x-2">
                <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                  <Plus size={16} className="text-blue-600" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-64">
              {jobOpportunities.map(job => (
                <div 
                  key={job.id} 
                  className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">{job.title}</h4>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                    {job.alumniNetwork && (
                      <span className="text-blue-600 text-sm font-medium">
                        Alumni Network Opportunity
                      </span>
                    )}
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
                    View <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Events - Right */}
          <div className="w-1/2 bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center text-gray-800">
                <Calendar className="mr-2 text-blue-600" size={20} />
                Upcoming Events
              </h3>
              <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                <Plus size={16} className="text-blue-600" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-64">
              {events.map(event => (
                <div 
                  key={event.id} 
                  className="p-4 border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <p className="text-gray-600">{event.date} • {event.location}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500 text-sm">
                      {event.attendees} attending
                    </span>
                    <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-200">
                      RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AlumniDashboard;