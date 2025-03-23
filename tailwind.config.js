// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
        fun: ['"Fredoka One"', 'cursive'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        bubblegum: '#ff7eb9',
        sunshine: '#ffdf64',
        mint: '#98f5e1',
        lavender: '#c4b5fd',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        fun: '0 8px 20px rgba(0, 0, 0, 0.08)',
        bubble: '0 6px 18px rgba(255, 126, 185, 0.2)',
      },
    },
  },
  plugins: [],
};