export type BccNpsResultProps = {
    /** Between -100 and 100 */
    score: number;
    size?: 'lg' | 'md' | 'sm' | 'xs';
    display?: string;
    underline?: string;
    hideText?: boolean;
    animated?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<BccNpsResultProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BccNpsResultProps> & Readonly<{}>, {
    size: "lg" | "md" | "sm" | "xs";
    hideText: boolean;
    animated: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
