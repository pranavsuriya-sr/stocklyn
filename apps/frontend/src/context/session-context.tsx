import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  cart: string;
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

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/isVerified");
      setSession(true);
      setUser(response.data.user);
    } catch (error) {
      setSession(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      setUser(response.data.userData);
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
      setUser(response.data.userData);
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

  useEffect(() => {
    checkAuth();
  }, []);

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
