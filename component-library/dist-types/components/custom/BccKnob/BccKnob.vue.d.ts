export type BccKnobProps = {
    size?: number;
    arcWidth?: number;
    /** In minutes (-12h) */
    min?: number;
    /** In minutes (+12h) */
    max?: number;
    steps?: number;
    /** Use CSS variables for colors */
    colored?: boolean;
    showHandle?: boolean;
    hideArrows?: boolean;
    /** Animation duration in ms */
    duration?: number;
    /** 0 or 1 = no limit */
    animateRotations?: number;
};
type __VLS_Props = BccKnobProps;
type __VLS_ModelProps = {
    modelValue: number;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
    left?: (props: typeof __VLS_1) => any;
} & {
    right?: (props: typeof __VLS_3) => any;
} & {
    default?: (props: typeof __VLS_5) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number) => any;
} & {
    "drag:start": () => any;
    "drag:update": () => any;
    "drag:end": () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onDrag:start"?: (() => any) | undefined;
    "onDrag:update"?: (() => any) | undefined;
    "onDrag:end"?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
    colored: boolean;
    size: number;
    arcWidth: number;
    min: number;
    max: number;
    steps: number;
    showHandle: boolean;
    hideArrows: boolean;
    duration: number;
    animateRotations: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
