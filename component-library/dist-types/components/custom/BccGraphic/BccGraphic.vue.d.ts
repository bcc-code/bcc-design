export type BccGraphicProps = {
    bannerSrc?: string;
    logoSrc?: string;
    rounding?: keyof typeof roundingClasses;
    ratio?: AspectRatioStyle;
    grayscale?: boolean;
};
export declare const ratioClasses: {
    ultraWide: string;
    wide: string;
    landscape: string;
    square: string;
    portrait: string;
};
export declare const roundingClasses: {
    none: string;
    sm: string;
    base: string;
    md: string;
    xl: string;
};
export type AspectRatioStyle = keyof typeof ratioClasses | string | undefined;
export declare function getAspectRatioStyle(ratio: AspectRatioStyle): string;
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<BccGraphicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BccGraphicProps> & Readonly<{}>, {
    rounding: keyof typeof roundingClasses;
    ratio: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    'top-left'?: (props: {}) => any;
} & {
    'top-right'?: (props: {}) => any;
} & {
    'bottom-right'?: (props: {}) => any;
} & {
    'bottom-left'?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
