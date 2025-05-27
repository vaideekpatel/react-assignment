import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProducts = async (skip = 0, limit = 8): Promise<ProductListResponse> => {
  const response = await axios.get<ProductListResponse>(
    `https://dummyjson.com/products?skip=${skip}&limit=${limit}`,
  );
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
  return response.data;
};
