"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function JobDetails() {
  const { jobId } = useParams(); 
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Access localStorage safely
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token && jobId) {
      axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => setJob(res.data))
        .catch((err) => console.error("Error fetching job:", err));

      axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [token, jobId]);

  const handleApply = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/jobs/${jobId}/apply`,{}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response?.message);
      alert("Application submitted!");
    } catch (err) {
      console.error("Error applying:", err);
    }
  };

  if (!job) return <p className="text-center text-gray-600 mt-10">Loading job details...</p>;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
  <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-10">

    <h1 className="text-5xl font-extrabold text-blue-700 mb-6">{job.jobTitle}</h1>

    {/* Job Info */}
    <div className="border-b border-gray-300 pb-6 mb-6 flex justify-between">
      <div>
        <p className="text-2xl font-semibold">{job.companyName}</p>
        <p className="text-lg text-gray-600">{job.location}</p>
      </div>
      <div className="flex justify-end mb-6">
        <span className="text-xl font-medium bg-blue-500 text-white px-4 py-2 rounded-full shadow-md">
          {job.jobType}
        </span>
      </div>
    </div>
    

    {/* Expiration Date */}
    <div className="bg-red-100 text-red-700 text-2xl font-bold p-4 rounded-md text-center mb-8">
      Expires on: {new Date(job.expirationDate).toLocaleDateString()}
    </div>

    {/* Job Type - Styled as a Tag */}
    

    {/* Job Description */}
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">Job Description</h3>
        <p className="text-lg text-gray-700 leading-relaxed">{job.description}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800">Requirements</h3>
        <p className="text-lg text-gray-700 leading-relaxed">{job.requirements}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800">Application Link</h3>
        <a href={job.applicationLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          {job.applicationLink}
      </a>
      </div>
    </div>


    {/* Edit & Delete for Job Poster */}
    {user && user.id === job.postedBy && (
      <div className="mt-8 flex justify-center space-x-4">
        <button onClick={() => router.push(`/jobs/edit/${jobId}`)}
          className="bg-yellow-500 text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-yellow-600 transition">
          Edit
        </button>
      </div>
    )}

    {/* Apply Button for Students */}
    {user && user.role === "student" && (
      <button onClick={handleApply} 
        className="mt-6 w-full bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition">
        Apply
      </button>
    )}
  </div>
</div>

    <Footer />
    </>
  );
}
