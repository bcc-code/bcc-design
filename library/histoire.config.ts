import { HstVue } from "@histoire/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "histoire";
import { resolve } from "path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [HstVue()],
  setupFile: "/src/histoire.setup.ts",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    optimizeDeps: {
      include: ["@bcc-code/icons-vue", "primevue", "vue"],
    },
  },
});
