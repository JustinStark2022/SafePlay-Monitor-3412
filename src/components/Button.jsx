import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(`
        inline-flex items-center justify-center gap-2
        px-4 py-2 rounded-2xl font-semibold
        border border-black/20 dark:border-white/30
        text-black dark:text-white
        bg-gray-200 dark:bg-gray-700
        hover:bg-gray-300 dark:hover:bg-gray-600
        shadow-md hover:shadow-lg
        transition-transform duration-200
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500
        ${className}
      `)}
    >
      {children}
    </button>
  );
};

export default Button;
