export enum COLORS {
	BRAND = 'brand',
	NEUTRAL = 'neutral',
	DANGER = 'danger',
	WARNING = 'warning',
	SUCCESS = 'success',
	INFO = 'info',
	// Accents:
	GRAY = 'gray',
	BLUE = 'blue',
	TEAL = 'teal',
	GREEN = 'green',
	BROWN = 'brown',
	YELLOW = 'yellow',
	ORANGE = 'orange',
	RED = 'red',
	PURPLE = 'purple',
	MAGENTA = 'magenta',
}

export enum LEVELS {
	SUBTLEST = 'subtlest',
	SUBTLER = 'subtler',
	SUBTLE = 'subtle',
	DEFAULT = 'default',
	BOLD = 'bold',
	BOLDER = 'bolder',
	BOLDEST = 'boldest',
}

/** Colors that have all level variants (default, bolder, boldest, etc.). */
type FullLevelColors = COLORS.BRAND | COLORS.NEUTRAL;
type AccentColors =
	| COLORS.GRAY
	| COLORS.BLUE
	| COLORS.TEAL
	| COLORS.GREEN
	| COLORS.BROWN
	| COLORS.YELLOW
	| COLORS.ORANGE
	| COLORS.RED
	| COLORS.PURPLE
	| COLORS.MAGENTA;
type Severities = COLORS.INFO | COLORS.SUCCESS | COLORS.WARNING | COLORS.DANGER;
type SeverityLevels = LEVELS.DEFAULT | LEVELS.BOLDER;

/** Accent colors only have these four levels (no default, bolder, boldest). */
type AccentLevels = LEVELS.SUBTLEST | LEVELS.SUBTLER | LEVELS.SUBTLE | LEVELS.BOLDER;

/** Context token for color C at level L (helper to avoid ambiguous > in template literal). */
type ContextToken<C extends COLORS, L extends LEVELS> = L extends LEVELS.DEFAULT ? `${C}` : `${C}-${L}`;

export type LEVELS_MAP<L extends LEVELS, C extends COLORS> = {
	[K in L]: ContextToken<C, K>;
};

/**
 * Type with only the specified context levels for all colors.
 * For brand/neutral, any level in L is allowed.
 * For accent colors, only levels in L that are also in AccentLevels (subtlest, subtler, subtle, bold) are allowed.
 */
export type ONLY_LEVELS<L extends LEVELS, C extends COLORS = COLORS> = {
	[K in C]: LEVELS_MAP<L, K>;
};

/** Type with all context levels: brand/neutral have all levels, accent colors have only subtlest, subtler, subtle, bold. */
export type ALL_LEVELS = ONLY_LEVELS<AccentLevels, AccentColors> &
	ONLY_LEVELS<LEVELS, FullLevelColors> &
	ONLY_LEVELS<SeverityLevels, Severities>;

const ACCENT_LEVEL_LIST: AccentLevels[] = [LEVELS.SUBTLEST, LEVELS.SUBTLER, LEVELS.SUBTLE, LEVELS.BOLDER];
const SEVERITY_LEVEL_LIST: SeverityLevels[] = [LEVELS.DEFAULT, LEVELS.BOLDER];

const FULL_LEVEL_COLORS: FullLevelColors[] = [COLORS.BRAND, COLORS.NEUTRAL];
const SEVERITY_COLORS: Severities[] = [COLORS.INFO, COLORS.SUCCESS, COLORS.WARNING, COLORS.DANGER];

export const BCC_CONTEXTS = Object.freeze(
	(() => {
		const contexts: Record<string, Record<string, string>> = {};
		for (const key of Object.values(COLORS)) {
			const ctx: Record<string, string> = {};
			const levels = FULL_LEVEL_COLORS.includes(key as COLORS.BRAND | COLORS.NEUTRAL)
				? Object.values(LEVELS)
				: SEVERITY_COLORS.includes(key as Severities)
					? SEVERITY_LEVEL_LIST
					: ACCENT_LEVEL_LIST;
			for (const level of levels) {
				ctx[level] = level === LEVELS.DEFAULT ? `${key}` : `${key}-${level}`;
			}
			contexts[key] = ctx;
		}
		return contexts as ALL_LEVELS;
	})()
);

export const BCC_CONTEXT_LIST = Object.freeze(
	Array.from(Object.values(BCC_CONTEXTS)).flatMap(ctx => Object.values(ctx)) as BCC_CONTEXT[]
);

export type BCC_CONTEXT =
	| ContextToken<AccentColors, AccentLevels>
	| ContextToken<FullLevelColors, LEVELS>
	| ContextToken<Severities, SeverityLevels>;
