import { ref } from "vue";
import BccKnob from "./BccKnob.vue";
import BccKnobGradientBackground from "./BccKnobGradientBackground.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Other/BccKnob",
  component: BccKnob,
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum value of the slider",
      defaultValue: -120,
    },
    max: {
      control: { type: "number" },
      description: "Maximum value of the slider",
      defaultValue: 120,
    },
    modelValue: {
      control: { type: "number" },
      description: "Current value of the slider",
      defaultValue: 50,
    },
  },
} as Meta<typeof BccKnob>;

const Template: StoryFn<typeof BccKnob> = (args) => ({
  components: { BccKnob, BccKnobGradientBackground },
  setup() {
    const value = ref(0);
    return { args, value };
  },
  template: `
    <div class="relative flex flex-col justify-center items-center">
      <BccKnob v-bind="args" v-model="value" />
      <div class="absolute inset-0 flex justify-center items-center pointer-events-none">
        <pre>{{ value }}</pre>
      </div>
    </div>
  `,
});

export const Example = Template.bind({});
Example.args = {};
