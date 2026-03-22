import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SROIProvider } from "@/contexts/SROIContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DescribePage from "./pages/calculator/DescribePage.tsx";
import ScopePage from "./pages/calculator/ScopePage.tsx";
import EvidencePage from "./pages/calculator/EvidencePage.tsx";
import PlanPage from "./pages/calculator/PlanPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SROIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculator/describe" element={<DescribePage />} />
            <Route path="/calculator/scope" element={<ScopePage />} />
            <Route path="/calculator/evidence" element={<EvidencePage />} />
            <Route path="/calculator/plan" element={<PlanPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SROIProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
