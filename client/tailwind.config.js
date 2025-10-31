/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Work Sans', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },
    extend: {
      colors: {
        dark: "#212529",
        light: "#ffeeee"
      }
    },
  },
  plugins: [],
  prefix: 'tw-',
}

