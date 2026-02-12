import { type ToggleSwitchProps } from 'primevue';
import type { Component } from 'vue';
export type BccToggleProps = ToggleSwitchProps & {
    icon?: Component;
    withIcon?: boolean;
    loading?: boolean;
    wasToggled?: boolean;
    useCtx?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<BccToggleProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BccToggleProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
