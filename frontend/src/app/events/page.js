"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

const EventsPage = () => {
  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  ; // Replace with actual token from login

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`, // Token-based authentication
          },
        });

        // Format the data to match the frontend structure
        const formattedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.startDateTime).toLocaleDateString(),
          time: `${new Date(event.startDateTime).toLocaleTimeString()} - ${new Date(event.endDateTime).toLocaleTimeString()}`,
          location: event.location,
          type: event.type || "general",
          description: event.description,
          registeredUsers: event.capacity,
          categories: ["event"], // Modify if needed
        }));

        setEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on selected category
  const filteredEvents =
    filter === "all" ? events : events.filter((event) => event.categories.includes(filter));

  return (
    
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar/>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">GradLink Events</h1>

        {/* Filter Buttons */}
        <div className="mb-6 flex space-x-4">
          {["all", "career", "networking", "workshop"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded transition-colors ${
                filter === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)} Events
            </button>
          ))}
        </div>

        {/* Events List */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading events...</p>
        ) : filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
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
        ) : (
          <div className="text-center text-gray-500 py-10">No events found in this category.</div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default EventsPage;
