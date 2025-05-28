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

  // const makePayement = async () => {
  //   const stripe = await loadStripe(
  //     import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  //   );

  //   const response = await paymentRoute.post("/create-checkout-session", {
  //     cartItems,
  //     user,
  //   });
  //   console.log(response);
  //   const session = await response.data;
  //   const result = stripe?.redirectToCheckout({
  //     sessionId: session.id,
  //   });

  //   console.log(result);
  // };

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto pt-16">
        <h1 className="text-3xl sm:text-4xl font-light text-gray-800 pb-8 sm:pb-12">
          Shopping Cart
        </h1>
        <hr className="w-full border-t border-gray-200 mb-8 sm:mb-10" />
        <div className="space-y-6">
          {GetCount() > 0 &&
            products.map((product: ProductsType) => {
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex flex-1 gap-4 sm:gap-6 w-full items-start">
                      <img
                        src={product.displayImage}
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain p-1 rounded-lg bg-gray-50 hover:cursor-pointer flex-shrink-0"
                        alt={product.name}
                        onClick={() => RouteToProductPage(product)}
                      />
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <h3
                          className="text-lg sm:text-xl font-normal text-gray-700 line-clamp-2 hover:cursor-pointer hover:text-indigo-600 transition-colors duration-200"
                          title={product.name}
                          onClick={() => RouteToProductPage(product)}
                        >
                          {product.name}
                        </h3>

                        <div className="mt-2">
                          {product.stockQuantity > 0 ? (
                            <span className="text-green-600 text-sm font-medium flex items-center gap-1.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              In stock
                            </span>
                          ) : (
                            <span className="text-red-500 text-sm font-medium flex items-center gap-1.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
                              </svg>
                              Out of stock
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                          <select
                            className="border border-gray-300 p-2 rounded-lg w-20 text-sm hover:cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
                            value={
                              cartItems.find(
                                (item) => item.productId === product.id
                              )?.quantity ?? 1
                            }
                            onChange={(e) =>
                              HandleSelectQuantity(e, product.id)
                            }
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <AlertDialog>
                            <AlertDialogTrigger className="text-gray-500 hover:text-red-600 text-sm font-medium p-2 transition-colors duration-200">
                              Remove
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-[95vw] sm:max-w-md bg-white rounded-xl shadow-xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-medium text-gray-800">
                                  Remove item?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-600 pt-2">
                                  This action will remove the product from your
                                  cart.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="pt-6">
                                <AlertDialogCancel className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200"
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

                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 w-full sm:w-auto">
                      <div className="text-lg sm:text-xl font-medium text-gray-800 sm:min-w-[100px] text-left sm:text-right w-full sm:w-auto">
                        ₹{product.price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <div className="mt-10 sm:mt-16 bg-gray-50 rounded-xl shadow-sm p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex justify-between text-base">
              <span className="text-gray-600 font-normal">Subtotal</span>
              <span className="font-medium text-gray-800">₹{totalCost}</span>
            </div>

            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between font-semibold text-lg">
              <span className="text-gray-800">Order total</span>
              <span className="text-gray-800">₹{totalCost}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8 sm:mt-10 gap-4 pb-12">
          <Button
            className="w-full sm:w-auto sm:px-10 bg-indigo-600 hover:bg-indigo-700 h-12 text-base font-medium text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() =>
              navigate("/checkout", { state: { cartItems, totalCost } })
            }
          >
            Proceed to Checkout
          </Button>
          <button
            onClick={() => navigate("/shop")}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors duration-200 hover:underline"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
