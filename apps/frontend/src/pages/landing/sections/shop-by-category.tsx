const ShopByCategory = () => {
  return (
    <div>
      <div className="flex justify-between mt-10 p-10 ">
        <span className="text-3xl font-bold font-mono">Shop here</span>
        <span className="Shop here ">
          <button className="text-violet-700">browse all categories→</button>
        </span>
      </div>

      <div className="flex mt-10 pt-10 bg-gray-100">
        <div className="flex flex-col h-screen w-1/2 justify-center items-center ">
          <img
            src="https://i.imgur.com/KjOYhYn.jpeg"
            className="transition-transform duration-300 ease-in-out hover:brightness-75 h-auto w-3/4 rounded-md hover:shadow-2xl "
          ></img>
          <span className="text-3xl text-gray-600 font-semibold">
            New Arrivals
          </span>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://i.imgur.com/7p9nZpJ.jpeg"
            className=" transition-transform duration-300 ease-in-out hover:brightness-75 border rounded-xl hover:shadow-2xl mb-10"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
