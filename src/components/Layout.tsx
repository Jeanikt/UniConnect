import React, { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import PostModal from "@/components/ui/PostModal";
import { useRouter } from "next/navigation"; // Importa o useRouter para redirecionar

interface LayoutProps {
  children: React.ReactNode;
  onPostCreated: (content: string) => void; // Função para lidar com a criação do post
}

const Dropdown = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
      <Link
        href="/profile"
        className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <User className="w-5 h-5 mr-2" /> Meu Perfil
      </Link>
      <Link
        href="/settings"
        className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Settings className="w-5 h-5 mr-2" /> Configurações
      </Link>
      <button
        onClick={onLogout}
        className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
      >
        <LogOut className="w-5 h-5 mr-2" /> Sair
      </button>
    </div>
  );
};

const Notification = ({ message }: { message: string }) => {
  return (
    <div className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-lg p-4 shadow-md">
      {message}
    </div>
  );
};

export default function Layout({ children, onPostCreated }: LayoutProps) {
  const { theme, toggleTheme } = useAppContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const router = useRouter(); // Inicializa o router

  const handleCreatePost = (content: string) => {
    onPostCreated(content); // Chama a função passada
    setNotificationMessage("Post publicado com sucesso!");
    setModalOpen(false);
    // Limpar a mensagem após um tempo
    setTimeout(() => setNotificationMessage(""), 3000);
  };

  const handleLogout = () => {
    // Implementar a lógica de logout aqui, por exemplo, limpar o token do localStorage
    localStorage.removeItem("userToken"); // Exemplo de remoção do token
    router.push("/"); // Redireciona para a página inicial
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark" ? "dark" : ""
      } bg-gray-100 dark:bg-gray-900`}
    >
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
          <Link
            href="/feed"
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2 sm:mb-0"
          >
            <BookOpen className="w-8 h-8" />
            <span className="text-xl font-bold">UniConnect</span>
          </Link>
          <nav className="hidden sm:flex items-center space-x-4">
            <Link
              href="/feed"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Feed
            </Link>
            <Link
              href="/communities"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Comunidades
            </Link>
            <Link
              href="/messages"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Mensagens
            </Link>
          </nav>
          <div className="relative flex items-center space-x-4">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none"
            >
              <Edit className="w-5 h-5 mr-2" />
              Postar
            </button>
            <PostModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onCreatePost={handleCreatePost}
              userImage="/"
            />

            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              title={
                theme === "dark"
                  ? "Mudar para tema claro"
                  : "Mudar para tema escuro"
              }
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              title="Notificações"
            >
              <Bell className="w-6 h-6" />
            </button>
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              title="Mensagens"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button
              className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              title="Perfil"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <User className="w-6 h-6" />
              {isDropdownOpen && <Dropdown onLogout={handleLogout} />}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-4 text-gray-900 dark:text-gray-100">
        {children}
      </main>
      {notificationMessage && <Notification message={notificationMessage} />}
      <footer className="bg-transparent dark:bg-transparent border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} UniConnect. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
