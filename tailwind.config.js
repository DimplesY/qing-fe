/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  extend: {
    fontFamily: {
      primary: ['Inter', ...fontFamily.sans],
    },
  },
  theme: {
    boxShadow: {
      'mobile-menu': '0 8px 24px rgb(81 87 103 / 16%)',
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
