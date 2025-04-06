"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function EditJobPosting() {
const { jobId } = useParams();
  
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [applicationLink, setApplicationLink] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [status, setStatus] = useState("active");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  
  const router = useRouter();
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) return;
      
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required. Please log in.");
        }
        
        const { data } = await axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Format date to YYYY-MM-DD for the date input
        const formattedDate = data.expirationDate ? 
          new Date(data.expirationDate).toISOString().split('T')[0] : 
          "";
        
        setCompanyName(data.companyName || "");
        setJobTitle(data.jobTitle || "");
        setJobType(data.jobType || "Full-time");
        setLocation(data.location || "");
        setDescription(data.description || "");
        setRequirements(data.requirements || "");
        setApplicationLink(data.applicationLink || "");
        setExpirationDate(formattedDate);
        setStatus(data.status || "active");
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch job details");
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchJobDetails();
  }, [jobId]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please log in.");
      }
      
      const jobData = {
        companyName,
        jobTitle,
        jobType,
        location,
        description,
        requirements,
        applicationLink,
        expirationDate,
        status
      };
      
      await axios.put(`http://localhost:5000/api/jobs/${jobId}`, 
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      router.push(`/jobs/${jobId}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update job posting");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  
//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-2 text-gray-700">Loading job details...</p>
//         </div>
//       </div>
//     );
//   }
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Edit Job Posting</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mt-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="City, State or Remote"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Application Link</label>
            <input
              type="url"
              value={applicationLink}
              onChange={(e) => setApplicationLink(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Requirements</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-2 px-4 text-white font-medium rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Updating..." : "Update Job Posting"}
            </button>
            
            <Link href={`/jobs/${jobId}`}>
              <span className="flex-1 py-2 px-4 text-gray-700 font-medium rounded-md shadow-sm border border-gray-300 hover:bg-gray-50 inline-block text-center">
                Cancel
              </span>
            </Link>
          </div>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          <Link href="/job-postings">
            <span className="text-blue-600 hover:text-blue-500">Back to all job postings</span>
          </Link>
        </p>
      </div>
    </div>
  );
}