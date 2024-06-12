import { ref } from "vue";
import BccNpsResult from "./BccNpsResult.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Feedback/BccNpsResult",
  component: BccNpsResult,
  argTypes: {
    reverse: {
      description: "Should the bar be reversed?",
    },
    labelPosition: {
      description: "Where to place the labels",
      options: ["top", "bottom"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccNpsResult>;

const Template: StoryFn<typeof BccNpsResult> = (args) => ({
  components: { BccNpsResult },
  setup() {
    const value = ref(0);
    return { args, value };
  },
  template: `
    <BccNpsResult v-bind="args" v-model="value" style="width: 320px" />
  `,
});

export const Example = Template.bind({});
Example.args = {};
