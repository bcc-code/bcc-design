import globalCssVariables from "../variables/global";
import brandCssVariables from "../variables/brand";

const tailwindPlugin = function ({ addBase }: any) {
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
