"use client";
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  User, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  GraduationCap,
  BookOpen,
  Globe
} from 'lucide-react';
import axios from "axios";
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

const fetchAlumniProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`http://localhost:5000/api/alumni/profile/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch alumni profile:", error);
    return null;
  }
};


const AlumniProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchAlumniProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-2xl font-bold text-red-600">Profile Not Found</h2>
        <p className="mt-2">The requested alumni profile could not be loaded.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
      {/* Header with profile summary */}
      <div className='min-h-screen'>
      <div className="bg-gradient-to-r  from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-white shadow-md flex items-center justify-center text-blue-800">
                <User size={64} />
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
                <p className="text-xl mt-2">{profile.jobTitle} at {profile.company || 'Unspecified'}</p>
                <p className="mt-1 text-blue-100">
                    {profile.degreeProgram} in {profile.major}, Class of {profile.graduationYear}
                </p>
                
                {/* Contact Information */}
                <p className="mt-4 text-white">Phone: {profile.phone || 'Not available'}</p>
                <p className="mt-2 text-white">Email: {profile.email || 'Not available'}</p>
            </div>

          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto">
            <button 
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button 
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'education' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
            <button 
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'career' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('career')}
            >
              Career
            </button>
            <button 
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'social' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('social')}
            >
              Social Media
            </button>
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mt-1 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{profile.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mt-1 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-800">{profile.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User className="w-5 h-5 mt-1 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-gray-800">{profile.gender || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mt-1 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-gray-800">{profile.dateOfBirth ? formatDate(profile.dateOfBirth) : 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Education */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-800">{profile.degreeProgram}</h3>
                    </div>
                    <p className="mt-2 text-gray-600">
                      Major: {profile.major}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
                      Class of {profile.graduationYear}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded border border-gray-200">
                <p className="italic text-gray-600 text-sm">
                  This alumni has not added any additional education information.
                </p>
              </div>
            </div>
          )}
          
          {/* Career */}
          {activeTab === 'career' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Career Information</h2>
              
              {profile.company ? (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start">
                    <Briefcase className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{profile.jobTitle}</h3>
                      <p className="text-gray-600">{profile.company}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded border border-gray-200">
                  <p className="italic text-gray-600">
                    No career information provided.
                  </p>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Timeline</h3>
                <p className="text-gray-600 italic">
                  Career timeline information is not available.
                </p>
              </div>
            </div>
          )}
          
          {/* Social Media */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Social Media</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.linkedinUrl && (
                  <a 
                    href={profile.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Linkedin className="w-6 h-6 text-blue-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">LinkedIn</h3>
                      <p className="text-sm text-gray-500 truncate">{profile.linkedinUrl}</p>
                    </div>
                  </a>
                )}
                
                {profile.twitterUrl && (
                  <a 
                    href={profile.twitterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Twitter className="w-6 h-6 text-blue-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Twitter</h3>
                      <p className="text-sm text-gray-500 truncate">{profile.twitterUrl}</p>
                    </div>
                  </a>
                )}
                
                {profile.facebookUrl && (
                  <a 
                    href={profile.facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Facebook className="w-6 h-6 text-blue-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Facebook</h3>
                      <p className="text-sm text-gray-500 truncate">{profile.facebookUrl}</p>
                    </div>
                  </a>
                )}
                
                {profile.instagramUrl && (
                  <a 
                    href={profile.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Instagram className="w-6 h-6 text-blue-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Instagram</h3>
                      <p className="text-sm text-gray-500 truncate">{profile.instagramUrl}</p>
                    </div>
                  </a>
                )}
              </div>
              
              {!profile.linkedinUrl && !profile.twitterUrl && !profile.facebookUrl && !profile.instagramUrl && (
                <div className="p-4 bg-gray-50 rounded border border-gray-200">
                  <p className="italic text-gray-600">
                    No social media profiles have been linked.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
      {/* Footer */}
        <Footer />
    </div>
  );
};

export default AlumniProfilePage;