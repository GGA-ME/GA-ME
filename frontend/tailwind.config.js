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