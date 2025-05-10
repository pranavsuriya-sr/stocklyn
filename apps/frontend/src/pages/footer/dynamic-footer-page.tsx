import { useSession } from "@/context/session-context";
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

  return <FooterPage />;
};

export default DynamicFooterPage;
