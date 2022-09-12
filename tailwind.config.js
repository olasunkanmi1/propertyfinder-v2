/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dubai': "url('/assets/dubai.webp')",
      },
      colors: {
        'primary': '#0847A8',
        'secondary': '#70AC2A'
      }
    },
  },
  plugins: [],
}
