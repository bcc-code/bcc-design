import Badge from "./Badge.vue";
import Clock from "@icons/timer.svg";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    type: {
      description: "Determines the styling of the badge",
      options: ["neutral", "error", "warning", "success", "info", "purple", "pink"],
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
  components: { Badge, Clock },
  setup() {
    return { args };
  },
  template: `
    <Badge v-bind="args">
      <template #icon>
        <Clock />
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
