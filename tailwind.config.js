const defaultTheme = require("tailwindcss/defaultTheme"); // eslint-disable-line
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
