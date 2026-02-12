export type BccNpsScoreProps = {
    reverse?: boolean;
    leftLabel?: string;
    rightLabel?: string;
    labelPosition?: 'top' | 'bottom';
    min?: number;
    max?: number;
    disabled?: boolean;
};
type __VLS_Props = BccNpsScoreProps;
type __VLS_ModelProps = {
    modelValue?: number | null;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number | null) => any) | undefined;
}>, {
    reverse: boolean;
    min: number;
    max: number;
    leftLabel: string;
    rightLabel: string;
    labelPosition: "top" | "bottom";
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
