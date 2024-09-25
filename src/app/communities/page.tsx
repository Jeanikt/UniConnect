"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import { useAppContext } from "../../contexts/AppContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  author: string;
  username: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
}
export default function Communities() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { language } = useAppContext();
  const [communities, setCommunities] = useState([
    { id: 1, name: "Computer Science 101", members: 120 },
    { id: 2, name: "Data Structures", members: 85 },
    { id: 3, name: "Algorithms", members: 95 },
    { id: 4, name: "Web Development", members: 150 },
  ]);

  const translations = {
    "pt-BR": {
      communities: "Comunidades",
      members: "membros",
      join: "Participar",
      createCommunity: "Criar Comunidade",
      communityName: "Nome da Comunidade",
      create: "Criar",
    },
    "en-US": {
      communities: "Communities",
      members: "members",
      join: "Join",
      createCommunity: "Create Community",
      communityName: "Community Name",
      create: "Create",
    },
  };

  const t = translations[language];

  const [newCommunity, setNewCommunity] = useState("");

  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommunity.trim()) {
      const community = {
        id: communities.length + 1,
        name: newCommunity,
        members: 1,
      };
      setCommunities([...communities, community]);
      setNewCommunity("");
    }
  };
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

  return (
    <Layout onPostCreated={handleCreatePost}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t.communities}</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{community.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {community.members} {t.members}
              </p>
              <Link
                href={`/communities/${community.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {t.join}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t.createCommunity}</h2>
          <form onSubmit={handleCreateCommunity} className="flex items-center">
            <input
              type="text"
              value={newCommunity}
              onChange={(e) => setNewCommunity(e.target.value)}
              placeholder={t.communityName}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t.create}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
