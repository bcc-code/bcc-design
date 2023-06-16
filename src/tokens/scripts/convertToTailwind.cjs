const fs = require("fs").promises;

const semanticColors = ["success", "warning", "danger", "info", "emphasis"];
let semanticTokens = {};

let globalCssVariables = {};
let brandCssVariables = {};

// Convert a token value into something that can be used as the value of a CSS variable
function getCssVariableValue(tokenValue) {
  // It might be a color function like rgba() or a direct hex color value
  if (!tokenValue.startsWith("{colors.")) {
    return tokenValue;
  }
  
  // Convert a token from {colors.neutral.900} to var(--neutral-900)
  return tokenValue.replaceAll("{colors.", "var(--").replaceAll("}", ")").replaceAll(".", "-");
}

// Get a CSS variable name from a token key, and save its value to a global object
function getCssVariable(tokenKey, tokenValue, brandTokenValue = null) {
  let cssVariableKey = tokenKey.replaceAll(".", "-");

  // Remove the -default suffix to simplify the variable name
  if (cssVariableKey.toLowerCase().endsWith("-default")) {
    cssVariableKey = cssVariableKey.slice(0, -8);
  }

  // Save value of this variable to the global export of CSS variable values
  globalCssVariables[`--${cssVariableKey}`] = getCssVariableValue(tokenValue);

  // Save value of the corresponding brand token to the global export of brand variables
  if (brandTokenValue) {
    brandCssVariables[`--${cssVariableKey}`] = getCssVariableValue(brandTokenValue);
  }

  // Return the key formatted as a CSS variable
  const cssVariable = `var(--${cssVariableKey})`;
  return cssVariable;
}

function getNestedColors(variants, type, name) {
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
          colors[variantKey][tokenKey] = getCssVariable(`${name}-${variantKey}-${tokenKey}`, tokenValue.value);
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
  let content = `const cssVariables = ${JSON.stringify(globalCssVariables, null, 2)};\n\nexport default cssVariables;`;
  await fs.writeFile("./src/tokens/variables/global.ts", content, "utf8");
  
  let brandContent = `const cssVariables = ${JSON.stringify(brandCssVariables, null, 2)};\n\nexport default cssVariables;`;
  await fs.writeFile("./src/tokens/variables/brand.ts", brandContent, "utf8");
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
  const brandTextColor = aliasTokens.brand.foreground;

  for (let [tokenKey, tokenValue] of Object.entries(globalTextColor)) {
    globalTextColor[tokenKey] = getCssVariable("text-" + tokenKey, tokenValue.value, brandTextColor[tokenKey].value);
  }

  // Semantic text colors
  const semanticForegroundColors = getNestedColors(semanticTokens, "foreground", "text");
  
  const interactiveForegroundColors = aliasTokens.global.interactive;
  const brandInteractiveForegroundColors = aliasTokens.brand.interactive;

  for (let [tokenKey, tokenValue] of Object.entries(interactiveForegroundColors)) {
    interactiveForegroundColors[tokenKey] = getCssVariable(`text-interactive-${tokenKey}`, tokenValue.value, brandInteractiveForegroundColors[tokenKey].value);
  }

  // Button text colors
  const buttonForegroundColors = getNestedColors(aliasTokens.global.button, "foreground", "text-button");
  const dangerButtonForegroundColors = getNestedColors(aliasTokens.danger.button, "foreground", "text-button-danger");

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
  const brandBorderColor = aliasTokens.brand.border;

  for (let [tokenKey, tokenValue] of Object.entries(globalBorderColor)) {
    globalBorderColor[tokenKey] = getCssVariable("border-" + tokenKey, tokenValue.value, brandBorderColor[tokenKey].value);
  }

  // Semantic border
  const semanticBorderColors = getNestedColors(semanticTokens, "border", "border");

  // Button border
  const buttonBorderColors = getNestedColors(aliasTokens.global.button, "border", "border-button");
  const dangerButtonBorderColors = getNestedColors(aliasTokens.danger.button, "border", "border-button-danger");

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
  const brandBackgroundColors = aliasTokens.brand.background;

  for (let [variantKey] of Object.entries(backgroundColors)) {
    for (let [tokenKey, tokenValue] of Object.entries(backgroundColors[variantKey])) {
      backgroundColors[variantKey][tokenKey] = getCssVariable(`bg-${variantKey}-${tokenKey}`, tokenValue.value, brandBackgroundColors[variantKey][tokenKey]?.value)
    }
  }

  // Semantic backgrounds
  const semanticBackgroundColors = getNestedColors(semanticTokens, "background", "bg");

  // Button background
  const buttonBackgroundColors = getNestedColors(aliasTokens.global.button, "background", "bg-button");
  const dangerButtonBackgroundColors = getNestedColors(aliasTokens.danger.button, "background", "bg-button-danger");

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
