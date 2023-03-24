import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  setupFile: "histoire.setup.ts",
  theme: {
    title: "BCC Vue Components",
  },
  tree: {
    groups: [
      {
        id: "top",
        title: "",
      },
      {
        title: "Components",
        include: () => true,
      },
    ],
  },
});
