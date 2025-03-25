import { BCC_CONTEXTS } from "@/composables/contexts";
import { BlockIcon, CheckIcon, DoneAllIcon, ExclamationIcon } from "@bcc-code/icons-vue";
import BccPin from "./BccPin.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

const ContextOptions = Object.keys(BCC_CONTEXTS);

/**
 * A companion to the badge component, to render just an icon or a number like "42" or a counter like "4/10". See the `BccBadge` component for a larger, differently styled version to be used with text.
 */
export default {
  title: "Other/BccPin",
  component: BccPin,
  argTypes: {
    context: {
      description: "Which context color to use for the styling of the pin",
      options: ContextOptions,
      control: { type: "radio" },
    },
    size: {
      description: "Size of the pin",
      options: ["sm", "base", "lg", "xl"],
      default: "base",
      control: { type: "radio" },
    },
    contrast: {
      description: "contrast",
      options: ["light", "dark"],
      control: { type: "radio" },
    },
    bordered: {
      control: { type: "boolean", default: false },
    },
    squared: {
      control: { type: "boolean", default: false },
    },
  },
} as Meta<typeof BccPin>;

const Template: StoryFn<typeof BccPin> = (args) => ({
  components: { BccPin },
  setup() {
    return { args, CheckIcon };
  },
  template: `
    <BccPin v-bind="args" :icon="CheckIcon" />
  `,
});

/**
 * Set the `context` prop to control how the pin looks
 */
export const Example = Template.bind({});
Example.args = {
  context: "success",
  text: "",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccPin context="success" :icon="CheckIcon" />      
`,
    },
  },
};

/**
 * Set the `icon` prop to render an icon in the pin
 */
export const WithIcon: StoryFn<typeof BccPin> = () => ({
  components: { BccPin },
  setup() {
    return { CheckIcon };
  },
  template: `
    <div class="flex items-start space-x-2">
      ${ContextOptions.map((o) => `<BccPin context="${o}" :icon="CheckIcon" />`).join("\n")}
    </div>
  `,
});

/**
 * Set the `contrast` prop to render a pin with a light or dark contrast
 */
export const Contrast: StoryFn<typeof BccPin> = (args) => ({
  components: { BccPin },
  setup() {
    return { CheckIcon, args };
  },
  template: `
    <div class="flex items-start space-x-2 mb-2">
      ${ContextOptions.map(
        (o) => `<BccPin v-bind="args" context="${o}" :icon="CheckIcon" contrast="light" />`
      ).join("\n")}
    </div>
    <div class="flex items-start space-x-2">
      ${ContextOptions.map(
        (o) => `<BccPin v-bind="args" context="${o}" :icon="CheckIcon" contrast="dark" />`
      ).join("\n")}
    </div>
  `,
});

/**
 * Set the `text` prop to render a text in the pin. If both `icon` and `text` are given only the `icon` is rendered
 */
export const WithText: StoryFn<typeof BccPin> = (args) => ({
  components: { BccPin },
  setup() {
    return { args };
  },
  template: `
    <div class="flex items-start space-x-2">
      <BccPin v-bind="args" context="neutral" text="1" />
      <BccPin v-bind="args" context="danger" text="2" />
      <BccPin v-bind="args" context="warning" text="10" />
      <BccPin v-bind="args" context="success" text="43" />
      <BccPin v-bind="args" context="info" text="4 / 10" />
    </div>
  `,
});

/**
 * Different states with icons and context
 */
export const IconStates: StoryFn<typeof BccPin> = (args) => ({
  components: { BccPin },
  setup() {
    return {
      CheckIcon,
      DoneAllIcon,
      ExclamationIcon,
      BlockIcon,
    };
  },
  template: `
    <div class="flex items-start space-x-2">
      <BccPin context="green" bordered squared size="lg" :icon="CheckIcon" />
      <BccPin context="purple" bordered squared size="lg" :icon="DoneAllIcon" />
      <BccPin context="gimblet" bordered squared size="lg" :icon="ExclamationIcon" />
      <BccPin context="red" bordered squared size="lg" :icon="BlockIcon" />
    </div>
  `,
});
