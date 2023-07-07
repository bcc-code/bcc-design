import BccCapacityIndicator from "./BccCapacityIndicator.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * Show the remaining capacity, for example for activities. Pairs well with the `StatusIndicator` for more custom status states
 */
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
    animate: {
      description: "If the indicator should animate on display or not",
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
Example.args = {
  total: 20,
  used: 14,
  animate: false,
};

/**
 * Pass the `total` and `used` props to control the state of the component. Set `total` to `-1` to show infinite capacity
 */
export const State: StoryFn<typeof BccCapacityIndicator> = () => ({
  components: { BccCapacityIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <BccCapacityIndicator :total="42" />
      <BccCapacityIndicator :total="200" :used="1" />
      <BccCapacityIndicator :total="20" :used="6" />
      <BccCapacityIndicator :total="20" :used="18" />
      <BccCapacityIndicator :total="20" :used="20" />
      <BccCapacityIndicator :total="0" :used="0" />
      <BccCapacityIndicator :total="-1" />
    </div>
  `,
});

/**
 * Setting the `animate` prop to `true` will animate the indicator to its current value when it's first rendered
 */
export const Animated: StoryFn<typeof BccCapacityIndicator> = () => ({
  components: { BccCapacityIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <BccCapacityIndicator animate :total="42" />
      <BccCapacityIndicator animate :total="200" :used="1" />
      <BccCapacityIndicator animate :total="20" :used="6" />
      <BccCapacityIndicator animate :total="20" :used="18" />
      <BccCapacityIndicator animate :total="20" :used="20" />
      <BccCapacityIndicator animate :total="0" :used="0" />
      <BccCapacityIndicator animate :total="-1" />
    </div>
  `,
});

/**
 * Wrap the component in an element with `data-context="alternative"` to render an alternative component on a dark background
 */
export const AlternativeContext: StoryFn<typeof BccCapacityIndicator> = () => ({
  components: { BccCapacityIndicator },
  template: `
  <div class="flex items-start gap-x-2 bg-primary p-4 rounded" data-context="alternative">
      <BccCapacityIndicator animate :total="42" />
      <BccCapacityIndicator animate :total="200" :used="1" />
      <BccCapacityIndicator animate :total="20" :used="6" />
      <BccCapacityIndicator animate :total="20" :used="18" />
      <BccCapacityIndicator animate :total="20" :used="20" />
      <BccCapacityIndicator animate :total="0" :used="0" />
      <BccCapacityIndicator animate :total="-1" />
    </div>
  `,
});
