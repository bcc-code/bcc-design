import BccTooltip from "./BccTooltip.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Other/BccTooltip",
  component: BccTooltip,
  argTypes: {
    primaryPosition: {
      description: "The primary position of the tooltip (above or below the target)",
      options: ["top", "bottom"],
      control: { type: "radio" },
    },
    secondaryPosition: {
      description: "The secondary alignment of the tooltip (left, center, right)",
      options: ["left", "center", "right"],
      control: { type: "radio" },
      defaultValue: "center",
    },
    variant: {
      description: "The color variant of the tooltip",
      options: ["dark", "white", "grey"],
      control: { type: "radio" },
    },
    text: {
      description: "The text content of the tooltip",
      control: { type: "text" },
    },
    visible: {
      description:
        "Controls the visibility of the tooltip. For demonstration, hover over or click the target element.",
      control: { type: "boolean" },
    },
  },
} as Meta<typeof BccTooltip>;

const Template: StoryFn<typeof BccTooltip> = (args) => ({
  components: { BccTooltip },
  setup() {
    const toggleVisibility = () => {
      args.visible = !args.visible;
    };
    return { args, toggleVisibility };
  },
  template: `
    <div class="p-10">
      <BccTooltip v-bind="args">
        <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-full hover:bg-slate-200" @click="toggleVisibility">
          This is a component over which the tooltip will appear <b>[CLICK ME PLS]<b>
        </div>
      </BccTooltip>
    </div>
  `,
});

export const Example = Template.bind({});
Example.args = {
  primaryPosition: "top",
  secondaryPosition: "center",
  variant: "dark",
  text: "This is a tooltip",
  visible: true,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `<BccTooltip primaryPosition="top" secondaryPosition="center" variant="dark" text="This is a tooltip" :visible="false">This is a component over which the tooltip will appear</BccTooltip>`,
    },
  },
};

export const AllCombinations: StoryFn<typeof BccTooltip> = () => ({
  components: { BccTooltip },
  setup() {},
  template: `
  <div class="flex flex-row items-center justify-between p-20">
    <BccTooltip primaryPosition="top" secondaryPosition="left" variant="dark" text="Top Left Dark" :visible="true">
      <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-full">Top Left Dark</div>
    </BccTooltip>
    <BccTooltip primaryPosition="top" secondaryPosition="center" variant="dark" text="Top Center Dark" :visible="true">
      <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-full">Top Center Dark</div>
    </BccTooltip>
    <BccTooltip primaryPosition="top" secondaryPosition="right" variant="dark" text="Top Right Dark" :visible="true">
      <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-full">Top Right Dark</div>
    </BccTooltip>
  </div>

  <div class="flex flex-row items-center justify-between p-20">
    <BccTooltip primaryPosition="bottom" secondaryPosition="left" variant="dark" text="Bottom Left Dark" :visible="true">
      <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-full">Bottom Left Dark</div>
    </BccTooltip>
    <BccTooltip primaryPosition="bottom" secondaryPosition="center" variant="dark" text="Bottom Center Dark" :visible="true">
      <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-full">Bottom Center Dark</div>
    </BccTooltip>
    <BccTooltip primaryPosition="bottom" secondaryPosition="right" variant="dark" text="Bottom Right Dark" :visible="true">
      <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-full">Bottom Right Dark</div>
    </BccTooltip>
  </div>
`,
});
