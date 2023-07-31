import BccStatusIndicator from "./BccStatusIndicator.vue";
import { SearchIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A status indicator icon that pairs well with the `CapacityIndicator`
 */
export default {
  title: "Components/BccStatusIndicator",
  component: BccStatusIndicator,
  argTypes: {
    status: {
      description: "Determines the coloring and default icons",
      options: ["default", "success", "danger"],
      control: { type: "radio" },
    },
    size: {
      description: "The size of component",
      options: ["base", "lg"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccStatusIndicator>;

const Template: StoryFn<typeof BccStatusIndicator> = (args) => ({
  components: { BccStatusIndicator },
  setup() {
    return { args };
  },
  template: `
    <BccStatusIndicator v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  status: "success",
  size: "base",
};

/**
 * If you don't pass the `icon` prop, a default icon will be used based on the `status`
 */
export const DefaultIcons: StoryFn<typeof BccStatusIndicator> = () => ({
  components: { BccStatusIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <BccStatusIndicator />
      <BccStatusIndicator status="success" />
      <BccStatusIndicator status="danger" />
    </div>
  `,
});

/**
 * Set a custom icon with the `icon` prop
 */
export const CustomIcon: StoryFn<typeof BccStatusIndicator> = () => ({
  components: { BccStatusIndicator },
  setup() {
    return { SearchIcon };
  },
  template: `
    <div class="flex items-center space-x-4">
      <BccStatusIndicator :icon="SearchIcon" />
      <BccStatusIndicator :icon="SearchIcon" status="success" />
      <BccStatusIndicator :icon="SearchIcon" status="danger" />
    </div>
  `,
});

/**
 * Set the `size` prop to change the component size
 */
export const Size: StoryFn<typeof BccStatusIndicator> = () => ({
  components: { BccStatusIndicator },
  template: `
    <div class="flex items-center space-x-4">
      <BccStatusIndicator size="base" status="success" />
      <BccStatusIndicator size="lg" status="success" />
    </div>
  `,
});

/**
 * Wrap the component in an element with `data-context="alternative"` to render an alternative component on a dark background
 */
export const AlternativeContext: StoryFn<typeof BccStatusIndicator> = () => ({
  components: { BccStatusIndicator },
  setup() {
    return { SearchIcon };
  },
  template: `
    <div class="flex items-start gap-x-2 bg-primary p-4 rounded" data-context="alternative">
      <BccStatusIndicator />
      <BccStatusIndicator status="success" />
      <BccStatusIndicator status="danger" />
    </div>
  `,
});
