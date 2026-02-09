/**
 * Wrapped PrimeVue components with BCC defaults or extensions.
 * Add new wrapped components here and export them from this file.
 */

export { default as BccButton } from './BccButton.vue';
export { default as BccInput } from './BccInput.vue';
export { default as BccPin } from './BccPin.vue';
export { default as BccTag } from './BccTag.vue';
export { default as BccTabs } from './BccTabs.vue';

// Extended prop types (Bcc components extend PrimeVue props)
export type { BccButtonProps } from './BccButton.vue';
export type { BccInputProps } from './BccInput.vue';
export type { BccPinProps } from './BccPin.vue';
export type { BccTagProps } from './BccTag.vue';
export type { BccTabsProps, TabItem } from './BccTabs.vue';

// Re-export underlying PrimeVue prop types (for consumers)
export type { ButtonProps } from 'primevue/button';
export type { InputTextProps } from 'primevue/inputtext';
export type { BadgeProps } from 'primevue/badge';
export type { TagProps } from 'primevue/tag';
export type { TabsProps } from 'primevue/tabs';
