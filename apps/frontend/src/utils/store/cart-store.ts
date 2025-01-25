import { CartItemType } from "@/types/cart-item-type";
import { ProductsType } from "@/types/product-type";
import axios from "axios";
import { create } from "zustand";

interface CartStore {
  cartItems: CartItemType[];
  products: ProductsType[];
  LoadCartItems: (cartId: string) => Promise<void>;
  GetCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  products: [],

  LoadCartItems: async (cartId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cartItem/items/${cartId}`,
        {
          withCredentials: true,
        }
      );

      const cartProductResponse = response.data.response;
      set({ cartItems: cartProductResponse });

      const newArr = cartProductResponse.map((product: any) => {
        return product;
      });

      set({ products: newArr });
    } catch (error) {
      console.log({ message: "Error at zustand", error });
    }
  },

  GetCount: () => get().products.length,
}));
