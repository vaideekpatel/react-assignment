import axios from 'axios';
import { getProducts, getProductById } from './productService';
import type { ProductListResponse, Product } from './productService';

jest.mock('axios');
const mocked = axios as jest.Mocked<typeof axios>;

describe('productService (axios)', () => {
  it('getProducts() should return data.products and data.total', async () => {
    const mockData: ProductListResponse = {
      products: [{ id: 1, title: 'Test', description: 'd', price: 10, discountPercentage: 5, rating: 4, stock: 1, brand: 'b', category: 'c', thumbnail: 't.jpg', images: [] }],
      total: 1,
      skip: 0,
      limit: 8,
    };
    mocked.get.mockResolvedValueOnce({ data: mockData });
    const result = await getProducts(0, 8);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products?skip=0&limit=8');
  });

  it('getProductById() should return a single product', async () => {
    const product: Product = {
      id: 2, title: 'Single', description: 'd2', price: 20, discountPercentage: 10,
      rating: 5, stock: 2, brand: 'b2', category: 'c2', thumbnail: 't2.jpg', images: ['i1.jpg']
    };
    mocked.get.mockResolvedValueOnce({ data: product });
    const result = await getProductById(2);
    expect(result).toEqual(product);
    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products/2');
  });
});
