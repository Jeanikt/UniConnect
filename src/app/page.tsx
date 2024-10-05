"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Users,
  MessageSquare,
  GraduationCap,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";

import { Button } from "@/components/ui/button";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const gradientAnimation = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  },
  transition: {
    duration: 10,
    ease: "linear",
    repeat: Infinity,
  },
};

export default function LandingPage() {
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({ y: scrollY * 0.5 });
  }, [scrollY, controls]);

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          backgroundImage: [
            "linear-gradient(45deg, #4f46e5, #3b82f6, #0ea5e9)",
            "linear-gradient(45deg, #0ea5e9, #3b82f6, #4f46e5)",
            "linear-gradient(45deg, #4f46e5, #3b82f6, #0ea5e9)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <header className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-sm backdrop-blur-md fixed top-0 left-0 right-0 z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo e título com animação */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              UniConnect
            </span>
          </motion.div>

          {/* Botões de navegação */}
          <div className="space-x-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Cadastrar
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 pt-20">
        <section className="container mx-auto px-4 py-12 md:py-20 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conecte-se e Aprenda com o UniConnect
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            UniConnect é a plataforma gratuita para estudantes universitários se
            conectarem, compartilharem conhecimento e crescerem juntos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            >
              <Link href="/register">
                Comece Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </section>

        <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-2xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12"
              {...fadeIn}
            >
              Sobre o UniConnect
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Comunidade Vibrante",
                  description:
                    "Conecte-se com estudantes da sua universidade e de todo o mundo.",
                },
                {
                  icon: MessageSquare,
                  title: "Discussões Enriquecedoras",
                  description:
                    "Participe de debates estimulantes e expanda seu conhecimento.",
                },
                {
                  icon: GraduationCap,
                  title: "Aprendizado Colaborativo",
                  description:
                    "Acesse recursos e ferramentas para impulsionar seu desempenho acadêmico.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-12 h-12 text-white mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-white text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-100 text-center">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          className="container mx-auto px-4 py-12 md:py-20 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(45deg, #4f46e5, #3b82f6, #0ea5e9)",
          }}
          {...gradientAnimation}
        >
          <motion.h2
            className="text-2xl md:text-4xl font-bold text-white mb-6"
            {...fadeIn}
          >
            Pronto para se juntar à comunidade?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto"
            {...fadeIn}
          >
            Cadastre-se gratuitamente e comece a se conectar com outros
            estudantes, compartilhar ideias e crescer juntos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            >
              <Link href="/register">
                Junte-se ao UniConnect
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} UniConnect. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
