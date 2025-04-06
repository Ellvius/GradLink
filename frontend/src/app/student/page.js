"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

const StudentDashBoard = () => {
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
        
        const response = await axios.get('http://localhost:5000/api/users/profile', {
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
        setError(prev => ({ ...prev, events: 'Failed to load event.Event data' }));
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
        
        const response = await axios.get('http://localhost:5000/api/jobs/applied', {
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


  // Use actual data if available, otherwise use fallback
  const displayUser = user ;
  const displayEvents =  userEvents;
  const displayJobs = userJobs;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
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
                // router.push("/student/profile");
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
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-md flex justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Welcome back</h3>
                  <h3 className='text-4xl font-extrabold mb-2'> {loading.user ? 'Alumni' : displayUser.username.split(' ')[0]}!</h3>
                </div>
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white shadow-md mr-8">
                  <Image
                    src="/student.png"
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
                    My Events
                  </h3>
                  <div className="flex space-x-4">
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
                                {event?.Event?.startDateTime && format(new Date(event?.Event?.startDateTime), "yyyy-MM-dd")}
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
                        {displayJobs.slice(0, 3).map((job, index) => (
                          <div key={index} className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <div>
                              <h4 className="font-medium text-gray-800">{job?.JobPosting?.jobTitle}</h4>
                              <p className="text-md text-gray-600">{job?.JobPosting?.companyName} • {job?.JobPosting?.location}</p>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-md text-gray-500">
                                  Posted: {job?.JobPosting?.createdAt && format(new Date(job?.JobPosting?.createdAt), "yyyy-MM-dd")}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-sm text-white text-sm font-medium
                                ${job.status === 'pending' ? 'bg-yellow-500' :
                                  job.status === 'rejected' ? 'bg-red-500' :
                                  job.status === 'approved' ? 'bg-green-500' : 'bg-gray-400'}
                              `}
                            >
                              {job?.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          )}

          {/* Student Profile Content */}
          {activeSection === 'profile' && (
            <div className='w-full bg-white rounded-b-md border flex '>
              <div className="max-w-3xl mx-8 mt-6 p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                  👤 User Information
                </h2>
                <div className="space-y-2 text-gray-700 text-xl">
                  <p><span className="font-bold">ID:</span> {displayUser.id}</p>
                  <p><span className="font-bold">Username:</span> {displayUser.username}</p>
                  <p><span className="font-bold">Email:</span> {displayUser.email}</p>
                  <p><span className="font-bold">Role:</span> {displayUser.role}</p>
                  <p>
                    <span className="font-bold">Status:</span>{' '}
                    <span className={displayUser.accountStatus === 'active' ? 'text-green-600' : 'text-red-600'}>
                      {displayUser.accountStatus}
                    </span>
                  </p>
                  <p><span className="font-bold">Last Login:</span> {displayUser.lastLoginDate || 'N/A'}</p>
                  <p><span className="font-bold">Created At:</span> {new Date(displayUser.createdAt).toLocaleString()}</p>
                  <p><span className="font-bold">Updated At:</span> {new Date(displayUser.updatedAt).toLocaleString()}</p>
                </div>
              </div>
              <div className='flex justify-center items-center ml-24'>
                <div className="w-60 h-60 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/student.png"
                      alt="User Avatar"
                      width={240}
                      height={240}
                      className="object-cover"
                      />
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

export default StudentDashBoard;