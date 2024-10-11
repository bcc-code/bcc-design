import BccBadge from "./BccBadge.vue";
import { CheckCircleIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A badge component to be used for informational text, like "new" or "recommended". See the `BccPin` component for a differently styled version for numbers.
 */
export default {
  title: "Common/BccBadge",
  component: BccBadge,
  argTypes: {
    context: {
      description: "Which context color to use for the styling of the badge",
      options: [
        "neutral",
        "danger",
        "warning",
        "success",
        "info",
        "muddy-waters",
        "mongoose",
        "brand",
      ],
      control: { type: "radio" },
    },
    size: {
      description: "Size of the badge",
      options: ["xs", "sm", "md"],
      control: { type: "radio" },
    },
    contrast: {
      description: "contrast",
      options: ["light", "dark"],
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
  context: "success",
  size: "sm",
  iconRight: false,
  slotDefault: "Example Badge",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccBadge context="success" size="sm" :icon="checkCircleIcon">
  Example Badge
</BccBadge>
    `,
    },
  },
};

/**
 * Set the `context` prop to control the color of the badge
 */
export const Context: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge context="neutral">neutral</BccBadge>
      <BccBadge context="danger">danger</BccBadge>
      <BccBadge context="warning">warning</BccBadge>
      <BccBadge context="success">success</BccBadge>
      <BccBadge context="info">info</BccBadge>
      <BccBadge context="muddy-waters">muddy-waters</BccBadge>
      <BccBadge context="mongoose">mongoose</BccBadge>
      <BccBadge context="brand">brand</BccBadge>
    </div>
  `,
});

/**
 * Set the `contrast` prop to control the light / dark contrast of the badge
 */
export const Contrast: StoryFn<typeof BccBadge> = () => ({
  components: { BccBadge },
  template: `
    <div class="flex items-start space-x-2 mb-2">
      <BccBadge context="neutral" contrast="light">Light</BccBadge>
      <BccBadge context="danger" contrast="light">Light</BccBadge>
      <BccBadge context="warning" contrast="light">Light</BccBadge>
      <BccBadge context="success" contrast="light">Light</BccBadge>
      <BccBadge context="info" contrast="light">Light</BccBadge>
      <BccBadge context="muddy-waters" contrast="light">Light</BccBadge>
      <BccBadge context="mongoose" contrast="light">Light</BccBadge>
      <BccBadge context="brand" contrast="light">Light</BccBadge>
    </div>
    
    <div class="flex items-start space-x-2">
      <BccBadge context="neutral" contrast="dark">Dark</BccBadge>
      <BccBadge context="danger" contrast="dark">Dark</BccBadge>
      <BccBadge context="warning" contrast="dark">Dark</BccBadge>
      <BccBadge context="success" contrast="dark">Dark</BccBadge>
      <BccBadge context="info" contrast="dark">Dark</BccBadge>
      <BccBadge context="muddy-waters" contrast="dark">Dark</BccBadge>
      <BccBadge context="mongoose" contrast="dark">Dark</BccBadge>
      <BccBadge context="brand" contrast="dark">Dark</BccBadge>
    </div>
  `,
});

/**
 * Set the `icon` prop to show an icon and the `icon-right` prop to put the icon on the right of the badge
 */
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
