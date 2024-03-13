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
    <div class="p-10 w-full flex flex-col items-center">
      <BccTooltip v-bind="args">
        
          Here is the text inside the tooltip
        
        <template #child>
          <div class="w-full flex flex-col items-center">
            <div class="bg-slate-100 rounded-xl p-4 text-center cursor-pointer w-[200px]" @click="toggleVisibility">Visibility toggle</div>
          </div>
        </template>
      </BccTooltip>
    </div>
  `,
});

export const Example = Template.bind({});
Example.args = {
  primaryPosition: "top",
  secondaryPosition: "center",
  variant: "dark",
  visible: true,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `<BccTooltip primaryPosition="top" secondaryPosition="center" variant="dark" :visible="false">
          This is content 
          <template #child>
            this is the child element over which the tooltip will appear
          </template>
        </BccTooltip>`,
    },
  },
};

export const AllCombinations: StoryFn<typeof BccTooltip> = () => ({
  components: { BccTooltip },
  setup() {},
  template: `
  <div class="flex flex-col p-20">
    <div class="flex flex-row items-center justify-between p-10">
      <BccTooltip primaryPosition="top" secondaryPosition="left" variant="white" :visible="true">
        Here is the text inside the tooltip
        <template #child>
          <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-[200px]">Top left white</div>
        </template>
      </BccTooltip>
      <BccTooltip :visible="true">
        Here is the text inside the tooltip
        <template #child>
          <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-[200px]">Top center dark</div>
        </template>
      </BccTooltip>
      <BccTooltip primaryPosition="top" secondaryPosition="right" variant="grey" :visible="true">
        Here is the text inside the tooltip
        <template #child>
          <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-[200px]">Top right grey</div>
        </template>
      </BccTooltip>
      </div>

      <div class="flex flex-row items-center justify-between p-10">
      <BccTooltip primaryPosition="bottom" secondaryPosition="left" variant="white" :visible="true">
        Here is the text inside the tooltip
        <template #child>
          <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-[200px]">Bottom left white</div>
        </template>
      </BccTooltip>
      <BccTooltip primaryPosition="bottom" :visible="true">
        Here is the text inside the tooltip
        <template #child>
          <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-[200px]">Bottom center dark</div>
        </template>
      </BccTooltip>
      <BccTooltip primaryPosition="bottom" secondaryPosition="right" variant="grey" :visible="true">
        Here is the text inside the tooltip
        <template #child>
          <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-[200px]">Bottom right grey</div>
        </template>
      </BccTooltip>
      </div>
      
      <div class="flex flex-row items-center justify-between p-10 mt-24">
      <BccTooltip secondaryPosition="center" :visible="true">
        short
        <template #child>
          <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-[10px] h-[10px]"></div>
        </template>
      </BccTooltip>
      <BccTooltip class="mt-[250px]" :visible="true">
      Incorporating vibrant color palettes, sleek typography, and clean layouts to convey a modern aesthetic. Utilizing whitespace strategically to create visual balance and hierarchy. Implementing user-centered design principles to ensure a seamless and intuitive user experience
        <template #child>
          <div class="bg-slate-100 rounded-xl p-4 cursor-pointer w-[200px]">Longer texts</div>
        </template>
      </BccTooltip>
      </div>
      <div class="mt-[200px] flex items-center">
        <BccTooltip secondaryPosition="right" :visible="true" class="w-[200px]">
          <div class="flex flex-col items-center">
            <img src="https://media4.giphy.com/media/5WJ6K7XnP2K2p3VWft/giphy.gif" class="mb-2 w-full" /> 
            <p>GIFs as well I guess?</p>
          </div>
        </BccTooltip>
        <BccTooltip secondaryPosition="left" variant="white" :visible="true" class="w-[200px]">
          <div class="flex flex-col items-center">
            If there is no child element
          </div>
        </BccTooltip>
      </div>
    </div>
  </div>
`,
});
