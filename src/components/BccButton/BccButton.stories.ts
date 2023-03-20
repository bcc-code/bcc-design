import BccButton from "./BccButton.vue";
import { SearchIcon, ChevronRightIcon, ChevronLeftIcon } from "@bcc-code/icons-vue";

import { app, Meta, StoryFn } from "@storybook/vue3";
app.component("ChevronRightIcon", ChevronRightIcon);
app.component("ChevronLeftIcon", ChevronLeftIcon);
app.component("SearchIcon", SearchIcon);

export default {
  title: "Components/BccButton",
  component: BccButton,
  argTypes: {
    variant: {
      description: "The global style of the button",
      options: ["primary", "danger"],
      control: { type: "radio" },
    },
    size: {
      description: "The size of the button",
      options: ["xs", "sm", "md", "lg", "xl"],
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
  size: "md",
  rounded: false,
  iconRight: false,
  center: true,
  disabled: false,
  outlined: false,
  flat: false,
  is: "button",
  slotDefault: "Example Button",
};

export const Primary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start space-x-2">
      <BccButton size="xs">Primary (xs)</BccButton>
      <BccButton size="sm">Primary (sm)</BccButton>
      <BccButton size="md">Primary (md)</BccButton>
      <BccButton size="lg">Primary (lg)</BccButton>
      <BccButton size="xl">Primary (xl)</BccButton>
    </div>
  `,
});

export const Secondary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start space-x-2">
      <BccButton outlined size="xs">Secondary (xs)</BccButton>
      <BccButton outlined size="sm">Secondary (sm)</BccButton>
      <BccButton outlined size="md">Secondary (md)</BccButton>
      <BccButton outlined size="lg">Secondary (lg)</BccButton>
      <BccButton outlined size="xl">Secondary (xl)</BccButton>
    </div>
  `,
});

export const Tertiary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-center space-x-2">
      <BccButton flat size="xs">Tertiary (xs)</BccButton>
      <BccButton flat size="sm">Tertiary (sm)</BccButton>
      <BccButton flat size="md">Tertiary (md)</BccButton>
      <BccButton flat size="lg">Tertiary (lg)</BccButton>
      <BccButton flat size="xl">Tertiary (xl)</BccButton>
    </div>
  `,
});

export const Disabled: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start space-x-2">
      <BccButton variant="primary" :disabled="true">Primary disabled</BccButton>
      <BccButton outlined :disabled="true">Secondary disabled</BccButton>
      <BccButton flat :disabled="true">Tertiary disabled</BccButton>
    </div>
  `,
});

export const Rounded: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start space-x-2">
      <BccButton variant="primary" :rounded="true">Primary rounded</BccButton>
      <BccButton outlined :rounded="true">Secondary rounded</BccButton>
      <BccButton flat :rounded="true">Tertiary rounded</BccButton>
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
      <BccButton icon-right icon="SearchIcon">
        With right icon
      </BccButton>
      <BccButton outlined icon="SearchIcon">
        Secondary with icon
      </BccButton>
      <BccButton flat icon="SearchIcon">
        Tertiary with icon
      </BccButton>
      <BccButton disabled icon="SearchIcon">
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
      <BccButton size="md" icon="SearchIcon">
        md button
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

export const IconOnly: StoryFn<typeof BccButton> = () => ({
  components: { BccButton, SearchIcon },
  template: `
    <div class="flex items-start space-x-2">
      <BccButton icon="SearchIcon" />
      <BccButton icon-right icon="SearchIcon" />
      <BccButton outlined icon="SearchIcon" />
      <BccButton flat icon="SearchIcon" />
      <BccButton disabled icon="SearchIcon" />
    </div>
    <div class="flex items-start space-x-2 mt-4">
      <BccButton size="xs" icon="SearchIcon" />
      <BccButton size="sm" icon="SearchIcon" />
      <BccButton size="md" icon="SearchIcon" />
      <BccButton size="lg" icon="SearchIcon" />
      <BccButton size="xl" icon="SearchIcon" />
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
      <BccButton class="w-full" size="lg" outlined :rounded="true" :disabled="true" icon="ChevronLeftIcon">
        Default text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" outlined icon-right icon="ChevronRightIcon">
        Default text, icon right
      </BccButton>
      
      <BccButton variant="primary" class="w-full" :center="false">
        Non-centered text
      </BccButton>
      <BccButton class="w-full" size="lg" outlined :rounded="true" :disabled="true" :center="false" icon="ChevronLeftIcon">
        Non-centered text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" outlined icon-right :center="false" icon="ChevronRightIcon">
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
      <BccButton is="a" outlined>Secondary</BccButton>
      <BccButton is="a" outlined :disabled="true">Secondary disabled</BccButton>
      <BccButton is="a" flat>Tertiary</BccButton>
      <BccButton is="a" flat :disabled="true">Tertiary disabled</BccButton>
    </div>
  `,
});
