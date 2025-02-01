import { productRoute } from "@/api/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);

  const HandleFetchProductsByPageNumber = async () => {
    const [searchParams] = useSearchParams();
    const skip = searchParams.get("skip");
    const take = searchParams.get("take");
    console.log(skip, take);

    const response = await productRoute.get("/productPagination");
  };

  const { data } = useQuery({
    queryKey: ["pagination"],
    queryFn: () => HandleFetchProductsByPageNumber(),
  });

  return (
    <div className="pt-28">
      <div>hello</div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                navigate(`/shop?skip=${(pageNumber - 1) * 2}&take=2`)
              }
            >
              1
            </PaginationLink>
            <PaginationLink>2</PaginationLink>
            <PaginationLink>3</PaginationLink>
            <PaginationLink>4</PaginationLink>
            <PaginationLink>5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ShopPage;
