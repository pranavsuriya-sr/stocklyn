import { useSession } from "@/context/session-context";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { session } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (session === null) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedPage;
