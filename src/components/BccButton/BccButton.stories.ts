import BccButton from "./BccButton.vue";
import { SearchIcon, ChevronRightIcon, ChevronLeftIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Forms/BccButton",
  component: BccButton,
  argTypes: {
    context: {
      description: "Which context color forms the base of the button style",
      options: ["default", "danger"],
      control: { type: "radio" },
    },
    variant: {
      description: "The global style of the button",
      options: ["primary", "secondary", "tertiary"],
      control: { type: "radio" },
    },
    size: {
      description: "The size of the button",
      options: ["xs", "sm", "base", "lg", "xl"],
      control: { type: "radio" },
    },
    iconRight: {
      description: "Whether the icon prop is rendered on the left or right side of the button",
    },
    center: {
      description: "Whether text and icon are centered or at the opposing sides of the button",
    },
    is: {
      description: "The actual underlying HTML element to use for the button",
      options: ["button", "a"],
      control: { type: "radio" },
    },
    slotDefault: {
      name: "default slot",
      description: "The button text",
    },
  },
} as Meta<typeof BccButton>;

const Template: StoryFn<typeof BccButton> = (args) => ({
  components: { BccButton },
  setup() {
    return { args, SearchIcon };
  },
  template: `
    <BccButton v-bind="args" :icon="SearchIcon">
      {{ args.slotDefault }}
    </BccButton>
  `,
});

export const Example = Template.bind({});
Example.args = {
  variant: "primary",
  context: "default",
  size: "base",
  rounded: false,
  iconRight: false,
  center: true,
  disabled: false,
  is: "button",
  slotDefault: "Example Button",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccButton :icon="SearchIcon">
  Example Button
</BccButton>
    `,
    },
  },
};

/**
 * Set the `variant` prop to `primary` to render a primary button. This is the default value for this prop so it's not necessary to set it.
 */
export const Primary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start gap-x-2">
      <BccButton size="xs">Primary (xs)</BccButton>
      <BccButton size="sm">Primary (sm)</BccButton>
      <BccButton size="base">Primary (base)</BccButton>
      <BccButton size="lg">Primary (lg)</BccButton>
      <BccButton size="xl">Primary (xl)</BccButton>
    </div>
  `,
});

/**
 * Set the `variant` prop to `secondary` to render a secondary button
 */
export const Secondary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start gap-x-2">
      <BccButton variant="secondary" size="xs">Secondary (xs)</BccButton>
      <BccButton variant="secondary" size="sm">Secondary (sm)</BccButton>
      <BccButton variant="secondary" size="base">Secondary (base)</BccButton>
      <BccButton variant="secondary" size="lg">Secondary (lg)</BccButton>
      <BccButton variant="secondary" size="xl">Secondary (xl)</BccButton>
    </div>
  `,
});

/**
 * Set the `variant` prop to `tertiary` to render a tertiary button
 */
export const Tertiary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-center gap-x-2">
      <BccButton variant="tertiary" size="xs">Tertiary (xs)</BccButton>
      <BccButton variant="tertiary" size="sm">Tertiary (sm)</BccButton>
      <BccButton variant="tertiary" size="base">Tertiary (base)</BccButton>
      <BccButton variant="tertiary" size="lg">Tertiary (lg)</BccButton>
      <BccButton variant="tertiary" size="xl">Tertiary (xl)</BccButton>
    </div>
  `,
});

/**
 * Set the `context` prop to `danger` to render danger variants of the button
 */
export const Danger: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-center gap-x-2">
      <BccButton context="danger">Danger (primary)</BccButton>
      <BccButton context="danger" variant="secondary">Danger (secondary)</BccButton>
      <BccButton context="danger" variant="tertiary">Danger (tertiary)</BccButton>
    </div>
  `,
});

/**
 * Set the `disabled` prop to disable the button and all click events on it
 */
export const Disabled: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start gap-x-2">
      <BccButton variant="primary" disabled>Primary disabled</BccButton>
      <BccButton variant="secondary" disabled>Secondary disabled</BccButton>
      <BccButton variant="tertiary" disabled>Tertiary disabled</BccButton>
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton variant="primary" disabled context="danger">Primary disabled</BccButton>
      <BccButton variant="secondary" disabled context="danger">Secondary disabled</BccButton>
      <BccButton variant="tertiary" disabled context="danger">Tertiary disabled</BccButton>
    </div>
  `,
});

