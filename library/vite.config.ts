import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { resolve } from "path";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "BccComponentLibrary",
      fileName: "component-library",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue", "primevue"],
      output: {
        globals: {
          vue: "Vue",
          primevue: "PrimeVue",
        },
      },
    },
    cssCodeSplit: true,
  },
});
