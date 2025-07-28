/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ✅ Enable dark mode using a class toggle
  theme: {
    extend: {
      fontFamily: {
        classy: ['"Playfair Display"', 'serif'], // Elegant font for titles
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        slideInUp: 'slideInUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
