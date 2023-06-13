import bccForbundetTheme from "../tailwind/bccForbundetTheme";
import { cssVariables } from "../variables/variables";

const tailwindPlugin = function ({ addBase }: any) {
  const colors = bccForbundetTheme.theme!.extend!.colors;

  for (const [colorKey, colorObject] of Object.entries(colors!)) {
    for (const colorWeightKey in colorObject) {
      const variableName = `--${colorKey}-${colorWeightKey}`;
      addBase({
        ":root": {
          [variableName]: colorObject[colorWeightKey], // e.g. --neutral-600: #4b5563
        },
      });
    }
  }

  for (const [variableName, variableValue] of Object.entries(cssVariables)) {
    addBase({
      ":root": {
        [variableName]: variableValue,
      },
    });
  }
};

export default tailwindPlugin;
