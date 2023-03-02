import Badge from "./Badge.vue";
import UncheckedRadio from "@icons/radio_button_unchecked.svg";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    type: {
      description: "Determines the styling of the badge",
      options: ["neutral", "error", "warning", "success", "info"],
      control: { type: "radio" },
    },
    size: {
      description: "Size of the badge",
      options: ["base", "lg"],
      control: { type: "radio" },
    },
    iconPosition: {
      description:
        "On which side the contents of the icon slot are rendered",
      options: ["left", "right"],
      control: { type: "radio" },
    },
    slotDefault: {
      name: "default slot",
      description: "The badge text",
    },
  },
} as Meta<typeof Badge>;

const Template: StoryFn<typeof Badge> = (args) => ({
  components: { Badge, UncheckedRadio },
  setup() {
    return { args };
  },
  template: `
    <Badge v-bind="args">
      <template #icon>
        <UncheckedRadio />
      </template>
      <template #default>
        {{ args.slotDefault }}
      </template>
    </Badge>
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  type: "neutral",
  size: "base",
  iconPosition: "left",
  slotDefault: "Example Badge",
};

export const Types: StoryFn<typeof Badge> = () => ({
  components: { Badge },
  template: `
    <div class="flex items-start space-x-2">
      <Badge type="neutral">neutral</Badge>
      <Badge type="error">error</Badge>
      <Badge type="warning">warning</Badge>
      <Badge type="success">success</Badge>
      <Badge type="info">info</Badge>
    </div>
  `,
});

export const WithIcon: StoryFn<typeof Badge> = () => ({
  components: { Badge, UncheckedRadio },
  template: `
    <div class="flex items-start space-x-2">
      <Badge type="error" size="base">
        <template #icon>
          <UncheckedRadio />
        </template>
        base, icon left
      </Badge>
      <Badge type="error" size="base" iconPosition="right">
        <template #icon>
          <UncheckedRadio />
        </template>
        base, icon right
      </Badge>
      <Badge type="success" size="lg">
        <template #icon>
          <UncheckedRadio />
        </template>
        lg, icon left
      </Badge>
      <Badge type="success" size="lg" iconPosition="right">
        <template #icon>
          <UncheckedRadio />
        </template>
        lg, icon right
      </Badge>
    </div>
  `,
});
