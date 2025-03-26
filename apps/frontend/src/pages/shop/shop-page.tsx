import { productRoute } from "@/api/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/pages/product/product-card";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);

  const HandleFetchProductsByPageNumber = async (): Promise<ProductsType[]> => {
    const skip = searchParams.get("skip") || 0;
    const take = searchParams.get("take") || 2;

    // console.log("Fetching products with skip:", skip, "take:", take);

    try {
      const response = await productRoute.get(`/productPagination`, {
        params: { skip, take },
      });

      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pagination", location],
    queryFn: () => HandleFetchProductsByPageNumber(),
  });
  // console.log(data);

  const HandleGetInfoByPageNumber = (currentPage: number) => {
    navigate(`/shop?skip=${(currentPage - 1) * 2}&take=2`);
  };

  const HandleGoPrevious = () => {
    if (pageNumber == 1) {
      return;
    }

    setPageNumber(pageNumber - 1);
  };

  function HandleProductClick({ product }: { product: ProductsType }) {
    navigate(`/product/${product.id}`, { state: product });
  }

  if (isError) {
    console.log(isError);
    return <div className="">Error in Fetching</div>;
  }

  if (isLoading) {
    return (
      <div className="text-center text-lg p-10 min-h-screen">Loading...</div>
    );
  }

  return (
    <div className="pt-20 md:pt-28 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div>
          <div className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold py-6 md:py-10 text-center sm:text-left">
            All available Items
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {data !== undefined &&
              data.map((product) => {
                return (
                  <div
                    onClick={() => HandleProductClick({ product })}
                    key={product.id}
                    className="w-full"
                  >
                    <ProductCard
                      name={product.name}
                      imgSrc={product.displayImage}
                      price={product.price}
                      key={product.id}
                    ></ProductCard>
                  </div>
                );
              })}
          </div>
        </div>

        <Pagination className="hover:cursor-pointer pt-6 md:pt-10 mb-6 md:mb-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  HandleGoPrevious();
                }}
                className="text-sm md:text-base"
              />
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink
                onClick={() => HandleGetInfoByPageNumber(pageNumber)}
                className="text-sm md:text-base"
              >
                {pageNumber}
              </PaginationLink>
              <PaginationLink
                onClick={() => HandleGetInfoByPageNumber(pageNumber + 1)}
                className="text-sm md:text-base"
              >
                {pageNumber + 1}
              </PaginationLink>
              <PaginationLink
                onClick={() => HandleGetInfoByPageNumber(pageNumber + 2)}
                className="text-sm md:text-base"
              >
                {pageNumber + 2}
              </PaginationLink>
              <PaginationLink
                onClick={() => HandleGetInfoByPageNumber(pageNumber + 3)}
                className="text-sm md:text-base"
              >
                {pageNumber + 3}
              </PaginationLink>
              <PaginationLink
                onClick={() => HandleGetInfoByPageNumber(pageNumber + 4)}
                className="text-sm md:text-base"
              >
                {pageNumber + 4}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="flex sm:hidden">
              <PaginationLink
                onClick={() => HandleGetInfoByPageNumber(pageNumber)}
                className="text-sm md:text-base"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setPageNumber(pageNumber + 1);
                }}
                className="text-sm md:text-base"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ShopPage;
