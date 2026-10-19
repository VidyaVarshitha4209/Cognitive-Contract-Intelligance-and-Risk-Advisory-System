/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          orange: '#f97316',
          orangeHover: '#ea580c',
          text: '#c9d1d9',
          heading: '#f0f6fc'
        }
      }
    },
  },
  plugins: [],
}