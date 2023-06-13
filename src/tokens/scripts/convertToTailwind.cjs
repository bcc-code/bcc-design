const fs = require("fs").promises;

const semanticColors = ["success", "warning", "danger", "info", "emphasis"];
let semanticTokens = {};

let tokenCssVariables = {};

function getCssVariable(token) {
  if (!token.startsWith("{colors.")) {
    return token;
  }

  return token.replaceAll("{colors.", "var(--").replaceAll("}", ")").replaceAll(".", "-");
}

function getDoubleCssVariable(tokenKey, tokenValue) {
  if (!tokenValue.startsWith("{colors.")) {
    throw Error("Token value not formatted properly");
  }

  const cssVariableValue = tokenValue.replaceAll("{colors.", "var(--").replaceAll("}", ")").replaceAll(".", "-");
  
  let cssVariableKey = tokenKey.replaceAll(".", "-");

  if (cssVariableKey.toLowerCase().endsWith("-default")) {
    cssVariableKey = cssVariableKey.slice(0, -8);
  }

  tokenCssVariables[`--${cssVariableKey}`] = cssVariableValue;

  const cssVariable = `var(--${cssVariableKey})`;

  return cssVariable;
}

function getNestedColors(variants, type) {
  let colors = {};

  // variantKey = primary, secondary etc. or success, danger etc.
  for (let [variantKey] of Object.entries(variants)) {
    // itemKey = background, foreground, border etc.
    for (let [itemKey, itemValue] of Object.entries(variants[variantKey])) {
      if (itemKey === type) {
        colors[variantKey] = {};

        // tokenKey = default, hover, pressed etc.
        // tokenValue = hex color value
        for (let [tokenKey, tokenValue] of Object.entries(itemValue)) {
          colors[variantKey][tokenKey] = getCssVariable(tokenValue.value);
        }
      }
    }
  }

  return colors;
}

function getNestedColorsWithTokenCssVariable(variants, type, name) {
  let colors = {};

  // variantKey = primary, secondary etc. or success, danger etc.
  for (let [variantKey] of Object.entries(variants)) {
    // itemKey = background, foreground, border etc.
    for (let [itemKey, itemValue] of Object.entries(variants[variantKey])) {
      if (itemKey === type) {
        colors[variantKey] = {};

        // tokenKey = default, hover, pressed etc.
        // tokenValue = hex color value
        for (let [tokenKey, tokenValue] of Object.entries(itemValue)) {
          colors[variantKey][tokenKey] = getDoubleCssVariable(`${name}-${variantKey}-${tokenKey}`, tokenValue.value);
        }
      }
    }
  }

  return colors;
}

async function writeTailwindConfig(file, content) {
  // Simplifies class names so bg-info-default becomes bg-info
  content = content.replaceAll("default", "DEFAULT");

  await fs.writeFile(file, content, "utf8");
}

async function writeCssVariables() {
  let content = `export const cssVariables = ${JSON.stringify(tokenCssVariables, null, 2)};`;
  await fs.writeFile("./src/tokens/variables/variables.ts", content, "utf8");
}

async function writeColors(figmaInput) {
  let colors = figmaInput.reference.colors;

  for (let [colorKey] of Object.entries(colors)) {
    for (let [colorWeightKey, colorWeightToken] of Object.entries(colors[colorKey])) {
      colors[colorKey][colorWeightKey] = colorWeightToken.value;
    }
  }

  let content = `export const colors = ${JSON.stringify(colors, null, 2)};`;

  await writeTailwindConfig("./src/tokens/tailwind/colors.ts", content);
}

