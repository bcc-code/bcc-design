import BccButton from "./BccButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Button",
  component: BccButton,
  argTypes: {
    kind: {
      options: ["primary", "secondary", "tertiary"],
      control: { type: "radio" },
    },
    size: {
      options: ["xs", "sm", "base", "lg", "xl"],
      control: { type: "radio" },
    },
    look: {
      options: ["regular", "rounded"],
      control: { type: "radio" },
    },
    type: {
      options: ["button", "submit", "reset"],
      control: { type: "radio" },
    },
    slotDefault: {
      description: "The button text",
    },
  },
} as Meta<typeof BccButton>;

const Template: StoryFn<typeof BccButton> = (args) => ({
  components: { BccButton },
  setup() {
    return { args };
  },
  template: `
    <BccButton v-bind="args">
      <template #default>
        {{ args.slotDefault }}
      </template>
    </BccButton>
  `,
});

export const Example = Template.bind({});
Example.args = {
  kind: "primary",
  size: "base",
  look: "regular",
  type: "button",
  disabled: false,
  slotDefault: "Example Button",
};

export const Primary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <BccButton size="xs" class="mr-2">Primary (xs)</BccButton>
    <BccButton size="sm" class="mr-2">Primary (sm)</BccButton>
    <BccButton size="base" class="mr-2">Primary (base)</BccButton>
    <BccButton size="lg" class="mr-2">Primary (lg)</BccButton>
    <BccButton size="xl" class="mr-2">Primary (xl)</BccButton>
  `,
});

export const Secondary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <BccButton kind="secondary" size="xs" class="mr-2">Secondary (xs)</BccButton>
    <BccButton kind="secondary" size="sm" class="mr-2">Secondary (sm)</BccButton>
    <BccButton kind="secondary" size="base" class="mr-2">Secondary (base)</BccButton>
    <BccButton kind="secondary" size="lg" class="mr-2">Secondary (lg)</BccButton>
    <BccButton kind="secondary" size="xl" class="mr-2">Secondary (xl)</BccButton>
  `,
});

export const Tertiary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <BccButton kind="tertiary" size="xs" class="mr-2">Tertiary (xs)</BccButton>
    <BccButton kind="tertiary" size="sm" class="mr-2">Tertiary (sm)</BccButton>
    <BccButton kind="tertiary" size="base" class="mr-2">Tertiary (base)</BccButton>
    <BccButton kind="tertiary" size="lg" class="mr-2">Tertiary (lg)</BccButton>
    <BccButton kind="tertiary" size="xl" class="mr-2">Tertiary (xl)</BccButton>
  `,
});
