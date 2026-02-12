export declare enum COLORS {
    BRAND = "brand",
    NEUTRAL = "neutral",
    DANGER = "danger",
    WARNING = "warning",
    SUCCESS = "success",
    INFO = "info",
    GRAY = "gray",
    BLUE = "blue",
    TEAL = "teal",
    GREEN = "green",
    BROWN = "brown",
    YELLOW = "yellow",
    ORANGE = "orange",
    RED = "red",
    PURPLE = "purple",
    MAGENTA = "magenta"
}
export declare enum LEVELS {
    SUBTLEST = "subtlest",
    SUBTLER = "subtler",
    SUBTLE = "subtle",
    DEFAULT = "default",
    BOLD = "bold",
    BOLDER = "bolder",
    BOLDEST = "boldest"
}
/** Colors that have all level variants (default, bolder, boldest, etc.). */
type FullLevelColors = COLORS.BRAND | COLORS.NEUTRAL;
/** Accent colors only have these four levels (no default, bolder, boldest). */
export type AccentLevels = LEVELS.SUBTLEST | LEVELS.SUBTLER | LEVELS.SUBTLE | LEVELS.BOLD;
/** Levels allowed for a given color: full levels for brand/neutral, accent levels for the rest. */
type LevelsForColor<C extends COLORS> = C extends FullLevelColors ? LEVELS : AccentLevels;
/** Context token for color C at level L (helper to avoid ambiguous > in template literal). */
type ContextToken<C extends COLORS, L extends LEVELS> = `ctx-${C}-${L}`;
/**
 * Type with only the specified context levels for all colors.
 * For brand/neutral, any level in L is allowed.
 * For accent colors, only levels in L that are also in AccentLevels (subtlest, subtler, subtle, bold) are allowed.
 */
export type ONLY_LEVELS<L extends LEVELS> = {
    [K in COLORS]: Record<Extract<L, LevelsForColor<K>>, `ctx-${K}-${Extract<L, LevelsForColor<K>>}`>;
};
/** Type with all context levels: brand/neutral have all levels, accent colors have only subtlest, subtler, subtle, bold. */
export type ALL_LEVELS = {
    [K in COLORS]: K extends FullLevelColors ? Record<LEVELS, ContextToken<K, LEVELS>> : Record<AccentLevels, ContextToken<K, AccentLevels>>;
};
export declare const BCC_CONTEXTS: Readonly<ALL_LEVELS>;
export {};
