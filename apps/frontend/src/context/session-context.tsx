import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";

interface Cart {
  id: string;
  products: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  cart: Cart;
}

interface SessionContextType {
  session: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  SignUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const { isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: () => checkAuth(),
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !user,
  });

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/isVerified");
      setSession(true);
      return getUserInfo(response.data.user.id);
    } catch (error) {
      setSession(false);
      setUser(null);
      return null;
    }
  };
  const getUserInfo = async (id: string) => {
    if (!id) {
      return null;
    }
    const response = await api.get(`/auth/getinfo/${id}`);
    setUser(response.data.user);
    return response.data.user;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      setUser(response.data.user);
      setSession(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const SignUp = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      setSession(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Sign Up failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setSession(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{ session, user, isLoading, login, logout, SignUp, checkAuth }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
