/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a3d5f7', // baby blue
        secondary: '#e0e0e0', // light grey
        background: '#e0e0e0', // light grey background
        accent: '#7bb3e0', // darker baby blue
        textPrimary: '#4a4a4a', // dark grey
        textSecondary: '#6a6a6a', // medium grey
        border: '#d0d0d0', // border grey
      },
    },
  },
  plugins: [],
}
