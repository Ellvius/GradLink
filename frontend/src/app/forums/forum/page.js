"use client"

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, ChevronRight, ThumbsUp, Flag, Share, Bookmark, MoreHorizontal, Send } from 'lucide-react';
import Footer from '@/components/footer';
export default function TopicDiscussion() {
  const [replyContent, setReplyContent] = useState('');
  
  // This would typically come from a database or API
  const topic = {
    id: 1,
    title: 'Microsoft Summer 2025 Internship Application Thread',
    category: 'Internship Opportunities',
    createdAt: 'March 26, 2025',
    author: {
      name: 'techstudent22',
      avatar: '/api/placeholder/40/40',
      posts: 156,
      joinedDate: 'Sep 2023'
    },
    content: `
      I just saw that Microsoft opened applications for their Summer 2025 internship program. I thought it would be helpful to create a thread where we can share tips, experiences, and support each other through the application process.
      
      The application deadline is April 30, 2025, and they're looking for students in Computer Science, Software Engineering, and related fields.
      
      Has anyone applied for Microsoft internships before? Any advice on the interview process?
    `,
    tags: ['Microsoft', 'Internship', 'Summer 2025', 'Tech'],
    replies: 34,
    views: 458
  };
  
  const replies = [
    {
      id: 1,
      author: {
        name: 'alumnidev',
        avatar: '/api/placeholder/40/40',
        posts: 342,
        joinedDate: 'Mar 2022'
      },
      content: `
        I interned at Microsoft last summer. The interview process had 4 stages:

        1. Online assessment with coding problems
        2. First-round technical interview (data structures, algorithms)
        3. Second-round technical interview (system design)
        4. Final behavioral interview

        Make sure you practice LeetCode problems - especially medium difficulty ones. They focus a lot on problem-solving skills.

        Good luck everyone!
      `,
      createdAt: 'March 26, 2025',
      likes: 27,
      isLiked: false
    },
    {
      id: 2,
      author: {
        name: 'csgrad25',
        avatar: '/api/placeholder/40/40',
        posts: 87,
        joinedDate: 'Jan 2024'
      },
      content: `
        Thanks for starting this thread! I've just submitted my application.
        
        Does anyone know which teams are hiring interns this year? I'm particularly interested in their AI division or Azure cloud.
        
        Also, how long did it take for people to hear back after applying?
      `,
      createdAt: 'March 27, 2025',
      likes: 8,
      isLiked: false
    },
    {
      id: 3,
      author: {
        name: 'techstudent22',
        avatar: '/api/placeholder/40/40',
        posts: 156,
        joinedDate: 'Sep 2023'
      },
      content: `
        @alumnidev Thanks for sharing your experience! That's really helpful.
        
        I've started practicing LeetCode problems. Does anyone have any specific suggestions for system design resources to prepare for the interviews?
      `,
      createdAt: 'March 27, 2025',
      likes: 12,
      isLiked: false
    }
  ];

  const toggleLike = (replyId) => {
    // In a real app, this would update the state and make an API call
    console.log(`Toggle like for reply ${replyId}`);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    
    if (!replyContent.trim()) return;
    
    // In a real app, this would submit the reply to an API
    console.log('Submitting reply:', replyContent);
    setReplyContent('');
  };

  return (
    <div>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/forums" className="text-gray-500 hover:text-gray-700">Forums</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link href={`/forums/categories/${topic.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-gray-700">
          {topic.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="font-medium text-gray-800 truncate max-w-xs">{topic.title}</span>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">{topic.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2">
            <span>Posted in <Link href={`/forums/categories/${topic.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:text-blue-800">{topic.category}</Link></span>
            <span className="mx-2">•</span>
            <span>{topic.createdAt}</span>
            <span className="mx-2">•</span>
            <span>{topic.replies} replies</span>
            <span className="mx-2">•</span>
            <span>{topic.views} views</span>
          </div>
        </div>
        
        <div className="p-6 flex">
          <div className="mr-4 flex flex-col items-center">
            <img src={topic.author.avatar} alt={topic.author.name} className="w-10 h-10 rounded-full" />
            <div className="text-sm mt-2">
              <Link href={`/profile/${topic.author.name}`} className="font-medium text-blue-600 hover:text-blue-800">{topic.author.name}</Link>
              <div className="text-xs text-gray-500 mt-1">
                <div>{topic.author.posts} posts</div>
                <div>Joined {topic.author.joinedDate}</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="prose max-w-none">
              {topic.content.split('\n').map((paragraph, i) => (
                paragraph.trim() ? <p key={i} className="my-2">{paragraph}</p> : <br key={i} />
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {topic.tags.map((tag) => (
                <Link key={tag} href={`/forums/tags/${tag.toLowerCase()}`} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full hover:bg-gray-200">
                  {tag}
                </Link>
              ))}
            </div>
            
            <div className="mt-6 flex items-center space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <ThumbsUp className="h-4 w-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <Bookmark className="h-4 w-4" />
                <span>Bookmark</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <Flag className="h-4 w-4" />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Replies ({replies.length})</h2>
        
        <div className="space-y-6">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 flex">
                <div className="mr-4 flex flex-col items-center">
                  <img src={reply.author.avatar} alt={reply.author.name} className="w-10 h-10 rounded-full" />
                  <div className="text-sm mt-2">
                    <Link href={`/profile/${reply.author.name}`} className="font-medium text-blue-600 hover:text-blue-800">{reply.author.name}</Link>
                    <div className="text-xs text-gray-500 mt-1">
                      <div>{reply.author.posts} posts</div>
                      <div>Joined {reply.author.joinedDate}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{reply.createdAt}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="prose max-w-none">
                    {reply.content.split('\n').map((paragraph, i) => (
                      paragraph.trim() ? <p key={i} className="my-2">{paragraph}</p> : <br key={i} />
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-4 text-gray-500">
                    <button 
                      className={`flex items-center space-x-1 ${reply.isLiked ? 'text-blue-600' : 'hover:text-blue-600'}`}
                      onClick={() => toggleLike(reply.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{reply.likes} {reply.likes === 1 ? 'like' : 'likes'}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <MessageSquare className="h-4 w-4" />
                      <span>Quote</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <Flag className="h-4 w-4" />
                      <span>Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a Reply</h2>
          
          <form onSubmit={handleSubmitReply}>
            <textarea
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
              placeholder="Write your reply here..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={!replyContent.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Send className="mr-2 h-4 w-4" />
                Post Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />  
    </div>
  );
}