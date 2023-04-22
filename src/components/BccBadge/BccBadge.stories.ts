import BccBadge from "./BccBadge.vue";
import { CheckCircleIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

// Workaround for storybook not working nicely with components passed as props
import { setup } from "@storybook/vue3";
setup((app) => app.component("CheckCircleIcon", CheckCircleIcon));

export default {
  title: "Components/BccBadge",
  component: BccBadge,
  argTypes: {
    variant: {
      description: "Determines the styling of the badge",
      options: ["neutral", "danger", "warning", "success", "info", "system"],
      control: { type: "radio" },
    },
    size: {
      description: "Size of the badge",
      options: ["xs", "sm"],
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
  size: "xs",
  iconRight: false,
  slotDefault: "Example Badge",
};

export const Variant: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge variant="neutral">neutral</BccBadge>
      <BccBadge variant="danger">danger</BccBadge>
      <BccBadge variant="warning">warning</BccBadge>
      <BccBadge variant="success">success</BccBadge>
      <BccBadge variant="info">info</BccBadge>
      <BccBadge variant="system">system</BccBadge>
    </div>
  `,
});

export const WithIcon: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge variant="danger" size="xs" icon="CheckCircleIcon">
        xs, icon left
      </BccBadge>
      <BccBadge variant="danger" size="xs" icon-right icon="CheckCircleIcon">
        xs, icon right
      </BccBadge>
      <BccBadge variant="success" size="sm" icon="CheckCircleIcon">
        sm, icon left
      </BccBadge>
      <BccBadge variant="success" size="sm" icon-right icon="CheckCircleIcon">
        sm, icon right
      </BccBadge>
    </div>
  `,
});
