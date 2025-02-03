import { productRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { cn } from "@/lib/utils";
import { ProductsType } from "@/types/product-type";
import { useCartStore } from "@/utils/store/cart-store";
import { useQuery } from "@tanstack/react-query";
import { LucideSearch, Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import ViewProfile from "./navbar-components/view-profile";

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [itemsCount, setItemsCount] = useState(0);
  const { GetCount } = useCartStore();
  const [selected, setSelected] = useState<string>("login");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    setItemsCount(() => GetCount());
  }, [GetCount()]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data: searchSuggestions } = useQuery({
    queryKey: ["searchSuggestions", debouncedSearch],
    queryFn: () => FetchSearchSuggestions(),
    staleTime: 5000,
    enabled: !!searchValue,
    refetchOnWindowFocus: false,
  });

  const FetchSearchSuggestions = async () => {
    console.log(searchValue);

    const response = await productRoute.get(
      `/search?searchValue=${searchValue}`
    );

    return response.data;
  };

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 shadow-sm ">
        <div className="max-w-[100%] mx-auto flex items-center justify-evenly px-6 md:px-5 py-4">
          {/* part1 */}
          <Link to={"/"}>
            <h3 className="text-3xl font-semibold font-montserrat tracking-tight cursor-pointer text-gray-800">
              Maalelo
            </h3>

            {/* part2 */}
          </Link>
          <div className="">
            {session !== false && (
              <div className="flex items-center justify-center hover:cursor-pointer">
                <div>
                  <Input
                    className="border-black w-96"
                    onChange={(e) => HandleInputChange(e)}
                    value={searchValue}
                  />
                  {searchSuggestions !== undefined && (
                    <div className="absolute w-96 text-lg font-montserrat ">
                      {searchSuggestions.map((suggestion: ProductsType) => {
                        return (
                          <div
                            className="bg-white p-1 px-3 border flex justify-start gap-2 hover:bg-gray-100"
                            key={suggestion.id}
                          >
                            <Search className="text-gray-400"></Search>
                            {suggestion.name.substring(0, 33)}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="border border-black rounded-lg p-1.5">
                  <LucideSearch />
                </div>
              </div>
            )}
          </div>

          {/* part3 */}
          <ul className="hidden md:flex space-x-6 items-center justify-center">
            <li>
              <Link to="/home" className="text-gray-600 hover:text-indigo-600">
                Home
              </Link>
            </li>
            {session !== false && (
              <li>
                <Link
                  to="/shop"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Shop
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-600 hover:text-indigo-600"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-indigo-600"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* part4 */}
          {session === true && (
            <div className="flex space-x-4 items-center">
              <div className="relative hover:cursor-pointer hover:bg-gray-100 rounded-full p-2 ">
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemsCount > 0 ? itemsCount : "0"}
                </Badge>
                <ShoppingCart
                  size={30}
                  onClick={() => navigate("/cartitems")}
                />
              </div>

              <ViewProfile />
            </div>
          )}

          {session === false && (
            <div className="flex space-x-4">
              <button
                className={cn(
                  "px-4 py-2 text-md font-medium rounded-lg shadow transition-all",
                  selected === "login"
                    ? "bg-indigo-600 text-white"
                    : "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                )}
                onClick={() => {
                  setSelected("login");
                  navigate("/login");
                }}
              >
                Login
              </button>

              <button
                className={cn(
                  "px-4 py-2 text-md font-medium rounded-lg transition-all",
                  selected === "signup"
                    ? "bg-indigo-600 text-white"
                    : "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                )}
                onClick={() => {
                  setSelected("signup");
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
