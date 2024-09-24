"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Users,
  MessageSquare,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <header className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-sm backdrop-blur-md fixed top-0 left-0 right-0 z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              UniConnect
            </span>
          </motion.div>
          <div className="space-x-4">
            <Link
              href="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-300"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
            >
              Cadastrar
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section className="container mx-auto px-4 py-12 md:py-20 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conecte-se e Aprenda com o UniConnect
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
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
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition duration-300 inline-flex items-center"
            >
              Comece Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </section>

        <section className="py-12 md:py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-indigo-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12"
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
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <item.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-20 text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
            {...fadeIn}
          >
            Pronto para se juntar à comunidade?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
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
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition duration-300 inline-flex items-center"
            >
              Junte-se ao UniConnect
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
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
