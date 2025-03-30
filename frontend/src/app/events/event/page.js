"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, BookmarkIcon } from 'lucide-react';
import Footer from '@/components/footer';
const EventDetailPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample event details
  const event = {
    id: 1,
    title: 'Tech Career Fair 2024',
    date: 'April 15, 2024',
    time: '10:00 AM - 3:00 PM',
    location: 'University Convention Center',
    description: `Join us for the annual Tech Career Fair, connecting top tech companies with talented students and recent graduates. 
    This event offers unprecedented networking opportunities, on-the-spot interviews, and insights into the latest industry trends.

    Highlights:
    - Direct interactions with recruiters from leading tech companies
    - Resume review sessions
    - Technical skill workshops
    - Internship and full-time job opportunities
    
    Companies Attending:
    - Google
    - Microsoft
    - Amazon
    - Apple
    - Startup Alley featuring local innovative tech companies`,
    registeredUsers: 250,
    totalCapacity: 500,
    organizerInfo: {
      name: 'University Career Services',
      contact: 'career.services@university.edu',
      phone: '+1 (555) 123-4567'
    },
    prerequisites: [
      'Current students and recent graduates',
      'Updated resume',
      'Professional attire recommended',
      'Digital copies of portfolio (optional)'
    ]
  };

  const handleRegister = () => {
    if (!isRegistered && event.registeredUsers < event.totalCapacity) {
      setIsRegistered(true);
    }
  };

  const handleShare = () => {
    // Basic share functionality - in a real app, this would use Web Share API or clipboard
    navigator.clipboard.writeText(`Check out this event: ${event.title} on ${event.date}`);
    alert('Event link copied to clipboard!');
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Back Button */}
        <div className="flex items-center mb-6">
          <button className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2" /> Back to Events
          </button>
        </div>

        {/* Event Header */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{event.title}</h1>
          
          {/* Event Meta Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">{event.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">{event.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <span className="text-gray-700">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Event Actions */}
        <div className="flex space-x-4 mb-6">
          <button 
            onClick={handleRegister}
            disabled={isRegistered || event.registeredUsers >= event.totalCapacity}
            className={`flex-1 py-3 rounded transition-colors ${
              isRegistered 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
            }`}
          >
            {isRegistered ? 'Registered' : 'Register Now'}
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-3 rounded ${
              isBookmarked 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <BookmarkIcon />
          </button>
          <button 
            onClick={handleShare}
            className="p-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            <Share2 />
          </button>
        </div>

        {/* Event Description */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Event Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
        </div>

        {/* Registration Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Registration</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Registered Users</span>
              <span className="font-bold text-blue-600">
                {event.registeredUsers} / {event.totalCapacity}
              </span>
            </div>
            {event.registeredUsers >= event.totalCapacity && (
              <p className="text-red-600 mt-2">Event is currently at full capacity</p>
            )}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {event.prerequisites.map((prereq, index) => (
              <li key={index}>{prereq}</li>
            ))}
          </ul>
        </div>

        {/* Organizer Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Organizer Contact</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 font-medium">{event.organizerInfo.name}</p>
            <p className="text-gray-600">Email: {event.organizerInfo.contact}</p>
            <p className="text-gray-600">Phone: {event.organizerInfo.phone}</p>
          </div>
        </div>
      </div>
      <Footer className="mt-12" />
    </div>
  );
};

export default EventDetailPage;