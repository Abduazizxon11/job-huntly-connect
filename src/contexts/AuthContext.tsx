
import React, { createContext, useContext, useEffect, useState } from "react";
import { api, getAuthToken, getUserRole } from "../services/api";

type UserRole = "JOB_SEEKER" | "COMPANY" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: "JOB_SEEKER" | "COMPANY") => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const checkAuth = async () => {
      const token = getAuthToken();
      const role = getUserRole();
      
      if (token && role) {
        setIsAuthenticated(true);
        setUserRole(role as UserRole);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await api.auth.login(email, password);
      setIsAuthenticated(true);
      setUserRole(result.role as UserRole);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, role: "JOB_SEEKER" | "COMPANY") => {
    setIsLoading(true);
    try {
      await api.auth.register(email, password, role);
      // After registration, login the user
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.auth.logout();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
