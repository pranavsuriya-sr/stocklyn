const MonthlyNewsLetter = () => {
  return (
    <div className="p-6">
      <div className="bg-black rounded-lg p-6 md:p-10 md:flex justify-between items-center gap-4">
        {/* Text Section */}
        <div className="mb-4 md:mb-0">
          <p className="text-white text-xl md:text-3xl font-semibold text-center md:text-left">
            Subscribe to our monthly newsletter
          </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your Email"
            className="font-serif rounded-full px-4 py-2 w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyNewsLetter;
