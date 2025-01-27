import { useNavigate } from "react-router-dom";

const ShopByCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 sm:p-10">
      <div className="flex flex-col sm:flex-row justify-between mt-5 sm:mt-10">
        <span className="text-2xl sm:text-3xl font-bold font-mono">
          Shop here by category
        </span>
        <button
          className="text-violet-700 text-sm sm:text-base mt-3 sm:mt-0"
          onClick={() => navigate("/home")}
        >
          Browse all categories →
        </button>
      </div>

      <div className="flex flex-col lg:flex-row mt-10 pt-10 bg-gray-100">
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-center mb-10 lg:mb-0">
          <img
            src="https://i.imgur.com/KjOYhYn.jpeg"
            alt="New Arrivals"
            className="transition-transform duration-300 ease-in-out hover:brightness-75 h-auto w-3/4 lg:w-2/3 rounded-md hover:shadow-2xl"
          />
          <span className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-semibold mt-5">
            New Arrivals
          </span>
        </div>

        <div className="flex justify-center items-center w-full lg:w-1/2">
          <img
            src="https://i.imgur.com/7p9nZpJ.jpeg"
            alt="Shop Category"
            className="transition-transform duration-300 ease-in-out hover:brightness-75 border rounded-xl hover:shadow-2xl w-3/4 lg:w-2/3 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
