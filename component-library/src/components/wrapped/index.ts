/**
 * Wrapped PrimeVue components with BCC defaults or extensions.
 * Add new wrapped components here and export them from this file.
 */

export { default as BccButton } from './BccButton.vue';
export { default as BccCheckbox } from './BccCheckbox.vue';
export { default as BccInput } from './BccInput.vue';
export { default as BccMessage } from './BccMessage.vue';
export { default as BccTabs } from './BccTabs.vue';
export { default as BccTag } from './BccTag.vue';

// Extended prop types (Bcc components extend PrimeVue props)
export type { ButtonProps } from './BccButton.vue';
export type { CheckboxProps } from './BccCheckbox.vue';
export type { InputProps } from './BccInput.vue';
export type { MessageProps } from './BccMessage.vue';
export type { TabItem, TabsProps } from './BccTabs.vue';
export type { TagProps } from './BccTag.vue';
