import { useSession } from "@/context/session-context";
import { useCartStore } from "@/utils/store/cart-store";
import { useEffect } from "react";

const CartLoader = () => {
  const { session, user } = useSession();
  const { LoadCartItems } = useCartStore();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (session == true && user?.cart.id) {
        await LoadCartItems(user?.cart.id);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [session, user?.cart.id]);

  return null;
};

export default CartLoader;
