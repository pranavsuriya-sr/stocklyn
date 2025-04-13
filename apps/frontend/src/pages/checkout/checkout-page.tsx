import { paymentRoute } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-context";
import { useCartStore } from "@/utils/store/cart-store";
import { loadStripe } from "@stripe/stripe-js";

const CheckOut = () => {
  const { user } = useSession();
  const { cartItems } = useCartStore();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const makePayement = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const response = await paymentRoute.post("/create-checkout-session", {
      cartItems,
      user,
    });
    console.log(response);
    const session = await response.data;
    const result = stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    console.log(result);
  };

  return (
    <div className="min-h-screen mt-28 px-4 flex justify-center">
      <div className="w-full max-w-xl">
        <h2 className="text-4xl font-extrabold mb-6">Checkout</h2>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <hr className="mb-4" />

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.displayImage}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <hr className="my-4" />
          <div className="flex justify-between text-lg font-medium">
            <span>Subtotal</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="mt-6 w-full  text-white py-3 text-lg font-semibold rounded-xl transition"
          variant={"indigo"}
          onClick={() => makePayement()}
        >
          Pay ₹{totalAmount.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default CheckOut;
