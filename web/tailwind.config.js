/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
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
