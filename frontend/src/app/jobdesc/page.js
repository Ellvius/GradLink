"use client";

import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowLeft, 
  Share2, 
  CheckCircle,
  File
} from 'lucide-react';

const JobDescription = () => {
  const [isApplying, setIsApplying] = useState(false);

  // Mock job details - in a real application, this would come from an API or routing
  const jobDetails = {
    id: 1,
    title: "Software Engineer Intern",
    company: "TechInnovate Solutions",
    location: "San Francisco, CA",
    type: "Internship",
    salary: "$25-30/hour",
    applicationDeadline: "2024-04-30",
    alumniPreferred: true,
    description: `We are seeking a motivated and talented Software Engineering Intern to join our dynamic technology team. The ideal candidate will have a strong passion for software development and a desire to learn and grow in a fast-paced environment.

Key Responsibilities:
- Assist in designing, developing, and maintaining software applications
- Collaborate with senior engineers on various projects
- Write clean, efficient, and well-documented code
- Participate in code reviews and team discussions
- Contribute to the entire software development lifecycle`,
    requirements: [
      "Currently pursuing a degree in Computer Science, Software Engineering, or related field",
      "Strong programming skills in languages like Python, Java, or JavaScript",
      "Familiarity with software development methodologies",
      "Excellent problem-solving and communication skills",
      "Ability to work effectively in a team environment"
    ],
    benefits: [
      "Competitive hourly rate",
      "Mentorship from senior engineers",
      "Potential for full-time conversion",
      "Hands-on experience with cutting-edge technologies",
      "Networking opportunities"
    ]
  };

  const handleApply = () => {
    setIsApplying(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="mr-2" size={20} /> Back to Job Listings
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Share2 className="mr-2" size={20} /> Share Job
            </button>
          </div>
        </div>

        {/* Job Details Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{jobDetails.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-3">
                <span className="flex items-center">
                  <Briefcase className="mr-2" size={16} /> {jobDetails.company}
                </span>
                <span className="flex items-center">
                  <MapPin className="mr-2" size={16} /> {jobDetails.location}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-2" size={16} /> {jobDetails.type}
                </span>
                <span className="flex items-center">
                  <DollarSign className="mr-2" size={16} /> {jobDetails.salary}
                </span>
              </div>
              {jobDetails.alumniPreferred && (
                <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm w-max">
                  <CheckCircle className="mr-1" size={14} /> Alumni Preferred
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Application Deadline: {jobDetails.applicationDeadline}</p>
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                onClick={handleApply}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Job Application Modal */}
        {isApplying && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Apply for {jobDetails.title}</h2>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="flex items-center">
                  <label className="mr-4">Resume/CV:</label>
                  <label className="flex items-center bg-gray-200 px-4 py-2 rounded-lg cursor-pointer">
                    <File className="mr-2" size={16} />
                    Upload File
                    <input type="file" className="hidden" />
                  </label>
                </div>
                <textarea 
                  placeholder="Additional Notes (Optional)" 
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={4}
                ></textarea>
                <div className="flex justify-end space-x-4">
                  <button 
                    type="button"
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                    onClick={() => setIsApplying(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Job Description */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
          <p className="text-gray-600 mb-4">{jobDetails.description}</p>

          <div className="grid grid-cols-2 gap-6">
            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2 list-disc pl-5">
                {jobDetails.requirements.map((req, index) => (
                  <li key={index} className="text-gray-600">{req}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="space-y-2 list-disc pl-5">
                {jobDetails.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-600">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;