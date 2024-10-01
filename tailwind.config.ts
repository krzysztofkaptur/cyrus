/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,ejs}'],
  theme: {
    extend: {
      colors: {
        primary: '#f1f1f1',
        secondary: '#0C0C0C',
        neutral: '#0C0C0C',
        accent: '#ED5107',
        link: '#0C0C0C',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
