const themes = require("@bcc-code/design-tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,ts}"],
  presets: [
    themes.bccForbundetTheme
  ],
  darkMode: 'class', // To disable dark mode, see https://developer.bcc.no/bcc-design/vue-components/#disable-dark-mode
  plugins: []
};
