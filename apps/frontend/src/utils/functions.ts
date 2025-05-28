import { productRoute } from "@/api/api";
import { ProductsType } from "@/types/product-type";

export const FetchSimilarProducts = async (product: ProductsType) => {
  const response = await productRoute.get(
    `/similarProducts/${product.categoryName}`
  );
  // console.log(response.data);
  const similarProducts = response.data?.similarProducts.filter(
    (item: ProductsType) => item.id !== product.id
  );
  const randomProducts = response.data?.randomProducts.filter(
    (item: ProductsType) => item.id !== product.id
  );
  return { similarProducts, randomProducts };
};
