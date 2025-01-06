import { Products } from "@/pages/home/home";
import { create } from "zustand";

interface CartStore {
  products: Products[];
  getCount: () => number;
  addItem: (product: Products) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],
  getCount: () => get().products.length,
  addItem: (product: Products) => {
    set({ products: [...get().products, product] });
  },
}));
