import { Link } from "react-router-dom";

const PolicyPage = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Our Policies
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Policy
          </h2>
          <p className="text-gray-700 mb-4">
            [**Insert your detailed shipping policy here.** This should include
            information on processing times, shipping methods, estimated
            delivery times, shipping costs, areas we ship to, and any special
            conditions or restrictions. Be clear about handling times versus
            transit times.]
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Processing Time: [e.g., 1-2 business days]</li>
            <li>Shipping Methods: [e.g., Standard, Express]</li>
            <li>
              Estimated Delivery: [e.g., 3-7 business days for standard
              shipping]
            </li>
            <li>
              Shipping Costs: [Link to a dedicated shipping cost page or outline
              costs]
            </li>
            <li>Shipping Areas: [Specify regions or countries]</li>
          </ul>
          <Link to="/contact" className="text-indigo-500 hover:underline">
            Contact us if you have any shipping-related questions.
          </Link>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Return Policy
          </h2>
          <p className="text-gray-700 mb-4">
            [**Insert your detailed return and exchange policy here.** This
            should cover the timeframe for returns, conditions for accepting
            returns (e.g., unused, original packaging), the process for
            initiating a return, options for refunds, exchanges, or store
            credit, and who is responsible for return shipping costs.]
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Return Window: [e.g., 30 days from delivery]</li>
            <li>
              Condition for Returns: [e.g., Unused, in original packaging]
            </li>
            <li>
              How to Initiate a Return: [e.g., Contact customer support, fill
              out a form]
            </li>
            <li>
              Refund Options: [e.g., Full refund to original payment method]
            </li>
            <li>
              Exchange Policy: [Explain if exchanges are offered and the
              process]
            </li>
            <li>
              Return Shipping Costs: [Specify who pays for return shipping]
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4">
            [**Insert a summary of your privacy policy here.** Briefly explain
            what personal information you collect, how you use it, how you
            protect it, and users' rights regarding their data. Link to your
            comprehensive privacy policy for full details.]
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Information We Collect: [e.g., Name, email, address, browsing
              activity]
            </li>
            <li>
              How We Use Your Information: [e.g., To process orders, personalize
              experience]
            </li>
            <li>Data Security: [Briefly mention security measures]</li>
            <li>Your Rights: [e.g., Access, correction, deletion of data]</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Terms & Conditions
          </h2>
          <p className="text-gray-700 mb-4">
            [**Provide a concise overview of your terms and conditions.** This
            should touch upon aspects like website usage, intellectual property,
            product descriptions, pricing, payment terms, disclaimers, and
            governing law. Link to the full terms and conditions for complete
            details.]
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Website Use: [Briefly mention acceptable use]</li>
            <li>Intellectual Property: [e.g., Ownership of content]</li>
            <li>Product Information: [Disclaimer about accuracy]</li>
            <li>Payment Terms: [Outline payment methods]</li>
            <li>Governing Law: [Specify the jurisdiction]</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Track Your Order
          </h2>
          <p className="text-gray-700 mb-4">
            [**Explain how customers can track their orders.** This might
            involve logging into their account, using a tracking number provided
            in their shipping confirmation email, or visiting a dedicated
            tracking page. Provide clear instructions.]
          </p>
          <p className="text-gray-700 mb-4">
            To track your order, please enter your tracking number below:
          </p>
          <div className="mt-2"></div>
          <p className="mt-4 text-gray-700">
            You can also find your tracking information in the shipping
            confirmation email we sent you.
          </p>
          <Link
            to="/orderHistory"
            className="mt-2 text-indigo-500 hover:underline block"
          >
            Go to Order Tracking Page
          </Link>
        </section>
      </div>
    </div>
  );
};

export default PolicyPage;
