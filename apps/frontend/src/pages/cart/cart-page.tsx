import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-context";
import { useCartStore } from "@/utils/store/cart-store";
import React, { useEffect, useState } from "react";

const { RemoveCartItem } = useCartStore.getState();

const Cart = () => {
  const { products } = useCartStore();
  const { GetCount } = useCartStore();
  const { user } = useSession();

  const [totalCost, setTotalCost] = useState(0);

  const { cartItems } = useCartStore();

  useEffect(() => {
    const CalculateTotalCost = () => {};
    try {
      if (products.length !== cartItems.length) {
        throw new Error("Products and cart items length mismatch");
      }

      const cost = products.reduce((acc, product, index) => {
        return acc + product.price * cartItems[index].quantity;
      }, 0);

      setTotalCost(cost);
    } catch (error) {
      console.log(error);
    }

    CalculateTotalCost();
  }, [cartItems, products]);

  const HandleRemoveItem = async (productId: string) => {
    await RemoveCartItem(user?.cart.id, productId);
  };

  const HandleSelectQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    currentProductId: string
  ) => {
    const requiredQuantity = Number(e.target.value);

    const getAvailableQuantityOfProduct = cartItems.find(
      (item) => item.productId === currentProductId
    );

    if (
      getAvailableQuantityOfProduct === undefined ||
      getAvailableQuantityOfProduct === null
    ) {
      console.log("Undefined productId at cart-page");
      return;
    }

    if (requiredQuantity >= getAvailableQuantityOfProduct.quantity) {
      //working , continue from here later
      console.log("lol");
      return;
    }
  };

  return (
    <div className="pt-32 w-2/3 mx-auto">
      <div className="pt-10 text-3xl font-semibold pb-10">Shopping Cart</div>
      <hr className="w-full border-t border-gray-300 my-4" />
      {GetCount() > 0 &&
        products.map(({ id, name, displayImage, price }) => {
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
                    <div className="text-green-600">In stock</div>
                  </div>
                </div>
                {/* Middle section */}
                <div>
                  <select
                    className="border p-1 rounded-md w-16"
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
          <div>₹100</div>
        </div>
        <hr className="w-full border-t border-gray-300 my-4" />
        <div className="flex items-center justify-between w-full px-4 pt-2">
          <div className="font-thin">Shipping</div>
          <div>₹0</div>
        </div>
        <hr className="w-full border-t border-gray-300 my-4" />
        <div className="flex items-center justify-between w-full px-4 pt-2">
          <div className="font-thin">Shipping</div>
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
          <span className="text-sm text-blue-700 ml-2 hover:cursor-pointer">
            {" "}
            Continue Shopping →
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
