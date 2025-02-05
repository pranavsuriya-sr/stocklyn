import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/context/session-context";
import { useToast } from "@/hooks/use-toast";
import { ProductsType } from "@/types/product-type";
import { useCartStore } from "@/utils/store/cart-store";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { AddCartItems, RemoveCartItem } = useCartStore.getState();

const ProductPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const product: ProductsType = location.state || {};
  const [selectedImage, setSelectedImage] = useState<string>(
    product.imageUrl ? product.imageUrl[0] : "/placeholder.png"
  );
  const { user } = useSession();
  const { products } = useCartStore();
  const navigate = useNavigate();

  const HandleAddToCart = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        description: "Please login to add to cart",
      });
      return;
    }

    const isAddedToCart = await AddCartItems(
      user?.cart.id,
      product.id,
      product.price
    );

    if (isAddedToCart == false) {
      toast({
        variant: "destructive",
        title: "Product already exists!",
        description: "This product is already present in your cart items!",
        duration: 3000,
      });
    }

    if (isAddedToCart == true) {
      toast({
        variant: "success",
        title: "Added product!",
        description: "Product successfully added to the cart!",
        duration: 3000,
      });
    }
  };
  const RouteToProductPage = (product: ProductsType) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div className="bg-white p-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-20">
        {/* Left Section: Product Images */}
        <div>
          <img
            src={selectedImage}
            alt={product.name || "Product"}
            className="w-full h-auto rounded-md object-cover"
          />
          <div className="flex mt-4 space-x-4">
            {product.imageUrl?.map((image: string, index: number) => (
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

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {product.name || "Product Name"}
          </h1>
          <p className="text-lg font-semibold text-gray-700">
            Price: ₹{product.price || "0"}
          </p>
          <div className="flex items-center">
            <span className="text-gray-700">Stock: </span>
            <span
              className={`ml-2 font-semibold ${
                product.stockQuantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <p className="text-gray-700">
            <span className="font-semibold">About the Product : </span>{" "}
            {product.productDescription || "No description available."}
          </p>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Available Color:</span>
            {product.colors?.map((color: string) => (
              <div
                key={color}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: `${color}` }}
              ></div>
            ))}
          </div>
          <div className="flex items-center space-x-4 ">
            <span className="font-medium text-gray-700">Available Sizes:</span>
            {product.sizes?.map((size: string) => (
              <div
                key={size}
                className="border rounded-full p-1 w-7 h-7 flex items-center justify-center text-sm font-semibold hover:cursor-pointer"
              >
                {" "}
                {size}
              </div>
            ))}
          </div>
          {product.highlights.map((highlight: string, index: number) => {
            if (index > 4) {
              return;
            }
            return (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Feature {index + 1}</AccordionTrigger>
                  <AccordionContent>{highlight}</AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}

          <Sheet modal={false}>
            <SheetTrigger asChild>
              {product.stockQuantity > 0 && (
                <Button
                  className="w-full"
                  variant={"indigo"}
                  onClick={() => HandleAddToCart()}
                >
                  Add to cart
                </Button>
              )}
            </SheetTrigger>
            <SheetContent className="overflow-y-auto max-h-screen shadow-slate-600 bg-gray-50 r">
              <SheetHeader>
                <SheetTitle>Cart Items</SheetTitle>
                <SheetDescription>Your cart Items!</SheetDescription>
              </SheetHeader>

              {products.length === 0 ? (
                <div>Your cart is Empty</div>
              ) : (
                products.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow mt-5 hover:cursor-pointer"
                      onClick={() => RouteToProductPage(product)}
                    >
                      <img
                        src={product.displayImage}
                        className="w-24 h-24 rounded-md object-cover "
                        alt={product.name}
                      />

                      <div className="flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          ₹{product.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                        onClick={() =>
                          RemoveCartItem(user?.cart.id, product.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              )}

              <SheetFooter className="pt-10 pb-5">
                <SheetClose asChild>
                  <Button
                    type="submit"
                    variant={"indigo"}
                    onClick={() => navigate("/cartitems")}
                  >
                    Checkout
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="pt-20 text-3xl underline">Comments</div>
    </div>
  );
};

export default ProductPage;
