import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import QuizPage from "./pages/QuizPage";
import PricingPage from "./pages/PricingPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ForTeachers from "./pages/ForTeachers";

const queryClient = new QueryClient();

// PART 2: Block UI until Auth Resolves & PART 3: Routing Logic
const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/test" element={<Dashboard />} />
      <Route path="/" element={<Index />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/for-teachers" element={<ForTeachers />} />

      {/* Auth Routes - Redirect to dashboard if logged in */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" replace />} />

      {/* Protected Routes - Show Login if null */}
      <Route path="/dashboard" element={user ? <TeacherDashboard /> : <Navigate to="/login" replace />} />
      <Route path="/student" element={user ? <StudentDashboard /> : <Navigate to="/login" replace />} />
      <Route path="/parent" element={user ? <ParentDashboard /> : <Navigate to="/login" replace />} />
      <Route path="/quiz/:id" element={user ? <QuizPage /> : <Navigate to="/login" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
