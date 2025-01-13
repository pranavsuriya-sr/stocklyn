import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/context/session-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ProductsType } from "@/types/product-type";
import { useCartStore } from "@/utils/store/cart-store";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import ViewProfile from "./navbar-components/view-profile";

export default function Navbar() {
  const [cartProducts, setCartProducts] = useState<ProductsType[] | null>(null);

  const navigate = useNavigate();
  const { session } = useSession();
  const { toast } = useToast();
  const cartCount = useCartStore((state) => {
    return state.GetCount();
  });
  const products = useCartStore((state) => {
    return state.GetCartProducts();
  });
  const HandleGetAllCartItems = () => {
    setCartProducts(products);
  };

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
          Stocklyn
        </h3>
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-8">
        <li>
          {session !== false && (
            <Link
              to="/home"
              className="text-gray-500 text-md font-medium hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          )}
        </li>
        <li>
          <Link
            to="/about"
            className="text-gray-500 text-md font-medium hover:text-blue-600 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-gray-500 text-md font-medium hover:text-blue-600 transition-colors"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-gray-500 text-md font-medium hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>

      {session === true && (
        <div className="flex space-x-4">
          {/*this is the cart item div*/}
          <div className="flex items-center justify-center pt-1">
            <div className="relative">
              <Sheet onOpenChange={() => HandleGetAllCartItems()}>
                <SheetTrigger className="relative">
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </Badge>
                  )}
                  <ShoppingCart size={30} className="text-gray-800" />
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Your Cart Items!</SheetTitle>
                    <SheetDescription>
                      Here are all the items in your cart currently
                    </SheetDescription>
                    your cart available items are :
                    {cartProducts?.map((product) => {
                      return (
                        <img src={product.imageUrl[0]} key={product.id}></img>
                      );
                    })}
                  </SheetHeader>
                  <SheetFooter className="pt-8">
                    <SheetClose asChild>
                      <Button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition "
                      >
                        Close Cart
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
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
              "px-4 py-2 text-md font-medium bg-blue-600 text-white",
              "rounded-lg shadow hover:bg-blue-700 transition-colors"
            )}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className={cn(
              "px-4 py-2 text-md font-medium border border-blue-600 text-blue-600",
              "rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            )}
            onClick={() => {
              navigate("/signup");
              toast({
                description: "Your message has been sent.",
              });
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
