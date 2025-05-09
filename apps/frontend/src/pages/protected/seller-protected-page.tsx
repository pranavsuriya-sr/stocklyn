import { useSession } from "@/context/session-context";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const SellerProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If not loading and no user, redirect to login.
    if (!isLoading && !user) {
      navigate("/seller/login");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="mt-72 flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (
    user &&
    user.role === "seller" &&
    (location.pathname === "/seller/login" ||
      location.pathname === "/seller/signup")
  ) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  if (!user || user.role !== "seller") {
    return <Navigate to="/seller/login" replace />;
  }

  return <>{children}</>;
};

export default SellerProtectedPage;
