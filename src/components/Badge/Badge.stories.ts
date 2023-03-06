import Badge from "./Badge.vue";
import { RadioButtonUncheckedIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    type: {
      description: "Determines the styling of the badge",
      options: ["neutral", "error", "warning", "success", "info", "systemInfo"],
      control: { type: "radio" },
    },
    size: {
      description: "Size of the badge",
      options: ["base", "lg"],
      control: { type: "radio" },
    },
    iconPosition: {
      description: "On which side the contents of the icon slot are rendered",
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
  components: { Badge, RadioButtonUncheckedIcon },
  setup() {
    return { args };
  },
  template: `
    <Badge v-bind="args">
      <template #icon>
        <RadioButtonUncheckedIcon />
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

export const Type: StoryFn<typeof Badge> = () => ({
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
  components: { Badge, RadioButtonUncheckedIcon },
  template: `
    <div class="flex items-start space-x-2">
      <Badge type="error" size="base">
        <template #icon>
          <RadioButtonUncheckedIcon />
        </template>
        base, icon left
      </Badge>
      <Badge type="error" size="base" iconPosition="right">
        <template #icon>
          <RadioButtonUncheckedIcon />
        </template>
        base, icon right
      </Badge>
      <Badge type="success" size="lg">
        <template #icon>
          <RadioButtonUncheckedIcon />
        </template>
        lg, icon left
      </Badge>
      <Badge type="success" size="lg" iconPosition="right">
        <template #icon>
          <RadioButtonUncheckedIcon />
        </template>
        lg, icon right
      </Badge>
    </div>
  `,
});
