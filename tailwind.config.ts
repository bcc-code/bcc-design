import plugin from "tailwindcss";
import type { Config } from "tailwindcss";
import { bccForbundetTheme } from "./src/tokens";

export default {
  content: ["./src/**/*.{vue,ts}"],
  presets: [bccForbundetTheme as Config],
  darkMode: "class", // To disable dark mode, see https://developer.bcc.no/bcc-design/vue-components/#disable-dark-mode
  plugins: [
    plugin(function ({ addBase }) {
      const colors = bccForbundetTheme.theme.extend.colors;

      for (const [colorKey] of Object.entries(colors)) {
        for (const [colorWeightKey, colorWeightToken] of Object.entries(colors[colorKey])) {
          const variableName = `--${colorKey}-${colorWeightKey}`;
          addBase({
            ":root": {
              [variableName]: colorWeightToken,
            },
          });
        }
      }
    }),
  ],
} satisfies Config;
