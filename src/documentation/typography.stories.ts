import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Typography",
} as Meta;

export const Examples: StoryFn = () => ({
  template: `
    <div class="space-y-8">
        <div class="space-y-2">
            <div class="text-display-md">text-display-md</div>
            <div class="text-display">text-display</div>
            <div class="text-display-sm">text-display-sm</div>
        </div>

        <div class="space-y-2">
            <div class="text-heading-lg">text-heading-lg</div>
            <div class="text-heading-md">text-heading-md</div>
            <div class="text-heading">text-heading</div>
            <div class="text-heading-sm">text-heading-sm</div>
        </div>

        <div class="space-y-2">
            <div class="text-title-lg">text-title-lg</div>
            <div class="text-title-md">text-title-md</div>
            <div class="text-title">text-title</div>
        </div>

        <div class="space-y-2">
            <div class="text-subtitle-md">text-subtitle-md</div>
            <div class="text-subtitle">text-subtitle</div>
            <div class="text-subtitle-sm">text-subtitle-sm</div>
        </div>

        <div class="space-y-2">
            <div class="text-label-md">text-label-md</div>
            <div class="text-label">text-label</div>
            <div class="text-label-sm">text-label-sm</div>
            <div class="text-label-xs">text-label-xs</div>
        </div>

        <div class="space-y-2">
            <div class="text-body">text-body</div>
            <div class="text-body-sm">text-body-sm</div>
            <div class="text-body-xs">text-body-xs</div>
        </div>

        <div class="space-y-2">
            <div class="text-caption-xs">text-caption-xs</div>
            <div class="text-caption-xxs">text-caption-xxs</div>
        </div>
    </div>
  `,
});
