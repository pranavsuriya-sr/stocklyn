import { useSession } from "@/context/session-context";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FetchProductLists = async (categories: string[]) => {
  const responses = await Promise.all(
    categories.map((category) =>
      axios
        .get(import.meta.env.VITE_PRODUCTS_BY_CATEGORY, {
          withCredentials: true,
          params: { category },
        })
        .catch(() => ({ data: { categoryProducts: [] } }))
    )
  );

  const result: { [key: string]: any } = {};
  categories.forEach((category, index) => {
    result[category] = responses[index].data;
  });

  return result;
};

export default function Home() {
  const { checkAuth, session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (session == false) {
      navigate("/login");
    }
  }, []);

  const categories = ["shirt", "tshirt", "pants"];

  const { data: products } = useQuery({
    queryKey: ["productsByCategory", categories],
    queryFn: () => FetchProductLists(categories),
    staleTime: 5 * 60 * 1000,
  });

  function HandleProductClick({ product }: { product: ProductsType }) {
    navigate(`/product/${product.id}`, { state: product });
  }

  if (!products) return null;

  return (
    <div className="bg-white pt-20">
      <div className="">
        {categories.map((category, categoryIndex) => {
          const categoryProducts = products[category]?.categoryProducts;
          if (!categoryProducts?.length) return null;

          return (
            <div
              key={category}
              className={`mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 ${categoryIndex === 0 ? "pt-5" : ""}`}
            >
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">
                {category} Collection
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 hover:cursor-pointer">
                {categoryProducts.map((product: ProductsType) => (
                  <div
                    key={product.id}
                    className="group relative"
                    onClick={() => HandleProductClick({ product })}
                  >
                    <img
                      alt={product.name}
                      src={product.imageUrl[0]}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-900">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
