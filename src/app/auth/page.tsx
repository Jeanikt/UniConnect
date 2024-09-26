// pages/auth/callback.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const { token } = router.query; // Extraia o token da query string

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
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <p className="text-lg">Verificando o seu link...</p>
    </div>
  );
};

export default AuthCallback;
