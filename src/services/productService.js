import { mockProducts, mockCategories, mockHeroImages } from '../api/mockData';

// Simulated delay to mimic network request
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  async getProducts() {
    await delay(500);
    return mockProducts;
  },

  async getProductById(id) {
    await delay(300);
    return mockProducts.find(p => p.id === parseInt(id));
  },

  async getCategories() {
    await delay(300);
    return mockCategories;
  },

  async getHeroImages() {
    await delay(400);
    return mockHeroImages;
  },

  async getProductsByCategory(categoryId) {
    await delay(400);
    return mockProducts.filter(p => p.category === parseInt(categoryId));
  }
};
