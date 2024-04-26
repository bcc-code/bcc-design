import BccAccordion from "./BccAccordion.vue";
import { GeneticsIcon, VisibilityIcon } from "@bcc-code/icons-vue";
import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

export default {
  title: "Other/BccAccordion",
  component: BccAccordion,
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The main title of the accordion",
    },
    subtitle: {
      control: { type: "text" },
      description: "The subtitle of the accordion",
    },
    variant: {
      options: ["readonly", "brand", "interactive", "desktop"],
      control: { type: "radio" },
      description: "The visual variant of the accordion",
    },
    size: {
      options: ["base", "lg"],
      control: { type: "radio" },
      description: "The size of the accordion",
    },
    icon: {
      control: { type: "object" },
      description: "The icon of the accordion",
    },
    badge: {
      control: { type: "object" },
      description: "The badge of the accordion",
    },
    pin: {
      control: { type: "object" },
      description: "The pin of the accordion",
    },
  },
} as Meta<typeof BccAccordion>;

const Template: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion },
  setup() {
    return { args };
  },
  template: `
    <BccAccordion v-bind="args">
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const Example = Template.bind({});
Example.args = {
  title: "Example Accordion with Pin",
  subtitle: "This is a subtitle",
  variant: "readonly",
  size: "base",
};

Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
    <BccAccordion title="Example Accordion with Pin" variant="readonly" size="base">
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
      `,
    },
  },
};

export const WithOpened = Template.bind({});
WithOpened.args = {
  title: "Example Accordion was expanded once the page was loaded",
  variant: "desktop",
  size: "base",
  open: true,
};

const TempWithPin: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion },
  setup() {
    return { args };
  },
  template: `
    <BccAccordion v-bind="args">
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const WithPin = TempWithPin.bind({});
WithPin.args = {
  title: "Example Accordion with Pin",
  variant: "readonly",
  size: "base",
  pin: {
    text: "310",
    context: "warning",
  },
};

const TempWithBadge: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion },
  setup() {
    return { args };
  },
  template: `
    <BccAccordion v-bind="args">
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const WithBadge = TempWithBadge.bind({});
WithBadge.args = {
  title: "Example Accordion with Badge",
  subtitle: "This is a subtitle",
  variant: "readonly",
  size: "base",
  badge: {
    text: "New",
    context: "info",
  },
};

const TempWithIcon: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion, GeneticsIcon },
  setup() {
    return { args };
  },
  template: `
    <BccAccordion v-bind="args">
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const WithIcon = TempWithIcon.bind({});
WithIcon.args = {
  title: "Example Accordion with Icon",
  variant: "brand",
  size: "base",
  icon: GeneticsIcon,
};

const TempWithLeft: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion },
  setup() {
    return { args };
  },
  template: `
    <BccAccordion v-bind="args">
      <template #left>
        <div class="pr-4">
          <img src="https://via.placeholder.com/40" alt="Placeholder"  class="rounded-full" />
        </div>
        </template>
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const WithLeft = TempWithLeft.bind({});
WithLeft.args = {
  title: "Example Accordion with Left",
  variant: "interactive",
  size: "lg",
  left: true,
};

const TempWithAction: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion, VisibilityIcon },
  setup() {
    const visible = ref(false);
    const show = () => (visible.value = true);
    const hide = () => (visible.value = false);
    return { args, show, hide, visible };
  },
  template: `
    <BccAccordion v-bind="args" class="mb-20">
      <template #action>
      <div class="flex flex-row">
      <div @mouseover="show()" @mouseleave="hide()">
      <div v-if="visible" class="relative z-10">
        <div class="absolute top-10 right-0">
          <div class="bg-neutral-100 w-[250px] p-4 px-6 rounded-lg shadow-lg">
            <img src="https://design.bcc.no/logos/bcc_logo_primary_dark-green_32.png" class="w-full">
          </div>
        </div>
      </div>
      <VisibilityIcon class="w-6 h-6" />
    </div>
            </div>
      </template>
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const WithAction = TempWithAction.bind({});
WithAction.args = {
  title: "Example Accordion with Action",
  variant: "readonly",
};

const TempWithAll: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion, VisibilityIcon, GeneticsIcon },
  setup() {
    const visible = ref(false);
    const show = () => (visible.value = true);
    const hide = () => (visible.value = false);
    return { args, show, hide, visible };
  },
  template: `
    <BccAccordion v-bind="args" class="mb-20">
      <template #action>
      <div class="flex flex-row">
      <div @mouseover="show()" @mouseleave="hide()">
      <div v-if="visible" class="relative z-10">
        <div class="absolute top-10 right-0">
          <div class="bg-neutral-100 w-[250px] p-4 px-6 rounded-lg shadow-lg">
            <img src="https://design.bcc.no/logos/bcc_logo_primary_dark-green_32.png" class="w-full">
          </div>
        </div>
      </div>
      <VisibilityIcon class="w-6 h-6" />
    </div>
            </div>
      </template>
      <template #left>
        <div class="pr-4">
          <img src="https://via.placeholder.com/40" alt="Placeholder"  class="rounded-full" />
        </div>
        </template>
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const WithAll = TempWithAll.bind({});
WithAll.args = {
  title: "Example Accordion with Action",
  subtitle: "This is a subtitle",
  variant: "readonly",
  badge: {
    text: "New",
    context: "info",
  },
  pin: {
    text: "310",
    context: "warning",
  },
  icon: GeneticsIcon,
};
