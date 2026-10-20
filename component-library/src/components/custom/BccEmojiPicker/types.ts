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
	locale?: string;
	/** Placeholder for the search field. */
	searchPlaceholder?: string;
	/** Shown when a search has no results. */
	noResultsText?: string;
};

export type EmojiPickerOpenOptions = EmojiPickerProps & {
	/** Element the picker is positioned next to, usually the button that opened it. */
	anchor: HTMLElement;
	/** Called for each emoji the user picks. The picker stays open. */
	onSelect: (emoji: string) => void;
	/** Called when the picker closes. */
	onHide?: () => void;
};
