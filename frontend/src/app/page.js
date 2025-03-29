"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar/index';

const TopicPage = () => {
  // State for the topic/post
  const [topic, setTopic] = useState({
    id: '1',
    title: 'Summer 2025 Tech Internships - Application Tips & Opportunities',
    content: 'Looking for a summer internship in tech? This thread collects current opportunities and application tips from alumni who have been through the process.',
    author: 'CareerServices',
    date: 'March 25, 2025',
    tags: ['internships', 'technology', 'summer2025'],
    replies: []
  });

  // State for user reply
  const [newReply, setNewReply] = useState('');
  
  // State for replies
  const [replies, setReplies] = useState([
    {
      id: '1',
      author: 'TechAlum2022',
      content: "I got my first job through the Google STEP program. They're currently accepting applications for Summer 2025! The deadline is April 15th. Focus on your problem-solving skills in the interview.",
      date: 'March 26, 2025',
      likes: 24
    },
    {
      id: '2',
      author: 'CSMajor2025',
      content: "Has anyone had experience with startups? I'm wondering if I should focus on bigger companies or try for startups this summer.",
      date: 'March 27, 2025',
      likes: 8
    },
    {
      id: '3',
      author: 'AlumniMentor',
      content: "I've worked at both! Startups give you broader experience and more responsibility, while bigger companies offer more structure and often better pay. Happy to chat more about the differences if anyone is interested.",
      date: 'March 27, 2025',
      likes: 15
    }
  ]);

  // State for related topics
  const [relatedTopics, setRelatedTopics] = useState([
    'Resume Review Workshop - April 2nd',
    'Mock Interview Sessions - Sign Up Now',
    'Fall 2025 Recruitment Fair Companies Announced'
  ]);

  // State for active view
  const [activeView, setActiveView] = useState('discussion');

  // Handle posting a new reply
  const handlePostReply = () => {
    if (newReply.trim() === '') return; 
    
    const reply = {
      id: `${replies.length + 1}`,
      author: 'CurrentUser',
      content: newReply,
      date: 'March 29, 2025',
      likes: 0
    };
    
    setReplies([...replies, reply]);
    setNewReply('');
  };

  // Handle liking a reply
  const handleLike = (id) => {
    setReplies(replies.map(reply => 
      reply.id === id ? {...reply, likes: reply.likes + 1} : reply
    ));
  };
  return (
    <div>
      <Navbar />
      
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
        <div className="flex gap-2 mb-4">
          {topic.tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-bold">{topic.author.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{topic.author}</span>
                  <span className="text-gray-500 text-sm">{topic.date}</span>
                </div>
                <p className="mt-2">{topic.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
  
        {/* Custom tab navigation */}
        <div className="flex border-b mb-4">
          <button 
            className={`py-2 px-4 ${activeView === 'discussion' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
            onClick={() => setActiveView('discussion')}
          >
            Discussion ({replies.length})
          </button>
          <button 
            className={`py-2 px-4 ${activeView === 'related' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
            onClick={() => setActiveView('related')}
          >
            Related Topics
          </button>
        </div>
        
        {/* Discussion view */}
        {activeView === 'discussion' && (
          <div className="space-y-4">
            {replies.map(reply => (
              <Card key={reply.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold">{reply.author.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{reply.author}</span>
                        <span className="text-gray-500 text-sm">{reply.date}</span>
                      </div>
                      <p className="mt-2">{reply.content}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLike(reply.id)}
                          className="text-gray-500 hover:text-blue-600"
                        >
                          👍 {reply.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">Reply</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold">C</span>
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Share your thoughts or ask a question..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={handlePostReply}>Post Reply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Related topics view */}
        {activeView === 'related' && (
          <Card>
            <CardHeader>
              <CardTitle>Related Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {relatedTopics.map((topic, index) => (
                  <li key={index} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                    {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
  
};

export default TopicPage;