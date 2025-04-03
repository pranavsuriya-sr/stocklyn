interface ProductCardProps {
  name: string;
  imgSrc: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imgSrc, name, price }) => {
  // onClick={() => console.log("Added to cart:", name)}
  return (
    <div className="w-64 h-96 border border-gray-200 rounded-xl shadow hover:shadow-md transition transform hover:-translate-y-1 duration-300 flex flex-col bg-white hover:cursor-pointer">
      <div className="h-1/2 flex items-center justify-center overflow-hidden">
        <img
          loading="lazy"
          src={imgSrc}
          alt={`${name} image`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex flex-col flex-grow p-3">
        <h3 className="text-lg font-semibold text-gray-800 text-center line-clamp-2 h-[3.5rem]">
          {name}
        </h3>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3 justify-center">
            <span className="text-xl font-bold text-gray-900">
              ₹{price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm line-through">
              ₹{(price * 1.2).toLocaleString()}
            </span>
            <span className="text-green-600 text-sm font-medium">
              (20% off)
            </span>
          </div>

          <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition duration-200">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
