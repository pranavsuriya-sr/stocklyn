import collage from "../../../assets/landingPageCollage.webp";

const HeroSection = () => {
  return (
    <div>
      <div className="flex w-[90%] mx-auto border-2">
        <div className="w-1/2  h-screen pt-28 flex flex-col justify-center px-10">
          <span className="text-6xl font-semibold font-mono">
            {" "}
            Summer styles are finally here
          </span>
          <span className="text-gray-500 py-5 text-2xl">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn't care if you live or die.
          </span>
          <span>
            <button className="bg-blue-600 p-3 rounded-lg text-white">
              Shop Collection
            </button>
          </span>
        </div>
        <div className="w-1/2 h-1/2 pt-28">
          <img src={collage}></img>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
