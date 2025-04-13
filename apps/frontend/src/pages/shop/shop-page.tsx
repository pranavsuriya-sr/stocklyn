import { productRoute } from "@/api/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import ProductCard from "@/pages/product/product-card";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const getPageFromUrl = () => {
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const take = parseInt(searchParams.get("take") || "12", 10);
    const pageSize = take > 0 ? take : 12;
    return Math.floor(skip / pageSize) + 1;
  };

  const [pageNumber, setPageNumber] = useState(getPageFromUrl());

  useEffect(() => {
    setPageNumber(getPageFromUrl());
  }, [searchParams]);

  const HandleFetchProductsByPageNumber = async (): Promise<ProductsType[]> => {
    const skip = searchParams.get("skip") || 0;
    const take = searchParams.get("take") || 12;

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

  const { data, isLoading, isError } = useQuery<ProductsType[], Error>({
    queryKey: ["pagination", location.search],
    queryFn: HandleFetchProductsByPageNumber,
  });

  const HandleGoToPage = (targetPage: number) => {
    if (targetPage < 1) return;
    const take = parseInt(searchParams.get("take") || "12", 10);
    const newSkip = (targetPage - 1) * (take > 0 ? take : 12);
    navigate(`/shop?skip=${newSkip}&take=${take}`);
  };

  function HandleProductClick({ product }: { product: ProductsType }) {
    navigate(`/product/${product.id}`, { state: product });
  }

  if (isError) {
    return (
      <div className="text-center text-lg p-10 min-h-screen text-red-600">
        Error in Fetching Products. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-lg p-10 min-h-screen">Loading...</div>
    );
  }

  const renderPageLinks = (numLinks: number) => {
    return Array.from({ length: numLinks }, (_, i) => pageNumber + i).map(
      (num) => (
        <PaginationItem key={num}>
          <PaginationLink
            onClick={() => HandleGoToPage(num)}
            className={cn(
              "text-sm md:text-base transition-all duration-200",
              pageNumber === num
                ? "font-bold border-2 border-primary text-primary bg-primary/10 scale-110 shadow-sm"
                : "hover:bg-gray-100"
            )}
          >
            {num}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <div className="pt-20 md:pt-28 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div>
          <div className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold py-6 md:py-10 text-center sm:text-left">
            All available Items<br></br>
            <span className="text-primary text-xl text-indigo-600">
              Page {Number(searchParams.get("skip")) / 12 + 1}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {data && data.length > 0 ? (
              data.map((product) => (
                <div
                  onClick={() => HandleProductClick({ product })}
                  key={product.id}
                  className="w-full cursor-pointer"
                >
                  <ProductCard
                    name={product.name}
                    imgSrc={product.displayImage}
                    price={product.price}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10">
                No products found.
              </p>
            )}
          </div>
        </div>

        {(data && data.length === 12) || pageNumber > 1 ? (
          <Pagination className="hover:cursor-pointer pt-6 md:pt-10 mb-6 md:mb-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => HandleGoToPage(pageNumber - 1)}
                  className={cn(
                    "text-sm md:text-base",
                    pageNumber <= 1 &&
                      "opacity-50 cursor-not-allowed pointer-events-none"
                  )}
                  aria-disabled={pageNumber <= 1}
                  tabIndex={pageNumber <= 1 ? -1 : undefined}
                />
              </PaginationItem>

              <div className="hidden sm:flex">{renderPageLinks(5)}</div>
              <div className="flex sm:hidden">{renderPageLinks(1)}</div>

              <PaginationItem>
                <PaginationNext
                  onClick={() => HandleGoToPage(pageNumber + 1)}
                  className="text-sm md:text-base"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </div>
    </div>
  );
};

export default ShopPage;
