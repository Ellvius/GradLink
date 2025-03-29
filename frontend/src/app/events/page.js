"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const EventsPage = () => {
  const [filter, setFilter] = useState('all');

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Tech Career Fair',
      date: 'April 15, 2024',
      time: '10:00 AM - 3:00 PM',
      location: 'University Convention Center',
      type: 'career',
      description: 'Annual tech industry networking event for students and alumni.',
      registeredUsers: 250,
      categories: ['career', 'networking']
    },
    {
      id: 2,
      title: 'Startup Pitch Workshop',
      date: 'April 22, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'Innovation Hub, Room 305',
      type: 'workshop',
      description: 'Learn how to pitch your startup idea to potential investors.',
      registeredUsers: 75,
      categories: ['entrepreneurship', 'workshop']
    },
    {
      id: 3,
      title: 'Alumni Mentorship Connect',
      date: 'May 5, 2024',
      time: '5:30 PM - 7:30 PM',
      location: 'Virtual Event',
      type: 'networking',
      description: 'One-on-one mentorship sessions with successful alumni across industries.',
      registeredUsers: 100,
      categories: ['mentorship', 'networking']
    }
  ];

  // Filter events based on selected category
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.categories.includes(filter));

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">GradLink Events</h1>
        
        {/* Filter Buttons */}
        <div className="mb-6 flex space-x-4">
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('all')}
          >
            All Events
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'career' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('career')}
          >
            Career Events
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'networking' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('networking')}
          >
            Networking
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'workshop' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('workshop')}
          >
            Workshops
          </button>
        </div>

        {/* Events List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900">{event.title}</h2>
              <div className="space-y-3">
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
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">{event.registeredUsers} Registered</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Events Found Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No events found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;