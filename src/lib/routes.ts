import { Folder, LayoutDashboard, Smartphone, UserCircle, BookOpenText, LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
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
    title: "Metodologia",
    href: "/methodology",
    icon: BookOpenText,
  },
];

// Mapeamento de rotas que não estão na navegação principal, mas precisam de título
export const extraRoutes: { [key: string]: string } = {
  "/sequences/:id": "Detalhes da Sequência",
};

export function getPageTitle(pathname: string): string {
  // 1. Checar rotas exatas (como /dashboard, /themes)
  const navItem = navItems.find(item => item.href === pathname);
  if (navItem) {
    return navItem.title;
  }

  // 2. Checar rotas dinâmicas (como /sequences/:id)
  for (const routePath in extraRoutes) {
    // Simples verificação de prefixo para rotas dinâmicas
    if (routePath.endsWith("/:id") && pathname.startsWith(routePath.replace("/:id", "/"))) {
      return extraRoutes[routePath];
    }
  }

  // 3. Fallback para rotas especiais
  if (pathname === "/") return "Início";
  if (pathname === "/login") return "Login";
  
  return "Página";
}