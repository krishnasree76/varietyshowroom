import React from 'react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Wishlist = () => {
  const wishlist = useStore(state => state.wishlist);

  return (
    <div className="min-h-screen bg-white-bg pt-32 pb-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif text-dark-maroon mb-2 text-center">My Wishlist</h1>
        <p className="text-muted-maroon text-center mb-12">Items you've loved and saved for later</p>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-maroon mb-6">Your wishlist is empty.</p>
            <Link to="/shop">
              <Button variant="outline">Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const Profile = () => {
  return (
    <div className="min-h-screen bg-white-bg pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-dark-maroon mb-12">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-cream-beige/30 h-fit">
            <div className="text-center border-b border-cream-beige/50 pb-6 mb-6">
              <div className="w-20 h-20 bg-dark-maroon/20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-dark-maroon">
                JD
              </div>
              <h2 className="text-xl font-bold text-dark-maroon">John Doe</h2>
              <p className="text-muted-maroon text-sm">john.doe@example.com</p>
            </div>
            <ul className="space-y-4">
              <li><a href="#" className="text-maroon-light font-medium flex items-center">📦 My Orders</a></li>
              <li><Link to="/wishlist" className="text-muted-maroon hover:text-maroon-light flex items-center">❤️ Wishlist</Link></li>
              <li><a href="#" className="text-muted-maroon hover:text-maroon-light flex items-center">📍 Addresses</a></li>
              <li><a href="#" className="text-muted-maroon hover:text-maroon-light flex items-center">⚙️ Settings</a></li>
              <li><Link to="/auth" className="text-maroon-light hover:underline flex items-center mt-6">Log out</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif text-dark-maroon mb-6">Recent Orders</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-cream-beige/30 overflow-hidden">
              <div className="p-6 border-b border-cream-beige/30 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-maroon">Order #ORD-84392</p>
                  <p className="font-bold text-dark-maroon">₹4,999.00 <span className="font-normal text-sm ml-2 px-2 py-1 bg-green-100 text-green-700 rounded">Delivered</span></p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="p-6 border-b border-cream-beige/30 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-maroon">Order #ORD-73821</p>
                  <p className="font-bold text-dark-maroon">₹1,299.00 <span className="font-normal text-sm ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded">In Transit</span></p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
