
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import OnboardingPage from "./pages/OnboardingPage";
import Dashboard from "./pages/Dashboard";
import TrustedContacts from "./pages/TrustedContacts";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import NewEntryPage from "./pages/NewEntryPage";
import VaultLayout from "./components/layout/VaultLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          
          <Route path="/" element={<VaultLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="trusted-contacts" element={<TrustedContacts />} />
            <Route path="security" element={<Security />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Settings />} />
            <Route path="notifications" element={<Dashboard />} />
            <Route path="new-entry" element={<NewEntryPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
