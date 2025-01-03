import { useSession } from "@/context/session-context";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedPage;
