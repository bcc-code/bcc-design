import BccCapacityIndicator from "./BccCapacityIndicator.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccCapacityIndicator",
  component: BccCapacityIndicator,
  argTypes: {
    total: {
      description: "The total available capacity",
    },
    used: {
      description: "How much from the total capacity is not available",
    },
  },
} as Meta<typeof BccCapacityIndicator>;

const Template: StoryFn<typeof BccCapacityIndicator> = (args) => ({
  components: { BccCapacityIndicator },
  setup() {
    return { args };
  },
  template: `
    <BccCapacityIndicator v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  total: 20,
  used: 14,
};

export const State: StoryFn<typeof BccCapacityIndicator> = () => ({
  components: { BccCapacityIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <BccCapacityIndicator :total="42" />
      <BccCapacityIndicator :total="200" :used="1" />
      <BccCapacityIndicator :total="20" :used="6" />
      <BccCapacityIndicator :total="20" :used="18" />
      <BccCapacityIndicator :total="20" :used="20" />
      <BccCapacityIndicator :total="-1" />
    </div>
  `,
});
