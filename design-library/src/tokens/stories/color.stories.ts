import type { Meta, StoryFn } from "@storybook/vue3";
import ColorTokens from "./ColorTokens.vue";

/**
 * All custom colors from the design system. All colors have a corresponding CSS variable name, so for example the Tailwind utility class `.text-button-primary` can be used in CSS as `var(--text-button-primary)`.
 */
export default {
  title: "Tokens/Color",
} as Meta;

export const Examples: StoryFn = () => ({
  components: { ColorTokens },
  template: `
    <ColorTokens />
  `,
});
