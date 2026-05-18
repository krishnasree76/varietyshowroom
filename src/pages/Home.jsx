import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, Clock } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';

export const Home = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [images, cats, prods] = await Promise.all([
        productService.getHeroImages(),
        productService.getCategories(),
        productService.getProducts()
      ]);
      setHeroImages(images);
      setCategories(cats);
      setProducts(prods.slice(0, 8)); // Top 8 featured
    };
    fetchData();
  }, []);

  // Auto-slide hero
  useEffect(() => {
    if (heroImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <div className="min-h-screen bg-white-bg">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {heroImages.map((hero, index) => (
            index === currentHero && (
              <motion.div
                key={hero.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                  src={hero.image}
                  alt="Variety Showroom"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        <div className="container relative z-20 mx-auto px-4 text-center mt-20">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block text-soft-pink font-medium tracking-[0.2em] uppercase mb-4"
          >
            Welcome to Variety Showroom
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight max-w-4xl mx-auto"
          >
            Trending fashion at affordable range
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light"
          >
            Complete family fashion shop open 365 days. Discover our latest collection of premium clothing.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/shop">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">Shop Now</Button>
            </Link>
            <Link to="/category/women">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white bg-transparent">
                Explore Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="py-24 bg-white-bg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif text-dark-maroon mb-2">Trending Categories</h2>
              <p className="text-grey-lavender">Discover what's hot right now</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-bright-pink font-medium hover:text-rose-pink transition-colors">
              View All <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={`/category/${cat.slug}`} className="group block text-center">
                  <div className="relative aspect-square overflow-hidden rounded-full bg-cream-beige/30 mb-4 p-2 border-2 border-transparent group-hover:border-bright-pink transition-all duration-300">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-serif text-lg text-dark-maroon group-hover:text-bright-pink transition-colors">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-24 bg-white-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-dark-maroon mb-4">Latest Arrivals</h2>
            <p className="text-grey-lavender max-w-2xl mx-auto">Explore our newest additions and fresh styles.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={`latest-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Collection */}
      <section className="py-24 bg-cream-beige/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-dark-maroon mb-4">Popular Collection</h2>
            <p className="text-grey-lavender max-w-2xl mx-auto">Handpicked styles combining elegance, comfort, and the latest trends.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#DE86AB] relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#61435D] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Variety Showroom
            </h2>

            <p className="text-[#FDF7FA] text-lg max-w-2xl mx-auto">
              Trending fashion at affordable range for your complete family.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}
            <div className="bg-[#FDF7FA] rounded-3xl p-8 text-center shadow-xl hover:scale-105 transition-all duration-300 border border-[#F3D3E2]">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E99FC1] flex items-center justify-center">
                <Star size={40} className="text-[#61435D]" />
              </div>

              <h3 className="text-2xl font-bold text-[#61435D] mb-4">
                Premium Quality
              </h3>

              <p className="text-[#7A5C73] leading-relaxed">
                Handpicked fabrics and flawless stitching for elegant comfort.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FDF7FA] rounded-3xl p-8 text-center shadow-xl hover:scale-105 transition-all duration-300 border border-[#F3D3E2]">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E99FC1] flex items-center justify-center">
                <Truck size={40} className="text-[#61435D]" />
              </div>

              <h3 className="text-2xl font-bold text-[#61435D] mb-4">
                Fast Delivery
              </h3>

              <p className="text-[#7A5C73] leading-relaxed">
                Reliable doorstep delivery with smooth shopping experience.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FDF7FA] rounded-3xl p-8 text-center shadow-xl hover:scale-105 transition-all duration-300 border border-[#F3D3E2]">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E99FC1] flex items-center justify-center">
                <ShieldCheck size={40} className="text-[#61435D]" />
              </div>

              <h3 className="text-2xl font-bold text-[#61435D] mb-4">
                Secure Payments
              </h3>

              <p className="text-[#7A5C73] leading-relaxed">
                Safe and trusted payment methods for worry-free checkout.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#FDF7FA] rounded-3xl p-8 text-center shadow-xl hover:scale-105 transition-all duration-300 border border-[#F3D3E2]">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E99FC1] flex items-center justify-center">
                <Clock size={40} className="text-[#61435D]" />
              </div>

              <h3 className="text-2xl font-bold text-[#61435D] mb-4">
                Open 365 Days
              </h3>

              <p className="text-[#7A5C73] leading-relaxed">
                Always open to serve your family fashion shopping needs.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
