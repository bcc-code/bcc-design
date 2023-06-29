import BccBadge from "./BccBadge.vue";
import { CheckCircleIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccBadge",
  component: BccBadge,
  argTypes: {
    context: {
      description: "Which context color to use for the styling of the badge",
      options: ["neutral", "danger", "warning", "success", "info"],
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
    return { args, CheckCircleIcon };
  },
  template: `
    <BccBadge v-bind="args" :icon="CheckCircleIcon">
      <template #default>
        {{ args.slotDefault }}
      </template>
    </BccBadge>
  `,
});

export const Example = Template.bind({});
Example.args = {
  context: "neutral",
  size: "xs",
  iconRight: false,
  slotDefault: "Example Badge",
};

export const Context: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge context="neutral">neutral</BccBadge>
      <BccBadge context="danger">danger</BccBadge>
      <BccBadge context="warning">warning</BccBadge>
      <BccBadge context="success">success</BccBadge>
      <BccBadge context="info">info</BccBadge>
    </div>
  `,
});

export const WithIcon: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  setup() {
    return { CheckCircleIcon };
  },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge context="danger" size="xs" :icon="CheckCircleIcon">
        xs, icon left
      </BccBadge>
      <BccBadge context="danger" size="xs" icon-right :icon="CheckCircleIcon">
        xs, icon right
      </BccBadge>
      <BccBadge context="success" size="sm" :icon="CheckCircleIcon">
        sm, icon left
      </BccBadge>
      <BccBadge context="success" size="sm" icon-right :icon="CheckCircleIcon">
        sm, icon right
      </BccBadge>
    </div>
  `,
});
