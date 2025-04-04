
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WaterSamples from "./pages/WaterSamples";
import TreatmentSimulator from "./pages/TreatmentSimulator";
import Reports from "./pages/Reports";
import AIChatbot from "./pages/AIChatbot";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AccountSettings from "./pages/settings/AccountSettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import AppearanceSettings from "./pages/settings/AppearanceSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import IntegrationsSettings from "./pages/settings/IntegrationsSettings";
import DataManagementSettings from "./pages/settings/DataManagementSettings";
import HelpDocumentation from "./pages/settings/HelpDocumentation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/water-samples" element={<WaterSamples />} />
          <Route path="/treatment-simulator" element={<TreatmentSimulator />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-chatbot" element={<AIChatbot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/settings/appearance" element={<AppearanceSettings />} />
          <Route path="/settings/security" element={<SecuritySettings />} />
          <Route path="/settings/integrations" element={<IntegrationsSettings />} />
          <Route path="/settings/data" element={<DataManagementSettings />} />
          <Route path="/settings/help" element={<HelpDocumentation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
