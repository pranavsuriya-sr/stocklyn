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
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!isLoading && user?.role == "seller") {
    return <UnauthorizedForSellerPage />;
  }

  if (!isLoading && session !== null) {
    return <>{children}</>;
  }
};

export default ProtectedPage;
