export interface ProductsType {
  id: string;
  name: string;
  displayImage: string;
  imageUrl: string[];
  price: number;
  productDescription: string;
  categoryName: string;
  colors: string[];
  sizes: string[];
  highlights: string[];
  details: string;
  reviews: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  usersPurchased: number;
}
