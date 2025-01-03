import picture from "../../../assets/bookandpen.jpg";

const PracticleGuide = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-2 bg-gray-50 pb-20 pt-20 ">
      <div className="pl-14 ml-6 mr-6 pr-14 sm:pb-5">
        <img
          src={picture}
          alt="Book and Pen"
          className="rounded-xl shadow-slate-400 transition-transform duration-500 transform hover:scale-110"
        ></img>
      </div>
      <div className="pl-10 sm:pt-10 text-start xs:pt-8 ">
        <button className="border-2 rounded-full pl-2 pr-2 transition-transform duration-500 transform hover:scale-110 ">
          <p className="xs:text-xl ">Latest Port</p>
        </button>
        <p className="pl-2 pr-2 lg:text-4xl pt-4 sm:text-3xl xs:text-2xl py-3">
          Learn to leverage innovative marketing strategies <br></br> Boost the
          visibility of the Ads
        </p>
        <p className="pl-2 pr-2">
          Why It's a Channel Worth Exploring to Grow Your E-commerce Business
        </p>
      </div>
    </div>
  );
};

export default PracticleGuide;
