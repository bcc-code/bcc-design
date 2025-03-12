import BccCapacityIndicator from "./BccCapacityIndicator.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * Show the remaining capacity, for example for activities. Pairs well with the `StatusIndicator` for more custom status states
 */
export default {
  title: "Other/BccCapacityIndicator",
  component: BccCapacityIndicator,
  argTypes: {
    total: {
      description: "The total available capacity",
    },
    used: {
      description: "How much from the total capacity is not available",
    },
    size: {
      description: "The size of component",
      options: ["xs", "sm", "base", "lg"],
      control: { type: "radio" },
    },
    animationDuration: {
      description: "How long the animation in `ms` is when the `used` prop is updated",
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
  size: "base",
  animationDuration: 1000,
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
      <BccCapacityIndicator :total="20" :used="19" />
      <BccCapacityIndicator :total="20" :used="20" />
      <BccCapacityIndicator :total="-1" />
    </div>
  `,
});

/**
 * Set the `size` prop to change the size of the component
 */
export const Size: StoryFn<typeof BccCapacityIndicator> = () => ({
  components: { BccCapacityIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <BccCapacityIndicator size="sm" :total="30" used="7" />
      <BccCapacityIndicator size="base" :total="30" used="21" />
      <BccCapacityIndicator size="lg" :total="30" :used="30" />
    </div>
  `,
});

/**
 * Set the `squared` prop to change the from circle to a square
 */
export const Squared: StoryFn<typeof BccCapacityIndicator> = () => ({
  components: { BccCapacityIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <BccCapacityIndicator squared :total="12" :used="0" />
      <BccCapacityIndicator size="sm" squared :total="12" :used="1" />
      <BccCapacityIndicator size="sm" squared :total="12" :used="3" />
      <BccCapacityIndicator size="base" squared :total="12" :used="6" />
      <BccCapacityIndicator size="base" squared :total="12" :used="9" />
      <BccCapacityIndicator size="lg" squared :total="12" :used="11" />
      <BccCapacityIndicator size="lg" squared :total="12" :used="12" />
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
