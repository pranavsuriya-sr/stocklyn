import axios from "axios";
import { create } from "zustand";

interface CartStore {
  products: string[];
  GetCount: () => number;
  AddItem: (product: string, cartId: string | undefined) => void;
  GetCartProducts: () => Promise<string[]>;
  SetCartProducts: (products: string[] | null) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],

  GetCount: () => get().products.length,

  //add item in the product in the products array in the
  AddItem: async (productId: string, cartId: string | undefined) => {
    if (!get().products.includes(productId)) {
      const updatedProducts = [...get().products, productId];
      set({ products: updatedProducts });
    }

    await axios.post(
      "http://localhost:5000/cart/add",
      { cartId, productId },
      { withCredentials: true }
    );
  },

  GetCartProducts: async () => {
    try {
    } catch (error) {}

    return get().products;
  },

  SetCartProducts: (products) => {
    if (products == null) {
      return;
    }
    const newProductArray = [...get().products, ...products];
    set({ products: newProductArray });
  },
}));
