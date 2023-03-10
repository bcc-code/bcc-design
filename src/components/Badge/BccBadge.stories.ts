import BccBadge from "./BccBadge.vue";
import { RadioButtonUncheckedIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccBadge",
  component: BccBadge,
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
} as Meta<typeof BccBadge>;

const Template: StoryFn<typeof BccBadge> = (args) => ({
  components: { BccBadge, RadioButtonUncheckedIcon },
  setup() {
    return { args };
  },
  template: `
    <BccBadge v-bind="args">
      <template #icon>
        <RadioButtonUncheckedIcon />
      </template>
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
  type: "neutral",
  size: "base",
  iconPosition: "left",
  slotDefault: "Example Badge",
};

export const Type: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge type="neutral">neutral</BccBadge>
      <BccBadge type="error">error</BccBadge>
      <BccBadge type="warning">warning</BccBadge>
      <BccBadge type="success">success</BccBadge>
      <BccBadge type="info">info</BccBadge>
    </div>
  `,
});

export const WithIcon: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge, RadioButtonUncheckedIcon },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge type="error" size="base">
        <template #icon>
          <RadioButtonUncheckedIcon />
        </template>
        base, icon left
      </BccBadge>
      <BccBadge type="error" size="base" iconPosition="right">
        <template #icon>
          <RadioButtonUncheckedIcon />
        </template>
        base, icon right
      </BccBadge>
      <BccBadge type="success" size="lg">
        <template #icon>
          <RadioButtonUncheckedIcon />
        </template>
        lg, icon left
      </BccBadge>
      <BccBadge type="success" size="lg" iconPosition="right">
        <template #icon>
          <RadioButtonUncheckedIcon />
        </template>
        lg, icon right
      </BccBadge>
    </div>
  `,
});
