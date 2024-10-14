"use client";

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";

interface Post {
  id: number;
  author: string;
  username: string;
  content: string;
  likes: number;
  comments: number;
  retweets: number;
  liked: boolean;
  retweeted: boolean;
}

interface User {
  name: string;
  username: string;
  avatarUrl: string;
}

const Feed: React.FC = () => {
  // Usuário fictício
  const [user, setUser] = useState<User>({
    name: "Jean Carlo",
    username: "@jean",
    avatarUrl: "/placeholder-avatar.jpg",
  });

  // Posts fictícios
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Jane Smith",
      username: "@janesmith",
      content: "Hello world! This is my first post.",
      likes: 5,
      comments: 2,
      retweets: 1,
      liked: false,
      retweeted: false,
    },
    {
      id: 2,
      author: "Alice Johnson",
      username: "@alicej",
      content: "Just enjoying a sunny day at the park!",
      likes: 15,
      comments: 4,
      retweets: 3,
      liked: false,
      retweeted: false,
    },
  ]);

  const [notification, setNotification] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = (content: string) => {
    if (!user) return;

    const newPost = {
      id: posts.length + 1,
      author: user.name,
      username: user.username,
      content,
      likes: 0,
      comments: 0,
      retweets: 0,
      liked: false,
      retweeted: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNotification("Post published successfully!");
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleLike = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleRetweet = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              retweeted: !post.retweeted,
              retweets: post.retweeted ? post.retweets - 1 : post.retweets + 1,
            }
          : post
      )
    );
  };

  return (
    <Layout onPostCreated={handleCreatePost}>
      <div className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage
                src={user?.avatarUrl || "/placeholder-avatar.jpg"}
                alt={user?.username || "User"}
              />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <Input
                placeholder="What's happening?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="mb-2 "
              />
              <Button
                onClick={() => handleCreatePost(newPostContent)}
                disabled={!newPostContent.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Post
              </Button>
            </div>
          </div>
        </CardContent>

        {posts.map((post) => (
          <CardContent key={post.id} className="pt-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage alt={post.author} />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <span className="font-bold ">
                    {post.author}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {post.username}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">· 1h</span>
                </div>
                <p className="mt-1 mb-2 ">
                  {post.content}
                </p>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <button
                    className="flex items-center space-x-2 hover:text-blue-500"
                    aria-label="Comment"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button
                    className={`flex items-center space-x-2 hover:text-green-500 ${
                      post.retweeted ? "text-green-500" : ""
                    }`}
                    onClick={() => handleRetweet(post.id)}
                    aria-label="Retweet"
                  >
                    <Repeat className="w-5 h-5" />
                    <span>{post.retweets}</span>
                  </button>
                  <button
                    className={`flex items-center space-x-2 hover:text-red-500 ${
                      post.liked ? "text-red-500" : ""
                    }`}
                    onClick={() => handleLike(post.id)}
                    aria-label="Like"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 hover:text-blue-500"
                    aria-label="Share"
                  >
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        ))}
      </div>
      {notification && (
        <div className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-lg p-4 shadow-md">
          {notification}
        </div>
      )}
    </Layout>
  );
};

export default Feed;
