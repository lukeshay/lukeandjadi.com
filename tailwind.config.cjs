/* eslint-disable import/no-extraneous-dependencies */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  jit: true,
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        ...colors,
        accent: {
          500: '#efb8b3',
        },
      }),
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
