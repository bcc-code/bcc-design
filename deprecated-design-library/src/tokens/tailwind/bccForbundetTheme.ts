import { colors } from "./colors";
import { fontFamily } from "./fontFamily";
import { fontSize } from "./fontSize";
import { lineHeight } from "./lineHeight";
import { textColor } from "./textColor";
import { borderColor } from "./borderColor";
import { backgroundColor } from "./backgroundColor";
import { outlineColor } from "./outlineColor";
import { ringColor } from "./ringColor";
import type { Config } from "tailwindcss";
import { animation, keyframes } from "./transitions";

const bccForbundetTheme: Partial<Config> = {
  theme: {
    extend: {
      fontFamily,
      fontSize,
      lineHeight,
      colors,
      textColor,
      borderColor,
      backgroundColor,
      outlineColor,
      ringColor,
      keyframes,
      animation
    },
  },
};

export default bccForbundetTheme;
