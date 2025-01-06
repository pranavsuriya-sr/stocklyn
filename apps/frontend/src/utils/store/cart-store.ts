import { Products } from "@/pages/home/home";
import { create } from "zustand";

interface CartStore {
  products: Products[];
  GetCount: () => number;
  AddItem: (product: Products) => void;
  GetCartProducts: () => Products[];
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],
  GetCount: () => get().products.length,
  AddItem: (newProduct: Products) => {
    const productExists = get().products.some(
      (product) => product.id === newProduct.id
    );

    if (!productExists) {
      set({ products: [...get().products, newProduct] });
    }
  },
  GetCartProducts: () => get().products,
}));
