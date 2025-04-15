import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import exchange from "../../assets/exchange_icon.png";
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
    <div className="overflow-x-hidden font-montserrat">
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

      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md space-y-4">
            <h2 className="text-balance text-3xl md:text-4xl font-bold tracking-tight">
              Discover our Curated Collection
            </h2>
            <p className="text-pretty text-neutral-600">
              Explore our carefully selected products for your home and
              lifestyle.
            </p>
            <a
              href="/shop"
              className="inline-flex h-10 items-center justify-center rounded-full bg-indigo-500 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-2 focus:ring-neutral-950"
            >
              Explore
            </a>
          </div>

          <img
            src="https://files.stripe.com/links/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfaDVvWXowdU9ZbWlobUIyaHpNc1hCeDM200NBzvUjqP"
            alt="Cup of Coffee"
            width={450}
            height={450}
            loading="eager"
            decoding="async"
            className="rounded object-cover w-full h-auto max-w-[450px]"
          />
        </div>
      </section>

      {/* Categories part of the page */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 py-16 md:py-24 mt-10"
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
      </motion.section>
    </div>
  );
};

export default LandingPage;
