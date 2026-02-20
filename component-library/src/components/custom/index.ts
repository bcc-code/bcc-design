/**
 * Custom BCC components (not based on PrimeVue).
 * Add new custom components here and export them from this file.
 */

export { default as BccAvatar } from './BccAvatar/BccAvatar.vue';
export { default as BccBadge } from './BccBadge/BccBadge.vue';
export { default as BccCapacityIndicator } from './BccCapacityIndicator/BccCapacityIndicator.vue';
export { default as BccCircleLoader } from './BccCircleLoader/BccCircleLoader.vue';
export { default as BccDialKnob } from './BccDialKnob/BccDialKnob.vue';
export { default as BccFrame } from './BccFrame/BccFrame.vue';
export { default as BccGraphic } from './BccGraphic/BccGraphic.vue';
export { default as BccNpsResult } from './BccNpsResult/BccNpsResult.vue';
export { default as BccNpsScore } from './BccNpsScore/BccNpsScore.vue';
export { default as BccReact } from './BccReact/BccReact.vue';
export { default as BccReactEmoji } from './BccReact/BccReactEmoji.vue';
export { default as BccTabs } from './BccTabs/BccTabs.vue';
export { default as BccTag } from './BccTag/BccTag.vue';
export { default as BccToggle } from './BccToggle/BccToggle.vue';

// Prop types for consumers (TypeScript / IDE support)
export type { AvatarProps } from './BccAvatar/BccAvatar.vue';
export type { BadgeProps } from './BccBadge/BccBadge.vue';
export type { CapacityIndicatorProps } from './BccCapacityIndicator/BccCapacityIndicator.vue';
export type { KnobProps, KnobSlots } from './BccDialKnob/BccDialKnob.vue';
export type { FrameProps } from './BccFrame/BccFrame.vue';
export type { GraphicProps } from './BccGraphic/BccGraphic.vue';
export type { NpsResultProps } from './BccNpsResult/BccNpsResult.vue';
export type { NpsScoreProps } from './BccNpsScore/BccNpsScore.vue';
export type { ReactInfo, ReactProps } from './BccReact/types';
export type { TabItem, TabsProps } from './BccTabs/BccTabs.vue';
export type { TagProps } from './BccTag/BccTag.vue';
export type { ToggleProps } from './BccToggle/BccToggle.vue';
