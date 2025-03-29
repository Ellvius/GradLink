"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Activity, 
  BarChart2, 
  UserCheck, 
  MessageSquare, 
  Settings, 
  Search,
  Filter,
  PlusCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  
  // Mock data for admin dashboard
  const platformStats = {
    totalUsers: 5423,
    activeUsers: 3214,
    newUsersThisMonth: 287,
    jobPostings: 156,
    forumActivity: 1245
  };

  const recentUsers = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.thompson@example.com",
      graduationYear: 2022,
      status: "Active"
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      graduationYear: 2023,
      status: "Pending"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      email: "michael.rodriguez@example.com",
      graduationYear: 2021,
      status: "Active"
    }
  ];

  const pendingJobPostings = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechInnovate Solutions",
      submittedBy: "Corporate Partnerships",
      dateSubmitted: "2024-03-15"
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "DataWorks Enterprise",
      submittedBy: "Alumni Network",
      dateSubmitted: "2024-03-20"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Settings className="text-blue-600" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">GradLink Admin Dashboard</h1>
                <p className="text-gray-500">Comprehensive Platform Management</p>
              </div>
            </div>
            <div className="flex space-x-3">
              {['overview', 'users', 'jobs', 'forums'].map(section => (
                <button 
                  key={section}
                  className={`px-4 py-2 rounded capitalize ${
                    activeSection === section 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-4 gap-6">
          {/* Platform Statistics */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-4 grid grid-cols-5 gap-4">
            {[
              { icon: Users, label: "Total Users", value: platformStats.totalUsers },
              { icon: UserCheck, label: "Active Users", value: platformStats.activeUsers },
              { icon: PlusCircle, label: "New Users", value: platformStats.newUsersThisMonth },
              { icon: Briefcase, label: "Job Postings", value: platformStats.jobPostings },
              { icon: MessageSquare, label: "Forum Activity", value: platformStats.forumActivity }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-3 mx-auto mb-2 w-16 h-16 flex items-center justify-center">
                  <stat.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-gray-600 text-sm">{stat.label}</h3>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Users */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <Users className="mr-2 text-blue-600" size={20} />
                Recent Users
              </h3>
              <div className="flex space-x-2">
                <button className="bg-gray-200 p-2 rounded">
                  <Filter size={16} />
                </button>
                <button className="bg-gray-200 p-2 rounded">
                  <Search size={16} />
                </button>
              </div>
            </div>
            {recentUsers.map(user => (
              <div 
                key={user.id} 
                className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
              >
                <div>
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-gray-600">{user.email} • Class of {user.graduationYear}</p>
                </div>
                <span 
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {user.status}
                </span>
              </div>
            ))}
          </div>

          {/* Pending Job Postings */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
            <h3 className="text-lg font-bold flex items-center mb-4">
              <Briefcase className="mr-2 text-blue-600" size={20} />
              Pending Job Postings
            </h3>
            {pendingJobPostings.map(job => (
              <div 
                key={job.id} 
                className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
              >
                <div>
                  <h4 className="font-semibold">{job.title}</h4>
                  <p className="text-gray-600">{job.company} • Submitted by {job.submittedBy}</p>
                  <p className="text-xs text-gray-500">Submitted on {job.dateSubmitted}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-600 text-white px-3 py-2 rounded text-sm">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-3 py-2 rounded text-sm">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;