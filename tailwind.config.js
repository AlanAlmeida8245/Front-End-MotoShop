/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'Vermelho':  '#f00000',
        'Vermelho2': "#dc281e",
        'azul1': "#0E3D64",
        'azul2': '#0085C6'
      }
    },
  },
  plugins: [],
} 