import HeroSection from "./sections/hero-section";
import MonthlyNewsLetter from "./sections/monthly-news-letter";
import PracticleGuide from "./sections/practicle-guide";
import ShopByCategory from "./sections/shop-by-category";

const LandingPage = () => {
  return (
    <div className="">
      <HeroSection />
      <ShopByCategory />
      <PracticleGuide />
      <MonthlyNewsLetter />
    </div>
  );
};
export default LandingPage;
