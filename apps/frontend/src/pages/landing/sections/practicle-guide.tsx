import picture from "../../../assets/bookandpen.jpg";

const PracticleGuide = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-50 pb-10 lg:pb-20 pt-10 lg:pt-20">
      <div className="px-6 lg:px-14">
        <img
          src={picture}
          alt="Book and Pen"
          className="rounded-xl shadow-slate-400 transition-transform duration-500 transform hover:scale-110 max-w-full h-auto"
        />
      </div>

      <div className="px-6 lg:px-10 text-start">
        <button className="border-2 rounded-full px-4 py-2 transition-transform duration-500 transform hover:scale-110">
          <p className="text-md lg:text-xl">Latest Post</p>
        </button>
        <p className="pt-4 text-xl sm:text-2xl lg:text-4xl py-3">
          Learn to leverage innovative marketing strategies using AI
          <br />
          Boost the visibility of the Ads
        </p>
        <p className="text-sm sm:text-base lg:text-lg">
          Why It's a Channel Worth Exploring to Grow Your E-commerce Business
        </p>
      </div>
    </div>
  );
};

export default PracticleGuide;
