module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0 5px 0 rgb(0 0 0 / 20%)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
