import { Button } from "@/components/ui/button";
import { ProductsType } from "@/types/product-type";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ProductsType;
}

const ProductSuggestionCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg shadow-sm p-5 bg-white flex gap-6 w-full max-w-4xl">
      <div className="w-40">
        <img
          src={product.displayImage}
          className="w-full h-auto object-cover border rounded-md"
          alt={product.name}
        />
      </div>

      <div className="flex-1 flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

        <span className="bg-red-600 text-white px-2 py-1 text-sm rounded-md font-medium">
          Flash Sale
        </span>

        <div className="text-2xl font-bold text-gray-900 mt-2">
          ₹{product.price.toLocaleString()}
          <span className="text-gray-500 text-lg font-normal line-through ml-2">
            ₹{(product.price * 1.2).toLocaleString()}
          </span>
          <span className="text-green-600 text-lg font-semibold ml-2">
            (20% off)
          </span>
        </div>

        <Button
          className="mt-3 text-white px-4 py-2 rounded-md flex items-center gap-2"
          variant="indigo"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductSuggestionCard;
