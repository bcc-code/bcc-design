import BccToggle from "./BccToggle.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccToggle",
  component: BccToggle,
  argTypes: {},
} as Meta<typeof BccToggle>;

const Template: StoryFn<typeof BccToggle> = (args) => ({
  components: { BccToggle },
  setup() {
    return { args };
  },
  template: `
    <BccToggle v-model="args.modelValue" />
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
 * Set the `was-toggled` prop to `true` to indicate that changing the value of the toggle to off has consequences.
 */
export const WasToggled: StoryFn<typeof BccToggle> = () => ({
  components: { BccToggle },
  template: `
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" :was-toggled="true" />
      <BccToggle :modelValue="false" :was-toggled="true" />
      <BccToggle :modelValue="false" :was-toggled="true" :label="'Test label'" />
    </div>
  `,
});

export const Disabled: StoryFn<typeof BccToggle> = () => ({
  components: { BccToggle },
  template: `
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" disabled />
      <BccToggle :modelValue="false" disabled />
      <BccToggle :modelValue="false" disabled :was-toggled="true" />
      <BccToggle :modelValue="false" disabled :was-toggled="true" :label="'Test label'" />
    </div>
  `,
});

export const Loading: StoryFn<typeof BccToggle> = () => ({
  components: { BccToggle },
  template: `
    <div class="flex items-center space-x-2">
      <BccToggle :modelValue="true" loading />
      <BccToggle :modelValue="false" loading />
      <BccToggle :modelValue="false" :was-toggled="true" loading />
      <BccToggle :modelValue="false" :was-toggled="true" loading :label="'Test label'" />
    </div>
    <div class="flex items-center space-x-2 mt-4">
      <BccToggle :modelValue="true" loading disabled />
      <BccToggle :modelValue="false" loading disabled />
      <BccToggle :modelValue="false" :was-toggled="true" loading disabled />
      <BccToggle :modelValue="false" loading disabled :was-toggled="true" :label="'Test label'" />
    </div>
  `,
});
