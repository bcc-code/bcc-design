export type BccCapacityIndicatorProps = {
    /** -1 = Infinity */
    total: number;
    used?: number;
    size?: 'xs' | 'sm' | 'base' | 'lg';
    animationDuration?: number;
    squared?: boolean;
    context?: 'default' | 'colored';
};
declare const __VLS_export: import("vue").DefineComponent<BccCapacityIndicatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BccCapacityIndicatorProps> & Readonly<{}>, {
    used: number;
    size: "xs" | "sm" | "base" | "lg";
    animationDuration: number;
    squared: boolean;
    context: "default" | "colored";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
