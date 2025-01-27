import { useSession } from "@/context/session-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/utils/store/cart-store";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import ViewProfile from "./navbar-components/view-profile";

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { toast } = useToast();
  const [itemsCount, setItemsCount] = useState(0);
  const { GetCount } = useCartStore();

  useEffect(() => {
    setItemsCount(GetCount());
  }, [GetCount()]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border mx-auto w-[75%] rounded-lg overflow-hidden",
        "bg-white/70 backdrop-blur-md shadow-lg text-gray-800 h-25"
      )}
    >
      {/* Logo */}
      <Link to={"/"}>
        <h3
          className="scroll-m-20 text-3xl font-semibold tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          Maalelo
        </h3>
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-8">
        <li>
          {session !== false && (
            <Link
              to="/home"
              className="text-gray-500 text-md font-medium  hover:text-indigo-600 transition-colors "
            >
              Home
            </Link>
          )}
        </li>
        <li>
          {session !== false && (
            <Link
              to="/shop"
              className="text-gray-500 text-md font-medium  hover:text-indigo-600 transition-colors "
            >
              Shop
            </Link>
          )}
        </li>

        <li>
          <Link
            to="/about"
            className="text-gray-500 text-md font-medium  hover:text-indigo-600 transition-colors "
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-gray-500 text-md font-medium  hover:text-indigo-600 transition-colors "
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-gray-500 text-md font-medium  hover:text-indigo-600 transition-colors "
          >
            Contact
          </Link>
        </li>
      </ul>

      {session === true && (
        <div className="flex space-x-4 ">
          {/*this is the cart item div*/}
          <div className="flex items-center justify-center pt-1 ">
            <div
              className="relative hover:cursor-pointer hover:bg-gray-100 border-1 rounded-full p-2"
              onClick={() => navigate("/cartitems")}
            >
              <Badge className="absolute -top-0 -right-1 bg-red-500 hover:bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {itemsCount == 0 ? (
                  <span className="font-thin">null</span>
                ) : (
                  <span>{itemsCount}</span>
                )}
              </Badge>
              <ShoppingCart size={30}></ShoppingCart>
            </div>
          </div>

          {/*This is the view profile div*/}
          <ViewProfile />
        </div>
      )}

      {/* Action Buttons */}

      {session === false && (
        <div className="flex space-x-4">
          <button
            className={cn(
              "px-4 py-2 text-md font-medium bg-indigo-600 text-white",
              "rounded-lg shadow hover:bg-indigo-700 transition-colors"
            )}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className={cn(
              "px-4 py-2 text-md font-medium border border-indigo-600 text-indigo-600",
              "rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
            )}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
