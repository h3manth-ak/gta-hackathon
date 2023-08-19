/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F8FBFF",
        secondary: "#3B3B3B",
        'custom-black': '#141721',
        'custom-black-light': 'rgba(20, 23, 33, 0.8)',
        'navbar-color': '#F5F6F6',
      },
    },
    
  },
  plugins: [],
}