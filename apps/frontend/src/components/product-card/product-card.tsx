interface ProductCardProps {
  name: string;
  imgSrc: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imgSrc, name, price }) => {
  return (
    <div className="w-64 h-96 p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:cursor-pointer transition-all duration-300 flex flex-col justify-between bg-white hover:scale-105 transform-gpu mt-4">
      <div className="h-48 flex items-center justify-center overflow-hidden rounded-lg">
        <img
          src={imgSrc}
          alt={`${name} image`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 text-center line-clamp-2">
          {name}
        </h3>
        <p className="text-gray-600 text-lg font-medium mt-2">₹{price}</p>
      </div>

      {/* Add to Cart Button (Optional) */}
      {/* <button
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        onClick={() => console.log("Added to cart:", name)}
      >
        Add to Cart
      </button> */}
    </div>
  );
};

export default ProductCard;
