import type { Meta, StoryObj } from '@storybook/vue3';
import { doDont } from './helpers';

const meta = {
	title: 'Foundations/Icons/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconSizes: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold w-28 shrink-0">Token name</span>
					<span class="body-md font-semibold flex-1">Suitable for</span>
					<span class="body-md font-semibold w-12 shrink-0 text-right">Size</span>
					<span class="body-md font-semibold w-14 shrink-0 text-right">Preview</span>
				</div>
				<div v-for="s in sizes" :key="s.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="w-28 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="s.token" :data-tw="s.tw">{{ s.token }}</code></div>
					<span class="body-md text-subtle flex-1">{{ s.desc }}</span>
					<span class="body-md font-semibold w-12 shrink-0 text-right">{{ s.size }}</span>
					<div class="w-14 shrink-0 flex justify-end">
						<span class="material-symbols-outlined text-default" :style="{ fontSize: s.size }">search</span>
					</div>
				</div>
			</div>
		`,
		setup() {
			const sizes = [
				{ token: 'icon.size.xs', tw: 'icon-xs', size: '16px', desc: 'Inline with small text, badges, compact UI.' },
				{ token: 'icon.size.sm', tw: 'icon-sm', size: '20px', desc: 'Inline with body text, form labels, tags.' },
				{ token: 'icon.size.md', tw: 'icon-md', size: '24px', desc: 'Default size. Buttons, navigation, standalone icons.' },
				{ token: 'icon.size.lg', tw: 'icon-lg', size: '32px', desc: 'Feature icons, empty states, section headers.' },
				{ token: 'icon.size.xl', tw: 'icon-xl', size: '48px', desc: 'Large illustrations, onboarding, hero sections.' },
			];
			return { sizes };
		},
	}),
};

export const IconColors: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-start justify-center">
				<div class="flex flex-col items-center gap-spacing-100">
					<span class="material-symbols-outlined text-2xl text-default">home</span>
					<span class="body-md text-subtle">Default</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<span class="material-symbols-outlined text-2xl text-subtle">home</span>
					<span class="body-md text-subtle">Subtle</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<span class="material-symbols-outlined text-2xl text-subtlest">home</span>
					<span class="body-md text-subtle">Subtlest</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<span class="material-symbols-outlined text-2xl text-brand-default">home</span>
					<span class="body-md text-subtle">Brand</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<span class="material-symbols-outlined text-2xl text-success">home</span>
					<span class="body-md text-subtle">Success</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<span class="material-symbols-outlined text-2xl text-danger">home</span>
					<span class="body-md text-subtle">Danger</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<div class="rounded-full w-10 h-10 flex items-center justify-center bg-brand-bolder-default">
						<span class="material-symbols-outlined text-xl text-inverse">home</span>
					</div>
					<span class="body-md text-subtle">Inverse</span>
				</div>
			</div>
		`,
	}),
};

export const IconInComponents: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-start justify-center">
				<div class="flex flex-col items-center gap-spacing-100">
					<div class="rounded-md px-spacing-200 py-spacing-75 text-sm font-medium text-inverse bg-brand-bolder-default flex items-center gap-spacing-75">
						<span class="material-symbols-outlined text-lg">add</span>
						Create
					</div>
					<span class="body-md text-subtle">Button with icon</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-spacing-150 flex items-center gap-spacing-100 w-48">
						<span class="material-symbols-outlined text-lg text-subtlest">search</span>
						<span class="text-sm text-subtlest">Search...</span>
					</div>
					<span class="body-md text-subtle">Input with icon</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<div class="flex gap-spacing-300">
						<div class="flex flex-col items-center gap-spacing-25 text-subtle">
							<span class="material-symbols-outlined text-xl">home</span>
							<span class="text-xs">Home</span>
						</div>
						<div class="flex flex-col items-center gap-spacing-25 text-brand-default">
							<span class="material-symbols-outlined text-xl">explore</span>
							<span class="text-xs font-medium">Explore</span>
						</div>
						<div class="flex flex-col items-center gap-spacing-25 text-subtle">
							<span class="material-symbols-outlined text-xl">settings</span>
							<span class="text-xs">Settings</span>
						</div>
					</div>
					<span class="body-md text-subtle">Navigation</span>
				</div>
			</div>
		`,
	}),
};

export const DoIcons: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex items-center gap-spacing-75 px-spacing-200">
				<span class="material-symbols-outlined text-lg text-danger">delete</span>
				<span class="text-sm">Delete item</span>
			</div>`,
			'Pair icons with text labels for clarity — especially for actions.',
			`<div class="flex items-center gap-spacing-300 px-spacing-200">
				<span class="material-symbols-outlined text-lg text-subtle">delete</span>
				<span class="material-symbols-outlined text-lg text-subtle">edit</span>
				<span class="material-symbols-outlined text-lg text-subtle">share</span>
			</div>`,
			"Don't use icons alone without labels or tooltips — they're ambiguous.",
		),
	}),
};

export const DoIconColor: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex items-center gap-spacing-75 px-spacing-200">
				<span class="material-symbols-outlined text-lg text-danger">warning</span>
				<span class="text-sm text-danger">Error occurred</span>
			</div>`,
			'Match icon color with its text — they should read as one element.',
			`<div class="flex items-center gap-spacing-75 px-spacing-200">
				<span class="material-symbols-outlined text-lg text-brand-default">warning</span>
				<span class="text-sm text-danger">Error occurred</span>
			</div>`,
			"Don't mix icon and text colors — it breaks the visual connection.",
		),
	}),
};
