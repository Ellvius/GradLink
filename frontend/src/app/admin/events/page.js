"use client";
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Edit, Trash2, Plus } from 'lucide-react';

export default function EventsManagement() {
  // State for events
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    type: 'Career Fair',
    capacity: 50,
    registrationDeadline: new Date(),
  });

  // Mock data loading function - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          title: 'Annual Tech Career Fair',
          description: 'Connect with top tech companies offering internships and jobs.',
          location: 'University Main Hall',
          date: new Date(2025, 3, 15),
          startTime: '10:00',
          endTime: '16:00',
          type: 'Career Fair',
          capacity: 500,
          registrationDeadline: new Date(2025, 3, 10),
          registeredCount: 342
        },
        {
          id: 2,
          title: 'Resume Workshop with Industry Professionals',
          description: 'Get your resume reviewed by HR professionals from leading companies.',
          location: 'Business School, Room 203',
          date: new Date(2025, 3, 10),
          startTime: '14:00',
          endTime: '16:00',
          type: 'Workshop',
          capacity: 50,
          registrationDeadline: new Date(2025, 3, 8),
          registeredCount: 45
        },
        {
          id: 3,
          title: 'Interview Skills Masterclass',
          description: 'Learn how to ace your next interview with practical tips and mock sessions.',
          location: 'Online (Zoom)',
          date: new Date(2025, 4, 5),
          startTime: '13:00',
          endTime: '15:00',
          type: 'Workshop',
          capacity: 100,
          registrationDeadline: new Date(2025, 4, 3),
          registeredCount: 78
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === currentEvent.id ? { ...formData, id: event.id, registeredCount: event.registeredCount } : event
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        ...formData,
        id: events.length + 1,
        registeredCount: 0
      };
      setEvents([...events, newEvent]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentEvent) {
      const filteredEvents = events.filter(event => event.id !== currentEvent.id);
      setEvents(filteredEvents);
      setIsDeleteDialogOpen(false);
      setCurrentEvent(null);
    }
  };

  const openEditDialog = (event) => {
    setCurrentEvent(event);
    setFormData(event);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (event) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setCurrentEvent(null);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      type: 'Career Fair',
      capacity: 50,
      registrationDeadline: new Date(),
    });
  };

  // Filter events based on search term and selected date
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !selectedDate || 
                      (event.date.getDate() === selectedDate.getDate() &&
                       event.date.getMonth() === selectedDate.getMonth() &&
                       event.date.getFullYear() === selectedDate.getFullYear());
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <Button onClick={openAddDialog} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add New Event
        </Button>
      </div>

      <div className="flex mb-6 gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : 'Filter by date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
            {selectedDate && (
              <div className="p-2 border-t flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedDate(null)}>
                  Clear
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          No events found. {searchTerm && 'Try a different search term or '} 
          <Button variant="link" onClick={openAddDialog}>add a new event</Button>.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="pr-8">{event.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(event)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {format(event.date, 'PPP')} • {event.startTime} - {event.endTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <p className="line-clamp-3 text-sm text-gray-600">{event.description}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Location:</span> {event.location}</div>
                  <div><span className="font-medium">Type:</span> {event.type}</div>
                  <div><span className="font-medium">Capacity:</span> {event.capacity}</div>
                  <div><span className="font-medium">Registration Deadline:</span> {format(event.registrationDeadline, 'PPP')}</div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full flex justify-between items-center">
                  <span className="text-sm font-medium">Registered: {event.registeredCount}/{event.capacity}</span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>
              {currentEvent ? 'Update the event details below.' : 'Fill in the details to create a new event.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Event Title</label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows={3} 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar 
                        mode="single" 
                        selected={formData.date} 
                        onSelect={(date) => handleDateChange(date, 'date')} 
                        initialFocus 
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Registration Deadline</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.registrationDeadline ? format(formData.registrationDeadline, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar 
                        mode="single" 
                        selected={formData.registrationDeadline} 
                        onSelect={(date) => handleDateChange(date, 'registrationDeadline')} 
                        initialFocus 
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium mb-1">Start Time</label>
                  <Input 
                    id="startTime" 
                    name="startTime" 
                    type="time" 
                    value={formData.startTime} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium mb-1">End Time</label>
                  <Input 
                    id="endTime" 
                    name="endTime" 
                    type="time" 
                    value={formData.endTime} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-1">Event Type</label>
                  <select 
                    id="type" 
                    name="type" 
                    value={formData.type} 
                    onChange={handleInputChange} 
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option value="Career Fair">Career Fair</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Networking">Networking</option>
                    <option value="Info Session">Info Session</option>
                    <option value="Panel Discussion">Panel Discussion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium mb-1">Capacity</label>
                  <Input 
                    id="capacity" 
                    name="capacity" 
                    type="number" 
                    min="1"
                    value={formData.capacity} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{currentEvent ? 'Update Event' : 'Create Event'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}