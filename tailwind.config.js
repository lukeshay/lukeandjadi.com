/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  fontFamily: {
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
