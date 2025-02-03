interface ProductCardProps {
  name: string;
  imgSrc: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imgSrc, name, price }) => {
  return (
    <div className="w-64 h-96 border border-gray-200 rounded-xl shadow hover:shadow-md transition transform hover:-translate-y-1 duration-300 flex flex-col bg-white hover:cursor-pointer">
      <div className="h-1/2 flex items-center justify-center overflow-hidden">
        <img
          src={imgSrc}
          alt={`${name} image`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex flex-col flex-grow p-3">
        <h3 className="text-xl font-thin  text-gray-800 text-center line-clamp-2">
          {name}
        </h3>
        <p className="mt-2 text-center font-bold">
          ₹<span className=" font-montserrat">{price}</span>
        </p>

        <button
          onClick={() => console.log("Added to cart:", name)}
          className="mt-auto py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition duration-200"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
