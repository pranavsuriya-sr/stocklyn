import { Button } from "@/components/ui/button";
import { ProductsType } from "@/types/product-type";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: ProductsType;
  onClick?: () => void;
}

const ProductSuggestionCard = ({ product, onClick }: ProductCardProps) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(Math.floor(Math.random() * 11 + 40) / 10);
  }, []);

  return (
    <motion.div
      className="border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all bg-white overflow-hidden w-full max-w-4xl group "
      whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
        {/* Product image sec is here */}
        <div className="relative w-full sm:w-48 h-48 sm:h-56 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={product.displayImage}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={product.name}
            loading="lazy"
          />
          {/* Rating sec is hre
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold">{rating.toFixed(1)}</span>
          </div> */}
        </div>

        {/* Product sec is here cuh*/}
        <div className="flex-1 flex flex-col gap-3 sm:gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Brand: {"Premium"}</p>
          </div>

          {/* Badges sec is here */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs sm:text-sm rounded-full font-bold shadow-sm">
              Flash Sale
            </span>
            {product.stockQuantity > 0 ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 text-xs sm:text-sm rounded-full font-medium">
                In Stock • {product.stockQuantity} left
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 text-xs sm:text-sm rounded-full font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* Price sec is here */}
          <div className="mt-2 sm:mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-gray-500 text-lg font-medium line-through">
                ₹{(product.price * 1.2).toLocaleString()}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm font-bold">
                20% OFF
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          {/* Features highlights sec is here */}
          {product.highlights?.length > 0 && (
            <div className="mt-2 sm:mt-3">
              <div className="flex flex-wrap gap-2">
                {product.highlights.slice(0, 3).map((highlight, index) => (
                  <span
                    key={index}
                    className="text-xs sm:text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full flex items-center"
                  >
                    <span className="text-indigo-500 mr-1">✓</span>
                    <span className="line-clamp-1">{highlight}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* addtocart sec is here */}
          <div className="mt-auto pt-2">
            <Button
              className="w-full text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:scale-[1.02] transition-transform bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-md"
              size="lg"
              disabled={product.stockQuantity <= 0}
            >
              <ShoppingCart size={18} className="stroke-[2.5]" />
              {product.stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
              {product.stockQuantity > 0 && (
                <span className="ml-auto text-xs font-light">
                  FREE Delivery
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSuggestionCard;
