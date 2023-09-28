import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Tokens/Typography",
} as Meta;

/**
 * These are the typography styles of the design system. Each class will automatically adapt to their desktop variant on the `sm` mobile breakpoint.
 */
export const Examples: StoryFn = () => ({
  template: `
    <div class="space-y-8">
        <div class="space-y-2">
            <div class="text-title-xl">text-title-xl</div>
            <div class="text-title-lg">text-title-lg</div>
            <div class="text-title">text-title</div>
            <div class="text-title-sm">text-title-sm</div>
            <div class="text-title-xs">text-title-xs</div>
        </div>

        <div class="space-y-2">
            <div class="text-heading-xl">text-heading-xl</div>
            <div class="text-heading-lg">text-heading-lg</div>
            <div class="text-heading">text-heading</div>
            <div class="text-heading-sm">text-heading-sm</div>
            <div class="text-heading-xs">text-heading-xs</div>
        </div>

        <div class="space-y-2">
            <div class="text-body-lg">text-body-lg</div>
            <div class="text-body">text-body</div>
            <div class="text-body-sm">text-body-sm</div>
            <div class="text-body-xs">text-body-xs</div>
        </div>

        <div class="space-y-2">
            <div class="text-caption-large">text-caption-large</div>
            <div class="text-caption">text-caption</div>
            <div class="text-caption-sm">text-caption-sm</div>
            <div class="text-caption-xs">text-caption-xs</div>
        </div>

        <div class="space-y-2">
            <div class="text-label-lg">text-label-lg</div>
            <div class="text-label">text-label</div>
            <div class="text-label-sm">text-label-sm</div>
            <div class="text-label-xs">text-label-xs</div>
        </div>       
    </div>
  `,
});
