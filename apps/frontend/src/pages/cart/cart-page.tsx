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
    <div className="pt-28 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      <div className="text-2xl sm:text-3xl font-semibold pb-6 sm:pb-10">
        Shopping Cart
      </div>
      <hr className="w-[50%] border-t border-gray-300 my-4" />
      <div className="">
        <div>
          {GetCount() > 0 &&
            products.map((product: ProductsType) => {
              return (
                <div key={product.id}>
                  <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex flex-1 gap-4 w-full">
                      <img
                        src={product.displayImage}
                        className="w-20 h-20 sm:w-32 sm:h-32 md:w-44 md:h-44 object-contain p-2 hover:cursor-pointer"
                        alt={product.name}
                        onClick={() => RouteToProductPage(product)}
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <h3
                          className="text-base sm:text-lg font-medium line-clamp-2 hover:cursor-pointer"
                          title={product.name}
                          onClick={() => RouteToProductPage(product)}
                        >
                          {product.name}
                        </h3>

                        <div>
                          {product.stockQuantity > 0 ? (
                            <span className="text-green-600 text-xs sm:text-sm flex flex-col">
                              <span className="">In stock</span>
                              {/* <span>
                            Available Quanity : {product.stockQuantity}
                          </span> */}
                            </span>
                          ) : (
                            <span className="text-red-600 text-xs sm:text-sm">
                              Out of stock
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                          <select
                            className="border p-1 sm:p-2 rounded-md w-16 sm:w-20 text-xs sm:text-sm hover:cursor-pointer"
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
                            <AlertDialogTrigger className="text-red-600 hover:text-red-700 text-xs sm:text-sm p-1 sm:p-2">
                              Remove
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Remove item?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will remove the product from your
                                  cart
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

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto self-end sm:self-auto">
                      <div className="text-lg sm:text-xl font-medium sm:min-w-[120px] text-right">
                        ₹{product.price}
                      </div>
                    </div>
                  </div>
                  <hr className="w-full border-t border-gray-300 my-4" />
                </div>
              );
            })}
        </div>
        Add before you leave
      </div>

      <div className="mt-8 sm:mt-12 border rounded-lg p-4 sm:p-6 max-w-3xl mx-auto w-full">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{totalCost}</span>
          </div>

          <hr className="my-3 sm:my-4" />
          <div className="flex justify-between font-semibold text-base sm:text-lg">
            <span>Order total</span>
            <span>₹{totalCost}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6 sm:mt-8 gap-4 sm:gap-6 pb-8 sm:pb-12">
        <Button
          className="w-full sm:w-1/2 max-w-md bg-indigo-600 hover:bg-indigo-500 h-10 sm:h-12 text-sm sm:text-base"
          onClick={() =>
            navigate("/checkout", { state: { cartItems, totalCost } })
          }
        >
          Proceed to Checkout
        </Button>
        <button
          onClick={() => navigate("/shop")}
          className="text-indigo-600 hover:text-indigo-500 text-xs sm:text-sm font-medium"
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
};

export default Cart;
