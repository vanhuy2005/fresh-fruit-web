/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'source-serif': ['Source Serif 4', 'serif'],
      },
      colors: {
        'primary': '#16a34a',
        'primary-dull': '#15803d',
        'secondary': '#0f5132',
      },
      maxWidth: {
        '105': '26.25rem',
      },
      lineHeight: {
        '15': '3.75rem',
      },
    },
  },
  plugins: [],
}