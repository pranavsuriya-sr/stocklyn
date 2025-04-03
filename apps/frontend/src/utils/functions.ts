import { productRoute } from "@/api/api";
import { ProductsType } from "@/types/product-type";

export const FetchSimilarProducts = async (product: ProductsType) => {
  const response = await productRoute.get(
    `/similarProducts/${product.categoryName}`
  );
  return response.data.filter((item: ProductsType) => item.id !== product.id);
};
