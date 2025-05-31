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
  const descriptionTemplates = [
    "Discover the essence of {item} with {name} – a testament to quality, innovation, and performance, designed to elevate your everyday.",
    "Unveil unmatched value and cutting-edge features with {name}, your next indispensable {item}.",
    "{name} seamlessly blends sleek design with powerful {item} capabilities, transforming your experience.",
    "Elevate your lifestyle with {name}, a premium {item} meticulously crafted for excellence in every detail.",
    "{name} redefines the pinnacle of {item} standards – versatile, dependable, and uniquely yours.",
    "Introducing {name}: the {item} that masterfully balances style, substance, and intelligent functionality.",
    "Whether at home or on the move, {name} is the definitive {item} for unparalleled convenience and confidence.",
    "Experience {name}, a {item} engineered to harmonize with your pace, meet your needs, and exceed expectations.",
    "Unlock your potential with {name}, a dynamic {item} built to fuel your ambitions and inspire greatness.",
    "{name} is where innovation meets elegance, making it the ultimate {item} for sophisticated modern living.",
    "Crafted for the discerning individual, {name} offers a superior {item} experience that's second to none.",
    "Step into the future with {name}, an advanced {item} that pushes the boundaries of what's possible.",
    "Simplicity, elevated. {name} delivers a pure and powerful {item} experience without the complexity.",
    "For those who demand the best, {name} is the {item} that delivers on every promise of quality and style.",
    "Make a statement with {name}, the {item} that's as unique and bold as you are.",
  ];

  const templateIndex = name.length % descriptionTemplates.length;
  let description = descriptionTemplates[templateIndex]
    .replace("{name}", name)
    .replace("{item}", String(item));

  const targetLength = 100;
  if (description.length > targetLength) {
    description = description.substring(0, targetLength - 3) + "...";
  }

  const originalPrice = price * 1.2;
  const discountPercentage = 20;

  return (
    <div className="w-full sm:w-72 h-[440px] border border-gray-200 rounded-xl shadow hover:shadow-md transition transform hover:-translate-y-1 duration-300 flex flex-col bg-white hover:cursor-pointer mx-auto">
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
          <div className="text-gray-500">{description}</div>
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
