// src/app/auth/page.tsx

"use client"; // Indica que este é um Client Component

import React, { useEffect } from "react"; // Adicione a importação do React
import { useRouter, useSearchParams } from "next/navigation";

const AuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Obtenha os parâmetros da query string

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token"); // Extraia o token usando searchParams

      if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verify-magic-link`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (response.ok) {
          // Redirecione para a rota feed se a verificação for bem-sucedida
          router.push("/feed");
        } else {
          // Lide com a falha na verificação (exibir mensagem ou redirecionar)
          console.error("Token inválido ou expirado.");
        }
      }
    };

    verifyToken();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <p className="text-lg">Verificando o seu link...</p>
    </div>
  );
};

// Componente principal que envolve o conteúdo com Suspense
const AuthCallback = () => {
  return (
    <React.Suspense fallback={<p>Carregando...</p>}>
      <AuthCallbackContent />
    </React.Suspense>
  );
};

export default AuthCallback;
