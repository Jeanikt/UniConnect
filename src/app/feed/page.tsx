"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Heart, MessageCircle, Repeat, Share, Paperclip } from "lucide-react"; // Importando o ícone de clipe
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
  timestamp: string; // Adicionando a propriedade timestamp
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
      timestamp: "2h ago", // Exemplo de timestamp
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
      timestamp: "3h ago",
    },
  ]);

  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = (content: string) => {
    if (!user || !content.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      author: user.name,
      username: user.username,
      content,
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
      retweeted: false,
      timestamp: "Just now", // Timestamp para novo post
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
            <AvatarImage src={user.avatarUrl} alt={post.author} />{" "}
            {/* Correção aqui */}
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <span className="font-bold">{post.author}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {post.username}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                · {post.timestamp} {/* Correção aqui */}
              </span>
            </div>
            <p className="mt-1 mb-2">{post.content}</p>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <button
                className="flex items-center space-x-2 hover:text-blue-500"
                aria-label="Comment"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button
                className="flex items-center space-x-2 hover:text-green-500"
                aria-label="Repost"
                onClick={() => handleRetweet(post.id)} // Chamando a função de retweet
              >
                <Repeat className="w-5 h-5" />
                <span>{post.reposts}</span>
              </button>
              <button
                className="flex items-center space-x-2 hover:text-red-500"
                aria-label="Like"
                onClick={() => handleLike(post.id)} // Chamando a função de like
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
        <CardContent className="pt-6 border rounded-lg shadow-md p-4">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="relative">
                <textarea
                  placeholder="What's happening?!"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="mb-4 w-full h-24 p-2 resize-none bg-transparent focus:outline-none"
                  rows={4}
                  maxLength={300}
                  style={{ border: "none" }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    {newPostContent.length}/300
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleCreatePost(newPostContent)}
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Publish
                    </Button>
                    <Button className="flex items-center">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
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
