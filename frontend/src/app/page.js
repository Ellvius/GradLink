"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar/index";
import Footer from "@/components/footer";

const TopicPage = () => {
  const router = useRouter();
  const [activeView, setActiveView] = useState("discussion");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  // State for the topic
  const topic = {
    id: "1",
    title: "Summer 2025 Tech Internships - Application Tips & Opportunities",
    content:
      "Looking for a summer internship in tech? This thread collects current opportunities and application tips from alumni who have been through the process.",
    author: "CareerServices",
    date: "March 25, 2025",
    tags: ["internships", "technology", "summer2025"],
  };

  // State for user replies
  // const [newReply, setNewReply] = useState("");
  const replies = [
    {
      id: "1",
      author: "TechAlum2022",
      content:
        "I got my first job through the Google STEP program. They're currently accepting applications for Summer 2025! The deadline is April 15th. Focus on your problem-solving skills in the interview.",
      date: "March 26, 2025",
      likes: 24,
    },
    {
      id: "2",
      author: "CSMajor2025",
      content:
        "Has anyone had experience with startups? I'm wondering if I should focus on bigger companies or try for startups this summer.",
      date: "March 27, 2025",
      likes: 8,
    },
    {
      id: "3",
      author: "AlumniMentor",
      content:
        "I've worked at both! Startups give you broader experience and more responsibility, while bigger companies offer more structure and often better pay. Happy to chat more about the differences if anyone is interested.",
      date: "March 27, 2025",
      likes: 15,
    },
  ];

  // // State for related topics
  const relatedTopics = [
    "Resume Review Workshop - April 2nd",
    "Mock Interview Sessions - Sign Up Now",
    "Fall 2025 Recruitment Fair Companies Announced",
  ];

  // // State for active view

  // // Handle posting a new reply
  // const handlePostReply = () => {
  //   if (newReply.trim() === "") return;

  //   const reply = {
  //     id: `${replies.length + 1}`,
  //     author: "CurrentUser",
  //     content: newReply,
  //     date: new Date().toLocaleDateString(),
  //     likes: 0,
  //   };

  //   setReplies([...replies, reply]);
  //   setNewReply("");
  // };

  // // Handle liking a reply
  // const handleLike = (id) => {
  //   setReplies(
  //     replies.map((reply) =>
  //       reply.id === id ? { ...reply, likes: reply.likes + 1 } : reply
  //     )
  //   );
  // };

  return (
    <div>
      <Navbar />
      <button onClick={()=>{console.log("logout");
        localStorage.clear();
        }} className="bg-blue-600">logout</button>
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
        <div className="flex gap-2 mb-4">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
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

        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 ${
              activeView === "discussion" ?
               "border-b-2 border-blue-500 font-semibold" 
               : "text-gray-500"
            }`}
            onClick={() => setActiveView("discussion")}
          >
            Discussion ({replies.length})
          </button>
          <button
            className={`py-2 px-4 ${
              activeView === "related" ? 
              "border-b-2 border-blue-500 font-semibold" 
              : "text-gray-500"
            }`}
            onClick={() => setActiveView("related")}
          >
            Related Topics
          </button>
        </div>

        {activeView === "discussion" && (
          <div className="space-y-4">
            {replies.map((reply) => (
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
                        <Button variant="ghost" size="sm" onClick={() => handleLike(reply.id)} className="text-gray-500 hover:text-blue-600">
                          👍 {reply.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Input
                    placeholder="Share your thoughts or ask a question..."
                    // value={newReply}
                    // onChange={(e) => setNewReply(e.target.value)}
                    className="mb-2"
                  />
                  {/* <Button onClick={handlePostReply}>Post Reply</Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === "related" && (
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
      <Footer />
    </div>
  );
};

export default TopicPage;
