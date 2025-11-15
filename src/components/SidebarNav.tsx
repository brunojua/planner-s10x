"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Folder, LayoutDashboard, Smartphone, UserCircle, BookOpenText } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Temas",
    href: "/themes",
    icon: Folder,
  },
  {
    title: "Sequências",
    href: "/sequences",
    icon: Smartphone,
  },
  {
    title: "Perfil",
    href: "/profile",
    icon: UserCircle,
  },
  {
    title: "Metodologia", // Novo item de menu
    href: "/methodology",
    icon: BookOpenText, // Ícone para metodologia
  },
];

export function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2 transition-all", // Alterado para rounded-xl
            location.pathname === item.href
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}