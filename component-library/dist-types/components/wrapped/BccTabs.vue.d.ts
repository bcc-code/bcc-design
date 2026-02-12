import { type TabsProps } from 'primevue/tabs';
import type { Component } from 'vue';
export interface TabItem {
    title: string;
    icon?: Component;
    pin?: {
        text: string;
        context?: string;
    };
    as?: Component;
    value?: string;
}
export type BccTabsProps = Omit<TabsProps, 'value'> & {
    tabs: TabItem[];
    modelValue?: number;
    fill?: boolean;
    noPanels?: boolean;
};
declare var __VLS_48: `tab-${number}`, __VLS_49: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_48>]?: (props: typeof __VLS_49) => any;
};
declare const __VLS_base: import("vue").DefineComponent<BccTabsProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: number) => any;
}, string, import("vue").PublicProps, Readonly<BccTabsProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
    fill: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
