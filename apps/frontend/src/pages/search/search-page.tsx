import { ProductsType } from "@/types/product-type";
import { useLocation, useParams } from "react-router-dom";
import ProductSuggestionCard from "../product/product-suggestion-card";
import EmptySearch from "./empty-search";

const SearchPage = () => {
  const location = useLocation();
  const { id } = useParams() || 100;
  const productsArray = location.state || [];

  // const { data } = useQuery({
  //   queryKey: ["searchSuggestions"],
  //   queryFn: () => FetchSimilarProducts(),
  // });

  // const FetchSimilarProducts = async () => {};
  //implement this later -> basically i should fetch similar category when something is searched

  if (productsArray.length == 0) {
    return <EmptySearch />;
  }

  return (
    <div className="min-h-screen pt-28 w-[60%] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      <div>
        {productsArray.length > 0 &&
          productsArray.map((product: ProductsType) => {
            if (product.id == id) {
              return (
                <ProductSuggestionCard product={product} key={product.id} />
              );
            }
          })}
      </div>
      <div>
        {productsArray.length > 0 &&
          productsArray.map((product: ProductsType) => {
            if (product.id != id) {
              return (
                <div key={product.id} className="w-full mt-5">
                  <ProductSuggestionCard product={product} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default SearchPage;
