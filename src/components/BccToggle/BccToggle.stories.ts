import BccToggle from "./BccToggle.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

export default {
  title: "Components/BccToggle",
  component: BccToggle,
  argTypes: {},
} as Meta<typeof BccToggle>;

const Template: StoryFn<typeof BccToggle> = (args) => ({
  components: { BccToggle },
  setup() {
    const val = ref(true);
    return { args, val };
  },
  template: `
    <BccToggle v-model="val" />
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  modelValue: false,
  wasToggled: false,
  disabled: false,
  loading: false,
};
