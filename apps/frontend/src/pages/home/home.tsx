import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Products {
  id: string;
  name: string;
  imageUrl: string[];
  price: number;
  productDescription: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);

  const FetchProductLists = async () => {
    try {
      const productDetails = await axios.get(import.meta.env.VITE_ALL_PRODUCTS);
      setProducts(productDetails.data);
    } catch (error) {}
  };

  useEffect(() => {
    FetchProductLists();
  }, []);

  const navigate = useNavigate();

  function HandleProductClick({ product }: { product: Products }) {
    navigate(`/product/${product.id}`, { state: product });
  }

  return (
    products && (
      <div className="bg-white pt-20">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our best collection
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 hover:cursor-pointer">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative"
                onClick={() => HandleProductClick({ product })}
              >
                <img
                  alt={product.name}
                  src={product.imageUrl[0]}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
