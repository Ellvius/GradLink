"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { 
  Users, 
  Briefcase, 
  MessageCircle, 
  LayoutDashboard,
  Search, 
  Bell,
  ArrowRight,
  User,
  MessageSquare,
  LogOut,
  Calendar,
  Settings,
  Plus,
  Loader2,
  Mail, 
  Phone, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  GraduationCap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

const AlumniDashboard = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState({
    user: true,
    events: true,
    jobs: true
  });
  const [error, setError] = useState({
    user: null,
    events: null,
    jobs: null
  });

  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');  
  // Get auth token from localStorage
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const response = await axios.get('http://localhost:5000/api/alumni/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setUser(response.data);
        setLoading(prev => ({ ...prev, user: false }));
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(prev => ({ ...prev, user: 'Failed to load profile data' }));
        setLoading(prev => ({ ...prev, user: false }));
      }
    };
    
    fetchUserProfile();
  }, []);
  
  // Fetch user events
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const response = await axios.get('http://localhost:5000/api/events/user-registrations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setUserEvents(response.data);
        setLoading(prev => ({ ...prev, events: false }));
      } catch (err) {
        console.error('Error fetching user events:', err);
        setError(prev => ({ ...prev, events: 'Failed to load event.Event? data' }));
        setLoading(prev => ({ ...prev, events: false }));
      }
    };
    
    fetchUserEvents();
  }, []);
  
  // Fetch user job postings
  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const response = await axios.get('http://localhost:5000/api/jobs/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setUserJobs(response.data);
        setLoading(prev => ({ ...prev, jobs: false }));
      } catch (err) {
        console.error('Error fetching user jobs:', err);
        setError(prev => ({ ...prev, jobs: 'Failed to load job postings' }));
        setLoading(prev => ({ ...prev, jobs: false }));
      }
    };
    
    fetchUserJobs();
  }, []);
  
  const handleLogout = ()=>{
    console.log("logout");
    localStorage.clear();
    router.push("/auth/login");
  }
  
  const addEvent = () => {
    console.log('Add new event');
    router.push("/events/create");
  }
  
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

  const addJob = () => {
    console.log('Add new job');
    router.push("/jobs/create");
  }

  // Use actual data if available, otherwise use fallback
  const displayUser = user ;
  const displayEvents = userEvents;
  const displayJobs = userJobs;
  // Format date for events
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar/>
      <div className="min-h-[92vh] flex flex-1">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-md z-10 flex flex-col">
          
          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 text-xl">
            <button 
              className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                activeSection === 'dashboard' 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('dashboard')}
            >
              <LayoutDashboard className="mr-3" size={20} />
              <span>Dashboard</span>
            </button>
            
            <button 
              className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                activeSection === 'profile' 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveSection('profile');
                // router.push("/alumni/profile");
              }}
            >
              <User className="mr-3" size={20} />
              <span>Profile</span>
            </button>

            
            <button 
              className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                activeSection === 'jobs' 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() =>{
                setActiveSection('jobs');
                router.push("/jobs");
              }}
            >
              <Briefcase className="mr-3" size={20} />
              <span>Jobs</span>
            </button>
            
            <button 
              className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                activeSection === 'events' 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveSection('events');
                router.push("/events");
              }}
            >
              <Calendar className="mr-3" size={20} />
              <span>Events</span>
            </button>
          
          </nav>
          
          <div onClick={handleLogout} className="p-4 border-t border-gray-200">
          <button 
              className="w-full flex items-center p-3 rounded-lg text-red-600 font-bold text-xl hover:bg-gray-100 transition-colors"
            >
              <LogOut className="mr-3" size={20} />
              <span >Logout</span>
            </button>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Header with search and notifications */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-gray-800">
              {activeSection === 'dashboard' && 'Dashboard'}
              {activeSection === 'profile' && 'My Profile'}
              {activeSection === 'forums' && 'Forums'}
              {activeSection === 'jobs' && 'Job Opportunities'}
              {activeSection === 'events' && 'Events'}
            </h2>
          </div>

          {/* Dashboard Content */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Welcome back</h3>
                  <h3 className="text-4xl font-extrabold mb-2">
                    {loading.user ? 'Alumni' : displayUser.firstName.split(' ')[0]}!
                  </h3>
                </div>
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white shadow-md mr-8">
                  <Image
                    src="/alumni.png"
                    alt="User Avatar"
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
              </div>

              
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-2 gap-6">
                
                {/* My Events Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-2xl text-gray-800 flex items-center">
                    <Calendar className="mr-2 text-blue-600" size={18} />
                    Registered Events
                  </h3>
                  <div className="flex space-x-4">
                    <button onClick={addEvent} className="text-white hover:bg-blue-900 rounded-full p-3 flex bg-blue-600">
                    <h1 className='pr-2 text-md'>Post event</h1>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                      </svg>
                    </button>
                  </div>
                </div>

                  
                  <div className="p-4">
                    {loading.events ? (
                      <div className="flex justify-center items-center h-32">
                        <Loader2 className="animate-spin text-blue-600" size={24} />
                      </div>
                    ) : error.events ? (
                      <div className="text-red-500 text-center py-4">{error.events}</div>
                    ) : (
                      <div className="space-y-4 max-h-76 overflow-y-auto pr-2">

                        {displayEvents.map((event, index) => (
                          <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <h4 className="font-medium text-lg text-gray-800">{event?.Event?.title}</h4>
                               <p className="text-md text-gray-500">
                                {event?.Event?.startDateTime && format(new Date(event?.Event?.startDateTime), "dd/MM/yyyy") }
                              </p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-md text-gray-500">
                                {event?.Event?.location}
                              </span>
                            </div>
                          </div>
                          
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* My Jobs Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-2xl text-gray-800 flex items-center">
                      <Briefcase className="mr-2 text-blue-600" size={18} />
                      My Job Postings
                    </h3>
                    <div className="flex space-x-4">
                      <button onClick={addJob} className="text-white hover:bg-blue-900 rounded-full p-3 flex bg-blue-600">
                        <h1 className='pr-2'>Post Job</h1> 
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {loading.jobs ? (
                      <div className="flex justify-center items-center h-32">
                        <Loader2 className="animate-spin text-blue-600" size={24} />
                      </div>
                    ) : error.jobs ? (
                      <div className="text-red-500 text-center py-4">{error.jobs}</div>
                    ) : (
                      <div className="space-y-4 max-h-76 overflow-y-auto pr-2">
                        {displayJobs
                        .filter(job => job.poster.id === displayUser.userId)
                        .map(job => ( 
                          <div key={job.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <h4 className="font-medium text-gray-800">{job.jobTitle}</h4>
                            <p className="text-md text-gray-600">{job.companyName} • {job.location}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-md text-gray-500">
                                Posted: {format(new Date(job.createdAt), "dd/MM/yyyy")}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          )}

          {activeSection === 'profile' && (
            <div className='max-h-164 overflow-y-auto'>
            <div className="bg-gradient-to-r  from-blue-600 to-blue-800 text-white">
              <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pl-8 pr-10">
                  <div className="flex-grow text-center md:text-left ">
                      <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
                      <p className="text-xl mt-2">{profile.jobTitle} at {profile.company || 'Unspecified'}</p>
                      <p className="mt-1 text-blue-100">
                          {profile.degreeProgram} in {profile.major}, Class of {profile.graduationYear}
                      </p>
                      
                      {/* Contact Information */}
                      <p className="mt-4 text-white">Phone: {profile.phone || 'Not available'}</p>
                      <p className="mt-2 text-white">Email: {profile.email || 'Not available'}</p>
                  </div>
      
                  {/* Profile Image */}
                  <div className='flex justify-center items-center ml-24'>
                    <div className="w-50 h-50 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src="/alumni.png"
                          alt="User Avatar"
                          width={200}
                          height={200}
                          className="object-cover"
                          />
                    </div>
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
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlumniDashboard;