"use client";
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, GraduationCap, ChevronDown, ChevronUp, X } from 'lucide-react';
import Footer from '@/components/footer';
const AlumniSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [graduationYearFilter, setGraduationYearFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // Sample alumni data
  const alumniData = [
    {
      id: 1,
      name: 'Alex Johnson',
      gradYear: 2018,
      major: 'Computer Science',
      industry: 'Technology',
      company: 'Google',
      position: 'Software Engineer',
      location: 'San Francisco, CA',
      profileImg: '/api/placeholder/100/100',
      bio: 'Full-stack developer with expertise in React and Node.js. Passionate about creating user-friendly applications and mentoring new developers.',
      skills: ['JavaScript', 'React', 'Node.js', 'Cloud Computing', 'System Design'],
      openToMentoring: true
    },
    {
      id: 2,
      name: 'Sarah Miller',
      gradYear: 2020,
      major: 'Business Administration',
      industry: 'Finance',
      company: 'Morgan Stanley',
      position: 'Investment Analyst',
      location: 'New York, NY',
      profileImg: '/api/placeholder/100/100',
      bio: 'Investment professional focused on emerging markets. Completed MBA in 2022. Previously worked in consulting.',
      skills: ['Financial Analysis', 'Investment Management', 'Market Research', 'Strategic Planning'],
      openToMentoring: true
    },
    {
      id: 3,
      name: 'David Chen',
      gradYear: 2015,
      major: 'Biomedical Engineering',
      industry: 'Healthcare',
      company: 'Johnson & Johnson',
      position: 'Product Manager',
      location: 'Boston, MA',
      profileImg: '/api/placeholder/100/100',
      bio: 'Product manager with background in biomedical engineering. Working on innovative medical devices and healthcare technology solutions.',
      skills: ['Product Management', 'Medical Devices', 'Regulatory Compliance', 'R&D'],
      openToMentoring: false
    },
    {
      id: 4,
      name: 'Priya Patel',
      gradYear: 2019,
      major: 'Marketing',
      industry: 'Media',
      company: 'Netflix',
      position: 'Marketing Strategist',
      location: 'Los Angeles, CA',
      profileImg: '/api/placeholder/100/100',
      bio: 'Digital marketing specialist with focus on content strategy and audience engagement. Previously at Disney and Meta.',
      skills: ['Digital Marketing', 'Content Strategy', 'Brand Development', 'Analytics'],
      openToMentoring: true
    }
  ];

  const industries = ['Technology', 'Finance', 'Healthcare', 'Media', 'Education', 'Manufacturing'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Boston, MA', 'Los Angeles, CA', 'Chicago, IL', 'Seattle, WA'];
  const graduationYears = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

  // Filter alumni based on search and filters
  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = searchTerm === '' || 
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = industryFilter === '' || alumni.industry === industryFilter;
    const matchesLocation = locationFilter === '' || alumni.location === locationFilter;
    const matchesGradYear = graduationYearFilter === '' || alumni.gradYear.toString() === graduationYearFilter;
    
    return matchesSearch && matchesIndustry && matchesLocation && matchesGradYear;
  });

  const resetFilters = () => {
    setIndustryFilter('');
    setLocationFilter('');
    setGraduationYearFilter('');
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Find Alumni</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search alumni by name, company, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filters Toggle */}
        <div className="mb-6">
          <button 
            className="flex items-center bg-gray-100 px-4 py-2 rounded text-gray-700 hover:bg-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
          </button>
          
          {/* Filters Container */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded mt-2">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Industry Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">All Industries</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                {/* Graduation Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                  <select
                    value={graduationYearFilter}
                    onChange={(e) => setGraduationYearFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">All Years</option>
                    {graduationYears.map(year => (
                      <option key={year} value={year.toString()}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <button 
                onClick={resetFilters}
                className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
              >
                <X className="h-4 w-4 mr-1" /> Reset Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Found {filteredAlumni.length} alumni
        </div>
        
        {/* Alumni List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map(alumni => (
            <div 
              key={alumni.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedAlumni(alumni)}
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <img 
                    src={alumni.profileImg} 
                    alt={alumni.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{alumni.name}</h3>
                    <p className="text-blue-600">{alumni.position}</p>
                    <p className="text-gray-600">{alumni.company}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{alumni.industry}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{alumni.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>{alumni.major}, Class of {alumni.gradYear}</span>
                  </div>
                </div>
                
                {alumni.openToMentoring && (
                  <div className="mt-4">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Open to Mentoring
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* No Results */}
        {filteredAlumni.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded">
            <p className="text-gray-700 text-lg mb-4">No alumni match your search criteria</p>
            <button 
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Alumni Detail Modal */}
        {selectedAlumni && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <img 
                      src={selectedAlumni.profileImg} 
                      alt={selectedAlumni.name} 
                      className="w-20 h-20 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedAlumni.name}</h2>
                      <p className="text-blue-600">{selectedAlumni.position} at {selectedAlumni.company}</p>
                      <p className="text-gray-600">{selectedAlumni.location}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAlumni(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{selectedAlumni.bio}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <p className="text-gray-700">{selectedAlumni.major}, Class of {selectedAlumni.gradYear}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlumni.skills.map(skill => (
                      <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 space-x-4">
                  {selectedAlumni.openToMentoring && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      Request Mentorship
                    </button>
                  )}
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AlumniSearchPage;