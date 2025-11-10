"use client";

import React from "react";
import { Link } from "react-router-dom"; // Adicionado: Importação do Link
import { SidebarNav } from "./SidebarNav";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
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