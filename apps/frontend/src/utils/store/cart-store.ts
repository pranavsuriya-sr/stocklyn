import { ProductsType } from "@/types/product-type";
import { create } from "zustand";

interface CartStore {
  products: ProductsType[];
  GetCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],

  GetCount: () => get().products.length,
}));
