"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import { useAppContext } from "../../contexts/AppContext";
import { User, Send } from "lucide-react";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
}
interface Post {
  id: number;
  author: string;
  username: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
}
export default function Messages() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { language } = useAppContext();
  const [conversations] = useState<Conversation[]>([
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Did you finish the assignment?",
    },
  ]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const translations = {
    "pt-BR": {
      messages: "Mensagens",
      typeMessage: "Digite sua mensagem...",
      send: "Enviar",
    },
    "en-US": {
      messages: "Messages",
      typeMessage: "Type your message...",
      send: "Send",
    },
  };

  const t = translations[language];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      // Here you would typically send the message to your backend
      console.log(
        `Sending message to ${selectedConversation.name}: ${newMessage}`
      );
      setNewMessage("");
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t.messages}</h1>
        <div className="flex h-[600px] bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedConversation?.id === conversation.id
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center">
                  <User className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                  <div className="ml-3">
                    <h3 className="font-semibold">{conversation.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold">
                    {selectedConversation.name}
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Message history would go here */}
                </div>
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t.typeMessage}
                      className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Send className="w-5 h-5" />
                      <span className="sr-only">{t.send}</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
