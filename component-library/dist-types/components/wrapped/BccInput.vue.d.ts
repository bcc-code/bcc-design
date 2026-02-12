import { type InputNumberProps } from 'primevue/inputnumber';
import { type InputTextProps } from 'primevue/inputtext';
import { type Component } from 'vue';
export type BccInputProps = {
    id?: string;
    size?: InputTextProps['size'];
    icon?: Component;
    iconRight?: boolean;
    loading?: boolean;
    numeric?: boolean;
} & /* @vue-ignore */ (InputTextProps | ({
    numeric: true;
} & /* @vue-ignore */ InputNumberProps));
type __VLS_ModelProps = {
    modelValue?: string;
};
declare const __VLS_export: import("vue").DefineComponent<({
    id?: string;
    size?: InputTextProps["size"];
    icon?: Component;
    iconRight?: boolean;
    loading?: boolean;
    numeric?: boolean;
} & InputTextProps & __VLS_ModelProps) | ({
    id?: string;
    size?: InputTextProps["size"];
    icon?: Component;
    iconRight?: boolean;
    loading?: boolean;
    numeric?: boolean;
} & {
    numeric: true;
} & InputNumberProps & __VLS_ModelProps), {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | undefined) => any;
}, string, import("vue").PublicProps, Readonly<({
    id?: string;
    size?: InputTextProps["size"];
    icon?: Component;
    iconRight?: boolean;
    loading?: boolean;
    numeric?: boolean;
} & InputTextProps & __VLS_ModelProps) | ({
    id?: string;
    size?: InputTextProps["size"];
    icon?: Component;
    iconRight?: boolean;
    loading?: boolean;
    numeric?: boolean;
} & {
    numeric: true;
} & InputNumberProps & __VLS_ModelProps)> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
