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




const AlumniProfilePage = () => {
  

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
      
      {/* Footer */}
        <Footer />
    </div>
  );
};

export default AlumniProfilePage;