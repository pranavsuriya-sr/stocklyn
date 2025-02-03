import { useSession } from "@/context/session-context";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/utils/store/cart-store";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../pages/search/searchBar-page";
import { Badge } from "../ui/badge";
import ViewProfile from "./navbar-components/view-profile";

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [itemsCount, setItemsCount] = useState(0);
  const { GetCount } = useCartStore();
  const [selected, setSelected] = useState<string>("login");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setItemsCount(() => GetCount());
  }, [GetCount()]);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 shadow-sm">
      <div className="max-w-[100%] mx-auto flex items-center justify-evenly px-6 md:px-5 py-4">
        <Link to={"/"}>
          <h3 className="text-3xl font-semibold font-montserrat tracking-tight cursor-pointer text-gray-800">
            Maalelo
          </h3>
        </Link>

        {session && (
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )}

        <ul className="hidden md:flex space-x-6 items-center justify-center">
          <li>
            <Link to="/home" className="text-gray-600 hover:text-indigo-600">
              Home
            </Link>
          </li>
          {session && (
            <li>
              <Link to="/shop" className="text-gray-600 hover:text-indigo-600">
                Shop
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/searchResults/you-won-the-search-lottery-congratulations-DM-me!-something-is-waiting-for-you"
              className="text-gray-600 hover:text-indigo-600"
            >
              Search
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
              Contact
            </Link>
          </li>
        </ul>

        {session ? (
          <div className="flex space-x-4 items-center">
            <div className="relative hover:cursor-pointer hover:bg-gray-100 rounded-full p-2">
              {itemsCount == 0 ? (
                <></>
              ) : (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
                  {itemsCount}
                </Badge>
              )}
              <ShoppingCart size={30} onClick={() => navigate("/cartitems")} />
            </div>
            <ViewProfile />
          </div>
        ) : (
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
  );
}