/**
 * Set the `rounded` prop to render an alternate rounded button
 */
export const Rounded: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start gap-x-2">
      <BccButton variant="primary" rounded>Primary rounded</BccButton>
      <BccButton variant="secondary" rounded>Secondary rounded</BccButton>
      <BccButton variant="tertiary" rounded>Tertiary rounded</BccButton>
    </div>
  `,
});

/**
 * Pass an icon to the `icon` prop to add an icon. Set `iconRight` to render the icon on the right instead of the default left side.
 */
export const WithIcon: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  setup() {
    return { SearchIcon };
  },
  template: `
    <div class="flex items-start gap-x-2">
      <BccButton :icon="SearchIcon">
        With left icon
      </BccButton>
      <BccButton :icon="SearchIcon" icon-right>
        With right icon
      </BccButton>
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton variant="secondary" :icon="SearchIcon">
        Secondary with icon
      </BccButton>
      <BccButton variant="tertiary" :icon="SearchIcon">
        Tertiary with icon
      </BccButton>
      <BccButton disabled :icon="SearchIcon">
        Disabled with icon
      </BccButton>
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton size="xs" :icon="SearchIcon">
        xs button
      </BccButton>
      <BccButton size="sm" :icon="SearchIcon">
        sm button
      </BccButton>
      <BccButton size="base" :icon="SearchIcon">
        base button
      </BccButton>
      <BccButton size="lg" :icon="SearchIcon">
        lg button
      </BccButton>
      <BccButton size="xl" :icon="SearchIcon">
        xl button
      </BccButton>
    </div>
  `,
});

/**
 * If you only pass an `icon` and nothing in the default slot, the button changes shape to render an icon only button.
 */
export const IconOnly: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  setup() {
    return { SearchIcon };
  },
  template: `
    <div class="flex items-start gap-x-2">
      <BccButton :icon="SearchIcon" />
      <BccButton icon-right :icon="SearchIcon" />
      <BccButton rounded :icon="SearchIcon" />
      <BccButton variant="secondary" :icon="SearchIcon" />
      <BccButton variant="tertiary" :icon="SearchIcon" />
      <BccButton disabled :icon="SearchIcon" />
    </div>
    <div class="flex items-start gap-x-2 mt-4">
      <BccButton size="xs" :icon="SearchIcon" />
      <BccButton size="sm" :icon="SearchIcon" />
      <BccButton size="base" :icon="SearchIcon" />
      <BccButton size="lg" :icon="SearchIcon" />
      <BccButton size="xl" :icon="SearchIcon" />
    </div>
  `,
});

/**
 * Set the `center` prop to `false` (default is `true`) to justify the text and optionally icon of the button
 */
export const ContentPosition: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  setup() {
    return { ChevronRightIcon, ChevronLeftIcon };
  },
  template: `
    <div class="space-y-4">
      <BccButton variant="primary" class="w-full">
        Default text
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" rounded disabled :icon="ChevronLeftIcon">
        Default text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" icon-right :icon="ChevronRightIcon">
        Default text, icon right
      </BccButton>
      
      <BccButton variant="primary" class="w-full" :center="false">
        Non-centered text
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" rounded disabled :center="false" :icon="ChevronLeftIcon">
        Non-centered text, icon left
      </BccButton>
      <BccButton class="w-full" size="lg" variant="secondary" icon-right :center="false" :icon="ChevronRightIcon">
        Non-centered text, icon right
      </BccButton>
    </div>
  `,
});

/**
 * Set the `is` prop to `a` to render an `<a>` element instead of a `<button>`
 */
export const Anchor: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start gap-x-2">
      <BccButton is="a" variant="primary">Primary</BccButton>
      <BccButton is="a" variant="secondary">Secondary</BccButton>
      <BccButton is="a" variant="tertiary">Tertiary</BccButton>
    </div>
  `,
});

/**
 * Wrap the button in an element with `data-context="alternative"` to render an alternative button on a dark background
 */
export const AlternativeContext: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: `
    <div class="flex items-start gap-x-2 bg-primary p-4 rounded" data-context="alternative">
      <BccButton is="a" variant="primary">Primary</BccButton>
      <BccButton is="a" variant="secondary">Secondary</BccButton>
      <BccButton is="a" variant="tertiary">Tertiary</BccButton>
    </div>
  `,
});
