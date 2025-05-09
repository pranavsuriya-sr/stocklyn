import { useSession } from "@/context/session-context";
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

  return <Navbar />;
};

export default DynamicNavbar;
