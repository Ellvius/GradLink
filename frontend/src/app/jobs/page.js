"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Briefcase, MapPin, Building, ChevronRight } from "lucide-react";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    
    axios.get("http://localhost:5000/api/jobs/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
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
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-600">Loading job listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen text-gray-900">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <header className="mb-12 text-center">
            <h1 className="text-6xl font-extrabold text-blue-800 mb-2">GradLink Job Opportunities</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              Discover exciting career opportunities tailored for graduates and professionals
            </p>
          </header>

          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No job listings available</h3>
              <p className="text-gray-500">Check back soon for new opportunities.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {jobs.map((job) => (
                <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                    <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold text-gray-800 leading-tight">{job.jobTitle}</h2>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {job.jobType}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <Building className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700 font-medium">{job.companyName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-red-600" />
                          <span className="text-gray-700">{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-5 w-5 text-green-600" />
                          <span className="text-gray-700">{job.salary || "Competitive salary"}</span>
                        </div>
                      </div>
                      
                      {job.description && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{job.description}</p>
                      )}
                    </div>
                    
                    <div className="px-6 pb-6">
                      <button className="w-full bg-blue-900 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group">
                        View Details
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}