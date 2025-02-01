import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mx-auto animate-bounce">
          <svg
            className="h-24 w-24 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-montserrat font-bold text-gray-900">
            Your Cart Feels Lonely
          </h2>
          <p className="text-lg font-montserrat text-gray-500">
            Your shopping cart is empty. Let's fill it with your favorite items!
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 transform hover:scale-105"
            onClick={() => navigate("/home")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Start Shopping
          </button>
        </div>

        {/* Optional: Fun Illustration */}
        {/* <img src="/empty-cart-illustration.svg" className="mt-12 mx-auto h-48" alt="Empty cart" /> */}
      </div>
    </div>
  );
};

export default EmptyCart;
