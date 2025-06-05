import { useSession } from "@/context/session-context";
import AdminFooterPage from "./admin-footer-page";
import FooterPage from "./footer-page";
import SellerFooterPage from "./seller-footer-page";

const DynamicFooterPage = () => {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  if (user?.role === "seller") {
    return <SellerFooterPage />;
  }

  if (user?.role === "admin") {
    return <AdminFooterPage />;
  }

  return <FooterPage />;
};

export default DynamicFooterPage;
