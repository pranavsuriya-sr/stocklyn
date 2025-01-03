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
  }, [isLoading, session, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && session !== null) {
    return <>{children}</>;
  }
};

export default ProtectedPage;
