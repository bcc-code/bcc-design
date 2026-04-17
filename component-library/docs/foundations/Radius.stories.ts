import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { PILL, remToPx } from './helpers';
import { resolveTokenValue } from './tokenResolver';

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
			function r(token: string, suitable: string) {
				const tw = 'rounded-' + token.replace('border-radius.', '');
				return { token, value: remToPx(resolveTokenValue(token)), suitable, tw };
			}
			const rows = [
				r('border-radius.none', 'Sharp-edged elements: data tables, table cells, dividers.'),
				r('border-radius.2xs', 'Small detail elements: checkboxes, avatar labels, select option items.'),
				r('border-radius.xs', 'Supporting elements: tags, inputs, selects, date pickers, compact buttons.'),
				r('border-radius.sm', 'Interactive elements: buttons, tooltips, form fields, popovers, navigation items.'),
				r('border-radius.md', 'Containment elements: dialogs, in-page containers, floating UI, dropdown menus.'),
				r('border-radius.lg', 'Large page elements: cards, modals, panels, large containers.'),
				r('border-radius.xl', 'Feature sections, navigation panels, large decorative containers.'),
				r('border-radius.2xl', 'Hero sections, large promotional surfaces.'),
				r('border-radius.3xl', 'Extra-large decorative surfaces, feature highlights.'),
				r('border-radius.4xl', 'Oversized decorative containers, showcase elements.'),
				r('border-radius.full', 'Circular elements: avatars, radio buttons, pills, rounded buttons and tags.'),
			];
			return { rows };
		},
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-4 border-b border-default pb-2">
					<span class="body-md font-semibold flex-1">Token and description</span>
					<span class="body-md font-semibold w-20 text-center ml-auto">Preview</span>
				</div>
				<div v-for="r in rows" :key="r.token" class="flex items-center gap-4 border-b border-default py-3">
					<div class="flex flex-col gap-1 flex-1">
						<code class="${PILL}" :data-token="r.token" :data-tw="r.tw">{{ r.token }}</code>
						<span class="body-md text-subtle">{{ r.suitable }}</span>
					</div>
					<div class="w-20 ml-auto shrink-0 flex flex-col items-center gap-0.5">
						<div class="w-10 h-10 border-2 border-brand bg-brand-subtlest-default" :style="{ borderRadius: r.value }" />
						<code class="text-xs text-subtlest">{{ r.value }}</code>
					</div>
				</div>
			</div>
		`,
	}),
};

export const ExampleXsmall: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-8 flex gap-8 items-center justify-center">
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-2">
						<div class="w-5 h-5 rounded-2xs border border-default bg-elevation-surface-default shrink-0" />
						<span class="text-sm">Unchecked</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-5 h-5 rounded-2xs shrink-0 flex items-center justify-center bg-brand-bolder-default">
							<span class="text-white text-xs leading-none font-bold">&#x2713;</span>
						</div>
						<span class="text-sm">Checked</span>
					</div>
				</div>
				<div class="flex flex-col rounded-sm border border-default overflow-hidden bg-elevation-surface-default w-52" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<div class="px-3 py-2 text-sm flex items-center gap-2 border-b border-default">
						<div class="w-4 h-4 rounded-2xs shrink-0 flex items-center justify-center bg-brand-bolder-default">
							<span class="text-white text-[8px] leading-none font-bold">&#x2713;</span>
						</div>
						<span>Option selected</span>
					</div>
					<div class="px-3 py-2 text-sm flex items-center gap-2 border-b border-default">
						<div class="w-4 h-4 rounded-2xs border border-default bg-elevation-surface-default shrink-0" />
						<span class="text-subtle">Another option</span>
					</div>
					<div class="px-3 py-2 text-sm flex items-center gap-2">
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
			<div class="bg-neutral-100 rounded-lg p-8 flex gap-6 items-center justify-center">
				<div class="flex gap-2">
					<div class="rounded-sm py-1 px-2 bg-brand-subtlest-default border border-brand">
						<span class="text-sm font-medium text-brand-default">Design</span>
					</div>
					<div class="bg-success-default border border-success rounded-sm py-1 px-2">
						<span class="text-sm font-medium text-success">Published</span>
					</div>
				</div>
				<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-3 flex items-center w-44">
					<span class="text-sm text-subtlest">Search...</span>
				</div>
				<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-3 flex items-center justify-between w-40">
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
			<div class="bg-neutral-100 rounded-lg p-8 flex gap-6 items-center justify-center">
				<div class="text-inverse rounded-md px-4 py-1.5 text-sm font-medium bg-brand-bolder-default">Primary</div>
				<div class="bg-elevation-surface-default border border-default rounded-md px-4 py-1.5 text-sm font-medium">Secondary</div>
				<div class="bg-elevation-surface-default rounded-md border border-default p-3 text-sm text-subtle max-w-40" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">Tooltip with helpful context.</div>
				<div class="flex flex-col rounded-sm border border-default overflow-hidden bg-elevation-surface-default" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<div class="px-3 py-2 text-sm">Menu item</div>
					<div class="px-3 py-2 text-sm font-medium bg-brand-subtlest-default text-brand-default">Selected</div>
					<div class="px-3 py-2 text-sm">Menu item</div>
				</div>
			</div>
		`,
	}),
};

