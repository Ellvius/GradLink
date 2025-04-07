"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function AlumniSearch() {
  const [searchParams, setSearchParams] = useState({
    name: "",
    graduationYear: "",
    company: ""
  });
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  
  const router = useRouter();
  
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Filter out empty search parameters
      const queryParams = Object.entries(searchParams)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      
      const { data } = await axios.get(`http://localhost:5000/api/users/search?${queryParams}`);
      
      setResults(data.alumni || []);
      setTotalResults(data.total || data.alumni?.length || 0);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search alumni");
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const clearSearch = () => {
    setSearchParams({
      name: "",
      graduationYear: "",
      company: ""
    });
    setResults([]);
  };
  
  // Handle graduation year range for dropdown (last 30 years)
  const currentYear = new Date().getFullYear();
  const graduationYears = [];
  for (let year = currentYear; year >= currentYear - 30; year--) {
    graduationYears.push(year);
  }
  
  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Alumni Directory</h1>
          <div className="flex items-center">
            <div className="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-10 h-10">
                <polygon points="100,50 170,85 100,120 30,85" fill="currentColor" />
                <rect x="40" y="110" width="120" height="15" fill="currentColor" />
                <line x1="100" y1="120" x2="100" y2="150" stroke="currentColor" strokeWidth="6" />
                <path d="M170,85 C180,100 165,115 155,125" stroke="currentColor" strokeWidth="4" fill="none" />
                <circle cx="155" cy="125" r="6" fill="currentColor" />
              </svg>
            </div>
            <span className="ml-2 text-2xl font-bold">GradLink</span>
          </div>
        </div> */}
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Alumni</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={searchParams.name}
                  onChange={handleInputChange}
                  placeholder="Search by first or last name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                <select
                  name="graduationYear"
                  value={searchParams.graduationYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Years</option>
                  {graduationYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={searchParams.company}
                  onChange={handleInputChange}
                  placeholder="Search by company name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Search
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 px-6 text-white font-medium rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>
        
        {/* Results Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {results.length > 0 ? `${totalResults} Alumni Found` : "Alumni Directory"}
            </h3>
          </div>
          
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Searching for alumni...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {results.map((alumni) => (
                <div key={alumni.id} className="px-6 py-4 hover:bg-gray-50">
                  <Link href={`/alumni/${alumni._id}`}>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-medium">
                        {alumni.firstName.charAt(0)}{alumni.lastName.charAt(0)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-baseline">
                          <h4 className="text-lg font-medium text-gray-900">{alumni.firstName} {alumni.lastName}</h4>
                          <span className="ml-2 text-sm text-gray-500">Class of {alumni.graduationYear}</span>
                        </div>
                        <p className="text-gray-600">{alumni.degreeProgram} in {alumni.major}</p>
                        {alumni.company && alumni.jobTitle && (
                          <p className="text-gray-500 text-sm">{alumni.jobTitle} at {alumni.company}</p>
                        )}
                        {alumni.email && alumni.phone && (
                          <p className="text-gray-500 text-sm">{alumni.phone}, {alumni.email}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No alumni found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
      <Footer/>
    </>
  );
}