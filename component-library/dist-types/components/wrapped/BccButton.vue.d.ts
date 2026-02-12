import { type ButtonProps } from 'primevue/button';
import { type Component } from 'vue';
export type BccButtonProps = /* @vue-ignore */ Omit<ButtonProps, 'icon' | 'iconPos'> & {
    icon?: Component;
    iconRight?: boolean;
};
declare var __VLS_13: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_13) => any;
};
declare const __VLS_base: import("vue").DefineComponent<BccButtonProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BccButtonProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
