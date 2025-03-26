import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import picture from "../../assets/bookandpen.jpg";
import exchange from "../../assets/exchange_icon.png";
import collage from "../../assets/landingPageCollage.webp";
import quality from "../../assets/quality_icon.png";
import support from "../../assets/support_img.png";
import image from "../../assets/woman-2564660_1280.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">
      {/* hero section part : - >  */}
      <motion.div
        className="relative w-full h-screen pt-16"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <img
          src={image}
          className="w-full h-full object-cover object-center"
          alt="Fashionable woman enjoying summer"
        />

        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-6 md:px-16 bg-gradient-to-r from-black/60 to-black/20"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-tight text-indigo-400"
            variants={itemVariants}
          >
            Summer <span className="text-white">Essentials</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-2xl text-gray-200"
            variants={itemVariants}
          >
            Discover our curated collection with up to 40% off
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <Button
              className="px-12 py-7 text-lg font-medium rounded-lg hover:scale-105 transition-transform"
              variant={"indigo"}
              onClick={() => navigate("/shop")}
            >
              Shop Now
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Collection part of the page */}
      <motion.section
        className="flex flex-col lg:flex-row min-h-screen"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-0">
          <motion.span
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
            variants={itemVariants}
          >
            Summer Styles Are Finally Here
          </motion.span>

          <motion.span
            className="text-gray-600 py-6 text-lg md:text-xl lg:text-2xl leading-relaxed"
            variants={itemVariants}
          >
            Our new collection blends comfort with style to keep you looking
            fresh all season long. Designed for those who want to stand out.
          </motion.span>

          <motion.div variants={itemVariants}>
            <Button
              className="px-10 py-6 text-lg hover:scale-105 transition-transform"
              variant={"indigo"}
              onClick={() => navigate("/shop")}
            >
              Explore Collection
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16"
          variants={fadeIn}
        >
          <img
            src={collage}
            alt="Summer collection collage"
            className="rounded-xl shadow-lg w-full max-w-2xl hover:shadow-xl transition-shadow duration-300"
          />
        </motion.div>
      </motion.section>

      {/* Categories part of the page */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-0"
            variants={itemVariants}
          >
            Shop by Category
          </motion.h2>

          <motion.button
            className="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base transition-colors flex items-center"
            onClick={() => navigate("/home")}
            variants={itemVariants}
          >
            Browse all categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {[
            {
              img: "https://i.imgur.com/KjOYhYn.jpeg",
              title: "New Arrivals",
              className: "hover:scale-[1.02]",
            },
            {
              img: "https://i.imgur.com/7p9nZpJ.jpeg",
              title: "Trending Now",
              className: "hover:scale-[1.02]",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-md"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <img
                src={item.img}
                alt={item.title}
                className={`w-full h-full object-cover transition-all duration-500 ${item.className}`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-end p-6">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Blog part of the page , */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 py-16 md:py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
            <img
              src={picture}
              alt="Marketing strategies"
              className="rounded-xl shadow-lg w-full hover:shadow-xl transition-shadow duration-300"
            />
          </motion.div>

          <motion.div className="w-full lg:w-1/2" variants={containerVariants}>
            <motion.span
              className="inline-block border-2 border-indigo-600 rounded-full px-5 py-2 text-indigo-600 mb-6 hover:bg-indigo-600 hover:text-white transition-colors"
              variants={itemVariants}
            >
              Latest Post
            </motion.span>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              Leverage AI for Innovative Marketing Strategies
            </motion.h2>

            <motion.p
              className="text-gray-600 text-lg mb-8"
              variants={itemVariants}
            >
              Discover how artificial intelligence can transform your e-commerce
              business and boost ad visibility.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4"
              >
                Read More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features is below , {*/}
      <motion.section
        className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-16"
          variants={containerVariants}
        >
          {[
            {
              icon: exchange,
              title: "Easy Exchange",
              description: "Hassle-free exchange policy within 14 days",
            },
            {
              icon: quality,
              title: "Quality Guarantee",
              description: "7-day free return on all products",
            },
            {
              icon: support,
              title: "24/7 Support",
              description: "Dedicated customer service team",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 hover:bg-gray-50 rounded-xl transition-colors"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto text-center bg-indigo-50 rounded-xl p-8 md:p-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Subscribe & Get 20% Off
          </h2>
          <p className="text-gray-600 mb-6">
            Join our newsletter for exclusive deals and updates
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              className="px-8 py-3 text-lg hover:scale-105 transition-transform"
              variant={"indigo"}
            >
              Subscribe
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
