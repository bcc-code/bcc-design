import type { Meta, StoryObj } from '@storybook/vue3';
import { doDont } from './helpers';

const meta = {
	title: 'Foundations/Border/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


export const WidthTokens: Story = {
	render: () => ({
		setup() {
			const rows = [
				{ token: 'border.width', value: '1px', suitable: 'Standard borders for containers, dividers, inputs, and cards.' },
				{ token: 'border.width.selected', value: '2px', suitable: 'Selected states — active tabs, chosen items, toggled controls.' },
				{ token: 'border.width.focused', value: '2px', suitable: 'Focus ring indicator for keyboard navigation and accessibility.' },
			];
			return { rows };
		},
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold w-44 shrink-0">Token name</span>
					<span class="body-md font-semibold flex-1">Suitable for</span>
					<span class="body-md font-semibold w-16 shrink-0 text-right">Value*</span>
					<span class="body-md font-semibold w-20 shrink-0 text-right">Preview</span>
				</div>
				<div v-for="r in rows" :key="r.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="w-44 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="r.token" :data-tw="r.value === '1px' ? 'border' : 'border-2'">{{ r.token }}</code></div>
					<span class="body-md text-subtle flex-1">{{ r.suitable }}</span>
					<span class="body-md font-semibold w-16 shrink-0 text-right">{{ r.value }}</span>
					<div class="w-20 shrink-0 flex justify-end">
						<div class="w-10 h-10 rounded-sm bg-neutral-200" :style="{ border: r.value + ' solid var(--color-border-brand)' }" />
					</div>
				</div>
				<p class="body-md text-subtlest mt-spacing-100">* Token values are subject to change and should be used as an indication only.</p>
			</div>
		`,
	}),
};


export const ExampleDefault: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-start justify-center">
				<div class="bg-elevation-surface-default border border-default rounded-xl p-spacing-250 w-52 flex flex-col gap-spacing-100" style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)">
					<div class="w-full h-12 rounded-sm bg-neutral-200" />
					<span class="text-sm font-medium">Card title</span>
					<div class="w-full h-3 rounded-xs bg-neutral-200" />
				</div>
				<div class="flex flex-col gap-spacing-150 w-52">
					<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-spacing-150 flex items-center">
						<span class="text-sm text-subtlest">Text input</span>
					</div>
					<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-spacing-150 flex items-center justify-between">
						<span class="text-sm text-default">Select</span>
						<span class="text-subtle text-xs">&#x25BE;</span>
					</div>
					<hr class="border-default" />
					<div class="flex flex-col rounded-sm border border-default overflow-hidden bg-elevation-surface-default" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
						<div class="px-spacing-150 py-spacing-100 text-sm border-b border-default">Menu item</div>
						<div class="px-spacing-150 py-spacing-100 text-sm border-b border-default bg-neutral-100">Menu item</div>
						<div class="px-spacing-150 py-spacing-100 text-sm">Menu item</div>
					</div>
				</div>
			</div>
		`,
	}),
};


export const ExampleSelected: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-start justify-center">
				<div class="flex flex-col gap-spacing-150 w-52">
					<div class="flex items-center gap-spacing-100">
						<div class="w-5 h-5 rounded-2xs border border-default bg-elevation-surface-default shrink-0" />
						<span class="text-sm">Unchecked</span>
					</div>
					<div class="flex items-center gap-spacing-100">
						<div class="w-5 h-5 rounded-2xs shrink-0 flex items-center justify-center bg-brand-bolder-default">
							<span class="text-white text-xs leading-none font-bold">&#x2713;</span>
						</div>
						<span class="text-sm">Checked</span>
					</div>
					<div class="flex items-center gap-spacing-100 mt-spacing-100">
						<div class="w-5 h-5 rounded-full border border-default bg-elevation-surface-default shrink-0" />
						<span class="text-sm">Unselected</span>
					</div>
					<div class="flex items-center gap-spacing-100">
						<div class="w-5 h-5 rounded-full shrink-0 flex items-center justify-center bg-brand-bolder-default">
							<div class="w-2.5 h-2.5 rounded-full bg-white" />
						</div>
						<span class="text-sm">Selected</span>
					</div>
				</div>
				<div class="flex flex-col bg-elevation-surface-default rounded-sm border border-default overflow-hidden w-52" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<div class="px-spacing-150 py-spacing-100 text-sm text-subtle border-b border-default">Option A</div>
					<div class="px-spacing-150 py-spacing-100 text-sm font-medium border-l-2 border-l-brand bg-brand-subtlest-default text-brand-default">Option B</div>
					<div class="px-spacing-150 py-spacing-100 text-sm text-subtle border-b border-default">Option C</div>
				</div>
			</div>
		`,
	}),
};


export const ExampleFocused: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-center justify-center">
				<div class="h-10 rounded-md bg-elevation-surface-default border-2 border-focused flex items-center px-spacing-150 w-48">
					<span class="text-sm text-default">Focused input</span>
				</div>
				<div class="text-inverse rounded-md px-spacing-200 py-spacing-75 text-sm font-medium bg-brand-bolder-default" style="outline: 2px solid var(--color-border-focused); outline-offset: 2px;">
					Focused button
				</div>
				<div class="h-10 rounded-md bg-elevation-surface-default border-2 border-focused flex items-center justify-between px-spacing-150 w-40">
					<span class="text-sm text-default">Select</span>
					<span class="text-subtle text-xs">&#x25BE;</span>
				</div>
			</div>
		`,
	}),
};


