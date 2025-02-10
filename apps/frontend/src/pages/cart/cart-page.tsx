import { productRoute } from "@/api/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-context";
import { useToast } from "@/hooks/use-toast";
import { ProductsType } from "@/types/product-type";
import { useCartStore } from "@/utils/store/cart-store";

import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./empty-cart";

const { RemoveCartItem } = useCartStore.getState();

const Cart = () => {
  const navigate = useNavigate();
  const { products, GetCount, cartItems, UpdateCartItemQuantity } =
    useCartStore();
  const { user } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    try {
      if (products.length !== cartItems.length) {
        throw new Error("Products and cart items length mismatch");
      }

      const cost = products.reduce((acc, product, index) => {
        if (product.stockQuantity < cartItems[index].quantity) {
          return acc;
        }
        return acc + product.price * cartItems[index].quantity;
      }, 0);

      setTotalCost(cost);
    } catch (error) {
      console.log(error);
    }
  }, [cartItems, products]);

  const HandleRemoveItem = async (productId: string) => {
    const isRemoved = await RemoveCartItem(user?.cart.id, productId);

    if (isRemoved === undefined) {
      console.log("Error at handleRemoveItem");
      return;
    }

    if (isRemoved) {
      toast({
        variant: "default",
        title: "Removed product!",
        description: "Product successfully removed from the cart!",
        duration: 2000,
      });
    }
    if (!isRemoved) {
      toast({
        variant: "destructive",
        title: "Unable to remove product!",
        description: "Error in removing the cart item , try again later",
        duration: 3000,
      });
    }
  };

  const FetchProductQuantity = async (id: string) => {
    const response = await productRoute.get(`/individualProduct/${id}`);
    return response.data.stockQuantity;
  };

  const HandleSelectQuantity = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    currentProductId: string
  ) => {
    const requiredQuantity = Number(e.target.value);

    const getAvailableQuantityOfProduct = products.find((item) => {
      return item.id === currentProductId;
    });

    if (
      getAvailableQuantityOfProduct === undefined ||
      getAvailableQuantityOfProduct === null
    ) {
      console.log("Undefined productId at cart-page");
      return;
    }

    //frontend validation
    if (requiredQuantity > getAvailableQuantityOfProduct.stockQuantity) {
      toast({
        variant: "destructive",
        title: `Stock Unavailable of ${requiredQuantity}`,
        description: `The required quantity of ${requiredQuantity} is greater than the available stock`,
      });
      return;
    }

    //database validation
    try {
      const availableQuantity = await queryClient.fetchQuery({
        queryKey: ["product-stock", currentProductId],
        queryFn: () => FetchProductQuantity(currentProductId),
        staleTime: 30000,
      });

      if (requiredQuantity > availableQuantity) {
        toast({
          variant: "destructive",
          title: "Stock Unavailable",
          description:
            "The required quantity is greater than the available stock",
        });
      } else {
        toast({
          title: "Cart Updated",
          description: "Item quantity modified successfully",
          style: {
            backgroundColor: "#f0fdf4",
            borderColor: "#4ade80",
            color: "#166534",
          },
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Failed to verify product stock",
      });
    }

    const cartItemIdObject = cartItems.find((item) => {
      return item.productId === currentProductId;
    });
    const cartItemId = cartItemIdObject?.id;
    //updateIt

    UpdateCartItemQuantity(requiredQuantity, cartItemId);
  };

  const RouteToProductPage = (product: ProductsType) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="pt-20 md:pt-32 px-4 md:px-0 w-[80%] mx-auto">
      <div className="text-2xl md:text-3xl font-semibold pb-6 md:pb-10">
        Shopping Cart
      </div>
      <hr className="w-full border-t border-gray-300 my-4" />

      {GetCount() > 0 &&
        products.map((product: ProductsType) => {
          return (
            <div key={product.id}>
              <div className="py-6 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-1 gap-4 w-full">
                  <img
                    src={product.displayImage}
                    className="w-32 h-32 md:w-44 md:h-44 object-contain p-2 hover:cursor-pointer"
                    alt={product.name}
                    onClick={() => RouteToProductPage(product)}
                  />
                  <div className="flex flex-col justify-between">
                    <h3
                      className="text-lg font-medium truncate hover:cursor-pointer"
                      title={product.name}
                      onClick={() => RouteToProductPage(product)}
                    >
                      {product.name}
                    </h3>

                    <div>
                      {product.stockQuantity > 0 ? (
                        <span className="text-green-600 text-sm">In stock</span>
                      ) : (
                        <span className="text-red-600 text-sm">
                          Out of stock
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <select
                        className="border p-2 rounded-md w-20 text-sm hover:cursor-pointer"
                        value={
                          cartItems.find(
                            (item) => item.productId === product.id
                          )?.quantity ?? 1
                        }
                        onChange={(e) => HandleSelectQuantity(e, product.id)}
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <AlertDialog>
                        <AlertDialogTrigger className="text-red-600 hover:text-red-700 text-sm p-2">
                          Remove
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove item?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will remove the product from your cart
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => HandleRemoveItem(product.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
                  <div className="text-xl font-medium md:min-w-[120px] text-right">
                    ₹{product.price}
                  </div>
                </div>
              </div>
              <hr className="w-full border-t border-gray-300 my-4" />
            </div>
          );
        })}

      <div className="mt-12 md:mt-20 border rounded-lg p-6 max-w-3xl mx-auto w-full">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{totalCost}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>₹{totalCost > 0 ? 49 : 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>₹0</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Order total</span>
            <span>₹{totalCost + 49}</span>
            {/* should change after adding the payment gateway*/}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8 gap-6">
        <Button className="w-full md:w-1/2 max-w-md bg-indigo-600 hover:bg-indigo-500 h-12">
          Proceed to Checkout
        </Button>
        <button
          onClick={() => navigate("/shop")}
          className="text-indigo-600 hover:text-indigo-500 text-sm font-medium pb-10"
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
};

export default Cart;
