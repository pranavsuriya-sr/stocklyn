import { ProductsType } from "@/types/product-type";
import axios from "axios";
import { create } from "zustand";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

interface CartStore {
  products: ProductsType[];
  GetCount: () => number;
  AddItem: (product: string, cartId: string | undefined) => void;
  AddAllProducts: (productIds: string[]) => Promise<void>;
  GetCartProducts: () => ProductsType[];
  SetCartProducts: (products: ProductsType[] | null) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],

  GetCount: () => get().products.length,

  //adding all the products details to products array
  AddAllProducts: async (productIds: string[]) => {
    try {
      const response = await api.post("/product/productDetails", {
        productIds,
      });
      set({ products: response.data.products });
    } catch (error) {
      console.log(error, "Error at AddAllProducts in zustand cart store");
    }
  },

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
