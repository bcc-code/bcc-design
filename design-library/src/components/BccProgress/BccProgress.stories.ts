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
      options: ["sm", "base", "lg"],
      control: { type: "radio" },
    },
    max: {
      description: "Max Value",
      control: { type: "number" },
    },
    exceed: {
      description: "Let or let not percentage exceed 100%",
    },
    showValues: {
      description: "Display current and max value",
    },
    showPercentage: {
      description: "Display percentage",
    },
    progressClass: {
      description: "Override height, background color and other classes.",
      control: false,
    },
    barClass: {
      description: "Override background color and other classes.",
      control: false,
    },
    labelClass: {
      description: "Override label classes.",
      control: false,
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
 * Use `value` to control the progress of the progress bar. Pass max value to declare when it reaches 100% and set exceed to false if it should not exceed 100%.
 */
export const Example = Template.bind({});
Example.args = {
  value: 300145.5,
  max: 200000,
  size: "base",
  exceed: true,
  showValues: true,
  showPercentage: true,
  progressClass: "",
  barClass: "",
  labelClass: "",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccProgress
  value="30145.50"
  max="200000"
  size="base"
  showValues="true"
  showPercentage="true"
  exceed="true"
  progressClass=""
  barClass=""
  labelClass=""
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
      <BccProgress class="w-1/4" size="sm" :value="30"/>
      <BccProgress class="w-1/4" size="base" :value="75"/>
      <BccProgress class="w-1/4" size="lg" :value="22"/>      
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
 * Do or do not let percentage `exceed` 100%
 */
export const Exceed: StoryFn<typeof BccProgress> = () => ({
  components: { BccProgress },
  template: `
    <div class="flex flex-col space-y-4">
      <BccProgress class="w-1/4" :value="1050" :max="100"/>
      <BccProgress class="w-1/4" :value="1050" :max="100" :exceed="false"/>
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

/**
 * Set `progressClass`, `barClass` and `labelClass` to fully customize the progress bar
 */
export const FullCustomization: StoryFn<typeof BccProgress> = () => ({
  components: { BccProgress },
  template: `
    <div class="flex flex-col space-y-4">
      <BccProgress
        size="lg"
        :value="8"
        :max="10"
        class="w-full bg-slate-800 rounded p-2"
        labelClass="text-white"
        progressClass="h-4 bg-teal-400 rounded-2xl"
        barClass="bg-purple-500 rounded-2xl"
      />
      <BccProgress
        class="w-full"
        :value="8"
        :max="10"
        :progressClass="{ 'h-0.5': true, 'bg-slate-300': true }"
        :barClass="'bg-slate-500'"
      />
      <BccProgress
        class="w-full"
        :value="8"
        :max="10"
        progressClass="h-5"
      />
    </div>
  `,
});
