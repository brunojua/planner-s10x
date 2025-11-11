import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SessionContextProvider } from "./components/SessionContextProvider";
import Dashboard from "./pages/Dashboard";
import Themes from "./pages/Themes";
import Sequences from "./pages/Sequences";
import SequenceDetail from "./pages/SequenceDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile"; // Import Profile page
import NotFound from "./pages/NotFound";
import Index from "./pages/Index"; // Import Index page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} /> {/* Index handles initial redirect */}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} /> {/* Actual dashboard content */}
              <Route path="/themes" element={<Themes />} />
              <Route path="/sequences" element={<Sequences />} />
              <Route path="/sequences/:id" element={<SequenceDetail />} />
              <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </SessionContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;