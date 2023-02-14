import BccButton from "./BccButton.vue";
import Search from "@icons/search.svg";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Button",
  component: BccButton,
  argTypes: {
    variant: {
      description: "The global style of the button",
      options: ["primary", "secondary", "tertiary"],
      control: { type: "radio" },
    },
    size: {
      description: "The size of the button",
      options: ["xs", "sm", "base", "lg", "xl"],
      control: { type: "radio" },
    },
    look: {
      description: "How rounded the corners of the button should be",
      options: ["regular", "rounded"],
      control: { type: "radio" },
    },
    iconPosition: {
      description:
        "On which side of the button to put the contents of the icon slot",
      options: ["left", "right"],
      control: { type: "radio" },
    },
    is: {
      description: "The actual underlying HTML element to use for the button",
      options: ["button", "a"],
      control: { type: "radio" },
    },
    slotDefault: {
      name: "default slot",
      description: "The button text",
    },
  },
} as Meta<typeof BccButton>;

const Template: StoryFn<typeof BccButton> = (args) => ({
  components: { BccButton, Search },
  setup() {
    return { args };
  },
  template: `
    <BccButton v-bind="args">
      <template #icon>
        <Search />
      </template>
      <template #default>
        {{ args.slotDefault }}
      </template>
    </BccButton>
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  variant: "primary",
  size: "base",
  look: "regular",
  type: "button",
  iconPosition: "left",
  disabled: false,
  is: "button",
  slotDefault: "Example Button",
};

export const Primary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-center space-x-2">
      <BccButton size="xs">Primary (xs)</BccButton>
      <BccButton size="sm">Primary (sm)</BccButton>
      <BccButton size="base">Primary (base)</BccButton>
      <BccButton size="lg">Primary (lg)</BccButton>
      <BccButton size="xl">Primary (xl)</BccButton>
    </div>
  `,
});

export const Secondary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-center space-x-2">
      <BccButton variant="secondary" size="xs">Secondary (xs)</BccButton>
      <BccButton variant="secondary" size="sm">Secondary (sm)</BccButton>
      <BccButton variant="secondary" size="base">Secondary (base)</BccButton>
      <BccButton variant="secondary" size="lg">Secondary (lg)</BccButton>
      <BccButton variant="secondary" size="xl">Secondary (xl)</BccButton>
    </div>
  `,
});

export const Tertiary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-center space-x-2">
      <BccButton variant="tertiary" size="xs">Tertiary (xs)</BccButton>
      <BccButton variant="tertiary" size="sm">Tertiary (sm)</BccButton>
      <BccButton variant="tertiary" size="base">Tertiary (base)</BccButton>
      <BccButton variant="tertiary" size="lg">Tertiary (lg)</BccButton>
      <BccButton variant="tertiary" size="xl">Tertiary (xl)</BccButton>
    </div>
  `,
});

export const Disabled: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-center space-x-2">
      <BccButton variant="primary" :disabled="true">Primary disabled</BccButton>
      <BccButton variant="secondary" :disabled="true">Secondary disabled</BccButton>
      <BccButton variant="tertiary" :disabled="true">Tertiary disabled</BccButton>
    </div>
  `,
});

export const WithIcon: StoryFn<typeof BccButton> = () => ({
  components: { BccButton, Search },
  template: `
    <div class="flex items-center space-x-2">
      <BccButton>
        <template #icon>
          <Search />
        </template>
        With left icon
      </BccButton>
      <BccButton icon-position="right">
        With right icon
        <template #icon>
          <Search />
        </template>
      </BccButton>
      <BccButton variant="secondary">
        <template #icon>
          <Search />
        </template>
        Secondary with icon
      </BccButton>
      <BccButton kind="tertiary">
        <template #icon>
          <Search />
        </template>
        Tertiary with icon
      </BccButton>
      <BccButton :disabled="true">
        <template #icon>
          <Search />
        </template>
        Disabled with icon
      </BccButton>
    </div>
    <div class="flex items-center space-x-2 mt-4">
      <BccButton size="xs">
        <template #icon>
          <Search />
        </template>
        xs button
      </BccButton>
      <BccButton size="sm">
        <template #icon>
          <Search />
        </template>
        sm button
      </BccButton>
      <BccButton size="base">
        <template #icon>
          <Search />
        </template>
        base button
      </BccButton>
      <BccButton size="lg">
        <template #icon>
          <Search />
        </template>
        lg button
      </BccButton>
      <BccButton size="xl">
        <template #icon>
          <Search />
        </template>
        xl button
      </BccButton>
    </div>
  `,
});
