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
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const ProductPage = () => {
  const location = useLocation();
  const product = location.state || {};
  const { user } = useSession();
  const [selectedImage, setSelectedImage] = useState<string>(
    product.imageUrl ? product.imageUrl[0] : "/placeholder.png"
  );
  const { toast } = useToast();
  const [cartProducts, setCartProducts] = useState<ProductsType[]>([]);
  const cartId = user?.cart?.id;
  const addItemToCart = useCartStore.getState().AddItem;
  const [productIdsArray, setProductIdsArray] = useState<string[]>([]);

  const GetProductIds = async (): Promise<string[]> => {
    try {
      const response = await api.post("/cart/getids", {
        cartId,
      });
      return response.data.cartInfo?.products || [];
    } catch (error) {
      console.error("Error fetching product IDs:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!cartId) return;

    const HandleGetAllCartItems = async () => {
      let productIds = await GetProductIds();

      productIds = [...new Set(productIds)];
      setProductIdsArray(productIds);

      if (productIds.length === 0) return;
      setProductIdsArray(productIds);
      try {
        const response = await api.post("/product/productDetails", {
          productIds,
        });
        const productDetails = response.data || [];

        useCartStore.getState().SetCartProducts(productDetails);

        setCartProducts(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    HandleGetAllCartItems();
  }, [cartId]);

  console.log(productIdsArray);

  // Add product to the cart
  const HandleAddToCart = async () => {
    if (productIdsArray.includes(product.id)) {
      return;
    }
    setProductIdsArray([...productIdsArray, product.id]);

    try {
      addItemToCart(product.id, cartId);
      toast({
        variant: "default",
        title: "Added item to the cart.",
        duration: 1000,
        style: {
          backgroundColor: "white",
          color: "black",
        },
      });
    } catch (error) {
      console.error("Error adding product to the cart:", error);
    }
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

        {/* Right Section: Product Details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {product.name || "Product Name"}
          </h1>
          <p className="text-lg font-semibold text-gray-700">
            ₹{product.price || "0"}
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
            {product.productDescription || "No description available."}
          </p>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Available Color:</span>
            {product.colors?.map((color: string) => (
              <div
                key={color}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: `#${color}` }}
              ></div>
            ))}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition"
                onClick={HandleAddToCart}
              >
                Add to Cart
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart Items!</SheetTitle>
                <SheetDescription>
                  Here are all the items in your cart currently:
                </SheetDescription>
                {cartProducts.length > 0 ? (
                  cartProducts.map((product) => (
                    <div key={product.id} className="mb-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product?.imageUrl?.[0] || "/placeholder.png"}
                            alt={product?.name || "Product"}
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {product.name}
                            </h3>
                            <p className="text-indigo-600 font-medium">
                              ₹{product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </SheetHeader>
              <SheetFooter>
                <SheetClose asChild>
                  <Button className="bg-indigo-600 text-white">
                    Close Cart
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
