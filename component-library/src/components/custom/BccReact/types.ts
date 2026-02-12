export type ReactInfo = {
	id: string;
	emoji: string;
	count?: number;
	selected?: boolean;
};

export type ReactProps = {
	emojis: ReactInfo[];
	top?: boolean;
	placeholder?: string;
};
