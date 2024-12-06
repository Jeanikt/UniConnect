"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Onest } from "next/font/google";

const onest = Onest({ subsets: ["latin"] });

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/feed";

  const handleGitHubLogin = () => {
    signIn("github", { callbackUrl });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-indigo-600 dark:from-gray-900 dark:to-indigo-900 p-4 ${onest.className}`}
    >
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Link href="/">
                  <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </Link>
              </motion.div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Bem-vindo ao UniConnect
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-center mb-6">
              Faça login com sua conta do GitHub para começar a conectar-se com
              outros estudantes.
            </p>
            <Button
              onClick={handleGitHubLogin}
              className="w-full bg-gray-800 hover:bg-gray-700"
            >
              <Github className="mr-2 h-5 w-5" /> Entrar com GitHub
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
