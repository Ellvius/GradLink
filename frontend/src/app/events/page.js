"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        
        const response = await axios.get("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Format the data to match the frontend structure
        const formattedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.startDateTime).toLocaleDateString(),
          time: `${new Date(event.startDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${new Date(event.endDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
          location: event.location,
          type: event.type || "general",
          description: event.description,
          registeredUsers: event.capacity,
          startDateTime: new Date(event.startDateTime),
        }));

        // Sort events by date (soonest first)
        formattedEvents.sort((a, b) => a.startDateTime - b.startDateTime);
        
        setEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle the registration button click
  const handleRegisterClick = (eventId, e) => {
    e.preventDefault(); // Prevent the default behavior
    router.push(`/events/${eventId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold text-blue-800 mb-2">GradLink Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl">
            Connect with alumni, professionals, and fellow students at our upcoming events
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-600">Loading upcoming events...</p>
            </div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800 leading-tight">{event.title}</h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-red-600" />
                      <span className="text-gray-700">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{event.registeredUsers} Registered</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{event.description}</p>
                </div>
                
                <div className="px-6 pb-6">
                  <button 
                    onClick={(e) => handleRegisterClick(event.id, e)}
                    className="w-full bg-blue-900 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group"
                  >
                    Register Now
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No upcoming events</h3>
            <p className="text-gray-500">Check back soon for new events.</p>
          </div>
        )}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default EventsPage;