import {
  AlertTriangle,
  CheckCircle,
  DollarSign,
  MessageCircle,
  RotateCcw,
  Shield,
  Star,
  Truck,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerPolicyPage = () => {
  const navigate = useNavigate();

  const sectionIdPrefix = "seller-policy-section-";

  return (
    <div className="min-h-screen bg-white text-gray-800 mt-16">
      <div className="relative text-gray-800 py-20 px-6 md:px-24 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center mb-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Maalelo Seller Policies
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Please read through our policies carefully. These rules are designed
            to foster a safe, reliable, and successful environment for all
            Maalelo sellers.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="space-y-12">
          <section
            id={`${sectionIdPrefix}1`} // Updated ID
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Shield size={28} className="text-indigo-600" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  1. Product Authenticity
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  All items listed must be genuine and accurately described.
                  Selling counterfeit or misrepresented goods is strictly
                  prohibited and may result in immediate suspension.
                </p>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-800">Pro Tip:</strong> Include
                    clear photos from multiple angles and detailed descriptions
                    of your products to demonstrate authenticity and build buyer
                    trust.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id={`${sectionIdPrefix}2`} // Updated ID
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Truck size={28} className="text-indigo-600" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  2. Shipping & Fulfillment
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Sellers are required to dispatch orders within 48 hours of
                  purchase. Delayed fulfillment may affect your store's
                  visibility and ratings.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <div className="bg-green-50 p-4 rounded-lg flex-1 border border-green-200">
                    <h3 className="font-semibold text-green-800 text-sm uppercase mb-2">
                      Recommended
                    </h3>
                    <p className="text-sm text-green-700">
                      Use Maalelo's integrated shipping partners to ensure
                      faster delivery and real-time tracking.
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg flex-1 border border-red-200">
                    <h3 className="font-semibold text-red-800 text-sm uppercase mb-2">
                      Avoid
                    </h3>
                    <p className="text-sm text-red-700">
                      Delays in updating tracking information or shipping status
                      can lead to customer dissatisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id={`${sectionIdPrefix}3`} // Updated ID
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-gray-100 p-3 rounded-full">
                  <RotateCcw size={28} className="text-indigo-600" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  3. Return & Refunds
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  A minimum 7-day return window must be offered. Refunds should
                  be processed within 5 business days after a returned item is
                  received.
                </p>
                <div className="mt-6 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <div className="px-4 py-3 bg-gray-100 text-xs font-semibold text-gray-700 border-b border-gray-200">
                    RETURN PROCESS TIMELINE
                  </div>
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div className="ml-3 mr-1 flex-grow">
                        <p className="text-sm font-medium text-gray-800">
                          Customer requests return
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">Day 0</p>
                    </div>
                    <div className="ml-4 w-px h-6 bg-gray-300"></div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div className="ml-3 mr-1 flex-grow">
                        <p className="text-sm font-medium text-gray-800">
                          Seller approves return request
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">Within 24 hrs</p>
                    </div>
                    <div className="ml-4 w-px h-6 bg-gray-300"></div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div className="ml-3 mr-1 flex-grow">
                        <p className="text-sm font-medium text-gray-800">
                          Package received by seller
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">Varies</p>
                    </div>
                    <div className="ml-4 w-px h-6 bg-gray-300"></div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div className="ml-3 mr-1 flex-grow">
                        <p className="text-sm font-medium text-gray-800">
                          Refund processed
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Within 5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id={`${sectionIdPrefix}4`} // Updated ID
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-red-100 p-3 rounded-full">
                  <XCircle size={28} className="text-red-600" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  4. Prohibited Listings
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Restricted items include weapons, adult content, endangered
                  species, and prescription drugs. Please refer to our official
                  guidelines for a comprehensive list.
                </p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Weapons",
                    "Adult Content",
                    "Illegal Substances",
                    "Prescription Drugs",
                    "Counterfeit Goods",
                    "Endangered Species",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-red-50 px-3 py-2 rounded-lg border border-red-200"
                    >
                      <XCircle size={16} className="text-red-500 mr-2" />
                      <span className="text-sm text-red-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id={`${sectionIdPrefix}5`} // Updated ID
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-gray-100 p-3 rounded-full">
                  <DollarSign size={28} className="text-indigo-600" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  5. Transparent Pricing
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Pricing must be transparent and include all applicable
                  charges. Hidden fees and misleading price tactics are not
                  permitted.
                </p>
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Price Transparency Checklist:
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Clear display of base product price",
                      "All taxes and additional charges shown before checkout",
                      "Shipping costs visible on product page",
                      "No hidden fees or surprise charges",
                      "Any discount terms clearly explained",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle
                          size={16}
                          className="text-green-600 mt-1 mr-2 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section
            id={`${sectionIdPrefix}6`} // Updated ID
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-gray-100 p-3 rounded-full">
                  <MessageCircle size={28} className="text-indigo-600" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  6. Customer Communication
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Sellers should respond to customer queries within 24 hours and
                  maintain a courteous, professional tone at all times.
                </p>
              </div>
            </div>
          </section>

          <section
            id={`${sectionIdPrefix}7`} // Updated ID
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Star size={28} className="text-indigo-600" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  7. Review Integrity
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Sellers must not manipulate product reviews or ratings through
                  fake accounts or incentives. Violations may lead to account
                  action.
                </p>
                <div className="mt-4 p-4 border-l-4 border-gray-300 bg-gray-50">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-800">Important:</strong> While
                    you can politely request customers to leave honest reviews,
                    offering compensation or incentives for positive reviews
                    violates our policies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id={`${sectionIdPrefix}8`} // Updated ID
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-gray-100 p-3 rounded-full">
                  <AlertTriangle size={28} className="text-gray-600" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  8. Account Enforcement
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Maalelo reserves the right to issue warnings, impose temporary
                  holds, or permanently suspend accounts for policy violations.
                </p>
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Enforcement Levels:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mt-1.5 mr-3"></div>
                      <div>
                        <h4 className="font-medium text-gray-800">Warning</h4>
                        <p className="text-sm text-gray-600">
                          First-time minor violations
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-3 h-3 rounded-full bg-orange-400 mt-1.5 mr-3"></div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Temporary Restriction
                        </h4>
                        <p className="text-sm text-gray-600">
                          Repeated violations or moderate issues
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 mr-3"></div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Account Suspension
                        </h4>
                        <p className="text-sm text-gray-600">
                          Serious violations or persistent non-compliance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-gray-50 py-12 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need Help Understanding Our Policies?
          </h2>
          <p className="text-gray-700 mb-6">
            Our seller support team is available 24/7 to answer your questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => navigate("/seller/contact")}
            >
              Contact Support
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:scale-105">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPolicyPage;
