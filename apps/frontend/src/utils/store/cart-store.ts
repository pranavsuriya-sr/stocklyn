import { Products } from "@/pages/home/home";
import { create } from "zustand";

interface CartStore {
  products: Products[];
  getCount: () => number;
}

export const useCartStore = create<CartStore>(() => ({
  products: [
    {
      id: "prod_4r62b97",
      name: "Jacket",
      imageUrl: ["https://picsum.photos/200/300?random=87"],
      price: 45,
      productDescription: "High-quality materials",
      category: "Footwear",
      colors: [],
      sizes: "xl",
      highlights: ["Stylish"],
      details: "Designed for everyday wear",
      reviews: 12,
      stockQuantity: 35,
      createdAt: new Date("2023-01-15T08:00:00Z"),
      updatedAt: new Date("2023-10-05T12:00:00Z"),
    },
  ],
  getCount: () => {
    return 10;
  },
}));
