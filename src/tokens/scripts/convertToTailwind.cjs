const fs = require("fs").promises;

const semanticColors = ["success", "warning", "danger", "info", "emphasis"];
let semanticTokens = {};

function getCssVariable(token) {
  if (!token.startsWith("{colors.")) {
    return token;
  }

  return token.replaceAll("{colors.", "var(--").replaceAll("}", ")").replaceAll(".", "-");
}

function getNestedColors(buttonVariants, type) {
  let buttonColors = {};

  // variantKey = primary, secondary etc.
  for (let [variantKey] of Object.entries(buttonVariants)) {
    // itemKey = background, foreground, border etc.
    for (let [itemKey, itemValue] of Object.entries(buttonVariants[variantKey])) {
      if (itemKey === type) {
        buttonColors[variantKey] = {};

        // tokenKey = default, hover, pressed etc.
        // tokenValue = hex color value
        for (let [tokenKey, tokenValue] of Object.entries(itemValue)) {
          buttonColors[variantKey][tokenKey] = getCssVariable(tokenValue.value);
        }
      }
    }
  }

  return buttonColors;
}

async function writeTailwindConfig(file, content) {
  // Simplifies class names so bg-info-default becomes bg-info
  content = content.replaceAll("default", "DEFAULT");

  await fs.writeFile(file, content, "utf8");
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
    globalTextColor[tokenKey] = getCssVariable(tokenValue.value);
  }

  // Semantic text colors
  const semanticForegroundColors = getNestedColors(semanticTokens, "foreground");

  // Button text colors
  const buttonForegroundColors = getNestedColors(aliasTokens.global.button, "foreground");
  const dangerButtonForegroundColors = getNestedColors(aliasTokens.danger.button, "foreground");

  const textColor = {
    ...globalTextColor,
    ...semanticForegroundColors,
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
    globalBorderColor[tokenKey] = getCssVariable(tokenValue.value);
  }

  // Semantic border
  const semanticBorderColors = getNestedColors(semanticTokens, "border");

  // Button border
  const buttonBorderColors = getNestedColors(aliasTokens.global.button, "border");
  const dangerButtonBorderColors = getNestedColors(aliasTokens.danger.button, "border");

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
      backgroundColors[variantKey][tokenKey] = getCssVariable(tokenValue.value);
    }
  }

  // Semantic backgrounds
  const semanticBackgroundColors = getNestedColors(semanticTokens, "background");

  // Button background
  const buttonBackgroundColors = getNestedColors(aliasTokens.global.button, "background");
  const dangerButtonBackgroundColors = getNestedColors(aliasTokens.danger.button, "background");

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

  return console.log("Finished building Tailwind config");
}

main();
