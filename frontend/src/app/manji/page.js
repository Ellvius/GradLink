"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function ManageJobsPage() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    status: 'open',
    description: '',
    requirements: '',
    salary: '',
    deadline: '',
  });

  // Mock data - replace with API call in production
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setJobs([
        { id: 1, title: 'Software Engineer', company: 'Tech Solutions Inc.', location: 'New York, NY', type: 'full-time', status: 'open', postDate: '2024-03-01', deadline: '2024-04-15', applications: 42 },
        { id: 2, title: 'Data Analyst', company: 'Analytics Co', location: 'Remote', type: 'full-time', status: 'open', postDate: '2024-02-15', deadline: '2024-04-10', applications: 28 },
        { id: 3, title: 'UX Designer', company: 'Creative Digital', location: 'San Francisco, CA', type: 'part-time', status: 'closed', postDate: '2024-01-12', deadline: '2024-02-12', applications: 35 },
        { id: 4, title: 'Marketing Specialist', company: 'Brand Builders', location: 'Chicago, IL', type: 'full-time', status: 'open', postDate: '2024-03-10', deadline: '2024-04-30', applications: 19 },
      ]);
      
      setInternships([
        { id: 1, title: 'Software Developer Intern', company: 'Tech Solutions Inc.', location: 'New York, NY', type: 'summer', status: 'open', postDate: '2024-02-01', deadline: '2024-04-01', applications: 67 },
        { id: 2, title: 'Data Science Intern', company: 'Analytics Co', location: 'Remote', type: 'spring', status: 'open', postDate: '2024-01-15', deadline: '2024-03-01', applications: 53 },
        { id: 3, title: 'Design Intern', company: 'Creative Digital', location: 'San Francisco, CA', type: 'fall', status: 'closed', postDate: '2023-08-10', deadline: '2023-09-15', applications: 42 },
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle create new job/internship
  const handleCreateNew = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      type: activeTab === 'jobs' ? 'full-time' : 'summer',
      status: 'open',
      description: '',
      requirements: '',
      salary: '',
      deadline: '',
    });
    setSelectedItem(null);
    setIsCreateDialogOpen(true);
  };

  // Handle edit job/internship
  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      company: item.company,
      location: item.location,
      type: item.type,
      status: item.status,
      description: item.description || '',
      requirements: item.requirements || '',
      salary: item.salary || '',
      deadline: item.deadline,
    });
    setIsCreateDialogOpen(true);
  };

  // Handle save form
  const handleSaveForm = () => {
    const newItem = {
      id: selectedItem ? selectedItem.id : Math.floor(Math.random() * 1000),
      ...formData,
      postDate: selectedItem ? selectedItem.postDate : new Date().toISOString().split('T')[0],
      applications: selectedItem ? selectedItem.applications : 0,
    };

    if (activeTab === 'jobs') {
      if (selectedItem) {
        setJobs(jobs.map(job => job.id === selectedItem.id ? newItem : job));
      } else {
        setJobs([...jobs, newItem]);
      }
    } else {
      if (selectedItem) {
        setInternships(internships.map(internship => internship.id === selectedItem.id ? newItem : internship));
      } else {
        setInternships([...internships, newItem]);
      }
    }
    
    setIsCreateDialogOpen(false);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      if (activeTab === 'jobs') {
        setJobs(jobs.filter(job => job.id !== id));
      } else {
        setInternships(internships.filter(internship => internship.id !== id));
      }
    }
  };

  // Filter items based on search
  const filteredItems = (activeTab === 'jobs' ? jobs : internships).filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Manage Jobs & Internships</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="internships">Internships</TabsTrigger>
              </TabsList>
              <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                <Input
                  placeholder="Search listings"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64"
                />
                <Button onClick={handleCreateNew}>
                  {activeTab === 'jobs' ? 'Add New Job' : 'Add New Internship'}
                </Button>
              </div>
            </div>

            <TabsContent value="jobs" className="mt-0">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <p>Loading jobs...</p>
                </div>
              ) : (
                <JobsTable 
                  jobs={filteredItems} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="internships" className="mt-0">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <p>Loading internships...</p>
                </div>
              ) : (
                <InternshipsTable 
                  internships={filteredItems} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedItem 
                ? `Edit ${activeTab === 'jobs' ? 'Job' : 'Internship'}` 
                : `Create New ${activeTab === 'jobs' ? 'Job' : 'Internship'}`}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to {selectedItem ? 'update' : 'create'} this listing.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Input 
                value={formData.company} 
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activeTab === 'jobs' ? (
                    <>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="year-round">Year-round</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline</label>
              <Input 
                type="date"
                value={formData.deadline} 
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Salary/Compensation</label>
              <Input 
                value={formData.salary} 
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                placeholder="e.g., $60,000-$80,000 or $20/hour"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Requirements</label>
              <Textarea 
                value={formData.requirements} 
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveForm}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Jobs Table Component
function JobsTable({ jobs, onEdit, onDelete }) {
  return (
    <>
      {jobs.length === 0 ? (
        <div className="text-center py-8">
          <p>No jobs found matching your search.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {job.type.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={job.status === 'open' ? 'success' : 'secondary'}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(job.postDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                <TableCell>{job.applications}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(job)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(job.id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

// Internships Table Component
function InternshipsTable({ internships, onEdit, onDelete }) {
  return (
    <>
      {internships.length === 0 ? (
        <div className="text-center py-8">
          <p>No internships found matching your search.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {internships.map((internship) => (
              <TableRow key={internship.id}>
                <TableCell className="font-medium">{internship.title}</TableCell>
                <TableCell>{internship.company}</TableCell>
                <TableCell>{internship.location}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {internship.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={internship.status === 'open' ? 'success' : 'secondary'}>
                    {internship.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(internship.postDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(internship.deadline).toLocaleDateString()}</TableCell>
                <TableCell>{internship.applications}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(internship)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(internship.id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}