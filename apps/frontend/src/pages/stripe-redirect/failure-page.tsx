import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10 md:p-12 md:flex">
        <div className="md:w-2/5 md:pr-8 lg:pr-12 md:border-r md:border-gray-200 flex flex-col justify-center items-center text-center">
          <XCircleIcon className="h-20 w-20 sm:h-24 sm:w-24 text-red-500 mx-auto animate-pulse" />
          <h1 className="mt-6 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Payment Failed
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
            Unfortunately, we couldn't process your payment. Please check your
            details and try again.
          </p>
        </div>

        <div className="md:w-3/5 md:pl-8 lg:pl-12 mt-10 md:mt-0">
          <div className="pt-0 md:pt-0">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 text-center md:text-left mb-4 sm:mb-6">
              What to do next?
            </h3>
            <div className="space-y-5">
              <div className="flex items-start">
                <CreditCardIcon className="h-6 w-6 sm:h-7 sm:w-7 text-red-600 mr-3 sm:mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium sm:font-semibold text-gray-800 text-sm sm:text-base">
                    Check your payment information
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Ensure your card details, expiry date, and CVV are correct.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <ArrowPathIcon className="h-6 w-6 sm:h-7 sm:w-7 text-red-600 mr-3 sm:mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium sm:font-semibold text-gray-800 text-sm sm:text-base">
                    Try a different payment method
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Sometimes, trying another card or payment option can help.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <ChatBubbleLeftRightIcon className="h-6 w-6 sm:h-7 sm:w-7 text-red-600 mr-3 sm:mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium sm:font-semibold text-gray-800 text-sm sm:text-base">
                    Contact Support
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    If the problem persists, please get in touch with our
                    support team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col lg:flex-row lg:justify-start gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/checkout")}
              className="w-full lg:w-auto inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Try Payment Again
            </button>
            <button
              onClick={() => navigate("/contact-support")}
              className="w-full lg:w-auto inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 border border-gray-300 text-sm sm:text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
