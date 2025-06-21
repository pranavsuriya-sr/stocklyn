import { Link } from "react-router-dom";

const PolicyPage = () => {
  const PlaceholderText = ({ children }: { children: React.ReactNode }) => (
    <p className="italic text-gray-500 bg-yellow-50 border border-yellow-200 p-3 rounded-md my-4">
      {children}
    </p>
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20 font-montserrat">
      <header className="bg-gray-50 text-gray-800 py-16 md:py-20 border-b border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4 text-gray-900">
            Our Policies
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
            Understand our operational guidelines, including shipping, returns,
            privacy, and terms of service.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-3">
            Shipping Policy
          </h2>
          <PlaceholderText>
            At trazor, we are committed to delivering your products in a timely
            and efficient manner. Our shipping policy is designed to be
            transparent and easy to understand.
            <br />
            <br />
            <strong>Order Processing:</strong>
            All orders are processed within 1-3 business days (excluding
            weekends and holidays) after receiving your order confirmation
            email. You will receive another notification when your order has
            shipped.
            <br />
            <br />
            <strong>Domestic Shipping (Within India):</strong>
            We offer standard and express shipping options for domestic orders.
            Delivery times typically range from 3-7 business days for standard
            shipping and 1-3 business days for express shipping, depending on
            your location. Shipping costs are calculated at checkout based on
            the weight and dimensions of your order and your chosen shipping
            method. Free standard shipping is available for orders over ₹999.
            <br />
            <br />
            <strong>International Shipping:</strong>
            We currently ship to select international destinations.
            International shipping costs and delivery times vary depending on
            the destination country and chosen shipping carrier. Please note
            that international orders may be subject to import duties, taxes,
            and customs processing fees, which are the responsibility of the
            recipient. Estimated delivery for international orders is typically
            7-21 business days.
            <br />
            <br />
            <strong>Potential Delays:</strong>
            While we strive to meet these timelines, please note that high order
            volumes, postal service disruptions, or unforeseen circumstances
            (such as extreme weather) may occasionally cause delays. We
            appreciate your understanding in such situations.
            <br />
            <br />
            <strong>Tracking Your Order:</strong>
            Once your order has shipped, you will receive an email notification
            from us which will include a tracking number you can use to check
            its status. Please allow 48 hours for the tracking information to
            become available.
          </PlaceholderText>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 pl-2">
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
          <Link
            to="/contact"
            className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Contact us if you have any shipping-related questions.
          </Link>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-3">
            Return Policy
          </h2>
          <PlaceholderText>
            [**Insert your detailed return and exchange policy here.** This
            should cover the timeframe for returns, conditions for accepting
            returns (e.g., unused, original packaging), the process for
            initiating a return, options for refunds, exchanges, or store
            credit, and who is responsible for return shipping costs.]
          </PlaceholderText>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 pl-2">
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

        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-3">
            Privacy Policy
          </h2>
          <PlaceholderText>
            [**Insert a summary of your privacy policy here.** Briefly explain
            what personal information you collect, how you use it, how you
            protect it, and users' rights regarding their data. Link to your
            comprehensive privacy policy for full details.]
          </PlaceholderText>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 pl-2">
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

        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-3">
            Terms & Conditions
          </h2>
          <PlaceholderText>
            [**Provide a concise overview of your terms and conditions.** This
            should touch upon aspects like website usage, intellectual property,
            product descriptions, pricing, payment terms, disclaimers, and
            governing law. Link to the full terms and conditions for complete
            details.]
          </PlaceholderText>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 pl-2">
            <li>Website Use: [Briefly mention acceptable use]</li>
            <li>Intellectual Property: [e.g., Ownership of content]</li>
            <li>Product Information: [Disclaimer about accuracy]</li>
            <li>Payment Terms: [Outline payment methods]</li>
            <li>Governing Law: [Specify the jurisdiction]</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-3">
            Track Your Order
          </h2>
          <PlaceholderText>
            [**Explain how customers can track their orders.** This might
            involve logging into their account, using a tracking number provided
            in their shipping confirmation email, or visiting a dedicated
            tracking page. Provide clear instructions.]
          </PlaceholderText>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You can find your tracking information in the shipping confirmation
            email we sent you, or visit our dedicated tracking page.
          </p>
          <Link
            to="/orderHistory"
            className="mt-2 inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm leading-tight uppercase rounded-md shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Go to Order Tracking
          </Link>
        </section>
      </main>
    </div>
  );
};

export default PolicyPage;
