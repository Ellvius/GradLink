"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, BookmarkIcon } from "lucide-react";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

const EventDetailPage = () => {
  const { eventId } = useParams(); // Get event ID from URL
  console.log("Event ID:", eventId);
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token is available
        console.log(token);
        if (!token) {
          setError("Authentication required.");
          console.log("No token.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEvent(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);
  
  const handleRegister = async () => {
    if (!event || isRegistered || event.registeredUsers >= event.totalCapacity) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/events/${eventId}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsRegistered(true);
      setEvent((prev) => ({ ...prev, registeredUsers: prev.registeredUsers + 1 }));
    } catch (err) {
      alert("Failed to register.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Check out this event: ${event?.title} on ${event?.date}`);
    alert("Event link copied to clipboard!");
  };

  if (loading) return <p className="text-center text-gray-500">Loading event details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  console.log("Hiii...");
  console.log(event);
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
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{event?.title}</h1>

          {/* Event Meta Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">{event?.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">{event?.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <span className="text-gray-700">{event?.location}</span>
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
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
            }`}
          >
            {isRegistered ? "Registered" : "Register Now"}
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-3 rounded ${
              isBookmarked ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <BookmarkIcon />
          </button>
          <button onClick={handleShare} className="p-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            <Share2 />
          </button>
        </div>

        {/* Event Description */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Event Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event?.description}</p>
        </div>

        {/* Registration Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Registration</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Registered Users</span>
              <span className="font-bold text-blue-600">
                {event?.registeredUsers} / {event?.totalCapacity}
              </span>
            </div>
            {event?.registeredUsers >= event?.totalCapacity && (
              <p className="text-red-600 mt-2">Event is currently at full capacity</p>
            )}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {event?.prerequisites?.map((prereq, index) => (
              <li key={index}>{prereq}</li>
            ))}
          </ul>
        </div>

        {/* Organizer Info */}
        {/* <div>
          <h2 className="text-2xl font-semibold mb-4">Organizer Contact</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 font-medium">{event?.organizerInfo?.name}</p>
            <p className="text-gray-600">Email: {event?.organizerInfo?.contact}</p>
            <p className="text-gray-600">Phone: {event?.organizerInfo?.phone}</p>
          </div>
        </div> */}
      </div>
      <Footer className="mt-12" />
    </div>
  );
};

export default EventDetailPage;
