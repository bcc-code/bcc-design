export type ReactInfo = {
	/** Unique id for this reaction option (e.g. for toggle events). */
	id: string;
	/** Emoji character to display (e.g. "👍"). */
	emoji: string;
	/** Number of times this reaction was chosen; shown next to the emoji when > 1. */
	count?: number;
	/** When true, indicates the current user has selected this reaction; affects styling. */
	selected?: boolean;
};

export type ReactProps = {
	/** List of reaction options with id, emoji, count, and selected state. */
	emojis: ReactInfo[];
	/** When true, the reaction picker is positioned above the list and opens upward. */
	top?: boolean;
	/** Message shown when there are no reactions yet (e.g. "Be the first to react"). */
	placeholder?: string;
};
