import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full active:scale-95';
  
  const variants = {
    primary: 'bg-dark-maroon text-white hover:bg-maroon-light hover:shadow-[0_8px_20px_rgba(220,42,136,0.3)]',
    secondary: 'bg-white text-dark-maroon border border-cream-beige hover:border-maroon-light hover:text-maroon-light',
    accent: 'bg-maroon-light text-white hover:bg-maroon-light shadow-[0_4px_14px_rgba(220,42,136,0.2)] hover:shadow-[0_6px_20px_rgba(220,42,136,0.4)]',
    outline: 'border-2 border-dark-maroon text-dark-maroon hover:bg-dark-maroon hover:text-white',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  return (
    <button 
      className={twMerge(clsx(baseClasses, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  );
};
