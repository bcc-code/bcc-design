import { Face2Icon } from "@bcc-code/icons-vue";
import BccItemTile from "./BccItemTile.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccItemTile",
  component: BccItemTile,
  argTypes: {},
} as Meta<typeof BccItemTile>;

const Template: StoryFn<typeof BccItemTile> = (args) => ({
  components: { BccItemTile, Face2Icon },
  setup() {
    return { args };
  },
  template: `
    <BccItemTile v-bind="args">
      <div>
        <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
          <Face2Icon class="h-4 w-4" />
          <p class="truncate">12 Apr 2000</p>
        </div>
        <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
          <Face2Icon class="h-4 w-4" />
          <p class="truncate">13 Apr 2000</p>
        </div>
      </div>
    </BccItemTile>
  `,
});

export const Example = Template.bind({});
Example.args = {
  title: "Title",
  overline: "Overline",
};

export const AllExamples: StoryFn<typeof BccItemTile> = (args) => ({
  components: { BccItemTile, Face2Icon },
  setup() {
    return { args };
  },
  template: `
    <div class="flex flex-col space-y-4">
      <BccItemTile title="Title only"/>
      <div class="border-b"></div>
      <BccItemTile title="Title, overline" overline="Overline"/>
      <div class="border-b"></div>
      <BccItemTile title="Title, overline and content" overline="Overline">
        <div>
          <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
            <Face2Icon class="h-4 w-4" />
            <p class="truncate">12 Apr 2000</p>
          </div>
          <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
            <Face2Icon class="h-4 w-4" />
            <p class="truncate">13 Apr 2000, 13 Apr 2000, 13 Apr 2000, 13 Apr 2000, 13 Apr 2000, 13 Apr 2000,</p>
          </div>
          <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
            <Face2Icon class="h-4 w-4" />
            <p class="truncate">13 Apr 2000</p>
          </div>
          <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
            <Face2Icon class="h-4 w-4" />
            <p class="truncate">13 Apr 2000</p>
          </div>
        </div>
      </BccItemTile>
    </div>
  `,
});
