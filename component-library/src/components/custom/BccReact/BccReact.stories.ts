import type { Meta, StoryObj } from '@storybook/vue3-vite';
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
	title: 'Custom/Feedback/BccReact',
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

export const Default: Story = {
	args: {
		emojis: baseEmojis,
		placeholder: 'Be the first to react 😉',
	},
	render: args => ({
		components: { BccReact },
		setup() {
			const emojis = args.emojis.map(emoji => Object.assign({}, emoji));

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

			return { args, emojis, onToggle };
		},
		template: `
			<div class="py-8">
				<BccReact v-bind="args" :emojis="emojis" @toggle="onToggle" />
			</div>
		`,
	}),
};

export const TopPositioned: Story = {
	args: {
		emojis: baseEmojis,
		top: true,
	},
	render: args => ({
		components: { BccReact },
		setup() {
			const emojis = args.emojis.map(emoji => Object.assign({}, emoji));

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

			return { args, emojis, onToggle };
		},
		template: `
			<div class="py-16">
				<BccReact v-bind="args" :emojis="emojis" @toggle="onToggle" />
			</div>
		`,
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
