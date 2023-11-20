import BccForm from "./BccForm.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccForm",
  component: BccForm,
  argTypes: {

  },
} as Meta<typeof BccForm>;

const Template: StoryFn<typeof BccForm> = (args) => ({
  components: { BccForm },
  setup() {
    return { args };
  },
  template: `
    <BccForm v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {

};
