"use client";
import { login } from "./actions";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Onest } from "next/font/google"; // Importando a fonte Onest

const onest = Onest({ subsets: ["latin"] }); // Inicializando a fonte

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function LoginPage() {
  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Previne o envio padrão do formulário
    const form = event.currentTarget.form; // Captura o formulário

    if (form) {
      // Verifica se o formulário não é nulo
      const formData = new FormData(form); // Captura os dados do formulário
      await login(formData); // Chama a função de login com os dados do formulário
    } else {
      console.error("Formulário não encontrado.");
    }
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
              Bem-vindo de volta!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Digite seu email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Digite sua senha"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" // Checkbox com bordas arredondadas
                    title="Remember me" // Adiciona o atributo title para acessibilidade
                  />
                  <Label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Lembrar de mim
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-blue -600 hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button
                type="submit"
                onClick={handleLogin}
                className="w-full mt-4"
              >
                Entrar <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
