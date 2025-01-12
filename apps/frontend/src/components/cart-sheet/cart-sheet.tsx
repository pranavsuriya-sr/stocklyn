import { Button } from "@/components/ui/button";
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
import { ProductsType } from "@/types/product-type";
import { useCartStore } from "@/utils/store/cart-store";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const addItemToCart = useCartStore.getState().AddItem;

const CartSheet = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const product = location.state;
  const [cartProducts, setCartProducts] = useState<ProductsType[] | null>(null);
  const products = useCartStore((state) => {
    return state.GetCartProducts();
  });

  const HandleAddToCart = () => {
    addItemToCart(product);
    HandleGetAllCartItems();
  };

  const HandleGetAllCartItems = () => {
    setCartProducts(products);
  };

  return (
    <>
      <Sheet onOpenChange={() => HandleGetAllCartItems()}>
        <SheetTrigger asChild onClick={() => HandleAddToCart()}>
          {children}
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Your Cart Items!</SheetTitle>
            <SheetDescription>
              Here are all the items in your cart currently
            </SheetDescription>
            your cart available items are :
            {cartProducts?.map((product) => {
              return <img src={product.imageUrl[0]} key={product.id}></img>;
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
    </>
  );
};
export default CartSheet;
