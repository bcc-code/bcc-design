import fs from "fs/promises";

/**
 * @typedef ShadowValue
 * @type {object}
 * @property {string} color - Hex
 * @property {string} type - drop-shadow | box-shadow
 * @property {string} x - px
 * @property {string} y - px
 * @property {string} blur - px
 * @property {string} spread - px
 */

/**
 * @param {Record<string, Record<string, {
 * 					value: ShadowValue | ShadowValue[]
 * 					type: string;
 * 				}>>} elevationTokens
 */

export default async function writeShadows(tokens) {
  const shadows = {};

  // Right-5 => right-xl
  /**
   *
   * @param {string} name
   */
  function nameToKey(name) {
    const swap = {
      1: "sm",
      2: "DEFAULT",
      3: "md",
      4: "lg",
      5: "xl",
    };
    return name
      .toLowerCase()
      .replace(/\d/, (match) => {
        if (swap[match]) return swap[match];
        return Number(match) - 4 + "xl";
      })
      .replace("-DEFAULT", "");
  }

  /**
   *
   * @param {ShadowValue} value
   */
  function shadowValueToString(value) {
    return ` ${value.x}px ${value.y}px ${value.blur}px ${value.spread}px ${value.color}`
      .replace(/ 0px/g, " 0")
      .trim();
  }

  /**
   * @param {string} name
   * @param {ShadowValue | ShadowValue[]} value
   */
  function addShadow(name, value) {
    const key = nameToKey(name);
    const strValue = Array.isArray(value)
      ? value.map(shadowValueToString).join(", ")
      : shadowValueToString(value);
    shadows[key] = strValue;
  }

  function addDeepShadows(tokenSet) {
    if (!tokenSet) return;
    for (const [key1, obj1] of Object.entries(tokenSet)) {
      if (obj1.value) {
        addShadow(key1, obj1.value);
      } else addDeepShadows(obj1);
    }
  }

  addDeepShadows(tokens.elevation.Default);
  addDeepShadows(tokens.elevation.Direction);

  await writeTailwindConfig("shadows", {
    boxShadow: shadows,
  });
}

async function writeTailwindConfig(name, obj) {
  const content = [];
  for (const [key, value] of Object.entries(obj)) {
    content.push(`export const ${key} = ${JSON.stringify(value, null, 2)};`);
  }

  await fs.writeFile(`./src/tokens/tailwind/${name}.ts`, content.join("\n\n"), "utf8");
}
