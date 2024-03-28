/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        'tag-gray': '#606060',
        'box-gray': '#343434',
        'hr': '#6A6A6A',
      },
      width: {
        '900px': '900px',
      },
      height: {
        '500px': '500px',
      }
    },
  },
  plugins: [],
}