import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SessionContextProvider } from "./components/SessionContextProvider";
import Dashboard from "./pages/Dashboard";
import Themes from "./pages/Themes";
import Sequences from "./pages/Sequences";
import SequenceDetail from "./pages/SequenceDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

// Componente auxiliar para usar hooks do React Router
const AppContent = () => {
  const location = useLocation();
  // Define os caminhos onde o layout (com sidebar) NÃO deve ser exibido
  const noLayoutPaths = ["/", "/login"];
  const showLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <SessionContextProvider>
      {showLayout ? (
        // Rotas que precisam do layout (com sidebar)
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/sequences" element={<Sequences />} />
            <Route path="/sequences/:id" element={<SequenceDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all para rotas autenticadas */}
          </Routes>
        </Layout>
      ) : (
        // Rotas que NÃO precisam do layout (sem sidebar)
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all para rotas sem layout */}
        </Routes>
      )}
    </SessionContextProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent /> {/* Renderiza o componente auxiliar */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;