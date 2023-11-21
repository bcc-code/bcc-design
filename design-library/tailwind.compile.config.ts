import type { Config } from "tailwindcss";
import baseConfig from "./tailwind.config";

// Special Tailwind config used for the compiled CSS that is included in the package
export default {
  ...baseConfig,
  
  // Only include classes from .vue component files, not stories
  content: [
    "./src/**/*.vue",
    "../src/**/*.vue", // This file is also used from the CSS package folder, paths are relative from there
  ],

  // Do not purge these classes
  safelist: [
    { pattern: /^bcc-/ },
    { pattern: /^text-title/ },
    { pattern: /^text-heading/ },
    { pattern: /^text-body/ },
    { pattern: /^text-label/ },
    { pattern: /^text-caption/ }
  ],
  
  // Do not use the style reset when compiling the CSS
  corePlugins: {
    preflight: false,
  }
} satisfies Config;
