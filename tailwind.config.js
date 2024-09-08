/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 100s linear infinite', // Spin slowly
      },
      colors: {
        main: '#2499BF',
        light: '#908C8C',
        dark: '#001E3A',
        white: '#ffffff',  // Standard white color
        black: '#000000',  // Standard black color
      },
    },
  },
  plugins: [],
}