export const ColorTokens: Story = {
	render: () => ({
		setup() {
			const rows = [
				{ token: 'color.border.default', tw: 'border-default', suitable: 'Standard borders for containers, cards, and dividers.', color: 'var(--color-border-default)' },
				{ token: 'color.border.bold', tw: 'border-bold', suitable: 'High-emphasis borders that need more visual weight.', color: 'var(--color-border-bold)' },
				{ token: 'color.border.input', tw: 'border-input', suitable: 'Form inputs, selects, and text areas at rest.', color: 'var(--color-border-input)' },
				{ token: 'color.border.selected', tw: 'border-selected', suitable: 'Selected state — active tabs, chosen items.', color: 'var(--color-border-selected)' },
				{ token: 'color.border.focused', tw: 'border-focused', suitable: 'Focus ring for keyboard navigation.', color: 'var(--color-border-focused)' },
				{ token: 'color.border.disabled', tw: 'border-disabled', suitable: 'Disabled, non-interactive elements.', color: 'var(--color-border-disabled)' },
				{ token: 'color.border.brand', tw: 'border-brand', suitable: 'Brand-colored accents.', color: 'var(--color-border-brand)' },
				{ token: 'color.border.success', tw: 'border-success', suitable: 'Success state and positive feedback.', color: 'var(--color-border-success)' },
				{ token: 'color.border.warning', tw: 'border-warning', suitable: 'Warning state and cautions.', color: 'var(--color-border-warning)' },
				{ token: 'color.border.danger', tw: 'border-danger', suitable: 'Danger, error, and destructive actions.', color: 'var(--color-border-danger)' },
				{ token: 'color.border.information', tw: 'border-information', suitable: 'Informational context and tips.', color: 'var(--color-border-information)' },
			];
			return { rows };
		},
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold w-48 shrink-0">Token name</span>
					<span class="body-md font-semibold flex-1">Suitable for</span>
					<span class="body-md font-semibold w-14 shrink-0 text-right">Preview</span>
				</div>
				<div v-for="r in rows" :key="r.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="w-48 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="r.token" :data-tw="r.tw">{{ r.token }}</code></div>
					<span class="body-md text-subtle flex-1">{{ r.suitable }}</span>
					<div class="w-14 shrink-0 flex justify-end">
						<div class="w-10 h-10 rounded-sm border-2" :style="{ borderColor: r.color, background: 'var(--color-elevation-surface-default)' }" />
					</div>
				</div>
			</div>
		`,
	}),
};


export const PairingExample: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-300 justify-center items-start">
				<div class="flex flex-col items-center gap-spacing-100">
					<div class="w-28 h-10 rounded-md bg-elevation-surface-default border border-input flex items-center px-spacing-150">
						<span class="text-sm text-subtlest">Rest</span>
					</div>
					<span class="body-md text-subtlest">1px · input</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<div class="w-28 h-10 rounded-md bg-elevation-surface-default border-2 border-focused flex items-center px-spacing-150">
						<span class="text-sm text-default">Focused</span>
					</div>
					<span class="body-md text-subtlest">2px · focused</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<div class="w-28 h-10 rounded-md bg-elevation-surface-default border-2 border-selected flex items-center px-spacing-150">
						<span class="text-sm text-default">Selected</span>
					</div>
					<span class="body-md text-subtlest">2px · selected</span>
				</div>
				<div class="flex flex-col items-center gap-spacing-100">
					<div class="w-28 h-10 rounded-md bg-elevation-surface-default border border-disabled flex items-center px-spacing-150">
						<span class="text-sm text-disabled">Disabled</span>
					</div>
					<span class="body-md text-subtlest">1px · disabled</span>
				</div>
			</div>
		`,
	}),
};


export const DoBorderStates: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex gap-spacing-200">
				<div class="w-24 h-10 rounded-md bg-elevation-surface-default border border-default flex items-center justify-center"><span class="body-md text-subtle">Default</span></div>
				<div class="w-24 h-10 rounded-md bg-elevation-surface-default border-2 border-selected flex items-center justify-center"><span class="body-md text-subtle">Selected</span></div>
			</div>`,
			'Use 2px borders only for interactive states like selection and focus.',
			`<div class="flex gap-spacing-200">
				<div class="w-24 h-10 rounded-md bg-elevation-surface-default border-2 border-default flex items-center justify-center"><span class="body-md text-subtle">Item</span></div>
				<div class="w-24 h-10 rounded-md bg-elevation-surface-default border-2 border-default flex items-center justify-center"><span class="body-md text-subtle">Item</span></div>
			</div>`,
			"Don't use emphasis borders as decoration on static elements.",
		),
	}),
};
