import { colors } from "./colors";
import { fontFamily } from "./fontFamily";
import { textColor } from "./textColor";
import { borderColor } from "./borderColor";
import { backgroundColor } from "./backgroundColor";
import { outlineColor } from "./outlineColor";
import { ringColor } from "./ringColor";
import type { Config } from "tailwindcss";

const bccForbundetTheme: Partial<Config> = {
  theme: {
    extend: {
      fontFamily,
      colors,
      textColor,
      borderColor,
      backgroundColor,
      outlineColor,
      ringColor,
    },
  },
};

export default bccForbundetTheme;
