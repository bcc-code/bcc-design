import type { BccReactInfo } from './types';
export type BccReactProps = {
    emojis: BccReactInfo[];
    top?: boolean;
    placeholder?: string;
};
declare const __VLS_export: import("vue").DefineComponent<BccReactProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    toggle: (id: string) => any;
}, string, import("vue").PublicProps, Readonly<BccReactProps> & Readonly<{
    onToggle?: ((id: string) => any) | undefined;
}>, {
    top: boolean;
    placeholder: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
