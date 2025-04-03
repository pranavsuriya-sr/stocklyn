import { Button } from "@/components/ui/button";
import { ProductsType } from "@/types/product-type";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Star } from "lucide-react";
import { useMemo } from "react";

const possibleBrands = ["maalelo exclusive", "maalelo"];

const getRandomRating = (): number => {
  return parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1));
};

const getRandomBrand = (): string => {
  return possibleBrands[Math.floor(Math.random() * possibleBrands.length)];
};

interface ProductSuggestionCardProps {
  product: ProductsType;
  onClick?: () => void;
}

const ProductSuggestionCard = ({
  product,
  onClick,
}: ProductSuggestionCardProps) => {
  const displayRating = useMemo(getRandomRating, []);
  const displayBrand = useMemo(getRandomBrand, []);

  const estimatedOriginalPrice = product.price / (1 - 0.2);
  const hasDiscount = estimatedOriginalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((estimatedOriginalPrice - product.price) / estimatedOriginalPrice) *
          100
      )
    : 0;

  return (
    <motion.div
      className="group relative flex flex-col border border-gray-200 rounded-xl bg-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md w-full max-w-xs sm:max-w-sm overflow-hidden cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={onClick}
      layout
    >
      <div className="relative w-full h-48 sm:h-56 flex-shrink-0 overflow-hidden bg-gray-100">
        <img
          src={product.displayImage || "/placeholder-image.svg"}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          alt={product.name}
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-semibold text-gray-700 shadow-sm">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" />
          <span>{displayRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="text-base font-semibold text-indigo-700 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">by {displayBrand}</p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          {product.stockQuantity > 0 ? (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              In Stock
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs rounded-full font-medium">
              Out of Stock
            </span>
          )}
        </div>

        <div className="mt-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <>
                <span className="text-xs text-gray-500 line-through">
                  ₹
                  {estimatedOriginalPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
                <span className="text-xs font-semibold text-green-800 bg-green-100 px-1.5 py-0.5 rounded-md">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {product.highlights && product.highlights.length > 0 && (
          <div className="mt-2">
            <ul className="space-y-0.5">
              {product.highlights.slice(0, 1).map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1.5 text-xs text-gray-600"
                >
                  <Check
                    className="w-3 h-3 text-indigo-600 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-3">
          <Button
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            size="sm"
            disabled={product.stockQuantity <= 0}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to cart:", product.id);
              // Implement your actual add to cart logic here
            }}
          >
            <ShoppingCart size={16} className="mr-2" />
            {product.stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSuggestionCard;
