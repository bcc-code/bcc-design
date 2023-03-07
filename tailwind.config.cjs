const themes = require("@bcc-code/design-tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,ts}"],
  theme: themes.bccForbundetTheme,
  plugins: [],
};
