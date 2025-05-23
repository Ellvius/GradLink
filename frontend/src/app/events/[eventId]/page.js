"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, BookmarkIcon } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { format } from 'date-fns';

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
    <>
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar />
      <div className="container mx-auto p-6 max-w-4xl">

        {/* Event Header */}
        <div className="bg-blue-100 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">{event?.title}</h1>

          {/* Event Meta Information */}
          <div className="grid md:grid-cols-3 gap-4 text-xl">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-gray-700">{event && format(new Date(event?.startDateTime), "dd/MM/yyyy")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-green-500" />
              <span className="text-gray-700">{event && format(new Date(event?.startDateTime), "HH:mm")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-red-500" />
              <span className="text-gray-700">{event?.location}</span>
            </div>
          </div>
        </div>

        {/* Event Actions */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleRegister}
            disabled={isRegistered || event.registeredUsers >= event.totalCapacity}
            className={`flex-1 py-3 rounded transition-colors text-xl font-bold ${
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
          <p className="text-gray-700 text-xl leading-relaxed whitespace-pre-line">{event?.description}</p>
        </div>

        {/* Registration Info */}
        <div className="flex gap-4">
          <div className="mb-6 bg-blue-100 p-4 rounded-sm text-center">
            <h2 className="text-2xl font-semibold mb-4">Capacity</h2>
            <span className="font-bold text-xl text-blue">
                  {event?.capacity}
                </span>
          </div>

          <div className="mb-6  bg-blue-100 p-4 rounded-sm text-center">
            <h2 className="text-2xl font-semibold mb-4">Registered</h2>
            <span className="font-bold text-xl text-blue ">
                  {event?.EventRegistrations.length}/{event?.capacity}
                </span>
          </div>
        </div>
      </div>
    </div>
      <Footer className="mt-12" /></>
  );
};

export default EventDetailPage;
