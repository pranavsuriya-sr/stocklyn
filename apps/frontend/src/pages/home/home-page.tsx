import ProductCard from "@/components/product-card/product-card";
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

  if (isLoading) {
    return <div>Loading</div>;
  }

  const category = data?.category ?? [];
  const categoryProducts = data?.categoryProducts ?? [];

  return (
    <div className="bg-white pt-28 p-20">
      {category.map((someCategory: string) => (
        <div key={someCategory} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 capitalize">{`Your favorite ${someCategory}'s`}</h2>
          <hr className="w-full border-t border-gray-300 my-4" />
          <div className="grid grid-cols-4 gap-4">
            {categoryProducts
              .filter(
                (product: ProductsType) => product.categoryName === someCategory
              )
              .map((product: ProductsType) => (
                <div key={product.id}>
                  <div onClick={() => HandleProductClick({ product })}>
                    <ProductCard
                      name={product.name}
                      imgSrc={product.displayImage}
                      price={product.price}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
