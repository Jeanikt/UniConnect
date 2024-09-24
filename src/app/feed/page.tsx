// pages/feed/index.tsx
"use client";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import PostModal from "@/components/ui/PostModal";
import { User, ThumbsUp, MessageSquare, MoreHorizontal } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface Post {
  id: number;
  author: string;
  username: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // const { language } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [replyDropdownId, setReplyDropdownId] = useState<number | null>(null);

  // const translations = {
  //   "pt-BR": {
  //     createPost: "Criar Post",
  //   },
  //   "en-US": {
  //     createPost: "Create Post",
  //   },
  // };

  // const t = translations[language];
  const [isModalOpen, setModalOpen] = useState(false);
  const userImage = "/";

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          author: "John Doe",
          username: "@john_doe",
          content: "Hello UniConnect!",
          likes: 5,
          comments: 2,
          liked: false,
        },
        {
          id: 2,
          author: "Jane Smith",
          username: "@jane_smith",
          content: "Excited to be here!",
          likes: 3,
          comments: 1,
          liked: false,
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleCreatePost = (content: string) => {
    const post = {
      id: posts.length + 1,
      author: "Current User",
      username: "@current_user",
      content,
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts([post, ...posts]);
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

  const toggleReplyDropdown = (postId: number) => {
    setReplyDropdownId(replyDropdownId === postId ? null : postId);
  };

  return (
    <Layout onPostCreated={handleCreatePost}>
      <div className="max-w-2xl mx-auto">
        {/* <button
          onClick={() => setModalOpen(true)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none"
        >
          {t.createPost}
        </button> */}

        <PostModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onCreatePost={handleCreatePost}
          userImage={userImage}
        />

        {/* {notification && (
          <div className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-lg p-4 shadow-md">
            {notification}
          </div>
        )} */}

        {loading ? (
          <>
            <SkeletonPost />
            <SkeletonPost />
          </>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6 p-6"
            >
              <div className="flex items-start mb-4">
                <User className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="font-semibold mr-2">{post.author}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {post.username}
                    </p>
                  </div>
                  <p className="mb-4 break-words">{post.content}</p>
                </div>
              </div>
              <div className="flex justify-between text-md text-gray-500 dark:text-gray-400">
                <button
                  className="flex items-center"
                  aria-label={`Comentar no post de ${post.author}`}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {post.comments}
                </button>
                <button
                  className="flex items-center"
                  onClick={() => toggleReplyDropdown(post.id)}
                  aria-label={`Responder ao post de ${post.author}`}
                >
                  <i className="fa-solid fa-reply w-4 h-4 mr-1"></i>
                </button>
                <button
                  className={`flex items-center transition-transform duration-200 ${
                    post.liked ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLike(post.id)}
                  aria-label={`Curtir post de ${post.author}`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 mr-1 transform ${
                      post.liked ? "scale-125" : "scale-100"
                    } transition-transform duration-200`}
                  />
                  {post.likes}
                </button>
                <button
                  className="flex items-center"
                  aria-label={`Mais opções para o post de ${post.author}`}
                >
                  <MoreHorizontal className="w-4 h-4 mr-1" />
                </button>
                {replyDropdownId === post.id && (
                  <div className="absolute bg-white shadow-md rounded-md p-2 mt-1">
                    <button className="block text-left w-full p-2 hover:bg-gray-100">
                      Repostar
                    </button>
                    <button className="block text-left w-full p-2 hover:bg-gray-100">
                      Citar Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

// SkeletonPost component for loading state
function SkeletonPost() {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 animate-pulse shadow rounded-lg mb-6 p-6">
      <div className="flex items-start mb-4">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
        <div className="ml-3 w-full">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
        </div>
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-5/6" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6" />
    </div>
  );
}

export default Feed; 
