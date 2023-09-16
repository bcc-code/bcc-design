import BccSpinner from "./BccSpinner.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccSpinner",
  component: BccSpinner,
  argTypes: {},
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
Example.args = {};
