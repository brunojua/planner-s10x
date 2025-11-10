"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/components/SessionContextProvider"; // Import useSession

const Index = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        navigate("/dashboard"); // Redirect to dashboard if logged in
      } else {
        navigate("/login"); // Redirect to login if not logged in
      }
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">Carregando...</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Verificando sessão de usuário.</p>
        </div>
      </div>
    );
  }

  return null; // Will be redirected by useEffect
};

export default Index;