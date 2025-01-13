import { ProductsType } from "@/types/product-type";
import axios from "axios";
import { create } from "zustand";

interface CartStore {
  products: ProductsType[];
  GetCount: () => number;
  AddItem: (product: string, cartId: string | undefined) => void;
  GetCartProducts: () => ProductsType[];
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

    console.log(response);
  },
  GetCartProducts: () => {
    return get().products;
  },
}));
