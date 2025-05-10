import {
  FileText,
  HeadphonesIcon,
  Rocket,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerAboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-800 leading-relaxed font-montserrat">
      <header className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white py-24 md:py-32 shadow-xl relative overflow-hidden">
        <div className="container mx-auto px-6 text-center z-10 relative">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Partner with <span className="text-yellow-300">Maalelo</span> &
            <br className="hidden md:block" /> Grow Your Business
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
            Join a vibrant marketplace dedicated to empowering sellers and
            helping them thrive.
          </p>
          <button
            className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-indigo-800 font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
            onClick={() => navigate("/seller/sell")}
          >
            Start Selling Today
          </button>
        </div>

        <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500 rounded-full opacity-20"></div>
      </header>

      <main className="container mx-auto px-6 py-20 md:py-28">
        <section className="mb-24">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-indigo-700 mb-4">
              Our Mission: Your Success
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              At Maalelo, our mission is to provide a dynamic and supportive
              platform where sellers can connect with buyers, showcase their
              products, and grow sustainably. We believe in partnerships that
              create value and success.
            </p>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-4">
            Why Sell on <span className="text-blue-500">Maalelo</span>?
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Rocket size={28} />,
                color: "bg-indigo-100 text-indigo-600",
                title: "Expansive Customer Reach",
                description:
                  "Tap into Maalelo's community of buyers actively searching for quality products.",
              },
              {
                icon: <Wrench size={28} />,
                color: "bg-blue-100 text-blue-600",
                title: "Powerful Seller Tools",
                description:
                  "Use intuitive tools and analytics to optimize operations and drive sales.",
              },
              {
                icon: <HeadphonesIcon size={28} />,
                color: "bg-emerald-100 text-emerald-600",
                title: "Dedicated Support",
                description:
                  "Get expert support anytime to ensure smooth operations and success.",
              },
              {
                icon: <TrendingUp size={28} />,
                color: "bg-purple-100 text-purple-600",
                title: "Growth Opportunities",
                description:
                  "Take advantage of campaigns and promotions to expand your business.",
              },
              {
                icon: <FileText size={28} />,
                color: "bg-rose-100 text-rose-600",
                title: "Transparent Policies",
                description:
                  "We ensure fair, clear policies so you always know where you stand.",
              },
              {
                icon: <Users size={28} />,
                color: "bg-amber-100 text-amber-600",
                title: "Community & Collaboration",
                description:
                  "Engage with like-minded sellers, share ideas, and grow together.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full mb-6 ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-12 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 left-10 w-36 h-36 bg-indigo-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-12 right-10 w-48 h-48 bg-blue-300 rounded-full opacity-20"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-indigo-700 mb-10">
                Getting Started is Easy
              </h2>
              <div className="grid md:grid-cols-3 gap-10">
                {["Sign Up", "List Products", "Start Selling"].map(
                  (step, i) => (
                    <div
                      key={step}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="bg-white p-6 rounded-full shadow-lg mb-4 hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl font-bold text-indigo-600">
                          {i + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                        {step}
                      </h3>
                      <p className="text-gray-600 max-w-xs">
                        {i === 0 &&
                          "Create your seller account in just a few minutes."}
                        {i === 1 &&
                          "List your products quickly using our user-friendly tools."}
                        {i === 2 &&
                          "Start reaching customers and growing your store."}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">
            Our Commitment to You
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We're dedicated to your success—offering transparency, tools,
            community, and support to help you thrive as a seller on Maalelo.
          </p>
        </section>

        <section className="py-20 md:py-28 bg-gray-50 mt-10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-indigo-700 mb-4">
              What Our Sellers Say
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  quote:
                    "Maalelo has been a game-changer for our small business. The platform is easy to use and we've seen a significant increase in sales!",
                  author: "Jane Doe",
                  store: "Crafty Creations",
                },
                {
                  quote:
                    "The support team is fantastic! They are always responsive and helpful, which makes selling on Maalelo a breeze.",
                  author: "John Smith",
                  store: "Tech Gadgets Co.",
                },
                {
                  quote:
                    "We love the community aspect and the various tools available. Maalelo truly helps us grow and reach new customers.",
                  author: "Alice Brown",
                  store: "Gourmet Goods",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl border border-gray-200 transition-all duration-300 flex flex-col items-center"
                >
                  <p className="text-gray-600 italic mb-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {testimonial.author}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.store}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerAboutPage;
