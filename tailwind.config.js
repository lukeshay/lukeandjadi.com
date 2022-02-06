const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  jit: true,
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        ...colors,
        accent: {
          500: '#efb8b3',
        },
      }),
      fontFamily: {
        cursive: ['Oleo Script', ...fontFamily.serif],
        serif: ['Source Serif Pro', ...fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
};
