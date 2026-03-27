import type { Meta, StoryObj } from '@storybook/vue3';
import BccReact from './BccReact.vue';
import type { ReactInfo } from './types';

const baseEmojis: ReactInfo[] = [
	{ id: 'thumbs-up', emoji: '👍', count: 12, selected: true },
	{ id: 'heart', emoji: '❤️', count: 7 },
	{ id: 'fire', emoji: '🔥', count: 3 },
	{ id: 'rocket', emoji: '🚀', count: 1 },
	{ id: 'party', emoji: '🎉', count: 2 },
	{ id: 'laugh', emoji: '😂', count: 4 },
	{ id: 'eyes', emoji: '👀', count: 1 },
	{ id: 'thinking', emoji: '🤔', count: 2 },
	{ id: 'clap', emoji: '👏', count: 5 },
	{ id: 'sparkles', emoji: '✨' },
];

const meta: Meta<typeof BccReact> = {
	component: BccReact,
	title: 'Custom/BccReact',
	parameters: {
		docs: {
			description: {
				component:
					'Interactive emoji reactions with selection state, counts, and expandable picker for additional emojis.',
			},
		},
	},
	argTypes: {
		top: { control: 'boolean' },
		placeholder: { control: 'text' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

function createInteractiveRender(fallbackArgs: { emojis: ReactInfo[]; top?: boolean; placeholder?: string }) {
	return (storyArgs?: Partial<typeof fallbackArgs>) => ({
		components: { BccReact },
		setup() {
			const resolvedArgs = { ...fallbackArgs, ...(storyArgs ?? {}) };
			const emojis = structuredClone(resolvedArgs.emojis ?? fallbackArgs.emojis);

			function onToggle(id: string) {
				const target = emojis.find(emoji => emoji.id === id);
				if (!target) return;

				if (target.selected) {
					target.selected = false;
					target.count = Math.max(0, (target.count ?? 0) - 1);
				} else {
					target.selected = true;
					target.count = (target.count ?? 0) + 1;
				}
			}

			return { resolvedArgs, emojis, onToggle };
		},
		template: `
			<div class="py-8">
				<BccReact v-bind="resolvedArgs" :emojis="emojis" @toggle="onToggle" />
			</div>
		`,
	});
}

export const Default: Story = {
	args: {
		emojis: baseEmojis,
		placeholder: 'Be the first to react 😉',
	},
	render: createInteractiveRender({
		emojis: baseEmojis,
		placeholder: 'Be the first to react 😉',
	}),
};

export const TopPositioned: Story = {
	args: {
		emojis: baseEmojis,
		top: true,
	},
	render: createInteractiveRender({
		emojis: baseEmojis,
		top: true,
	}),
};

export const EmptyState: Story = {
	args: {
		emojis: [
			{ id: 'thumbs-up', emoji: '👍' },
			{ id: 'heart', emoji: '❤️' },
			{ id: 'fire', emoji: '🔥' },
		],
		placeholder: 'No reactions yet - add one!',
	},
};
