"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AlumniProfileForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    graduationYear: "",
    degreeProgram: "",
    major: "",
    company: "",
    jobTitle: "",
    privacySettings: "public",
    linkedinUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    instagramUrl: ""
  });

  // Field validation errors
  const [errors, setErrors] = useState({});

  // Generate years for dropdown (current year to 100 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required";
    if (!formData.degreeProgram.trim()) newErrors.degreeProgram = "Degree program is required";
    if (!formData.major.trim()) newErrors.major = "Major is required";
    
    // Optional URL validations
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    
    if (formData.linkedinUrl && !urlRegex.test(formData.linkedinUrl)) {
      newErrors.linkedinUrl = "Please enter a valid URL";
    }
    if (formData.twitterUrl && !urlRegex.test(formData.twitterUrl)) {
      newErrors.twitterUrl = "Please enter a valid URL";
    }
    if (formData.facebookUrl && !urlRegex.test(formData.facebookUrl)) {
      newErrors.facebookUrl = "Please enter a valid URL";
    }
    if (formData.instagramUrl && !urlRegex.test(formData.instagramUrl)) {
      newErrors.instagramUrl = "Please enter a valid URL";
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");
    
    // Validate the form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log("Validation errors:", formErrors);
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create or update your profile");
        setIsLoading(false);
        return;
      }
      
      // Make API request
      const response = await axios.post(
        "http://localhost:5000/api/alumni/profile", 
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      console.log("API response:", response.data);
      
      // On success, redirect to profile view
      router.push("/alumni");
      
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        err.response?.data?.message || 
        "An error occurred while saving your profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h1 className="text-3xl font-bold text-center mb-8">Alumni Profile</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
            
            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Optional"
              />
            </div>
          </div>
        </section>
        
        {/* Academic Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Academic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Graduation Year */}
            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                Graduation Year *
              </label>
              <select
                id="graduationYear"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.graduationYear ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.graduationYear && (
                <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>
              )}
            </div>
            
            {/* Degree Program */}
            <div>
              <label htmlFor="degreeProgram" className="block text-sm font-medium text-gray-700 mb-1">
                Degree Program *
              </label>
              <input
                type="text"
                id="degreeProgram"
                name="degreeProgram"
                value={formData.degreeProgram}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.degreeProgram ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="e.g. Bachelor of Science, Master of Arts"
              />
              {errors.degreeProgram && (
                <p className="mt-1 text-sm text-red-600">{errors.degreeProgram}</p>
              )}
            </div>
            
            {/* Major */}
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                Major *
              </label>
              <input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.major ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="e.g. Computer Science, Business Administration"
              />
              {errors.major && (
                <p className="mt-1 text-sm text-red-600">{errors.major}</p>
              )}
            </div>
          </div>
        </section>
        
        {/* Employment Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Employment Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Current Employer
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Optional"
              />
            </div>
            
            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Optional"
              />
            </div>
          </div>
        </section>
        
        {/* Privacy Settings */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Privacy Settings</h2>
          
          <div>
            <label htmlFor="privacySettings" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Visibility
            </label>
            <select
              id="privacySettings"
              name="privacySettings"
              value={formData.privacySettings}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="public">Public - Visible to all alumni</option>
              <option value="alumni-only">Alumni Only - Visible only to verified alumni</option>
              <option value="limited">Limited - Only share basic information</option>
              <option value="private">Private - Only visible to administrators</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Control how your profile information is shared with other alumni and the university.
            </p>
          </div>
        </section>
        
        {/* Social Media Links */}
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Social Media Links (Optional)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LinkedIn */}
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.linkedinUrl ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="https://linkedin.com/in/yourprofile"
              />
              {errors.linkedinUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl}</p>
              )}
            </div>
            
            {/* Twitter/X */}
            <div>
              <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter/X Profile
              </label>
              <input
                type="url"
                id="twitterUrl"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.twitterUrl ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="https://twitter.com/yourusername"
              />
              {errors.twitterUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.twitterUrl}</p>
              )}
            </div>
            
            {/* Facebook */}
            <div>
              <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Facebook Profile
              </label>
              <input
                type="url"
                id="facebookUrl"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.facebookUrl ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="https://facebook.com/yourusername"
              />
              {errors.facebookUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.facebookUrl}</p>
              )}
            </div>
            
            {/* Instagram */}
            <div>
              <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram Profile
              </label>
              <input
                type="url"
                id="instagramUrl"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.instagramUrl ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="https://instagram.com/yourusername"
              />
              {errors.instagramUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.instagramUrl}</p>
              )}
            </div>
          </div>
        </section>
        
        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition duration-150"
            onClick={(e) => {
              console.log("Button clicked");
              // The form's onSubmit will handle the actual submission
            }}
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}