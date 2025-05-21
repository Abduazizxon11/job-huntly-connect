
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Job Seeker Routes */}
            <Route 
              path="/resume/create" 
              element={
                <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
                  <div>Resume Create Page</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resume/edit" 
              element={
                <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
                  <div>Resume Edit Page</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-applications" 
              element={
                <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
                  <div>My Applications Page</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Company Routes */}
            <Route 
              path="/company/post-job" 
              element={
                <ProtectedRoute allowedRoles={["COMPANY"]}>
                  <div>Post Job Page</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/company/jobs" 
              element={
                <ProtectedRoute allowedRoles={["COMPANY"]}>
                  <div>Company Jobs Page</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/company/jobs/:id/edit" 
              element={
                <ProtectedRoute allowedRoles={["COMPANY"]}>
                  <div>Edit Job Page</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/company/profile" 
              element={
                <ProtectedRoute allowedRoles={["COMPANY"]}>
                  <div>Company Profile Page</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/company/applications" 
              element={
                <ProtectedRoute allowedRoles={["COMPANY"]}>
                  <div>Company Applications Page</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
