import { useSession } from "@/context/session-context";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UnauthorizedForSellerPage from "../unauthorized/unauthorized-forseller-page";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { session, isLoading, user } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/login");
    }
  }, [isLoading, session, navigate]);

  if (isLoading) {
    return <div className="mt-72">Loading...</div>;
  }

  if (!isLoading && user?.role == "seller") {
    return <UnauthorizedForSellerPage />;
  }

  if (!isLoading && session !== null) {
    return <>{children}</>;
  }
};

export default ProtectedPage;
