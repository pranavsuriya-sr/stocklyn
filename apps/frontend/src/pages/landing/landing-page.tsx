import HeroSection from "./sections/hero-section";
import ShopByCategory from "./sections/shop-by-category";

const LandingPage = () => {
  return (
    <div className="w-[90%] mx-auto border-2">
      <HeroSection />
      <ShopByCategory />
    </div>
  );
};
export default LandingPage;
