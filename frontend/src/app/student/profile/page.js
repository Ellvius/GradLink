"use client";
import Footer from '@/components/footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@university.edu',
    studentId: 'ST20235678',
    major: 'Computer Science',
    graduationYear: 2025,
    gpa: 3.85,
    contactPhone: '+1 (555) 123-4567',
    address: '123 Campus Lane, University City, State 54321',
    emergencyContact: {
      name: 'Maria Rodriguez',
      relationship: 'Mother',
      phone: '+1 (555) 987-6543'
    },
    academicDetails: {
      department: 'Computer Science & Engineering',
      advisor: 'Dr. Michael Chen',
      advisorEmail: 'michael.chen@university.edu'
    },
    courses: [
      { code: 'CS401', name: 'Advanced Machine Learning', semester: 'Fall 2024', grade: 'A' },
      { code: 'CS352', name: 'Database Systems', semester: 'Fall 2024', grade: 'A-' },
      { code: 'MATH325', name: 'Advanced Linear Algebra', semester: 'Fall 2024', grade: 'B+' }
    ]
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold text-4xl">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-gray-600">{profileData.major}</p>
                <p className="text-gray-500 text-sm">Student ID: {profileData.studentId}</p>
              </div>
            </div>
            <button 
              onClick={handleEditToggle}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              {isEditing ? (
                <input 
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-600">{profileData.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              {isEditing ? (
                <input 
                  type="tel"
                  name="contactPhone"
                  value={profileData.contactPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-600">{profileData.contactPhone}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              {isEditing ? (
                <textarea 
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-600">{profileData.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Academic Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Major</label>
              <p className="text-gray-600">{profileData.major}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Department</label>
              <p className="text-gray-600">{profileData.academicDetails.department}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Graduation Year</label>
              <p className="text-gray-600">{profileData.graduationYear}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Current GPA</label>
              <p className="text-gray-600">{profileData.gpa.toFixed(2)}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Academic Advisor</label>
              <p className="text-gray-600">{profileData.academicDetails.advisor}</p>
              <p className="text-gray-500 text-sm">{profileData.academicDetails.advisorEmail}</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Emergency Contact</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <p className="text-gray-600">{profileData.emergencyContact.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Relationship</label>
              <p className="text-gray-600">{profileData.emergencyContact.relationship}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <p className="text-gray-600">{profileData.emergencyContact.phone}</p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default StudentProfile;