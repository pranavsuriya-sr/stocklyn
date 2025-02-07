import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import collage from "../../../assets/landingPageCollage.webp";
import image from "../../../assets/woman-2564660_1280.jpg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="relative w-full pt-20">
        <img
          src={image}
          className="w-full h-[600px] md:h-[750px] lg:h-[850px] object-cover "
          alt="banner"
        />

        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-center text-left text-white bg-black/40 px-6 md:px-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold font-montserrat"
            variants={itemVariants}
          >
            FOR THIS SUMMER
          </motion.h1>

          <motion.p className="mt-2 text-lg md:text-xl" variants={itemVariants}>
            SALE UP TO 40% OFF
          </motion.p>

          <motion.div variants={itemVariants} className="mt-4">
            <Button
              className="px-10 py-6 text-white font-semibold text-lg rounded-lg"
              variant={"indigo"}
              onClick={() => navigate("/shop")}
            >
              Shop Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-screen pt-28 flex flex-col justify-center px-6 md:px-10 font-montserrat">
          <span className="text-3xl md:text-5xl lg:text-6xl font-montserrat ">
            Summer styles are finally here
          </span>
          <span className="text-gray-500 py-5 text-lg md:text-xl lg:text-2xl font-montserrat">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn't care if you live or die.
          </span>
          <span>
            <Button
              className="p-6 text-lg"
              variant={"indigo"}
              onClick={() => navigate("/shop")}
            >
              Shop Collection
            </Button>
          </span>
        </div>

        <div className="w-full lg:w-1/2 h-1/2 lg:h-screen pt-10 lg:pt-28 px-6 md:px-10 flex items-center justify-center">
          <img
            src={collage}
            alt="Collage"
            className="rounded-lg shadow-sm max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
