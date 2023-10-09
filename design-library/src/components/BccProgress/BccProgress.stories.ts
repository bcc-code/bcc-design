import BccProgress from "./BccProgress.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A `progress` element supporting current and max values
 */
export default {
  title: "Components/BccProgress",
  component: BccProgress,
  argTypes: {
    value: {
      description: "Current Value",
      control: { type: "number" },
    },
    size: {
      options: ["base", "lg"],
      control: { type: "radio" },
    },
    max: {
      description: "Max Value",
      control: { type: "number" },
    },
    overflow: {
      description: "Let or let not percentage exceed 100%",
    },
    showValues: {
      description: "Display current and max value",
    },
    showPercentage: {
      description: "Display percentage",
    },
  },
} as Meta<typeof BccProgress>;

const Template: StoryFn<typeof BccProgress> = (args) => ({
  components: { BccProgress },
  setup() {
    return { args };
  },
  template: `
    <BccProgress v-bind="args" class="w-1/4"/>
  `,
});

/**
 * Use `value` to control the progress of the progress bar. Pass max value to declare when it reaches 100% and set overflow to false if it should not exceed 100%.
 */
export const Example = Template.bind({});
Example.args = {
  value: 30145.5,
  max: 200000,
  size: "base",
  overflow: true,
  showValues: true,
  showPercentage: true,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccProgress
  value="30145.50"
  max="200000"
  showValues="true"
  showPercentage="true"
  overflow="true"
/>
`,
    },
  },
};

/**
 * Set the `size` prop to control the size
 */
export const Size: StoryFn<typeof BccProgress> = () => ({
  components: { BccProgress },
  template: `
    <div class="flex flex-col space-y-4">
      <BccProgress class="w-1/4 bcc-progress-xs" :value="30"/>
      <BccProgress class="w-1/4 bcc-progress-sm" :value="22"/>
      <BccProgress class="w-1/4" :value="75"/>
      <BccProgress class="w-1/4" bcc-progress-base :value="75"/>
      <BccProgress class="w-1/4 bcc-progress-lg" size="lg" :value="22"/>
      <BccProgress class="w-1/4 bcc-progress-xl" size="lg" :value="22"/>
      <BccProgress class="w-1/4 bcc-progress-2xl" size="lg" :value="22"/>
      <BccProgress class="w-1/4 bcc-progress-3xl" size="lg" :value="22"/>
    </div>
  `,
});

/**
 * Set the `max` value, it supports both decimals and integers
 */
export const Max: StoryFn<typeof BccProgress> = () => ({
  components: { BccProgress },
  template: `
    <div class="flex flex-col space-y-4">
      <BccProgress class="w-1/4" :value="0.435" :max="0.9"/>
      <BccProgress class="w-1/4" :value="8" :max="10"/>   
    </div>
  `,
});

/**
 * Do or do not let percentage `overflow` 100%
 */
export const Overflow: StoryFn<typeof BccProgress> = () => ({
  components: { BccProgress },
  template: `
    <div class="flex flex-col space-y-4">
      <BccProgress class="w-1/4" :value="1050" :max="100"/>
      <BccProgress class="w-1/4" :value="1050" :max="100" :overflow="false"/>
    </div>
  `,
});

/**
 * Set `showValues` and / or `showPercentage` to false
 */
export const ShowValuesAndOrPercentage: StoryFn<typeof BccProgress> = () => ({
  components: { BccProgress },
  template: `
    <div class="flex flex-col space-y-4">
      <BccProgress class="w-1/4" :value="8" :max="10"/>
      <BccProgress class="w-1/4" :value="8" :max="10" :showValues="false"/>   
      <BccProgress class="w-1/4" :value="8" :max="10" :showPercentage="false"/>   
      <BccProgress class="w-1/4" :value="8" :max="10" :showValues="false" :showPercentage="false"/>   
    </div>
  `,
});
