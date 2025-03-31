"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/jobs/",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    ) // Replace with your actual backend API endpoint
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job listings");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-yellow-400 text-xl">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 text-gray-900 p-10">
  <div className="max-w-6xl mx-auto">
    {/* Page Title */}
    <h1 className="text-5xl font-extrabold mb-12 text-blue-700 border-b-4 border-blue-500 pb-4 text-center">
      Job Listings
    </h1>

    {jobs.length === 0 ? (
      <p className="text-gray-500 text-xl text-center">No job listings available at the moment.</p>
    ) : (
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id} className="block">
            <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500 transition-all duration-300">
              
              {/* Job Title & Type */}
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl font-bold text-blue-700">{job.jobTitle}</h2>
                <span className="text-lg bg-amber-500 text-white font-semibold px-4 py-2 rounded-full shadow-sm">
                  {job.jobType}
                </span>
              </div>

              {/* Company & Location */}
              <div className="text-gray-700 text-lg mb-6">
                <p className="font-medium text-gray-900 text-xl">{job.companyName}</p>
                <p className="text-lg">{job.location}</p>
              </div>

              {/* View Details Button */}
              <button className="mt-6 text-lg text-blue-600 font-semibold hover:underline flex items-center">
                View Details →
              </button>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
</div>

  <Footer />
</>
  );
}