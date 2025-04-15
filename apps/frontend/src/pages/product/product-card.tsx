import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import React from "react";

interface ProductCardProps {
  name: string;
  imgSrc: string;
  price: number;
  item: String;
  onBuyNowClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imgSrc,
  name,
  price,
  item,
}) => {
  const descriptions = [
    `${name} is the perfect ${item} of quality, innovation, and performance—designed to elevate your everyday life.`,
    `Discover unmatched value and cutting-edge features with ${name}, your next favorite ${item}.`,
    `${name} brings together sleek design and powerful ${item} capabilities to enhance your experience.`,
    `Upgrade your lifestyle with ${name}, a ${item} built to deliver excellence in every detail.`,
    `${name} redefines what a premium ${item} should be—versatile, reliable, and made for you.`,
    `Meet ${name}, the ${item} that balances style, substance, and smart functionality effortlessly.`,
    `Whether at home or on the go, ${name} is your go-to ${item} for convenience and confidence.`,
    `With ${name}, experience a ${item} that’s crafted to match your pace, needs, and expectations.`,
    `Unleash your potential with ${name}, a ${item} designed to keep up with your ambitions.`,
    `${name} combines innovation and elegance, making it the ultimate ${item} for modern living.`,
  ];

  const randomDescription = descriptions[
    Math.floor(Math.random() * descriptions.length)
  ].slice(0, 64);

  const originalPrice = price * 1.2;
  const discountPercentage = 20;

  return (
    <div className="w-72 h-[440px] border border-gray-200 rounded-xl shadow hover:shadow-md transition transform hover:-translate-y-1 duration-300 flex flex-col bg-white hover:cursor-pointer">
      <div className="h-1/2 flex items-center justify-center overflow-hidden p-2">
        <img
          loading="lazy"
          src={imgSrc}
          alt={`${name} image`}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-base font-semibold text-gray-800 text-center line-clamp-2 h-12 mb-2">
          {name}
        </h3>
        <div>
          <div className="text-gray-500">
            {randomDescription}
            ...
          </div>
        </div>
        <hr className="mt-1 mb-2" />

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
