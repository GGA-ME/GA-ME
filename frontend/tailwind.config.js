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
      },
      fontFamily: {
        sejong: ['SejonghospitalBold', 'sans-serif'], // 'sejong'는 커스텀 클래스 이름입니다.
      },
      fontSize: {
        '20': '20px',
        '25': '25px',
        '30': '30px',
      }
    },
  },
  plugins: [],
}