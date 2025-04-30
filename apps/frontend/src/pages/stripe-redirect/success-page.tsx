import { CheckCircleIcon } from "@heroicons/react/24/solid";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <CheckCircleIcon className="h-20 w-20 text-emerald-600 mx-auto animate-bounce" />
          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your purchase! Your transaction is complete.
          </p>
        </div>
        //this is success page

        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                What happens next?
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                  Your order is being processed
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                  Check your order any time in your account
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                  Recieve your products at your doorstep
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
