import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, X } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ui/ProductCard';

export const Shop = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(slug || 'all');
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [cats, prods] = await Promise.all([
        productService.getCategories(),
        productService.getProducts()
      ]);
      setCategories(cats);
      
      let filteredProds = prods;

      // Basic filtering based on route params
      if (slug && slug !== 'all') {
        const cat = cats.find(c => c.slug === slug);
        if (cat) {
          filteredProds = prods.filter(p => p.category === cat.id);
        }
      }

      // Size filtering
      if (selectedSize) {
        filteredProds = filteredProds.filter(p => p.variants && p.variants.some(v => v.size === selectedSize && v.stock > 0));
      }

      setProducts(filteredProds);
      setLoading(false);
    };
    fetchData();
  }, [slug, selectedSize]);

  const handleCategoryChange = (newSlug) => {
    setActiveCategory(newSlug);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  return (
    <div className="min-h-screen bg-white-bg pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-mainPink/10 py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-dark-maroon mb-4">
            {slug ? categories.find(c => c.slug === slug)?.name || 'Our Collection' : 'Our Collection'}
          </h1>
          <div className="flex items-center justify-center space-x-2 text-sm text-grey-lavender">
            <Link to="/" className="hover:text-bright-pink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-dark-maroon">Shop</span>
            {slug && (
              <>
                <span>/</span>
                <span className="text-dark-maroon">{categories.find(c => c.slug === slug)?.name}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <span className="text-grey-lavender">{products.length} Products</span>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-dark-maroon font-medium border border-cream-beige px-4 py-2 rounded-lg"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Sidebar / Filters */}
          <motion.div 
            className={`lg:w-1/4 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}
            initial={false}
            animate={{ height: isFilterOpen ? 'auto' : undefined }}
          >
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-cream-beige/50">
              <div className="flex justify-between items-center lg:hidden mb-6">
                <h3 className="text-lg font-serif font-bold text-dark-maroon">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)}><X size={20} /></button>
              </div>

              {/* Categories Filter */}
              <div className="mb-8">
                <h4 className="text-md font-bold text-dark-maroon mb-4 pb-2 border-b border-cream-beige/50 flex justify-between items-center">
                  Categories <ChevronDown size={16} />
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to="/shop"
                      className={`text-sm transition-colors ${activeCategory === 'all' || !activeCategory ? 'text-bright-pink font-semibold' : 'text-grey-lavender hover:text-dark-maroon'}`}
                      onClick={() => handleCategoryChange('all')}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link 
                        to={`/category/${cat.slug}`}
                        className={`text-sm transition-colors ${activeCategory === cat.slug ? 'text-bright-pink font-semibold' : 'text-grey-lavender hover:text-dark-maroon'}`}
                        onClick={() => handleCategoryChange(cat.slug)}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sizes Filter */}
              <div className="mb-8">
                <h4 className="text-md font-bold text-dark-maroon mb-4 pb-2 border-b border-cream-beige/50 flex justify-between items-center">
                  Sizes <ChevronDown size={16} />
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map(size => (
                    <button 
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`px-3 py-1 border rounded text-sm transition-colors ${selectedSize === size ? 'border-bright-pink text-bright-pink bg-bright-pink/5 font-medium' : 'border-cream-beige text-grey-lavender hover:border-bright-pink hover:text-bright-pink'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="hidden lg:flex justify-between items-center mb-8">
              <span className="text-grey-lavender">{products.length} Products</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-grey-lavender">Sort by:</span>
                <select className="bg-transparent text-dark-maroon font-medium focus:outline-none cursor-pointer">
                  <option>Featured</option>
                  <option>New Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-cream-beige/30 aspect-[3/4] rounded-2xl mb-4"></div>
                    <div className="h-4 bg-cream-beige/30 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-cream-beige/30 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-serif text-dark-maroon mb-2">No products found</h3>
                <p className="text-grey-lavender">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
