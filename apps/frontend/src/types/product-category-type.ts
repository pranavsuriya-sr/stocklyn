import { ProductsType } from "./product-type";

export interface ProductCategoryType {
  message: string;
  category: string[];
  categoryProducts: ProductsType[];
}
