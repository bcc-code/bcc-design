import BccButton from "./BccButton.vue";
import { SearchIcon, ChevronRightIcon, ChevronLeftIcon } from "@bcc-code/icons-vue";

import { app, Meta, StoryFn } from "@storybook/vue3";
app.component('ChevronRightIcon', ChevronRightIcon);
app.component('ChevronLeftIcon', ChevronLeftIcon);
app.component('SearchIcon', SearchIcon);

export default {
  title: "Components/BccButton",
  component: BccButton,
  argTypes: {
    variant: {
      description: "The global style of the button",
      options: ["primary", "danger", "info", "warn"],
      control: { type: "radio" },
    },
    size: {
      description: "The size of the button",
      options: ["xs", "sm", "base", "lg", "xl"],
      control: { type: "radio" },
    },
    iconRight: {
      description: "On which side of the button to put the contents of the icon slot",
    },
    center: {
      description: "Whether text and icon are centered or at the opposing sides of the button",
    },
    outlined: {
      description: "Without background",
    },
    flat: {
      description: "No border or background",
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
  components: { BccButton, SearchIcon },
  setup() {
    return { args };
  },
  template: `
    <BccButton v-bind="args" icon="SearchIcon">
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
  rounded: false,
  iconPosition: "left",
  center: true,
  disabled: false,
  outlined: true,
  flat: true,
  is: "button",
  slotDefault: "Example Button",
};

export const Primary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start space-x-2">
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
    <div class="flex items-start space-x-2">
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
    <div class="flex items-start space-x-2">
      <BccButton variant="primary" :disabled="true">Primary disabled</BccButton>
      <BccButton variant="secondary" :disabled="true">Secondary disabled</BccButton>
      <BccButton variant="tertiary" :disabled="true">Tertiary disabled</BccButton>
    </div>
  `,
});

export const Rounded: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start space-x-2">
      <BccButton variant="primary" :rounded="true">Primary rounded</BccButton>
      <BccButton variant="secondary" :rounded="true">Secondary rounded</BccButton>
      <BccButton variant="tertiary" :rounded="true">Tertiary rounded</BccButton>
    </div>
  `,
});

export const WithIcon: StoryFn<typeof BccButton> = () => ({
  components: { BccButton, SearchIcon },
  template: `
    <div class="flex items-start space-x-2">
      <BccButton icon="SearchIcon">
        With left icon
      </BccButton>
      <BccButton icon-position="right">
        With right ico icon="SearchIcon"n
      </BccButton>
      <BccButton variant="secondary" icon="SearchIcon">
        Secondary with icon
      </BccButton>
      <BccButton variant="tertiary" icon="SearchIcon">
        Tertiary with icon
      </BccButton>
      <BccButton :disabled="true" icon="SearchIcon">
        Disabled with icon
      </BccButton>
    </div>
    <div class="flex items-start space-x-2 mt-4">
      <BccButton size="xs" icon="SearchIcon">
        xs button
      </BccButton>
      <BccButton size="sm" icon="SearchIcon">
        sm button
      </BccButton>
      <BccButton size="base" icon="SearchIcon">
        base button
      </BccButton>
      <BccButton size="lg" icon="SearchIcon">
        lg button
      </BccButton>
      <BccButton size="xl" icon="SearchIcon">
        xl button
      </BccButton>
    </div>
  `,
});

export const ContentPosition: StoryFn<typeof BccButton> = () => ({
  components: { BccButton, ChevronRightIcon, ChevronLeftIcon },
  template: `
    <div class="space-y-4">
      <BccButton variant="primary" class="w-full">
        Default text
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" :rounded="true" :disabled="true" icon="ChevronLeftIcon">
        Default text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" icon-position="right" icon="ChevronRightIcon">
        Default text, icon right
      </BccButton>
      
      <BccButton variant="primary" class="w-full" :center="false">
        Non-centered text
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" :rounded="true" :disabled="true" :center="false" icon="ChevronLeftIcon">
        Non-centered text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" icon-position="right" :center="false" icon="ChevronRightIcon">
        Non-centered text, icon right
      </BccButton>
    </div>
  `,
});

export const Anchor: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start space-x-2">
      <BccButton is="a" variant="primary">Primary</BccButton>
      <BccButton is="a" variant="primary" :disabled="true">Primary disabled</BccButton>
      <BccButton is="a" variant="secondary">Secondary</BccButton>
      <BccButton is="a" variant="secondary" :disabled="true">Secondary disabled</BccButton>
      <BccButton is="a" variant="tertiary">Tertiary</BccButton>
      <BccButton is="a" variant="tertiary" :disabled="true">Tertiary disabled</BccButton>
    </div>
  `,
});
