import { ProductsType } from "@/types/product-type";
import { create } from "zustand";

interface CartStore {
  products: ProductsType[];
  GetCount: () => number;
  AddItem: (product: ProductsType) => void;
  GetCartProducts: () => ProductsType[];
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],
  GetCount: () => get().products.length,
  AddItem: (newProduct: ProductsType) => {
    const productExists = get().products.some(
      (product) => product.id === newProduct.id
    );

    if (!productExists) {
      set({ products: [...get().products, newProduct] });
    }
  },
  GetCartProducts: () => get().products,
}));