async function writeTextColors(aliasTokens) {
  // Global text colors
  const globalTextColor = aliasTokens.global.foreground;

  for (let [tokenKey, tokenValue] of Object.entries(globalTextColor)) {
    globalTextColor[tokenKey] = getDoubleCssVariable("text-" + tokenKey, tokenValue.value);
  }

  // Semantic text colors
  const semanticForegroundColors = getNestedColorsWithTokenCssVariable(semanticTokens, "foreground", "text");
  
  const interactiveForegroundColors = aliasTokens.global.interactive;

  for (let [tokenKey, tokenValue] of Object.entries(interactiveForegroundColors)) {
    interactiveForegroundColors[tokenKey] = getDoubleCssVariable(`text-interactive-${tokenKey}`, tokenValue.value);
  }

  // Button text colors
  const buttonForegroundColors = getNestedColorsWithTokenCssVariable(aliasTokens.global.button, "foreground", "text-button");
  const dangerButtonForegroundColors = getNestedColorsWithTokenCssVariable(aliasTokens.danger.button, "foreground", "text-button-danger");

  const textColor = {
    ...globalTextColor,
    ...semanticForegroundColors,
    interactive: interactiveForegroundColors,
    button: {
      ...buttonForegroundColors,
      danger: dangerButtonForegroundColors,
    },
  };

  let content = `export const textColor = ${JSON.stringify(textColor, null, 2)};`;

  await writeTailwindConfig("./src/tokens/tailwind/textColor.ts", content);
}

async function writeBorderColors(aliasTokens) {
  // Global border
  const globalBorderColor = aliasTokens.global.border;

  for (let [tokenKey, tokenValue] of Object.entries(globalBorderColor)) {
    globalBorderColor[tokenKey] = getDoubleCssVariable("border-" + tokenKey, tokenValue.value)
  }

  // Semantic border
  const semanticBorderColors = getNestedColors(semanticTokens, "border");

  // Button border
  const buttonBorderColors = getNestedColorsWithTokenCssVariable(aliasTokens.global.button, "border", "border");
  const dangerButtonBorderColors = getNestedColorsWithTokenCssVariable(aliasTokens.danger.button, "border", "border-danger");

  const borderColor = {
    ...globalBorderColor,
    ...semanticBorderColors,
    button: {
      ...buttonBorderColors,
      danger: dangerButtonBorderColors,
    },
  };

  let content = `export const borderColor = ${JSON.stringify(borderColor, null, 2)};`;
  await writeTailwindConfig("./src/tokens/tailwind/borderColor.ts", content);

  let outlineContent = `export const outlineColor = ${JSON.stringify(borderColor, null, 2)};`;
  await writeTailwindConfig("./src/tokens/tailwind/outlineColor.ts", outlineContent);

  let ringContent = `export const ringColor = ${JSON.stringify(borderColor, null, 2)};`;
  await writeTailwindConfig("./src/tokens/tailwind/ringColor.ts", ringContent);
}

async function writeBackgroundColors(aliasTokens) {
  // Normal background
  const backgroundColors = aliasTokens.global.background;

  for (let [variantKey] of Object.entries(backgroundColors)) {
    for (let [tokenKey, tokenValue] of Object.entries(backgroundColors[variantKey])) {
      backgroundColors[variantKey][tokenKey] = getDoubleCssVariable(`bg-${variantKey}-${tokenKey}`, tokenValue.value)
    }
  }

  // Semantic backgrounds
  const semanticBackgroundColors = getNestedColors(semanticTokens, "background");

  // Button background
  const buttonBackgroundColors = getNestedColorsWithTokenCssVariable(aliasTokens.global.button, "background", "bg-button");
  const dangerButtonBackgroundColors = getNestedColorsWithTokenCssVariable(aliasTokens.danger.button, "background", "bg-button-danger");

  const backgroundColor = {
    ...backgroundColors,
    ...semanticBackgroundColors,
    button: {
      ...buttonBackgroundColors,
      danger: dangerButtonBackgroundColors,
    },
  };

  let content = `export const backgroundColor = ${JSON.stringify(backgroundColor, null, 2)};`;

  await writeTailwindConfig("./src/tokens/tailwind/backgroundColor.ts", content);
}

async function getFigmaInput() {
  let content = await fs.readFile("./src/tokens/input/figma.json", "utf-8");
  content = JSON.parse(content);
  return content;
}

function setSemanticTokens(aliasTokens) {
  semanticColors.forEach((semanticColor) => {
    semanticTokens[semanticColor] = aliasTokens[semanticColor];
  });
}

async function main() {
  console.log("Building Tailwind config elements...");

  const figmaInput = await getFigmaInput();

  setSemanticTokens(figmaInput["alias tokens"]);

  await writeColors(figmaInput);
  await writeTextColors(figmaInput["alias tokens"]);
  await writeBorderColors(figmaInput["alias tokens"]);
  await writeBackgroundColors(figmaInput["alias tokens"]);

  await writeCssVariables();

  return console.log("Finished building Tailwind config");
}

main();
