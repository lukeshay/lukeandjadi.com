/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        accent: {
          500: '#efb8b3',
        },
      },
      fontFamily: {
        serif: ['Source Serif Pro', ...fontFamily.serif],
        cursive: ['Oleo Script', ...fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
