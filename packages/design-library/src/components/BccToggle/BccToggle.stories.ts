import BccToggle from "./BccToggle.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Forms/BccToggle",
  component: BccToggle,
  argTypes: {},
} as Meta<typeof BccToggle>;

const Template: StoryFn<typeof BccToggle> = (args) => ({
  components: { BccToggle },
  setup() {
    return { args };
  },
  template: `
    <BccToggle v-model="args.modelValue" v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  modelValue: false,
  wasToggled: false,
  disabled: false,
  loading: false,
  withIcon: true,
  label: "Test label",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccToggle label="Test label" />
    `,
    },
  },
};

/**
 * A toggle can be initialized with `true` or `false`. Set the value with `modelValue` (the default [for components](https://vuejs.org/guide/components/v-model.html#component-v-model)), or use `v-model`.
 */
export const Basic: StoryFn<typeof BccToggle> = () => ({
  components: { BccToggle },
  template: `
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" />
      <BccToggle :modelValue="false" />
      <BccToggle :modelValue="false" :label="'Test label'" />
    </div>
  `,
});

/**
 * Set the `was-toggled` prop to indicate that changing the value of the toggle to off has consequences.
 */
export const WasToggled: StoryFn<typeof BccToggle> = () => ({
  components: { BccToggle },
  template: `
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" was-toggled />
      <BccToggle :modelValue="false" was-toggled />
      <BccToggle :modelValue="false" was-toggled :label="'Test label'" />
    </div>
  `,
});

/**
 * Set the `disabled` attribute to disable all click events on the toggle
 */
export const Disabled: StoryFn<typeof BccToggle> = () => ({
  components: { BccToggle },
  template: `
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" disabled />
      <BccToggle :modelValue="false" disabled />
      <BccToggle :modelValue="false" disabled was-toggled />
      <BccToggle :modelValue="false" disabled was-toggled :label="'Test label'" />
    </div>
  `,
});

/**
 * Set the `loading` prop to disable the toggle and show a loading icon
 */
export const Loading: StoryFn<typeof BccToggle> = () => ({
  components: { BccToggle },
  template: `
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" loading />
      <BccToggle :modelValue="false" loading />
      <BccToggle :modelValue="false" was-toggled loading />
      <BccToggle :modelValue="false" was-toggled loading :label="'Test label'" />
    </div>
    <div class="flex items-center space-x-2 mt-4">
      <BccToggle :modelValue="true" loading disabled />
      <BccToggle :modelValue="false" loading disabled />
      <BccToggle :modelValue="false" was-toggled loading disabled />
      <BccToggle :modelValue="false" loading disabled was-toggled :label="'Test label'" />
    </div>
  `,
});
