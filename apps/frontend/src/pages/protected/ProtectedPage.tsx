import { useSession } from "@/context/session-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedPage = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/login");
    }
  }, []);

  return <div>ProtectedPage</div>;
};

export default ProtectedPage;
