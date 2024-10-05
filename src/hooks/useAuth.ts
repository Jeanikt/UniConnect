import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  is_admin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Pegar o token do localStorage ou cookies
        const token = localStorage.getItem("authToken");

        if (!token) {
          setLoading(false);
          setUser(null);
          return;
        }

        // Verifica a autenticação enviando o token no cabeçalho
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify?token=${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Você também pode incluir o token nos headers, caso o backend aceite assim
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.message === "Token is valid") {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  return { user, loading };
}
