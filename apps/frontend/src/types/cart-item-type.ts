import { ProductsType } from "./product-type";

export interface CartItemType {
  id: string;
  quantity: number;
  price: number;
  product: ProductsType;
  productId: string;
  cartId: string;
  createdAt: Date;
  updatedAt: Date;
}
