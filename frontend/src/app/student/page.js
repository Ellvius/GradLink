"use client";

import Footer from '@/components/footer';
import React, { useState } from 'react';
import { 
  Calendar, 
  BookOpen, 
  ClipboardList, 
  TrendingUp, 
  Bell, 
  DollarSign, 
  FileText 
} from 'lucide-react';

const StudentDashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([
    { 
      id: 1, 
      title: 'Midterm Exam - Machine Learning', 
      date: 'Oct 15, 2024', 
      time: '10:00 AM',
      type: 'exam'
    },
    { 
      id: 2, 
      title: 'Project Presentation - Database Systems', 
      date: 'Oct 22, 2024', 
      time: '2:00 PM',
      type: 'presentation'
    },
    { 
      id: 3, 
      title: 'Guest Lecture - AI Ethics', 
      date: 'Nov 5, 2024', 
      time: '4:00 PM',
      type: 'lecture'
    }
  ]);

  const [courses, setCourses] = useState([
    {
      code: 'CS401',
      name: 'Advanced Machine Learning',
      instructor: 'Dr. Sarah Johnson',
      grade: 'A-',
      progress: 75
    },
    {
      code: 'CS352',
      name: 'Database Systems',
      instructor: 'Prof. Michael Chen',
      grade: 'B+',
      progress: 65
    },
    {
      code: 'MATH325',
      name: 'Advanced Linear Algebra',
      instructor: 'Dr. Emily Rodriguez',
      grade: 'A',
      progress: 85
    }
  ]);

  const financialData = {
    totalTuition: 45000,
    paid: 22500,
    balance: 22500,
    scholarships: 5000
  };

  const performanceMetrics = {
    gpa: 3.85,
    creditsEarned: 84,
    semestersCompleted: 5
  };

  const renderEventIcon = (type) => {
    switch(type) {
      case 'exam': return '📝';
      case 'presentation': return '🖥️';
      case 'lecture': return '🎤';
      default: return '📅';
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Student Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="text-gray-600 hover:text-blue-600 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                3
              </span>
            </div>
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">
              ER
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Calendar className="mr-2 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Upcoming Events
              </h2>
            </div>
            {upcomingEvents.map(event => (
              <div 
                key={event.id} 
                className="flex items-center border-b py-3 last:border-b-0 hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">
                  {renderEventIcon(event.type)}
                </span>
                <div>
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Courses */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="mr-2 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Current Courses
              </h2>
            </div>
            {courses.map(course => (
              <div 
                key={course.code} 
                className="mb-4 border-b pb-4 last:border-b-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium text-gray-800">{course.name}</p>
                    <p className="text-sm text-gray-500">{course.instructor}</p>
                  </div>
                  <span className="font-bold text-blue-600">{course.grade}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{width: `${course.progress}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Financial Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="mr-2 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Financial Summary
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Tuition</span>
                <span className="font-medium">${financialData.totalTuition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paid</span>
                <span className="font-medium text-green-600">
                  ${financialData.paid}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Balance</span>
                <span className="font-medium text-red-600">
                  ${financialData.balance}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Scholarships</span>
                <span className="font-medium text-blue-600">
                  ${financialData.scholarships}
                </span>
              </div>
            </div>
          </div>

          {/* Academic Performance */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="mr-2 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Academic Performance
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-600">GPA</p>
                <p className="text-2xl font-bold text-purple-600">
                  {performanceMetrics.gpa}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Credits</p>
                <p className="text-2xl font-bold text-purple-600">
                  {performanceMetrics.creditsEarned}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Semesters</p>
                <p className="text-2xl font-bold text-purple-600">
                  {performanceMetrics.semestersCompleted}
                </p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FileText className="mr-2 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Important Documents
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Transcript</span>
                <button className="text-blue-600 hover:underline">
                  Download
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span>Enrollment Certificate</span>
                <button className="text-blue-600 hover:underline">
                  Download
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span>Financial Aid Documents</span>
                <button className="text-blue-600 hover:underline">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default StudentDashboard;