import type { Config } from "tailwindcss";
import baseConfig from "../tailwind.config";

export default {
  ...baseConfig,
  content: ["../src/**/*.{vue,ts}"],
} satisfies Config;