"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer';
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
  Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

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
    router.push("/event/create");
  }

  const addJob = () => {
    console.log('Add new job');
    router.push("/job/create");
  }

  // Fallback data in case API fails
  const fallbackUser = {
    name: "Emily Rodriguez",
    graduationYear: 2022,
    major: "Computer Science",
    currentRole: "Software Engineer",
    company: "TechInnovate Solutions",
    email: "emily.rodriguez@example.com",
    location: "San Francisco, CA",
    profilePicture: null
  };

  const fallbackEvents = [
    {
      id: 1,
      title: "Alumni Networking Mixer",
      date: "April 15, 2025",
      location: "Virtual",
      attendees: 45
    },
    {
      id: 2,
      title: "Industry Panel: Future of Tech",
      date: "May 2, 2025",
      location: "Campus Center",
      attendees: 120
    }
  ];

  const fallbackJobs = [
    {
      id: 1,
      title: "Senior Software Developer",
      company: "Global Tech Inc.",
      location: "San Francisco, CA",
      postedOn: "March 25, 2025",
      applicants: 12
    },
    {
      id: 2,
      title: "Data Science Specialist",
      company: "DataWorks Enterprise",
      location: "New York, NY",
      postedOn: "March 28, 2025",
      applicants: 8
    }
  ];

  const forumTopics = [
    {
      id: 1,
      title: "Tech Career Transitions",
      participants: 150,
      newPosts: 12
    },
    {
      id: 2,
      title: "Startup Entrepreneurship",
      participants: 87,
      newPosts: 5
    }
  ];

  // Use actual data if available, otherwise use fallback
  const displayUser = user || fallbackUser;
  const displayEvents = userEvents.length > 0 ? userEvents : fallbackEvents;
  const displayJobs = userJobs.length > 0 ? userJobs : fallbackJobs;
console.log(displayUser);
  // Format date for events
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="min-h-screen flex flex-1">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-md z-10 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">GradLink</h1>
          </div>
          
          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
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
                router.push("/alumni/profile");
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
              className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
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
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              
              <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell size={20} className="text-gray-700" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-md">
                <h3 className="text-3xl font-bold mb-2">Welcome back, {loading.user ? 'Alumni' : displayUser.firstName.split(' ')[0]}!</h3>
                {/* <p className="opacity-90">You have 2 new messages and 3 upcoming events this month.</p> */}
              </div>
              
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-2 gap-6">
                
                {/* My Events Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-2xl text-gray-800 flex items-center">
                    <Calendar className="mr-2 text-blue-600" size={18} />
                    My Events
                  </h3>
                  <div className="flex space-x-4">
                    <button onClick={addEvent} className="text-blue-600 hover:bg-blue-50 rounded-full p-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                      </svg>
                    </button>
                    <button onClick={()=>router.push("/events")} className="text-sm text-blue-600 hover:underline">View All</button>
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
                      <div className="space-y-4">

                        {displayEvents.slice(0, 3).map((event, index) => (
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
                      <button onClick={addJob} className="text-blue-600 hover:bg-blue-50 rounded-full p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                        </svg>
                      </button>
                      <button onClick={()=> router.push("/jobs")} className="text-sm text-blue-600 hover:underline">View All</button>
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
                      <div className="space-y-4">
                        {displayJobs.slice(0, 3).map(job => (
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

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlumniDashboard;