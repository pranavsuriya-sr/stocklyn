import { productRoute } from "@/api/api";
import ProductCard from "@/pages/product/product-card";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function HandleProductClick({ product }: { product: ProductsType }) {
    navigate(`/product/${product.id}`, { state: product });
  }

  const FetchProductLists = async () => {
    const response = await productRoute.get("/getbycategory", {
      withCredentials: true,
    });
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: FetchProductLists,
    staleTime: 3 * 60 * 1000,
  });

  if (isLoading) {
    return <div className="text-center text-lg p-10 h-screen">Loading...</div>;
  }

  const category = data?.category ?? [];
  const categoryProducts = data?.categoryProducts ?? [];

  return (
    <div className="bg-white pt-28 p-4 md:p-10 lg:p-20 lg:pt-32">
      {category.map((someCategory: string) => (
        <div key={someCategory} className="mb-12 pt-10">
          <h2 className="text-2xl font-montserrat md:text-3xl font-bold mb-4 capitalize text-left w-[75%] mx-auto animate-fade-in-up fancy-text ">
            {`Our best ${someCategory}'s Collection`}
          </h2>

          <hr className="w-[75%] mx-auto border-t border-gray-300 my-4" />

          <div className="flex justify-center pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {categoryProducts
                .filter(
                  (product: ProductsType) =>
                    product.categoryName === someCategory
                )
                .map((product: ProductsType) => (
                  <div key={product.id} className="flex justify-center">
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
        </div>
      ))}
    </div>
  );
}
