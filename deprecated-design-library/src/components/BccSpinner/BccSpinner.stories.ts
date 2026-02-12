import BccSpinner from "./BccSpinner.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Other/BccSpinner",
  component: BccSpinner,
  argTypes: {
    size: {
      description: "The size of the button",
      options: ["xs", "sm", "base", "lg", "xl"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccSpinner>;

const Template: StoryFn<typeof BccSpinner> = (args) => ({
  components: { BccSpinner },
  setup() {
    return { args };
  },
  template: `
    <BccSpinner v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  size: "base",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccSpinner />
    `,
    },
  },
};

/**
 * Set the `size` prop to change the size of the spinner
 */
export const Size: StoryFn<typeof BccSpinner> = () => ({
  components: { BccSpinner },
  template: `
    <div class="flex items-start gap-x-2">
      <BccSpinner size="xs"></BccSpinner>
      <BccSpinner size="sm"></BccSpinner>
      <BccSpinner size="base"></BccSpinner>
      <BccSpinner size="lg"></BccSpinner>
      <BccSpinner size="xl"></BccSpinner>
    </div>
  `,
});
