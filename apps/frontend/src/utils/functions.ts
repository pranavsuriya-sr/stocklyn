import { productRoute } from "@/api/api";
import { ProductsType } from "@/types/product-type";

export const FetchSimilarProducts = async (product: ProductsType) => {
  const response = await productRoute.get(
    `/similarProducts/${product.categoryName}`
  );
  // console.log(response.data);
  return response.data.filter((item: ProductsType) => item.id !== product.id);
};
