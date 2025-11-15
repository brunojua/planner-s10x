"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { MadeWithDyad } from "./made-with-dyad";
import { Smartphone, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import { useSession } from "@/components/SessionContextProvider";
import { cn } from "@/lib/utils";
import { getPageTitle } from "@/lib/routes"; // Importar a função de título

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { session } = useSession();
  const userEmail = session?.user?.email;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const location = useLocation(); // Obter a localização atual
  const currentTitle = getPageTitle(location.pathname); // Obter o título da página

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      showSuccess("Você foi desconectado com sucesso!");
    } catch (error: any) {
      showError(`Erro ao sair: ${error.message}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Classes de largura condicional
  const sidebarWidthClass = isSidebarOpen ? "md:grid-cols-[280px_1fr]" : "md:grid-cols-[80px_1fr]";
  const sidebarHiddenClass = isSidebarOpen ? "" : "hidden";

  return (
    <div className={cn("grid min-h-screen w-full", sidebarWidthClass)}>
      {/* Sidebar */}
      <div className="hidden border-r bg-sidebar md:block transition-all duration-300">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Header da Sidebar */}
          <div className={cn("flex h-14 items-center border-b px-4 lg:h-[60px]", isSidebarOpen ? "lg:px-6 justify-between" : "justify-center")}>
            <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
              <Smartphone className="h-6 w-6" />
              {isSidebarOpen && <span>Planner Stories 10x</span>}
            </Link>
            
            {/* Botão de Toggle movido para o Header */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className={cn(
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isSidebarOpen ? "block" : "hidden"
              )}
            >
              <PanelLeftClose className="h-5 w-5" />
            </Button>
            
            {/* Botão de Toggle para o estado colapsado (centralizado) */}
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar} 
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <PanelLeftOpen className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Navegação */}
          <div className="flex-1">
            <SidebarNav isCollapsed={!isSidebarOpen} />
            {userEmail && (
              <div className={cn("px-4 py-2 text-xs text-sidebar-foreground opacity-80", sidebarHiddenClass)}>
                {userEmail}
              </div>
            )}
          </div>

          {/* Footer da Sidebar */}
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className={cn("w-full justify-start text-sidebar-foreground hover:text-destructive", isSidebarOpen ? "" : "justify-center")} 
              onClick={handleLogout}
            >
              <LogOut className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
              {isSidebarOpen && "Sair"}
            </Button>
          </div>
          <MadeWithDyad isCollapsed={!isSidebarOpen} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <h1 className="text-xl font-semibold">
            {currentTitle} {/* Exibe o título da página atual */}
          </h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}