import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	title: 'Foundations/Radius/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TokensTable: Story = {
	render: () => ({
		setup() {
			const rows = [
				{ token: 'radius.none', value: '0', suitable: 'Sharp-edged elements: data tables, table cells, dividers.' },
				{ token: 'radius.2xs', value: '2px', suitable: 'Small detail elements: checkboxes, avatar labels, select option items.' },
				{ token: 'radius.xs', value: '4px', suitable: 'Supporting elements: tags, inputs, selects, date pickers, compact buttons.' },
				{ token: 'radius.sm', value: '6px', suitable: 'Interactive elements: buttons, tooltips, form fields, popovers, navigation items.' },
				{ token: 'radius.md', value: '8px', suitable: 'Containment elements: dialogs, in-page containers, floating UI, dropdown menus.' },
				{ token: 'radius.lg', value: '12px', suitable: 'Large page elements: cards, modals, panels, large containers.' },
				{ token: 'radius.xl', value: '16px', suitable: 'Feature sections, navigation panels, large decorative containers.' },
				{ token: 'radius.2xl', value: '24px', suitable: 'Hero sections, large promotional surfaces.' },
				{ token: 'radius.full', value: '999px', suitable: 'Circular elements: avatars, radio buttons, pills, rounded buttons and tags.' },
			];
			return { rows };
		},
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold w-32 shrink-0">Token name</span>
					<span class="body-md font-semibold flex-1">Suitable for</span>
					<span class="body-md font-semibold w-16 shrink-0 text-right">Value*</span>
					<span class="body-md font-semibold w-14 shrink-0 text-right">Preview</span>
				</div>
				<div v-for="r in rows" :key="r.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="w-32 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="r.token" :data-tw="'rounded-' + r.token.replace('radius.', '')">{{ r.token }}</code></div>
					<span class="body-md text-subtle flex-1">{{ r.suitable }}</span>
					<span class="body-md font-semibold w-16 shrink-0 text-right">{{ r.value }}</span>
					<div class="w-14 shrink-0 flex justify-end">
						<div class="w-10 h-10 bg-neutral-200 border-2 border-neutral-300" :style="{ borderRadius: r.value, borderTopColor: 'var(--color-border-brand)', borderRightColor: 'var(--color-border-brand)' }" />
					</div>
				</div>
				<p class="body-md text-subtlest mt-spacing-100">* Token values are subject to change and should be used as an indication only.</p>
			</div>
		`,
	}),
};

export const ExampleXsmall: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-center justify-center">
				<div class="flex flex-col gap-spacing-150">
					<div class="flex items-center gap-spacing-100">
						<div class="w-5 h-5 rounded-2xs border border-default bg-elevation-surface-default shrink-0" />
						<span class="text-sm">Unchecked</span>
					</div>
					<div class="flex items-center gap-spacing-100">
						<div class="w-5 h-5 rounded-2xs shrink-0 flex items-center justify-center" style="background: #014d49">
							<span class="text-white text-xs leading-none font-bold">&#x2713;</span>
						</div>
						<span class="text-sm">Checked</span>
					</div>
				</div>
				<div class="flex flex-col rounded-sm border border-default overflow-hidden bg-elevation-surface-default w-52" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<div class="px-spacing-150 py-spacing-100 text-sm flex items-center gap-spacing-100 border-b border-default">
						<div class="w-4 h-4 rounded-2xs shrink-0 flex items-center justify-center" style="background: #014d49">
							<span class="text-white text-[8px] leading-none font-bold">&#x2713;</span>
						</div>
						<span>Option selected</span>
					</div>
					<div class="px-spacing-150 py-spacing-100 text-sm flex items-center gap-spacing-100 border-b border-default">
						<div class="w-4 h-4 rounded-2xs border border-default bg-elevation-surface-default shrink-0" />
						<span class="text-subtle">Another option</span>
					</div>
					<div class="px-spacing-150 py-spacing-100 text-sm flex items-center gap-spacing-100">
						<div class="w-4 h-4 rounded-2xs border border-default bg-elevation-surface-default shrink-0" />
						<span class="text-subtle">Third option</span>
					</div>
				</div>
			</div>
		`,
	}),
};

