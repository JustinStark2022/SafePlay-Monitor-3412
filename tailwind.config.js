// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f0f9ff', 300: '#7dd3fc', 500: '#0ea5e9' },
        danger: { 500: '#ef4444' },
        success: { 500: '#22c55e' }
      },
      fontFamily: {
        'body': ['"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
        'playful': ['"Comic Neue"', 'cursive']
      },
    },
  },
  plugins: [],
};