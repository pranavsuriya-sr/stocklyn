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
import { ProductsType } from "@/types/product-type";
import { useCartStore } from "@/utils/store/cart-store";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const addItemToCart = useCartStore.getState().AddItem;

//add accordions here
const ProductPage = ({}) => {
  const location = useLocation();
  const product = location.state;
  const [selectedImage, setSelectedImage] = useState(product.imageUrl[0]);

  const [cartProducts, setCartProducts] = useState<ProductsType[] | null>(null);
  const products = useCartStore((state) => {
    return state.GetCartProducts();
  });

  const HandleAddToCart = () => {
    addItemToCart(product);
    HandleGetAllCartItems();
  };

  const HandleGetAllCartItems = () => {
    setCartProducts(products);
  };

  return (
    <div className="bg-white  p-28 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-20">
        {/* Left Section: Product Images */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-auto rounded-md object-cover"
          />
          <div className="flex mt-4 space-x-4">
            {product.imageUrl.map((image: string, index: number) => (
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
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg font-semibold text-gray-700">
            ${product.price}
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
          <p className="text-gray-700">{product.productDescription}</p>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Available Color:</span>

            {product.colors.map((color: string) => {
              return (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: `#${color}` }}
                ></div>
              );
            })}
          </div>
          <Sheet onOpenChange={() => HandleGetAllCartItems()}>
            <SheetTrigger asChild onClick={() => HandleAddToCart()}>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transitio">
                Add to Cart
              </button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Your Cart Items!</SheetTitle>
                <SheetDescription>
                  Here are all the items in your cart currently
                </SheetDescription>
                your cart available items are :
                {cartProducts?.map((product) => {
                  return <img src={product.imageUrl[0]} key={product.id}></img>;
                })}
              </SheetHeader>
              <SheetFooter className="pt-8">
                <SheetClose asChild>
                  <Button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition "
                  >
                    Close Cart
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <div className="border-t mt-6 pt-4">
            {["Features", "Care", "Shipping", "Returns"].map((section) => (
              <div
                key={section}
                className="py-2 flex justify-between items-center border-b"
              >
                <span className="font-medium text-gray-700">{section}</span>
                <span className="text-indigo-500 font-medium cursor-pointer">
                  +
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
