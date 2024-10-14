"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Post {
  id: number;
  author: string;
  username: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
  liked: boolean;
  retweeted: boolean;
}

interface User {
  name: string;
  username: string;
  avatarUrl: string;
}

const Feed: React.FC = () => {
  const [user] = useState<User>({
    name: "Jean Carlo",
    username: "@jean",
    avatarUrl: "/placeholder-avatar.jpg",
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Jane Smith",
      username: "@janesmith",
      content: "Hello world! This is my first post.",
      likes: 5,
      comments: 2,
      reposts: 1,
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
      reposts: 3,
      liked: false,
      retweeted: false,
    },
  ]);

  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = (content: string) => {
    if (!user || !content.trim()) return; // Adiciona verificação para conteúdo vazio

    const newPost = {
      id: posts.length + 1,
      author: user.name,
      username: user.username,
      content,
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
      retweeted: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

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
              reposts: post.retweeted ? post.reposts - 1 : post.reposts + 1,
            }
          : post
      )
    );
  };

  const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={post.author} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <span className="font-bold">{post.author}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {post.username}
              </span>
            </div>
            <p className="mt-1 mb-2">{post.content}</p>
            <div className="flex flex-col md:flex-row justify-between text-gray-500 dark:text-gray-400">
              <button
                className="flex items-center space-x-2 hover:text-blue-500"
                aria-label="Comment"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button
                className={`flex items-center space-x-2 ${
                  post.retweeted ? "text-green-500" : "hover:text-green-500"
                }`}
                aria-label="Repost"
                onClick={() => handleRetweet(post.id)}
              >
                <Repeat className="w-5 h-5" />
                <span>{post.reposts}</span>
              </button>
              <button
                className={`flex items-center space-x-2 ${
                  post.liked ? "text-red-500" : "hover:text-red-500"
                }`}
                aria-label="Like"
                onClick={() => handleLike(post.id)}
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
    </Card>
  );

  return (
    <Layout onPostCreated={handleCreatePost}>
      <div className="max-w-2xl mx-auto px-4">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <Input
                placeholder="What's happening?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="mb-4"
              />
              <Button
                onClick={() => handleCreatePost(newPostContent)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Publish
              </Button>
            </div>
          </div>
        </CardContent>

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Feed;
