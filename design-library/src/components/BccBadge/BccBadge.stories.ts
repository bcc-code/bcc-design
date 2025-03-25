import { BCC_CONTEXTS } from "@/composables/contexts";
import { CheckCircleIcon, DownloadingIcon } from "@bcc-code/icons-vue";
import BccBadge from "./BccBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

const ContextOptions = Object.keys(BCC_CONTEXTS);

/**
 * A badge component to be used for informational text, like "new" or "recommended". See the `BccPin` component for a differently styled version for numbers.
 */
export default {
  title: "Common/BccBadge",
  component: BccBadge,
  argTypes: {
    context: {
      description: "Which context color to use for the styling of the badge",
      options: ContextOptions,
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
    bordered: {
      control: { type: "boolean", default: false },
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
 * Set the `size` prop to control the color of the badge
 */
export const Size: StoryFn<typeof BccBadge> = (args) => ({
  components: { BccBadge },
  setup() {
    return { args, DownloadingIcon };
  },
  template: `
    <div class="flex items-start space-x-2">
      <BccBadge v-bind="args" size="xs" :icon="DownloadingIcon">extra-small</BccBadge>
      <BccBadge v-bind="args" size="sm" :icon="DownloadingIcon">small</BccBadge>
      <BccBadge v-bind="args" size="md" :icon="DownloadingIcon">medium</BccBadge>
    </div>
  `,
});

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
 * Set the `contrast` prop to render a badge with a light or dark contrast
 */
export const Contrast: StoryFn<typeof BccBadge> = (args) => ({
  components: { BccBadge },
  setup() {
    return { args };
  },
  template: ` 
    <div class="flex items-start space-x-2 mb-2">
      ${ContextOptions.map(
        (o) => `<BccBadge v-bind="args" context="${o}" icon contrast="light">Light</BccBadge>`
      ).join("\n")}
    </div>
    <div class="flex items-start space-x-2">
      ${ContextOptions.map(
        (o) => `<BccBadge v-bind="args" context="${o}" icon contrast="dark">Dark</BccBadge>`
      ).join("\n")}
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
