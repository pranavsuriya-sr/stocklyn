import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const product = {
    name: "Zip Tote Basket",
    price: 140,
    rating: 4,
    description:
      "The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.",
    colors: ["#1C1C1C", "#FFFFFF", "#D3D3D3"],
    images: [
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg",
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg",
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg",
    ],
  };

  const location = useLocation();

  const state = location.state;
  console.log(state);

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="bg-white p-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-20">
        {/* Left Section: Product Images */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-auto rounded-md object-cover"
          />
          <div className="flex mt-4 space-x-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(image)}
                className={`w-16 h-16 rounded-md object-cover cursor-pointer ${
                  selectedImage === image ? "ring-2 ring-indigo-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="space-y-4">
          {/* Product Name and Price */}
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg font-semibold text-gray-700">
            ${product.price}
          </p>
          Rating
          <div className="flex items-center">
            {[...Array(product.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ★
              </span>
            ))}
            {[...Array(5 - product.rating)].map((_, i) => (
              <span key={i} className="text-gray-300 text-lg">
                ★
              </span>
            ))}
          </div>
          {/* Product Description */}
          <p className="text-gray-700">{product.description}</p>
          {/* Colors */}
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Color:</span>
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full cursor-pointer border "
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {/* Add to Bag Button */}
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition">
            Add to cart
          </button>
          {/* Accordion Sections */}
          <div className="space-y-2">
            {["Features", "Care", "Shipping", "Returns"].map(
              (section, index) => (
                <Accordion type="single" collapsible key={index}>
                  <AccordionItem value={section} key={section}>
                    <AccordionTrigger>{section}</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
