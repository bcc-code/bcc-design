import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ customElement: true })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        'bcc-alert': resolve(__dirname, './src/elements/bcc-alert.ts'),
        'bcc-button': resolve(__dirname, './src/elements/bcc-button.ts'),
      },
      output: {
        // dir: "/Users/gerardlamusse/DirectusProjects/buk-room-allocator/extensions/endpoints/clean-rooms/assets",
        entryFileNames: `[name].js`,
        assetFileNames: `assets/[name].js`,
        chunkFileNames: `[name].js`,
      },
    },
  },
});
