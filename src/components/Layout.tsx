"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Bell,
  MessageCircle,
  User,
  Moon,
  Sun,
  Edit,
  Settings,
  LogOut,
  Home,
  Search,
  Hash,
} from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import PostModal from "@/components/ui/PostModal";
import { Input } from "@/components/ui/input";

interface LayoutProps {
  children: React.ReactNode;
  onPostCreated: (content: string) => void;
}

const NavItem = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <Link
    href={href}
    className="flex items-center p-3 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
  >
    <Icon className="w-6 h-6 mr-4" />
    <span className="text-xl hidden xl:inline">{label}</span>
  </Link>
);

const Dropdown = ({ onLogout }: { onLogout: () => void }) => (
  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-10">
    <Link
      href="/profile"
      className="flex items-center px-4 py-2 text-popover-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <User className="w-5 h-5 mr-2" /> Meu Perfil
    </Link>
    <Link
      href="/settings"
      className="flex items-center px-4 py-2 text-popover-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <Settings className="w-5 h-5 mr-2" /> Configurações
    </Link>
    <button
      onClick={onLogout}
      className="flex items-center w-full px-4 py-2 text-popover-foreground hover:bg-accent hover:text-accent-foreground text-left"
    >
      <LogOut className="w-5 h-5 mr-2" /> Sair
    </button>
  </div>
);

const Notification = ({ message }: { message: string }) => (
  <div className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-lg p-4 shadow-md">
    {message}
  </div>
);

const TrendingTopic = ({ topic, posts }: { topic: string; posts: string }) => (
  <div className="p-3 hover:bg-accent hover:text-accent-foreground transition-colors">
    <h3 className="font-bold">{topic}</h3>
    <p className="text-sm text-muted-foreground">{posts} posts</p>
  </div>
);

export default function Layout({ children, onPostCreated }: LayoutProps) {
  const { theme, toggleTheme } = useAppContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleCreatePost = (content: string) => {
    onPostCreated(content);
    setNotificationMessage("Post publicado com sucesso!");
    setModalOpen(false);
    setTimeout(() => setNotificationMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left Sidebar */}
      <aside className="w-20 xl:w-64 h-screen overflow-y-auto fixed left-0 top-0 border-r border-border">
        <div className="p-4">
          <Link
            href="/feed"
            className="flex items-center space-x-2 text-blue-500 mb-6"
          >
            <BookOpen className="w-8 h-8" />
            <span className="text-xl font-bold hidden xl:inline">
              UniConnect
            </span>
          </Link>
          <nav className="space-y-2">
            <NavItem href="/feed" icon={Home} label="Página Inicial" />
            <NavItem href="/explore" icon={Hash} label="Explorar" />
            <NavItem href="/communities" icon={Search} label="Comunidades" />
            <NavItem href="/notifications" icon={Bell} label="Notificações" />
            <NavItem href="/messages" icon={MessageCircle} label="Mensagens" />
            <NavItem href="/profile" icon={User} label="Perfil" />
          </nav>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            <Edit className="w-5 h-5 mr-2 xl:mr-0" />
            <span className="hidden xl:inline">Postar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 xl:ml-64 mr-0 lg:mr-80">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </header>
        <div className="p-4">{children}</div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 h-screen overflow-y-auto fixed right-0 top-0 border-l border-border hidden lg:block">
        <div className="p-4">
          <Input
            type="search"
            placeholder="Pesquisar no UniConnect"
            className="w-full mb-4"
          />
          <div className="bg-card rounded-lg p-4 mb-4">
            <h2 className="font-bold text-xl mb-2">Tópicos em alta</h2>
            <TrendingTopic topic="Tecnologia" posts="10.5K" />
            <TrendingTopic topic="Educação" posts="5.2K" />
            <TrendingTopic topic="Ciência" posts="3.7K" />
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span>{theme === "dark" ? "Modo Claro" : "Modo Escuro"}</span>
          </button>
          <div className="relative mt-4">
            <button
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <User className="w-5 h-5" />
              <span>Minha Conta</span>
            </button>
            {isDropdownOpen && <Dropdown onLogout={handleLogout} />}
          </div>
        </div>
      </aside>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreatePost={handleCreatePost}
        userImage="/"
      />

      {notificationMessage && <Notification message={notificationMessage} />}
    </div>
  );
}