export const ExampleSmall: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-300 items-center justify-center">
				<div class="flex gap-spacing-100">
					<div class="rounded-xs px-spacing-150 py-spacing-50" style="background: #f0fcfa; border: 1px solid #014d49">
						<span class="text-xs font-medium" style="color: #0c625c">Design</span>
					</div>
					<div class="bg-success-default border border-success rounded-xs px-spacing-150 py-spacing-50">
						<span class="text-xs font-medium text-success">Published</span>
					</div>
				</div>
				<div class="h-10 rounded-sm border border-default bg-elevation-surface-default px-spacing-150 flex items-center w-44">
					<span class="text-sm text-subtlest">Search...</span>
				</div>
				<div class="h-10 rounded-sm border border-default bg-elevation-surface-default px-spacing-150 flex items-center justify-between w-40">
					<span class="text-sm">Category</span>
					<span class="text-subtle text-xs">&#x25BE;</span>
				</div>
			</div>
		`,
	}),
};

export const ExampleMedium: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-300 items-center justify-center">
				<div class="text-inverse rounded-md px-spacing-200 py-spacing-75 text-sm font-medium" style="background: #014d49">Primary</div>
				<div class="bg-elevation-surface-default border border-default rounded-md px-spacing-200 py-spacing-75 text-sm font-medium">Secondary</div>
				<div class="bg-elevation-surface-default rounded-sm border border-default p-spacing-150 text-xs text-subtle max-w-40" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">Tooltip with helpful context.</div>
				<div class="flex flex-col rounded-sm border border-default overflow-hidden bg-elevation-surface-default" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<div class="px-spacing-150 py-spacing-100 text-sm">Menu item</div>
					<div class="px-spacing-150 py-spacing-100 text-sm font-medium" style="background: #f0fcfa; color: #0c625c">Selected</div>
					<div class="px-spacing-150 py-spacing-100 text-sm">Menu item</div>
				</div>
			</div>
		`,
	}),
};

export const ExampleLarge: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-start justify-center">
				<div class="bg-elevation-surface-default rounded-md border border-default p-spacing-250 flex flex-col gap-spacing-150 w-56" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<span class="text-sm font-medium">Confirm action</span>
					<div class="w-full h-3 rounded-xs bg-neutral-200" />
					<div class="w-3/4 h-3 rounded-xs bg-neutral-200" />
					<div class="flex gap-spacing-100 justify-end mt-spacing-100">
						<div class="rounded-md border border-default bg-elevation-surface-default px-spacing-150 py-spacing-75 text-xs font-medium text-subtle">Cancel</div>
						<div class="rounded-md px-spacing-150 py-spacing-75 text-xs font-medium text-inverse" style="background: #014d49">Confirm</div>
					</div>
				</div>
				<div class="bg-elevation-surface-default rounded-xl p-spacing-250 flex flex-col gap-spacing-100 w-56" style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)">
					<div class="w-full h-16 rounded-sm bg-neutral-200" />
					<span class="text-sm font-medium">Card title</span>
					<div class="w-full h-3 rounded-xs bg-neutral-200" />
					<div class="w-2/3 h-3 rounded-xs bg-neutral-200" />
				</div>
			</div>
		`,
	}),
};

export const ExampleFull: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-center justify-center">
				<div class="flex items-center gap-spacing-100">
					<div class="w-5 h-5 rounded-full border border-default bg-elevation-surface-default" />
					<div class="w-5 h-5 rounded-full flex items-center justify-center" style="background: #014d49">
						<div class="w-2.5 h-2.5 rounded-full bg-white" />
					</div>
				</div>
				<div class="rounded-full w-10 h-10 flex items-center justify-center" style="background: #014d49">
					<span class="text-sm font-bold text-inverse">BN</span>
				</div>
				<div class="text-inverse rounded-full px-spacing-200 py-spacing-75 text-sm font-medium" style="background: #014d49">Rounded</div>
				<div class="rounded-full px-spacing-150 py-spacing-50 flex items-center gap-spacing-75" style="background: #f0fcfa; border: 1px solid #014d49">
					<span class="text-xs font-medium" style="color: #0c625c">Label</span>
					<span class="text-xs leading-none" style="color: #0c625c">&#x2715;</span>
				</div>
				<div class="flex -space-x-2">
					<div class="rounded-full w-8 h-8 flex items-center justify-center border-2 border-white" style="background: #014d49"><span class="text-xs font-bold text-inverse">A</span></div>
					<div class="rounded-full w-8 h-8 flex items-center justify-center border-2 border-white" style="background: #0c625c"><span class="text-xs font-bold text-inverse">B</span></div>
					<div class="rounded-full w-8 h-8 flex items-center justify-center border-2 border-white" style="background: #3e9f97"><span class="text-xs font-bold text-inverse">C</span></div>
				</div>
			</div>
		`,
	}),
};
