import axios from "axios";
import { create } from "zustand";

interface CartStore {
  products: [];
  GetCount: () => number;
  AddItem: (product: string, cartId: string | undefined) => void;
  GetCartProducts: (cartId: string | undefined) => [];
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],
  GetCount: () => get().products.length,
  AddItem: async (productId: string, cartId: string | undefined) => {
    const response = await axios.post(
      "http://localhost:5000/cart/add",
      { cartId, productId },
      { withCredentials: true }
    );

    console.log(response.data.products);
    set({ products: response.data.products });
  },
  GetCartProducts: (productId: string | undefined) => {
    return get().products;
  },
}));
