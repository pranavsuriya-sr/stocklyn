import { productRoute } from "@/api/api";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductSuggestionCard from "../product/product-suggestion-card";
import EmptySearch from "./empty-search";

const SearchPage = () => {
  const location = useLocation();
  const { id } = useParams() || 100;
  const productsArray = location.state || [];
  const navigate = useNavigate();

  const FetchSimilarProducts = async () => {
    const response = await productRoute.get(
      `/similarProducts/${productsArray[0].categoryName}`
    );
    // console.log(response.data);

    return response.data.filter(
      (item: ProductsType) =>
        !productsArray.some((product: ProductsType) => product.id === item.id)
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["similarSuggestions", productsArray],
    queryFn: () => FetchSimilarProducts(),
    enabled: productsArray !== undefined,
  });

  if (productsArray.length == 0) {
    return <EmptySearch />;
  }
  const RouteToProductPage = (product: ProductsType) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div className=" flex flex-col w-[90%] mx-auto">
      <div className="flex justify-between min-h-screen ">
        <div className="mt-28 ">
          <h1 className="text-2xl">Filters</h1>
          <div className="flex flex-col gap-2 pt-4">
            <p className="font-bold">Sort By: </p>
          </div>
        </div>
        <div className="mx-auto min-h-screen pt-28 mb-20">
          <h2 className="text-2xl font-semibold mb-4">Your Product</h2>
          <div>
            {productsArray.length > 0 &&
              productsArray.map((product: ProductsType) => {
                if (product.id == id) {
                  return (
                    <ProductSuggestionCard
                      product={product}
                      key={product.id}
                      onClick={() => RouteToProductPage(product)}
                    />
                  );
                }
              })}
          </div>
          <h2 className="text-2xl font-semibold mb-2 pt-10">Search Results</h2>
          <div className="grid grid-cols-2 gap-2 ">
            {productsArray.length > 0 &&
              productsArray.map((product: ProductsType) => {
                if (product.id != id) {
                  return (
                    <div key={product.id} className="w-full mt-5 mb-4">
                      <ProductSuggestionCard
                        product={product}
                        onClick={() => RouteToProductPage(product)}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          {data?.length > 0 ? (
            <span>Similar Products You May Like</span>
          ) : (
            <span></span>
          )}
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.map((product: any, index: number) => (
              <div
                key={index}
                className="group cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                onClick={() => RouteToProductPage(product)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.displayImage}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={product.name}
                  />
                </div>
                <div className="p-2 space-y-0.5">
                  <h3 className="font-medium text-gray-800 truncate text-xs">
                    {product.name}
                  </h3>
                  <p className="text-indigo-600 font-semibold text-xs">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
