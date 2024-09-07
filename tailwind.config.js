/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#2399c0',
        dark: '#001E3A',
        white: '#ffffff',  // Standard white color
        black: '#000000',  // Standard black color
      },
    },
  },
  plugins: [],
}
