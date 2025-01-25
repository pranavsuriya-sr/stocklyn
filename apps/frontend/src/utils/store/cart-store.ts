import { CartItemType } from "@/types/cart-item-type";
import { ProductsType } from "@/types/product-type";
import axios from "axios";
import { create } from "zustand";

interface CartStore {
  cartItems: CartItemType[];
  products: ProductsType[];
  LoadCartItems: (cartId: string | undefined) => Promise<void>;
  AddCartItems: (
    cartId: string | undefined,
    productId: string,
    price: number
  ) => Promise<void>;
  GetCount: () => number;
  RemoveCartItem: (
    cartId: string | undefined,
    productId: string
  ) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  products: [],
  GetCount: () => get().products.length,
  LoadCartItems: async (cartId: string | undefined) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cartItem/items/${cartId}`,
        {
          withCredentials: true,
        }
      );

      const cartProductResponse = response.data.response;
      set({ cartItems: cartProductResponse });

      const newArr = cartProductResponse.map((item: any) => {
        return item.product;
      });

      set({ products: newArr });
    } catch (error) {
      console.log({ message: "Error at zustand", error });
    }
  },

  AddCartItems: async (
    cartId: string | undefined,
    productId: string,
    price: number
  ) => {
    const productExists = get().products.some(
      (product) => product.id === productId
    );
    if (productExists) {
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/cartItem/insert`,
        {
          cartId,
          productId,
          price,
        },
        { withCredentials: true }
      );
      get().LoadCartItems(cartId);
    } catch (error) {
      console.log({ message: "Error at the Zustand Store while add", error });
    }
  },

  RemoveCartItem: async (cartId: string | undefined, productId: string) => {
    try {
      await axios.delete("http://localhost:5000/cartItem/delete", {
        data: { cartId, productId },
        withCredentials: true,
      });
      get().LoadCartItems(cartId);
    } catch (error) {
      console.log({
        message: "Error at DeleteCartItem at zustand store",
        error,
      });
    }
  },
}));
