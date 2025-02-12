import { ref } from "vue";
import BccKnob from "./BccKnob.vue";

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
  components: { BccKnob },
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


    <pre>
    Available css variables:
      --bcc-knob-arc-bg: #D1D5DB;
      --bcc-knob-head: #437571;
      --bcc-knob-tail: #A9BABA;
      --bcc-knob-left-head: #9B4F44;
      --bcc-knob-left-tail: #DBBEAC;
      --bcc-knob-right-head: #3E8E75;
      --bcc-knob-right-tail: #B1DECC;
    </pre>
  `,
});

export const Example = Template.bind({});
Example.args = {};

export const CustomColors = Template.bind({});
CustomColors.args = {
  colored: true,
  showHandle: true,
};
