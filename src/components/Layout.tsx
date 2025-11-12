"use client";

import React from "react";
import { Link } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { MadeWithDyad } from "./made-with-dyad";
import { Smartphone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import { useSession } from "@/components/SessionContextProvider"; // Importar useSession

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { session } = useSession(); // Obter a sessão do usuário
  const userEmail = session?.user?.email; // Obter o email do usuário

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      showSuccess("Você foi desconectado com sucesso!");
    } catch (error: any) {
      showError(`Erro ao sair: ${error.message}`);
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-sidebar-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-primary">
              <Smartphone className="h-6 w-6" />
              <span>Planner Stories 10x</span>
            </Link>
          </div>
          <div className="flex-1">
            <SidebarNav />
            {userEmail && ( // Renderiza o email se houver um usuário logado
              <div className="px-4 py-2 text-xs text-muted-foreground">
                {userEmail}
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
          <MadeWithDyad />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          {/* Mobile sidebar toggle can go here if needed */}
          <h1 className="text-xl font-semibold">
            {/* Dynamic title based on route */}
          </h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}