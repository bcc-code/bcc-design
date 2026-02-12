import { type TagProps } from 'primevue/tag';
import { type Component } from 'vue';
export type BccTagProps = Omit<TagProps, 'icon'> & {
    icon?: Component;
    iconRight?: boolean;
};
declare var __VLS_14: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: import("vue").DefineComponent<BccTagProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BccTagProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
