"use client";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Heart,
  MessageCircle,
  Repeat,
  Share,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          author: "John Doe",
          username: "@john_doe",
          content:
            "Hello UniConnect! This is my first post on this amazing platform. I'm excited to connect with everyone here and share my thoughts and experiences. #FirstPost #UniConnect",
          likes: 5,
          comments: 2,
          retweets: 1,
          liked: false,
          retweeted: false,
        },
        {
          id: 2,
          author: "Jane Smith",
          username: "@jane_smith",
          content:
            "Just finished an incredible book on artificial intelligence and its impact on society. It's mind-blowing how fast technology is advancing! Has anyone else read any good tech books lately? #AI #TechReads",
          likes: 8,
          comments: 3,
          retweets: 2,
          liked: false,
          retweeted: false,
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleCreatePost = (content: string) => {
    const newPost = {
      id: posts.length + 1,
      author: "Current User",
      username: "@current_user",
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
                    src="/placeholder-avatar.jpg"
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
