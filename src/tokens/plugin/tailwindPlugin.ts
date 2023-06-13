import bccForbundetTheme from "../tailwind/bccForbundetTheme";
import globalCssVariables from "../variables/global";
import brandCssVariables from "../variables/brand";

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

  for (const [variableName, variableValue] of Object.entries(globalCssVariables)) {
    addBase({
      ":root": {
        [variableName]: variableValue,
      },
    });
  }

  for (const [variableName, variableValue] of Object.entries(brandCssVariables)) {
    addBase({
      "[data-context=\"brand\"]": {
        [variableName]: variableValue,
      },
    });
  }
};

export default tailwindPlugin;
