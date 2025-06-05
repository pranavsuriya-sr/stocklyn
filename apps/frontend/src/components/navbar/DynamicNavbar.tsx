import { useSession } from "@/context/session-context";
import AdminNavbar from "./adminNavbar";
import Navbar from "./navbar";
import SellerNavbar from "./seller-navbar";

const DynamicNavbar = () => {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  if (user && user.role === "seller") {
    return <SellerNavbar />;
  }

  if (user && user.role === "admin") {
    return <AdminNavbar />;
  }

  return <Navbar />;
};

export default DynamicNavbar;
