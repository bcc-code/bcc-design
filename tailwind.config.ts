import type { Config } from "tailwindcss";
import bccForbundetTheme from "./src/tokens/tailwind/bccForbundetTheme";
import tailwindPlugin from "./src/tokens/plugin/tailwindPlugin";

export default {
  content: ["./src/**/*.{vue,ts}"],
  presets: [bccForbundetTheme as Config],
  darkMode: "class", // To disable dark mode, see https://developer.bcc.no/bcc-design/components/vue-components/#disable-dark-mode
  plugins: [
    tailwindPlugin,
  ],
} satisfies Config;
