import BccBadge from "./BccBadge.vue";
import { CheckCircleIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

// Workaround for storybook not working nicely with components passed as props
import { app } from "@storybook/vue3";
app.component('CheckCircleIcon');

export default {
  title: "Components/BccBadge",
  component: BccBadge,
  argTypes: {
    variant: {
      description: "Determines the styling of the badge",
      options: ["neutral", "error", "warning", "success", "info", "systemInfo"],
      control: { type: "radio" },
    },
    size: {
      description: "Size of the badge",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    iconRight: {
      description: "Pull icon to right side of the contents",
      control: { type: "boolean" },
    },
    slotDefault: {
      name: "default slot",
      description: "The badge text",
    },
  },
} as Meta<typeof BccBadge>;

const Template: StoryFn<typeof BccBadge> = (args) => ({
  components: { BccBadge },
  setup() {
    return { args };
  },
  template: `
    <BccBadge v-bind="args" icon="CheckCircleIcon">
      <template #default>
        {{ args.slotDefault }}
      </template>
    </BccBadge>
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  variant: "neutral",
  size: "sm",
  iconRight: "left",
  slotDefault: "Example Badge",
};

export const Variant: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge variant="neutral">neutral</BccBadge>
      <BccBadge variant="error">error</BccBadge>
      <BccBadge variant="warning">warning</BccBadge>
      <BccBadge variant="success">success</BccBadge>
      <BccBadge variant="info">info</BccBadge>
    </div>
  `,
});

export const WithIcon: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge variant="error" size="base" icon="CheckCircleIcon">
        base, icon left
      </BccBadge>
      <BccBadge variant="error" size="base" icon-right icon="CheckCircleIcon">
        base, icon right
      </BccBadge>
      <BccBadge variant="success" size="lg" icon="CheckCircleIcon">
        lg, icon left
      </BccBadge>
      <BccBadge variant="success" size="lg" icon-right icon="CheckCircleIcon">
        lg, icon right
      </BccBadge>
    </div>
  `,
});
