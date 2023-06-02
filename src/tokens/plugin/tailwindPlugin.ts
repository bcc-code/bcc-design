import { bccForbundetTheme } from "../../tokens";

const tailwindPlugin = function ({ addBase }) {
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
};

export default tailwindPlugin;
