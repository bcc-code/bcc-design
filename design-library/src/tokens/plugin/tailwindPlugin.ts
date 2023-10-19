import globalCssVariables from "../variables/global";
import alternativeCssVariables from "../variables/alternative";
import formsPlugin from "@tailwindcss/forms";

const tailwindPlugin = function ({ addBase, addComponents, theme }: any) {
  for (const [variableName, variableValue] of Object.entries(globalCssVariables)) {
    addBase({
      ":root, :host": {
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
  
  formsPlugin({
    strategy: 'class',
  })
  // @ts-ignore Type expects 0 arguments but these need to be passed along to the plugin
  .handler({addBase, addComponents, theme});
};

export default tailwindPlugin;
