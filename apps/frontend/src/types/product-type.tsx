export interface ProductsType {
  id: string;
  name: string;
  imageUrl: string[];
  price: number;
  productDescription: string;
  category: string;
  colors: [];
  sizes: string;
  highlights: string[];
  details: string;
  reviews: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}
