"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Carregando Planner Stories 10x...</h1>
        <p className="text-xl text-gray-600">
          Redirecionando para o Dashboard.
        </p>
      </div>
    </div>
  );
};

export default Index;