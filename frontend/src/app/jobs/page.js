"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  Clock, 
  Tag, 
  CheckCircle 
} from 'lucide-react';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    industry: '',
    jobType: '',
    location: ''
  });

  // Mock job data - in a real application, this would come from an API
  const mockJobs = [
    {
      id: 1,
      title: "Software Engineer Intern",
      company: "TechInnovate Solutions",
      location: "San Francisco, CA",
      type: "Internship",
      industry: "Technology",
      description: "Seeking a motivated software engineering intern to join our dynamic team.",
      postedDate: "2024-03-25",
      alumniPreferred: true
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "DataWorks Enterprise",
      location: "New York, NY",
      type: "Full-time",
      industry: "Data Science",
      description: "We're looking for a skilled data analyst to help drive business insights.",
      postedDate: "2024-03-20",
      alumniPreferred: false
    },
    {
      id: 3,
      title: "Marketing Coordinator",
      company: "Creative Brands Inc.",
      location: "Remote",
      type: "Part-time",
      industry: "Marketing",
      description: "Join our marketing team and help develop innovative campaign strategies.",
      postedDate: "2024-03-22",
      alumniPreferred: true
    }
  ];

  // Initialize jobs on component mount
  useEffect(() => {
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  // Filter jobs based on search criteria
  const handleFilter = () => {
    let result = mockJobs;

    if (filters.searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.industry) {
      result = result.filter(job => job.industry === filters.industry);
    }

    if (filters.jobType) {
      result = result.filter(job => job.type === filters.jobType);
    }

    if (filters.location) {
      result = result.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setFilteredJobs(result);
  };

  // Update filters
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">GradLink Job Listings</h1>
              <p className="text-gray-500">Discover exciting opportunities for students and alumni</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Job Title or Company" 
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
              />
            </div>
            <select 
              className="w-full px-4 py-2 border rounded-lg"
              value={filters.industry}
              onChange={(e) => updateFilter('industry', e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
              <option value="Data Science">Data Science</option>
            </select>
            <select 
              className="w-full px-4 py-2 border rounded-lg"
              value={filters.jobType}
              onChange={(e) => updateFilter('jobType', e.target.value)}
            >
              <option value="">All Job Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              onClick={handleFilter}
            >
              <Filter className="mr-2" size={20} /> Apply Filters
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div 
              key={job.id} 
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <span className="flex items-center">
                      <Briefcase className="mr-2" size={16} /> {job.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="mr-2" size={16} /> {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-2" size={16} /> {job.type}
                    </span>
                  </div>
                  <p className="text-gray-500 mb-3">{job.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      <Tag className="mr-1" size={14} /> {job.industry}
                    </span>
                    {job.alumniPreferred && (
                      <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        <CheckCircle className="mr-1" size={14} /> Alumni Preferred
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Posted on {job.postedDate}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-gray-500">No job listings match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;