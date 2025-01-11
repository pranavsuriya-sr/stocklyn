import axios from "axios";
import Cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SessionContextType {
  session: boolean | null;
  user: any;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      setIsLoading(true);
      const token = Cookies.get("authToken");

      if (!token) {
        setSession(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/auth/isVerified",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setSession(true);
          setUser(response.data.user);
        } else {
          setSession(false);
        }
      } catch (error: any) {
        console.error("Session verification failed:", error.message);
        setSession(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, user, isLoading }}>
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
