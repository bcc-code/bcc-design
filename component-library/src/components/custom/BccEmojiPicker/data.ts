export type EmojiItem = {
	emoji: string;
	/** Localised name, used as the button's accessible label. */
	label: string;
	/** Localised search keywords. */
	tags: string[];
};

export type EmojiGroup = {
	/** Emojibase group key, e.g. `smileys-emotion`. */
	key: string;
	/** Localised group name. */
	label: string;
	emojis: EmojiItem[];
};

export type EmojiPickerProps = {
	/** Locale for emoji names, search keywords and category names. Unsupported locales fall back to `en`. */
	locale?: LocaleWildcard;
	/** Placeholder for the search field. */
	searchPlaceholder?: string;
	/** Shown when a search has no results. */
	noResultsText?: string;
	/** Shown when the emoji data fails to load. */
	errorText?: string;
};

export type EmojiPickerOpenOptions = EmojiPickerProps & {
	/** Element the picker is positioned next to, usually the button that opened it. */
	anchor: HTMLElement;
	/** Called for each emoji the user picks. The picker stays open. */
	onSelect: (emoji: string) => void;
	/** Called when the picker closes. */
	onHide?: () => void;
};

// One explicit import per locale: a template string would make bundlers emit every emojibase locale.
const loaders = {
	en: () => Promise.all([import('emojibase-data/en/compact.json'), import('emojibase-data/en/messages.json')]),
	nb: () => Promise.all([import('emojibase-data/nb/compact.json'), import('emojibase-data/nb/messages.json')]),
	de: () => Promise.all([import('emojibase-data/de/compact.json'), import('emojibase-data/de/messages.json')]),
	es: () => Promise.all([import('emojibase-data/es/compact.json'), import('emojibase-data/es/messages.json')]),
	fr: () => Promise.all([import('emojibase-data/fr/compact.json'), import('emojibase-data/fr/messages.json')]),
	nl: () => Promise.all([import('emojibase-data/nl/compact.json'), import('emojibase-data/nl/messages.json')]),
	pl: () => Promise.all([import('emojibase-data/pl/compact.json'), import('emojibase-data/pl/messages.json')]),
} as const;

export type Locale = keyof typeof loaders;

type LocaleExt = Locale | 'no' | 'nn' | 'ro';
export type LocaleWildcard =
	| LocaleExt
	| `${LocaleExt}${'-' | '_'}${string}`
	| `${Uppercase<LocaleExt>}${'-' | '_'}${string}`;

/** A face from each recent Emoji version, newest first. Older versions are assumed to render. */
const VERSION_TEST_EMOJIS: [version: number, emoji: string][] = [
	[17, '🫪'],
	[16, '🫩'],
	[15, '🫨'],
	[14, '🫠'],
	[13, '🥲'],
	[12, '🥱'],
	[11, '🥰'],
];

export function resolveEmojiLocale(locale?: LocaleWildcard): Locale {
	const language = locale?.toLowerCase().split(/[-_]/)[0] ?? 'en';
	if (language === 'no' || language === 'nn') return 'nb';
	return language in loaders ? (language as Locale) : 'en';
}

const cache = new Map<string, Promise<EmojiGroup[]>>();

/** Loads emojis grouped by category, without the ones this device can't render. */
export function loadEmojiGroups(locale?: LocaleWildcard): Promise<EmojiGroup[]> {
	const key = resolveEmojiLocale(locale);
	let groups = cache.get(key);
	if (!groups) {
		groups = buildGroups(key);
		cache.set(key, groups);
		groups.catch(() => cache.delete(key));
	}
	return groups;
}

async function buildGroups(locale: Locale): Promise<EmojiGroup[]> {
	const [[emojiModule, messagesModule], versionsModule] = await Promise.all([
		loaders[locale]!(),
		import('emojibase-data/versions/emoji.json'),
	]);
	const emojis = emojiModule.default;
	const messages = messagesModule.default;
	const versions = versionsModule.default;

	const maxVersion = detectMaxEmojiVersion();
	const unsupported = new Set(
		Object.entries(versions)
			.filter(([version]) => Number(version) > maxVersion)
			.flatMap(([, hexcodes]) => hexcodes)
	);
	const showFlags = canRenderColor('🇳🇴');

	const groups = messages.groups
		// `component` holds the bare skin tone and hair modifiers, which aren't emojis on their own.
		.filter(group => group.key !== 'component' && (showFlags || group.key !== 'flags'))
		.map(group => ({ key: group.key, order: group.order, label: group.message, emojis: [] as EmojiItem[] }));
	const byOrder = new Map(groups.map(group => [group.order, group]));

	for (const emoji of emojis) {
		if (emoji.group == null || unsupported.has(emoji.hexcode)) continue;
		byOrder.get(emoji.group)?.emojis.push({ emoji: emoji.unicode, label: emoji.label, tags: emoji.tags ?? [] });
	}

	return groups.map(({ key, label, emojis }) => ({ key, label, emojis }));
}

export function searchEmojis(groups: EmojiGroup[], query: string): EmojiItem[] {
	const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
	if (!terms.length) return [];

	return groups
		.flatMap(group => group.emojis)
		.filter(item => {
			const words = [item.label.toLowerCase(), ...item.tags.map(tag => tag.toLowerCase())];
			return terms.every(term => words.some(word => word.includes(term)));
		});
}

function detectMaxEmojiVersion(): number {
	for (const [version, emoji] of VERSION_TEST_EMOJIS) {
		if (canRenderColor(emoji)) return version;
	}
	return VERSION_TEST_EMOJIS.at(-1)![0] - 1;
}

let context: CanvasRenderingContext2D | null | undefined;

/**
 * Color emoji fonts ignore the fill color, while a missing glyph (or a flag shown as two
 * letters) is drawn in it. So any non-gray pixel means the emoji renders.
 */
function canRenderColor(emoji: string): boolean {
	if (context === undefined) {
		try {
			context = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
		} catch {
			context = null;
		}
	}
	// No canvas (e.g. tests or SSR): show everything.
	if (!context) return true;

	const size = 20;
	context.canvas.width = size;
	context.canvas.height = size;
	context.textBaseline = 'top';
	context.font = `${size - 4}px sans-serif`;
	context.fillStyle = '#000';
	context.clearRect(0, 0, size, size);
	context.fillText(emoji, 0, 0);

	const { data } = context.getImageData(0, 0, size, size);
	for (let i = 0; i < data.length; i += 4) {
		if (data[i + 3]! > 0 && (data[i] !== data[i + 1] || data[i + 1] !== data[i + 2])) return true;
	}
	return false;
}
