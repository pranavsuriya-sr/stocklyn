import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import collage from "../../../assets/landingPageCollage.webp";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-screen pt-28 flex flex-col justify-center px-6 md:px-10">
        <span className="text-3xl md:text-5xl lg:text-6xl font-semibold font-mono">
          Summer styles are finally here
        </span>
        <span className="text-gray-500 py-5 text-lg md:text-xl lg:text-2xl">
          This year, our new summer collection will shelter you from the harsh
          elements of a world that doesn't care if you live or die.
        </span>
        <span>
          <Button
            className="p-6 text-lg"
            variant={"indigo"}
            onClick={() => navigate("/home")} // later change it to /shop
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
  );
};

export default HeroSection;
