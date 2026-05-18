import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white-bg pt-32 pb-24 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-cream-beige/30 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-dark-maroon mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-grey-lavender">
            {isLogin ? 'Please sign in to access your account' : 'Join Variety Showroom for exclusive offers'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-dark-maroon mb-1">Full Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-cream-beige focus:outline-none focus:border-bright-pink transition-colors" placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-dark-maroon mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-3 rounded-lg border border-cream-beige focus:outline-none focus:border-bright-pink transition-colors" placeholder="you@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark-maroon mb-1">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-lg border border-cream-beige focus:outline-none focus:border-bright-pink transition-colors" placeholder="••••••••" />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-bright-pink hover:underline">Forgot password?</a>
            </div>
          )}

          <Button variant="accent" className="w-full mt-6 py-3">
            {isLogin ? 'Sign In' : 'Register'}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-cream-beige/50 pt-6">
          <p className="text-grey-lavender">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-bright-pink font-medium hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
