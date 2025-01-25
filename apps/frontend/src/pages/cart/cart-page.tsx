import { Button } from "@/components/ui/button";
import { useCartStore } from "@/utils/store/cart-store";

const Cart = () => {
  const { products } = useCartStore();
  const { GetCount } = useCartStore();
  const { cartItems } = useCartStore();

  console.log(products);

  return (
    <div className="pt-20 px-24">
      <div className="pt-10 text-3xl font-semibold">Shopping Cart</div>
      {GetCount() > 0 &&
        products.map(({ id, displayImage, price }) => {
          return (
            <div className="pt-10 flex items-center justify-between" key={id}>
              {/*This is the left side of the shopping cart items*/}
              <div>
                <img src={displayImage} className="w-40 h-40"></img>
              </div>
              {/*This is the MIDDLE  of the shopping cart items*/}
              <div>
                <div>
                  Quantity :{" "}
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
              </div>
              {/*This is the right side of the shopping cart items*/}
              <div>Price: ₹{price}</div>
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
          <div className="font-thin">Tax</div>
          <div>₹0</div>
        </div>
        <hr className="w-full border-t border-gray-300 my-4" />
        <div className="flex items-center justify-between w-full px-4 pt-2">
          <div className="font-semibold">Order total</div>
          <div>₹100</div>
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
          <span className="text-sm text-blue-700 ml-2">
            {" "}
            Continue Shopping →
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
