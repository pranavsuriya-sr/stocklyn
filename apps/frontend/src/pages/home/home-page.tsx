import { productRoute } from "@/api/api";
import ProductCard from "@/pages/product/product-card";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleProductClick({ product }: { product: ProductsType }) {
    navigate(`/product/${product.id}`, { state: product });
  }

  const fetchProductLists = async () => {
    const response = await productRoute.get("/getbycategory", {
      withCredentials: true,
    });
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: fetchProductLists,
    staleTime: 3 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-theme(spacing.28))] pt-20 md:pt-28 flex flex-col items-center justify-center text-center p-10 bg-white">
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading Products...
        </h2>
      </div>
    );
  }

  const category = data?.randomCategories ?? [];
  const categoryProducts = data?.categoryProducts ?? [];

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20 md:pt-28 font-montserrat">
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        {category.map((someCategory: string) => (
          <div key={someCategory} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center fancy-text animate-fade-in-up font-thin">
              {`Best ${someCategory} Collection`}
            </h2>

            <hr className="w-1/2 md:w-1/3 mx-auto border-t border-gray-200 my-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {categoryProducts
                .filter(
                  (product: ProductsType) =>
                    product.categoryName === someCategory
                )
                .map((product: ProductsType) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick({ product })}
                    className="w-full cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                  >
                    <ProductCard
                      name={product.name}
                      imgSrc={product.displayImage}
                      price={product.price}
                      item={product.categoryName}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
