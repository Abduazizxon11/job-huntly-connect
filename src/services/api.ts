
import { toast } from "sonner";

const API_URL = "https://api.headhunter.uz"; // Replace with your actual API URL

interface ApiResponse<T> {
  status: string;
  data: T;
  meta?: {
    totalElements?: number;
    totalPages?: number;
    token?: string;
    role?: string;
  };
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem("auth_token");
};

export const getUserRole = (): string | null => {
  return localStorage.getItem("user_role");
};

export const setUserRole = (role: string): void => {
  localStorage.setItem("user_role", role);
};

export const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const token = getAuthToken();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API GET error:", error);
      toast.error("Failed to fetch data");
      throw error;
    }
  },

  post: async <T>(endpoint: string, body: any): Promise<ApiResponse<T>> => {
    try {
      const token = getAuthToken();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API POST error:", error);
      toast.error("Operation failed");
      throw error;
    }
  },

  put: async <T>(endpoint: string, body: any): Promise<ApiResponse<T>> => {
    try {
      const token = getAuthToken();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API PUT error:", error);
      toast.error("Update failed");
      throw error;
    }
  },

  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const token = getAuthToken();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API DELETE error:", error);
      toast.error("Delete operation failed");
      throw error;
    }
  },

  auth: {
    login: async (email: string, password: string) => {
      try {
        const response = await api.post<{ token: string; role: string }>("/auths/loginByEmail", { 
          email, 
          password,
          deviceId: "web-" + Math.random().toString(36).substr(2, 9) // Generate a simple device ID
        });
        
        if (response.status === "OK" && response.meta?.token) {
          setAuthToken(response.meta.token);
          setUserRole(response.meta.role || "");
          return response.meta;
        }
        throw new Error("Login failed");
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
        throw error;
      }
    },

    register: async (email: string, password: string, role: "JOB_SEEKER" | "COMPANY") => {
      return api.post<{ id: number }>("/auths/register", { 
        email, 
        password, 
        role,
        deviceId: "web-" + Math.random().toString(36).substr(2, 9) // Generate a simple device ID
      });
    },

    logout: () => {
      removeAuthToken();
      localStorage.removeItem("user_role");
      window.location.href = "/login";
    }
  }
};
