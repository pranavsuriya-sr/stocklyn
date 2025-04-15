import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import React from "react";

interface ProductCardProps {
  name: string;
  imgSrc: string;
  price: number;
  onBuyNowClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ imgSrc, name, price }) => {
  const originalPrice = price * 1.2;
  const discountPercentage = 20;

  return (
    <div className="w-60 h-[400px] border border-gray-200 rounded-xl shadow hover:shadow-md transition transform hover:-translate-y-1 duration-300 flex flex-col bg-white hover:cursor-pointer">
      <div className="h-1/2 flex items-center justify-center overflow-hidden p-2">
        <img
          loading="lazy"
          src={imgSrc}
          alt={`${name} image`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-base font-semibold text-gray-800 text-center line-clamp-2 h-12 mb-2">
          {name}
        </h3>
        <div className="mt-auto">
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-lg font-bold text-gray-900">
              ₹{price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ₹
              {originalPrice.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="text-xs font-semibold text-green-800 bg-green-100 px-1.5 py-0.5 rounded-md">
              {discountPercentage}% OFF
            </span>
          </div>
          <Button
            className="w-full bg-white hover:bg-gray-100 text-slate-700 border border-slate-300 text-sm font-medium px-4 py-2 rounded-md shadow-sm"
            size="sm"
          >
            <ShoppingCart size={16} className="mr-2" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
