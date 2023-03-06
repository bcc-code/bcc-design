import CapacityIndicator from "./CapacityIndicator.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/CapacityIndicator",
  component: CapacityIndicator,
  argTypes: {},
} as Meta<typeof CapacityIndicator>;

const Template: StoryFn<typeof CapacityIndicator> = (args) => ({
  components: { CapacityIndicator },
  setup() {
    return { args };
  },
  template: `
    <CapacityIndicator v-bind="args">
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  capacity: 20,
  left: 14,
  size: 40,
};

export const State: StoryFn<typeof CapacityIndicator> = () => ({
  components: { CapacityIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <CapacityIndicator :capacity="200" :left="199" />
      <CapacityIndicator :capacity="20" :left="14" />
      <CapacityIndicator :capacity="20" :left="2" />
      <CapacityIndicator :capacity="20" :left="0" />
      <CapacityIndicator :capacity="Infinity" />
    </div>
  `,
});
