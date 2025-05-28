import landingPage from "@/assets/landingPage1.png";

const SampleLandingPage = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gray-100 mt-16">
      <img
        src={landingPage}
        alt="Maalelo platform interface"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      <div className="relative z-10 flex flex-col items-start p-8 md:p-16 lg:p-24 max-w-7xl w-full">
        <div className="md:w-1/2 lg:w-2/5 xl:w-1/3">
          <h1 className="text-gray-800 text-5xl sm:text-6xl md:text-7xl font-thin tracking-tight mb-4">
            Maalelo
          </h1>
          <p className="text-gray-700 text-2xl sm:text-3xl font-light mb-6">
            Your Next Favorite Find Awaits.
          </p>
          <p className="text-gray-600 text-lg font-light mb-10 leading-relaxed">
            Explore a world of unique products and amazing deals on Maalelo.
            Shop with confidence and discover something new today!
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="bg-indigo-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 text-base shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              Get Started Free
            </a>
            <a
              href="#"
              className="bg-transparent text-gray-700 font-medium py-2.5 px-6 rounded-lg border border-gray-400 hover:bg-gray-100 hover:border-gray-500 transition duration-300 ease-in-out text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleLandingPage;
