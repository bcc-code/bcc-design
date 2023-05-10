const themes = require("@bcc-code/design-tokens");
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,ts}"],
  presets: [
    themes.bccForbundetTheme
  ],
  darkMode: 'class', // To disable dark mode, see https://developer.bcc.no/bcc-design/vue-components/#disable-dark-mode
  plugins: [
    plugin(function ({ addBase }) {
    
      const colors = themes.bccForbundetTheme.theme.extend.colors;

      for (let [colorKey] of Object.entries(colors)) {
        for (let [colorWeightKey, colorWeightToken] of Object.entries(colors[colorKey])) {
          const variableName = `--${colorKey}-${colorWeightKey}`;
          addBase({
            ":root": {
              [variableName]: colorWeightToken,
            },
          });
        }
      }
    })
    
  ]
};
