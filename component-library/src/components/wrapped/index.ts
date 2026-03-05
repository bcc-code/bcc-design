/**
 * Wrapped PrimeVue components with BCC defaults or extensions.
 * Add new wrapped components here and export them from this file.
 */

export { default as BccAvatar } from './BccAvatar/BccAvatar.vue';
export { default as BccButton } from './BccButton.vue';
export { default as BccCheckbox } from './BccCheckbox.vue';
export { default as BccChip } from './BccChip/BccChip.vue';
export { default as BccInput } from './BccInput.vue';
export { default as BccMenu } from './BccMenu/BccMenu.vue';
export { default as BccMessage } from './BccMessage.vue';
export { default as BccTabs } from './BccTabs/BccTabs.vue';
export { default as BccToggle } from './BccToggle/BccToggle.vue';
export { default as BccToggleButton } from './BccToggleButton.vue';

// Extended prop types (Bcc components extend PrimeVue props)
export type { AvatarProps } from './BccAvatar/BccAvatar.vue';
export type { ButtonProps } from './BccButton.vue';
export type { CheckboxProps } from './BccCheckbox.vue';
export type { ChipProps } from './BccChip/BccChip.vue';
export type { InputProps } from './BccInput.vue';
export type { BccMenuItem } from './BccMenu/BccMenu.vue';
export type { MessageProps } from './BccMessage.vue';
export type { TabItem, TabsProps } from './BccTabs/BccTabs.vue';
export type { ToggleProps } from './BccToggle/BccToggle.vue';
export type { ToggleButtonProps } from './BccToggleButton.vue';