export const ExampleLarge: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-8 flex gap-8 items-start justify-center">
				<div class="bg-elevation-surface-default rounded-lg border border-default p-5 flex flex-col gap-3 w-56" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<span class="text-sm font-medium">Confirm action</span>
					<div class="w-full h-3 rounded-xs bg-neutral-200" />
					<div class="w-3/4 h-3 rounded-xs bg-neutral-200" />
					<div class="flex gap-2 justify-end mt-2">
						<div class="rounded-md border border-default bg-elevation-surface-default px-3 py-1 text-sm font-medium text-subtle">Cancel</div>
						<div class="rounded-md px-3 py-1 text-sm font-medium text-inverse bg-brand-bolder-default">Confirm</div>
					</div>
				</div>
				<div class="bg-elevation-surface-default rounded-xl p-5 flex flex-col gap-2 w-56" style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)">
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
			<div class="bg-neutral-100 rounded-lg p-8 flex gap-8 items-center justify-center">
				<div class="flex items-center gap-2">
					<div class="w-5 h-5 rounded-full border border-default bg-elevation-surface-default" />
					<div class="w-5 h-5 rounded-full flex items-center justify-center bg-brand-bolder-default">
						<div class="w-2.5 h-2.5 rounded-full bg-white" />
					</div>
				</div>
				<div class="rounded-full w-10 h-10 flex items-center justify-center bg-brand-bolder-default">
					<span class="text-sm font-bold text-inverse">BN</span>
				</div>
				<div class="text-inverse rounded-full px-4 py-1.5 text-sm font-medium bg-brand-bolder-default">Rounded</div>
				<div class="rounded-full px-3 py-1 flex items-center gap-1.5 bg-brand-subtlest-default border border-brand">
					<span class="text-xs font-medium text-brand-default">Label</span>
					<span class="text-xs leading-none text-brand-default">&#x2715;</span>
				</div>
				<div class="flex -space-x-2">
					<div class="rounded-full w-8 h-8 flex items-center justify-center border-2 border-white bg-brand-bolder-default"><span class="text-xs font-bold text-inverse">A</span></div>
					<div class="rounded-full w-8 h-8 flex items-center justify-center border-2 border-white" style="background: #0c625c"><span class="text-xs font-bold text-inverse">B</span></div>
					<div class="rounded-full w-8 h-8 flex items-center justify-center border-2 border-white" style="background: #3e9f97"><span class="text-xs font-bold text-inverse">C</span></div>
				</div>
			</div>
		`,
	}),
};
