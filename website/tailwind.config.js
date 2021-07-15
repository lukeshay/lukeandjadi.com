/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  fontFamily: {
    // sans: ['Graphik', 'sans-serif'],
    serif: ['Nanum Myeongjo', 'serif'],
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        accent: {
          500: '#efb8b3',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
