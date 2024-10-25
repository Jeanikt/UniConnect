"use client";

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
import background_img from "./img/background.jpg";
import { Onest } from "next/font/google"; // Importando a fonte Onest
import Image from "next/image";

const onest = Onest({ subsets: ["latin"] }); // Inicializando a fonte

const text = "Conecte-se e Aprenda com o UniConnect!";

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

  // Animação de zoom out
  const zoomOut = {
    initial: { scale: 1.05 }, // Escala inicial para 1.05
    animate: { scale: 1 }, // Retorna para 1
    transition: { duration: 1 }, // Duração da animação
  };

  return (
    <div className="flex flex-col h-screen">
      <motion.div
        {...zoomOut}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <Image
          src={background_img}
          alt="Background"
          layout="fill" // Mantenha como fill para cobrir todo o espaço
          objectFit="cover" // Certifique-se de que a imagem cubra todo o contêiner
          quality={100}
          priority
          className="transition-transform duration-1000 ease-in-out"
        />
      </motion.div>

      <header className="bg-[#121212] bg-opacity-90 shadow-md backdrop-blur-md fixed top-0 left-0 right-0 z-20">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">UniConnect</span>
          </motion.div>

          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:underline">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-transform transform hover:scale-105">
                Cadastrar
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 flex-grow pt-16 overflow-hidden">
        {" "}
        {/* Adicionado padding-top para evitar sobreposição do header */}
        <section className="container mx-auto px-4 py-12 text-center">
          <motion.h1
            className={`text-4xl md:text-6xl font-bold text-white mb-6 ${onest.className}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {text}
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
              className="bg-white text-blue-600 hover:bg-gray-100 transition-transform transform hover:scale-105"
            >
              <Link href="/register">
                Comece Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white/10 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-80 p-8">
              <motion.h2
                className="text-2xl md:text-4xl font-bold text-center text-gray-200 mb-8 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
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
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, y: 20 }}
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
          </div>
        </section>
      </main>

      <footer className="bg-[#121212] opacity-90 py-4">
        <div className="container mx-auto text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} UniConnect. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
