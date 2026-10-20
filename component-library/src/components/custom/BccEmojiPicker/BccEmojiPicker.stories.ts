import { MoodIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import BccButton from '../../wrapped/BccButton.vue';
import BccEmojiPicker from './BccEmojiPicker.vue';
import { openBccEmojiPicker } from './state';

/**
 * Emoji picker with search and categories, using [Emojibase](https://emojibase.dev/) data.
 * Emojis the device can't render (newer Emoji versions, or flags on Windows) are left out.
 *
 * - **`openBccEmojiPicker({ anchor, onSelect })`** opens it in a popover next to `anchor`. It stays
 *   open so several emojis can be picked, and closes on outside click or Escape. Calling it again
 *   with the same anchor closes it.
 * - **`<BccEmojiPicker @select>`** renders the panel inline.
 *
 * The picker and its data are loaded the first time it is shown, so apps that never use it don't
 * bundle or download it.
 */
const meta: Meta<typeof BccEmojiPicker> = {
	component: BccEmojiPicker,
	title: 'Custom/Input/BccEmojiPicker',
	argTypes: {
		locale: { control: 'select', options: ['en', 'nb', 'de', 'es', 'fr', 'nl', 'pl'] },
		searchPlaceholder: { control: 'text' },
		noResultsText: { control: 'text' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		locale: 'en',
	},
	render: args => ({
		components: { BccEmojiPicker },
		setup() {
			const picked = ref('');
			return { args, picked };
		},
		template: `
			<div class="flex flex-col gap-4">
				<div class="border-default self-start overflow-hidden rounded-lg border">
					<BccEmojiPicker v-bind="args" @select="picked += $event" />
				</div>
				<p class="body-md">Picked: {{ picked }}</p>
			</div>
		`,
	}),
};

export const Norwegian: Story = {
	...Default,
	args: {
		locale: 'nb',
		searchPlaceholder: 'Søk',
		noResultsText: 'Fant ingen emojier',
	},
};

/** `openBccEmojiPicker` inserts at the caret. The buttons in the picker don't take focus, so the caret stays in the field. */
export const Popover: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			const text = ref('Hello ');
			const input = ref<HTMLTextAreaElement | null>(null);

			function insert(emoji: string) {
				const field = input.value;
				if (!field) return;
				field.setRangeText(emoji, field.selectionStart, field.selectionEnd, 'end');
				text.value = field.value;
			}

			function open(event: MouseEvent) {
				openBccEmojiPicker({ anchor: event.currentTarget as HTMLElement, onSelect: insert });
			}

			return { text, input, open, MoodIcon };
		},
		template: `
			<div class="flex items-end gap-2">
				<textarea ref="input" v-model="text" class="border-default body-md w-80 rounded-lg border p-2" rows="3" />
				<BccButton text rounded severity="secondary" :icon="MoodIcon" aria-label="Insert emoji" @mousedown.prevent @click="open" />
			</div>
		`,
	}),
};
