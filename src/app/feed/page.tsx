"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/ProtectedRoute";

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

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts"); // Ajuste o endpoint conforme necessário
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (content: string) => {
    const newPost = {
      id: posts.length + 1,
      author: "Current User", // Pode ser alterado para pegar o autor atual
      username: "@current_user", // Pode ser alterado para pegar o nome de usuário atual
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
    <ProtectedRoute>
      <Layout onPostCreated={handleCreatePost}>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <Input
                  placeholder="What's happening?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={() => handleCreatePost(newPostContent)}
                  disabled={!newPostContent.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <>
              <SkeletonPost />
              <SkeletonPost />
            </>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      // src={get.avatar_url || "/placeholder-avatar.jpg"} // Substitua pelo URL do avatar real
                      alt={post.author}
                    />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{post.author}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {post.username}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        · 1h
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
              </div>
            ))
          )}
        </div>
        {notification && (
          <div className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-lg p-4 shadow-md">
            {notification}
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

function SkeletonPost() {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full" />
        <div className="flex-grow">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default Feed;
