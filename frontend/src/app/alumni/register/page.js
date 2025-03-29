"use client";

import { useState } from "react";
// import { useRouter } from "next/router";
import Head from "next/head";

export default function AlumniRegistration() {
  // const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    graduationYear: "",
    degreeProgram: "",
    major: "",
    currentEmployer: "",
    jobTitle: "",
    workEmail: "",
    privacySettings: "public",
    linkedinUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    instagramUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.graduationYear)
      newErrors.graduationYear = "Graduation year is required";
    if (!formData.degreeProgram.trim())
      newErrors.degreeProgram = "Degree program is required";
    if (!formData.major.trim()) newErrors.major = "Major is required";

    // Social media validation (optional fields)
    if (
      formData.linkedinUrl &&
      !formData.linkedinUrl.includes("linkedin.com")
    ) {
      newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
    }
    if (
      formData.twitterUrl &&
      !formData.twitterUrl.includes("twitter.com") &&
      !formData.twitterUrl.includes("x.com")
    ) {
      newErrors.twitterUrl = "Please enter a valid Twitter/X URL";
    }
    if (
      formData.facebookUrl &&
      !formData.facebookUrl.includes("facebook.com")
    ) {
      newErrors.facebookUrl = "Please enter a valid Facebook URL";
    }
    if (
      formData.instagramUrl &&
      !formData.instagramUrl.includes("instagram.com")
    ) {
      newErrors.instagramUrl = "Please enter a valid Instagram URL";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/alumni/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Success - redirect to a thank you page or dashboard
          // router.push("/alumni/registration-success");
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.message || "Registration failed" });
          setIsSubmitting(false);
        }
      } catch (error) {
        setErrors({ submit: "An error occurred. Please try again." });
        setIsSubmitting(false);
      }
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <>
      <Head>
        <title>Alumni Registration - Complete Your Profile</title>
        <meta
          name="description"
          content="Complete your alumni profile to connect with your alma mater and fellow graduates."
        />
      </Head>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          Complete Your Alumni Profile
        </h1>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.dob ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.dob && (
                  <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Optional"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-4">Academic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Graduation Year */}
              <div>
                <label
                  htmlFor="graduationYear"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Graduation Year *
                </label>
                <select
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.graduationYear ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.graduationYear && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.graduationYear}
                  </p>
                )}
              </div>

              {/* Degree Program */}
              <div>
                <label
                  htmlFor="degreeProgram"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Degree Program *
                </label>
                <input
                  type="text"
                  id="degreeProgram"
                  name="degreeProgram"
                  value={formData.degreeProgram}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.degreeProgram ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="e.g. Bachelor of Science, Master of Arts"
                />
                {errors.degreeProgram && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.degreeProgram}
                  </p>
                )}
              </div>

              {/* Major */}
              <div>
                <label
                  htmlFor="major"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Major *
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.major ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="e.g. Computer Science, Business Administration"
                />
                {errors.major && (
                  <p className="mt-1 text-sm text-red-600">{errors.major}</p>
                )}
              </div>
            </div>
          </div>

          {/* Employment Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-4">
              Employment Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Employer */}
              <div>
                <label
                  htmlFor="currentEmployer"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Employer
                </label>
                <input
                  type="text"
                  id="currentEmployer"
                  name="currentEmployer"
                  value={formData.currentEmployer}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Job Title */}
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Work Email */}
              <div>
                <label
                  htmlFor="workEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Work Email
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>

            <div>
              <label
                htmlFor="privacySettings"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Visibility *
              </label>
              <select
                id="privacySettings"
                name="privacySettings"
                value={formData.privacySettings}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="public">Public - Visible to all alumni</option>
                <option value="alumni-only">
                  Alumni Only - Visible to verified alumni
                </option>
                <option value="limited">
                  Limited - Only share basic information
                </option>
                <option value="private">
                  Private - Only visible to administrators
                </option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Select how you want your profile information to be shared with
                other alumni and the university.
              </p>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-4">
              Social Media Links (Optional)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LinkedIn */}
              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.linkedinUrl ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
                {errors.linkedinUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.linkedinUrl}
                  </p>
                )}
              </div>

              {/* Twitter/X */}
              <div>
                <label
                  htmlFor="twitterUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Twitter/X Profile
                </label>
                <input
                  type="url"
                  id="twitterUrl"
                  name="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.twitterUrl ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="https://twitter.com/yourusername"
                />
                {errors.twitterUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.twitterUrl}
                  </p>
                )}
              </div>

              {/* Facebook */}
              <div>
                <label
                  htmlFor="facebookUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Facebook Profile
                </label>
                <input
                  type="url"
                  id="facebookUrl"
                  name="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.facebookUrl ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="https://facebook.com/yourusername"
                />
                {errors.facebookUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.facebookUrl}
                  </p>
                )}
              </div>

              {/* Instagram */}
              <div>
                <label
                  htmlFor="instagramUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instagram Profile
                </label>
                <input
                  type="url"
                  id="instagramUrl"
                  name="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.instagramUrl ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="https://instagram.com/yourusername"
                />
                {errors.instagramUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.instagramUrl}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}