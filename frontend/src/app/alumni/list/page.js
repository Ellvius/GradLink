"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Alumni.css";
import Footer from "@/components/footer";
export default function AlumniList() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const API_URL =
      process.env.REACT_APP_API_URL || "http://localhost:3000/api/alumni/";
    axios
      .get(API_URL)
      .then((response) => {
        setAlumni(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching alumni:", error);
        setError("Failed to load alumni data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filteredAlumni = alumni.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Alumni Directory</h1>
      <input
        type="text"
        placeholder="Search alumni..."
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlumni.map((person) => (
          <div
            key={person.id}
            className="p-4 border rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold">{person.name}</h2>
            <p className="text-gray-600">
              {person.company} - {person.position}
            </p>
            <p className="text-gray-500">
              Experience: {person.experience} years
            </p>
            <p className="text-gray-700">📧 {person.email}</p>
            <p className="text-gray-700">📞 {person.contact_info}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
