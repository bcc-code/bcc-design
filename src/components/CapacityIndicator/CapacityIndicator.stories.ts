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
    <CapacityIndicator v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  capacity: 20,
  used: 14,
};

export const State: StoryFn<typeof CapacityIndicator> = () => ({
  components: { CapacityIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <CapacityIndicator :capacity="200" :used="1" />
      <CapacityIndicator :capacity="20" :used="6" />
      <CapacityIndicator :capacity="20" :used="18" />
      <CapacityIndicator :capacity="20" :used="20" />
      <CapacityIndicator :capacity="Infinity" />
    </div>
  `,
});
