import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(`
        flex items-center px-4 py-2 rounded-xl border border-black/20
        text-black font-semibold shadow-md transition-all duration-200
        hover:scale-105 hover:shadow-lg
        bg-gray-200 hover:bg-gray-300
        dark:text-white dark:border-white/30
        dark:bg-gray-700 dark:hover:bg-gray-600
        ${className}
      `)}
    >
      {children}
    </button>
  );
};

export default Button;