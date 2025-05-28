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
      <main className="container mx-auto px-4 sm:px-6">
        <section className="text-center py-16 md:py-24 bg-gradient-to-r from-slate-50 via-gray-50 to-stone-50 rounded-lg shadow-sm mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-800 mb-6 tracking-tight">
            Discover Your Next Favorite
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-normal">
            Explore our curated collections of high-quality items, designed with
            passion and an eye for detail.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("product-collections")
                ?.scrollIntoView({ behavior: "auto" })
            }
            className="bg-indigo-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Shop Collections
          </button>
        </section>

        <div id="product-collections">
          {category.map((someCategory: string) => (
            <div key={someCategory} className="mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-800 mb-4 text-center animate-fade-in-up">
                {`Best ${someCategory} Collection`}
              </h2>

              <hr className="w-1/2 md:w-1/3 mx-auto border-t border-gray-200 my-8 md:my-10" />

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
        </div>
      </main>
    </div>
  );
}
