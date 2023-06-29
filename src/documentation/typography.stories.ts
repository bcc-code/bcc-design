import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Typography",
} as Meta;

export const Examples: StoryFn = () => ({
  template: `
    <div class="space-y-8">
        <div class="space-y-2">
            <div class="text-display">text-display</div>
        </div>

        <div class="space-y-2">
            <div class="text-title-large">text-title-large</div>
            <div class="text-title-medium">text-title-medium</div>
            <div class="text-title-small">text-title-small</div>
        </div>

        <div class="space-y-2">
            <div class="text-heading-large">text-heading-large</div>
            <div class="text-heading-medium">text-heading-medium</div>
            <div class="text-heading-base">text-heading-base</div>
            <div class="text-heading-small">text-heading-small</div>
        </div>

        <div class="space-y-2">
            <div class="text-body-base">text-body-base</div>
            <div class="text-body-small">text-body-small</div>
        </div>

        <div class="space-y-2">
            <div class="text-caption">text-caption</div>
            <div class="text-overline">text-overline</div>
        </div>

        <div class="space-y-2">
            <div class="text-label-medium">text-label-medium</div>
            <div class="text-label-base">text-label-base</div>
            <div class="text-label-small">text-label-small</div>
        </div>       
    </div>
  `,
});
