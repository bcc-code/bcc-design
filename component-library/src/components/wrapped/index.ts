/**
 * Wrapped PrimeVue components with BCC defaults or extensions.
 * Add new wrapped components here and export them from this file.
 */

export { default as BccBadge } from './BccBadge.vue';
export { default as BccButton } from './BccButton.vue';
export { default as BccCheckbox } from './BccCheckbox.vue';
export { default as BccInput } from './BccInput.vue';
export { default as BccTabs } from './BccTabs.vue';
export { default as BccTag } from './BccTag.vue';

// Extended prop types (Bcc components extend PrimeVue props)
export type { BadgeProps } from './BccBadge.vue';
export type { ButtonProps } from './BccButton.vue';
export type { CheckboxProps } from './BccCheckbox.vue';
export type { InputProps } from './BccInput.vue';
export type { TabsProps as BccTabsProps, TabItem } from './BccTabs.vue';
export type { BccTagProps } from './BccTag.vue';

// Re-export underlying PrimeVue prop types (for consumers)
export type { InputTextProps } from 'primevue/inputtext';
export type { TabsProps } from 'primevue/tabs';
export type { TagProps } from 'primevue/tag';
