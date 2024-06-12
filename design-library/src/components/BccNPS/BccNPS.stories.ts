import { ref } from "vue";
import BccNPS from "./BccNPS.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Forms/BccNPS",
  component: BccNPS,
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
} as Meta<typeof BccNPS>;

const Template: StoryFn<typeof BccNPS> = (args) => ({
  components: { BccNPS },
  setup() {
    const value = ref(0);
    return { args, value };
  },
  template: `
    <BccNPS v-bind="args" v-model="value" style="width: 320px" />
  `,
});

export const Example = Template.bind({});
Example.args = {};
