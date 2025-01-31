import { useSession } from "@/context/session-context";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { checkAuth, session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (session === false) {
      navigate("/login");
    }
  }, []);

  function HandleProductClick({ product }: { product: ProductsType }) {
    navigate(`/product/${product.id}`, { state: product });
  }
  const FetchProductLists = async () => {
    const response = await axios.get(
      import.meta.env.VITE_PRODUCTS_BY_CATEGORY,
      {
        withCredentials: true,
      }
    );

    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: FetchProductLists,
    staleTime: 3 * 60 * 1000,
  });

  //   const result: { [key: string]: any } = {};
  //   categories.forEach((category, index) => {
  //     result[category] = responses[index].data;
  //   });

  //   return result;
  // };

  // if (!products) return null;

  if (isLoading) {
    return <div>Loading</div>;
  }

  const category = data?.category ?? [];
  const categoryProducts = data?.categoryProducts ?? [];
  // console.log(category);

  return (
    <div className="bg-white pt-20">
      <div className="grid grid-cols-4">
        {!isLoading &&
          category.map((someCategory: string) => {
            return categoryProducts.map((product: ProductsType) => {
              console.log(someCategory, product.categoryName);
              if (product.categoryName == someCategory) {
                return (
                  <div
                    key={product.id}
                    onClick={() => HandleProductClick({ product })}
                  >
                    {product.name}
                  </div>
                );
              }
            });
          })}
      </div>
    </div>
  );
}
