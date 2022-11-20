/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("tailwind-scrollbar"), 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dubai': "url('/assets/dubai.webp')",
      },
      colors: {
        'primary': '#0847A8',
        'secondary': '#70AC2A'
      },
      screens: {
        'xs': '280px',
        'ms': '320px',
        'ls': '400px',
        'xls': '500px',
        'xll': '900px',
      }
    },
  },
}
