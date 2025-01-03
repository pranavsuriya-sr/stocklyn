import { useSession } from "@/context/session-context";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  if (session === null) {
    navigate("/login");
  }

  if (!isLoading && session !== null) {
    return <>{children}</>;
  }
};

export default ProtectedPage;
