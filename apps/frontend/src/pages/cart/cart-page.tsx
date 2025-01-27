import { productRoute } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-context";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/utils/store/cart-store";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../empty-cart/empty-cart";

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
        variant: "success",
        title: "Removed product!",
        description: "Product successfully removed from the cart!",
        duration: 3000,
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
        title: "Stock Unavailable",
        description:
          "The required quantity is greater than the available stock",
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

  if (products.length === 0) {
    return <EmptyCart />;
  }

  // const updateCartItemMutation = useMutation({});

  return (
    <div className="pt-32 w-2/3 mx-auto">
      <div className="pt-10 text-3xl font-semibold pb-10">Shopping Cart</div>
      <hr className="w-full border-t border-gray-300 my-4" />
      {GetCount() > 0 &&
        products.map(({ id, name, displayImage, price, stockQuantity }) => {
          return (
            <div key={id}>
              <div className="pt-10 flex items-center justify-between">
                {/* Left side of shopping cart items */}
                <div className="flex">
                  <img
                    src={displayImage}
                    className="w-44 h-44 p-2"
                    alt="product"
                  />
                  <div className="flex flex-col items-start justify-between px-3 w-40">
                    <div className="truncate" title={name}>
                      {name}
                    </div>
                    <div>
                      {stockQuantity > 0 ? (
                        <div className="text-green-600">In stock</div>
                      ) : (
                        <div className="text-red-600">
                          Sorry , The product is out of stock.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Middle section */}
                <div>
                  <select
                    className="border p-1 rounded-md w-16"
                    value={
                      cartItems.find((item) => item.productId === id)
                        ?.quantity ?? 1
                    }
                    onChange={(e) => HandleSelectQuantity(e, id)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <div
                    className="text-red-600 p-1 hover:cursor-pointer"
                    onClick={() => HandleRemoveItem(id)}
                  >
                    Remove
                  </div>
                </div>
                {/* Right side */}
                <div>Price: ₹{price}</div>
              </div>

              <hr className="w-full border-t border-gray-300 my-4" />
            </div>
          );
        })}
      <div className="flex flex-col items-center justify-center mt-32 border w-2/4 mx-auto p-10">
        <div className="flex items-center justify-between w-full px-4 pt-2">
          <div className="font-thin">Subtotal</div>
          <div>₹{totalCost}</div>
        </div>
        <hr className="w-full border-t border-gray-300 my-4" />
        <div className="flex items-center justify-between w-full px-4 pt-2">
          <div className="font-thin">Shipping</div>
          <div>₹{totalCost > 0 ? 49 : 0}</div>
        </div>
        <hr className="w-full border-t border-gray-300 my-4" />
        <div className="flex items-center justify-between w-full px-4 pt-2">
          <div className="font-thin">Tax</div>
          <div>₹0</div>
        </div>
        <hr className="w-full border-t border-gray-300 my-4" />
        <div className="flex items-center justify-between w-full px-4 pt-2">
          <div className="font-semibold">Order total</div>
          <div>₹{totalCost}</div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <Button className="bg-indigo-600 hover:bg-indigo-500 w-1/2 mx-auto">
          Checkout
        </Button>
      </div>
      <div className="flex justify-center items-center mt-10 font-thin">
        <div className="flex items-center justify-center">
          or
          <span
            className="text-sm text-blue-700 ml-2 hover:cursor-pointer"
            onClick={() => navigate("/home")}
          >
            {" "}
            Continue Shopping →
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
