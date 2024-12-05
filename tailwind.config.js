/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-1000': '#1a0022', // A custom darker purple shade
      }
    },
  },
  plugins: [],
}

