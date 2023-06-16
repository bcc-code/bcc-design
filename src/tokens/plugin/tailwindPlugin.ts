import globalCssVariables from "../variables/global";
import alternativeCssVariables from "../variables/alternative";

const tailwindPlugin = function ({ addBase }: any) {
  for (const [variableName, variableValue] of Object.entries(globalCssVariables)) {
    addBase({
      ":root": {
        [variableName]: variableValue,
      },
    });
  }

  for (const [variableName, variableValue] of Object.entries(alternativeCssVariables)) {
    addBase({
      "[data-context=\"alternative\"]": {
        [variableName]: variableValue,
      },
    });
  }
};

export default tailwindPlugin;
