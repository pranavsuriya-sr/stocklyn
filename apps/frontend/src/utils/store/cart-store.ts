import { ProductsType } from "@/types/product-type";
import axios from "axios";
import { create } from "zustand";

interface CartStore {
  products: ProductsType[];
  GetCount: () => number;
  AddItem: (product: string, cartId: string | undefined) => void;

  GetCartProducts: () => ProductsType[];
  SetCartProducts: (products: ProductsType[] | null) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],

  GetCount: () => get().products.length,

  //add item in the product in the products array in the
  AddItem: async (productId: string, cartId: string | undefined) => {
    const response = await axios.post(
      "http://localhost:5000/cart/add",
      { cartId, productId },
      { withCredentials: true }
    );

    set({ products: response.data.products });
  },

  GetCartProducts: () => {
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
