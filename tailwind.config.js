/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      darkMode: "class",
      fontFamily: {
        work: ["'Work Sans', sans-serif", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require("daisyui")],
};
