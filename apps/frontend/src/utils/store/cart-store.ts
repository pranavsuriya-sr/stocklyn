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
  AddItem: (product: Products) => {
    set({ products: [...get().products, product] });
  },
  GetCartProducts: () => get().products,
}));
