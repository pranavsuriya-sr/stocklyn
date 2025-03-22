import { useSession } from "@/context/session-context";
import { useCartStore } from "@/utils/store/cart-store";
import { useEffect } from "react";

const CartLoader = () => {
  const { session, user } = useSession();
  const { LoadCartItems } = useCartStore();

  useEffect(() => {
    const loadData = async () => {
      if (session == true && user?.cart.id) {
        await LoadCartItems(user?.cart.id);
      }
    };

    loadData();
  }, [user?.cart.id, LoadCartItems]);

  return null;
};

export default CartLoader;
