import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { doDont, PILL, remToPx } from './helpers';
import { resolveTokenValue } from './tokenResolver';

function sp(token: string, mult: string) {
	const rem = resolveTokenValue(token);
	return {
		token,
		mult,
		rem,
		px: remToPx(rem),
	};
}

const meta = {
	title: 'Foundations/Spacing/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacingScale: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-4 border-b border-default pb-2">
					<span class="body-md font-semibold flex-1">Token</span>
					<span class="body-md font-semibold w-14 shrink-0 text-right">Multiplier</span>
					<span class="body-md font-semibold w-20 shrink-0 text-right">REM</span>
					<span class="body-md font-semibold w-12 shrink-0 text-right">Pixels</span>
					<span class="body-md font-semibold w-32 ml-auto">Preview</span>
				</div>
				<div v-for="t in tokens" :key="t.token" class="flex items-center gap-4 border-b border-default py-3">
					<div class="flex flex-col gap-1 flex-1">
						<code class="${PILL}" :data-token="t.token" :data-tw="'spacing-' + t.token.replace('space.', '')">{{ t.token }}</code>
					</div>
					<span class="body-md text-subtlest w-14 shrink-0 text-right">{{ t.mult }}</span>
					<span class="body-md text-subtlest w-20 shrink-0 text-right">{{ t.rem }}</span>
					<span class="body-md text-subtlest w-12 shrink-0 text-right">{{ t.px }}</span>
					<div class="w-32 shrink-0 flex flex-col items-start gap-0.5 ml-auto">
						<div class="spacing-indicator h-3" :style="{ width: t.px === '0px' ? '1px' : t.px }"></div>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				sp('space.0', '0\u00d7'),
				sp('space.25', '0.25\u00d7'),
				sp('space.50', '0.5\u00d7'),
				sp('space.75', '0.75\u00d7'),
				sp('space.100', '1\u00d7'),
				sp('space.150', '1.5\u00d7'),
				sp('space.200', '2\u00d7'),
				sp('space.250', '2.5\u00d7'),
				sp('space.300', '3\u00d7'),
				sp('space.400', '4\u00d7'),
				sp('space.500', '5\u00d7'),
				sp('space.600', '6\u00d7'),
				sp('space.800', '8\u00d7'),
				sp('space.1000', '10\u00d7'),
			],
		}),
	}),
};

export const SpacingRuler: Story = {
	render: () => ({
		setup() {
			const ticks = [
				{ px: 0, label: '0', bold: true },
				{ px: 2, label: '2' },
				{ px: 4, label: '4' },
				{ px: 6, label: '6' },
				{ px: 8, label: '8', highlight: true, bold: true },
				{ px: 12, label: '12', bold: true },
				{ px: 16, label: '16' },
				{ px: 20, label: '20' },
				{ px: 24, label: '24', bold: true },
				{ px: 32, label: '32', bold: true },
				{ px: 40, label: '40' },
				{ px: 48, label: '48' },
				{ px: 64, label: '64' },
				{ px: 80, label: '80', bold: true },
			];
			const ranges = [
				{ label: 'Small', start: 0, end: 8, icon: 'grid_view' },
				{ label: 'Medium', start: 12, end: 24, icon: 'auto_awesome_mosaic' },
				{ label: 'Large', start: 32, end: 80, icon: 'grid_layout_side' },
			];
			return { ticks, ranges };
		},
		template: `
			<div class="bg-neutral-100 rounded-lg p-8 pb-12">
				<div class="relative" style="height: 120px; margin: 0 8px">
					<!-- Highlight label above 8px -->
					<div class="absolute flex flex-col items-center" style="left: 10%; top: 0; transform: translateX(-50%)">
						<code class="${PILL}" data-token="spacing.100" data-tw="*-2">spacing.100</code>
						<div class="w-px h-3" style="background: #292a2e" />
					</div>
					<!-- Tick labels -->
					<div class="absolute left-0 right-0 flex" style="top: 34px">
						<div v-for="t in ticks" :key="t.px" class="absolute text-sm" :style="{ left: (t.px / 80 * 100) + '%', transform: 'translateX(-50%)', fontWeight: t.bold ? 700 : 500, color: t.highlight ? '#8360c3' : t.bold ? '#292a2e' : '#6b6e76' }">{{ t.label }}</div>
					</div>
					<!-- Striped bar -->
					<div class="absolute left-0 right-0 spacing-indicator" style="top: 56px; height: 16px; border-radius: 2px">
						<!-- Tick marks -->
						<div v-for="t in ticks" :key="'tick-'+t.px" class="absolute top-0 bottom-0" :style="{ left: (t.px / 80 * 100) + '%', width: t.bold ? '2px' : '1px', background: t.highlight ? '#8360c3' : t.bold ? '#292a2e' : 'rgba(154,130,218,0.4)' }" />
					</div>
					<!-- Range labels below -->
					<div v-for="r in ranges" :key="r.label" class="absolute flex flex-col items-start gap-0.5" :style="{ left: (r.start / 80 * 100) + '%', top: '80px' }">
						<span class="material-symbols-outlined text-lg leading-none text-default">{{ r.icon }}</span>
						<span class="text-xs font-semibold text-subtle">{{ r.label }}</span>
					</div>
				</div>
			</div>
		`,
	}),
};

export const SpacingInCard: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-8 flex justify-center">
				<div class="bg-elevation-surface-default rounded-xl w-72 flex flex-col" style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)">
					<div class="spacing-indicator rounded-t-xl" style="height: 20px"><span class="spacing-px">20</span><span class="spacing-label">spacing-5</span></div>
					<div class="px-5">
						<div class="w-full h-20 rounded-sm bg-neutral-200" />
					</div>
					<div class="mx-5 spacing-indicator" style="height: 8px"><span class="spacing-label">spacing-2</span></div>
					<div class="px-5">
						<span class="text-xl font-medium">Card title</span>
					</div>
					<div class="mx-5 spacing-indicator" style="height: 8px"><span class="spacing-label">spacing-2</span></div>
					<div class="px-5">
						<p class="text-sm text-subtle">Card description text goes here.</p>
					</div>
					<div class="mx-5 spacing-indicator" style="height: 8px"><span class="spacing-px">8</span></div>
					<div class="px-5 flex gap-2">
						<div class="rounded-md px-4 py-1.5 text-sm font-medium text-inverse bg-brand-bolder-default">Action</div>
						<div class="rounded-md px-4 py-1.5 text-sm font-medium border border-default">Cancel</div>
					</div>
					<div class="spacing-indicator rounded-b-xl" style="height: 20px"><span class="spacing-px">20</span></div>
				</div>
			</div>
		`,
	}),
};

export const SpacingInButton: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-8 pb-12 flex justify-center items-center">
				<div class="flex items-center">
					<div class="rounded-md px-4 py-1.5 text-sm font-medium text-inverse bg-brand-bolder-default">Primary</div>
					<div class="spacing-indicator" style="width: 8px; height: 36px"><span class="spacing-label-bottom">spacing-2</span></div>
					<div class="rounded-md px-4 py-1.5 text-sm font-medium border border-default">Secondary</div>
				</div>
			</div>
		`,
	}),
};

export const SpacingInForm: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-8 flex justify-center">
				<div class="bg-elevation-surface-overlay-default rounded-lg border border-default w-72 flex flex-col" style="box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)">
					<div class="spacing-indicator rounded-t-lg" style="height: 16px"><span class="spacing-px">16</span><span class="spacing-label">spacing-4</span></div>
					<div class="px-4 flex flex-col">
						<span class="text-sm font-medium">Full name</span>
						<div class="spacing-indicator" style="height: 8px"><span class="spacing-label">spacing-2</span></div>
						<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-3 flex items-center">
							<span class="text-sm text-subtlest">Enter your name</span>
						</div>
						<div class="spacing-indicator" style="height: 16px"><span class="spacing-px">16</span><span class="spacing-label">spacing-4</span></div>
						<span class="text-sm font-medium">Email</span>
						<div class="spacing-indicator" style="height: 8px"><span class="spacing-label">spacing-2</span></div>
						<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-3 flex items-center">
							<span class="text-sm text-subtlest">Enter your email</span>
						</div>
					</div>
					<div class="spacing-indicator" style="height: 16px"><span class="spacing-px">16</span></div>
					<div class="px-4 flex gap-2 justify-end">
						<div class="rounded-md px-4 py-1.5 text-sm font-medium border border-default">Cancel</div>
						<div class="rounded-md px-4 py-1.5 text-sm font-medium text-inverse bg-brand-bolder-default">Submit</div>
					</div>
					<div class="spacing-indicator rounded-b-lg" style="height: 16px"><span class="spacing-px">16</span></div>
				</div>
			</div>
		`,
	}),
};

export const TokenClasses: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-4 border-b border-default pb-2">
					<span class="body-md font-semibold w-32 shrink-0">Figma token</span>
					<span class="body-md font-semibold w-12 shrink-0 text-right">Pixels</span>
					<span class="body-md font-semibold flex-1 pl-4">Tailwind class (click to copy)</span>
				</div>
				<div v-for="row in rows" :key="row.token" class="flex items-center gap-4 border-b border-default py-2">
					<span class="body-md w-32 shrink-0 text-subtlest">{{ row.token }}</span>
					<span class="body-md text-subtlest w-12 shrink-0 text-right">{{ row.px }}</span>
					<div class="flex gap-1.5 pl-4">
						<code v-for="cls in row.classes" :key="cls" class="${PILL}" :data-tw="cls">{{ cls }}</code>
					</div>
				</div>
			</div>
		`,
		setup() {
			const rows = [
				{ token: 'spacing-2', px: '8px', classes: ['p-2', 'gap-2', 'm-2'] },
				{ token: 'spacing-4', px: '16px', classes: ['p-4', 'gap-4', 'm-4'] },
				{ token: 'spacing-6', px: '24px', classes: ['p-6', 'gap-6', 'm-6'] },
			];
			return { rows };
		},
	}),
};

export const TailwindMapping: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-4 border-b border-default pb-2">
					<span class="body-md font-semibold w-28 shrink-0">Token</span>
					<span class="body-md font-semibold w-12 shrink-0 text-right">Pixels</span>
					<span class="body-md font-semibold w-36 shrink-0 pl-4">Token class</span>
					<span class="body-md font-semibold flex-1">Tailwind class</span>
				</div>
				<div v-for="row in rows" :key="row.token" class="flex items-center gap-4 border-b border-default py-2">
					<span class="body-md w-28 shrink-0 text-subtlest">{{ row.token }}</span>
					<span class="body-md text-subtlest w-12 shrink-0 text-right">{{ row.px }}</span>
					<div class="w-36 shrink-0 pl-4">
						<code class="${PILL}" :data-tw="row.tokenCls">{{ row.tokenCls }}</code>
					</div>
					<div>
						<code class="${PILL}" :data-tw="row.tw">{{ row.tw }}</code>
					</div>
				</div>
			</div>
		`,
		setup() {
			const rows = [
				{ token: 'spacing-½', px: '2px', tokenCls: 'p-0.5', tw: 'p-0.5' },
				{ token: 'spacing-1', px: '4px', tokenCls: 'p-1', tw: 'p-1' },
				{ token: 'spacing-1½', px: '6px', tokenCls: 'p-1.5', tw: 'p-1.5' },
				{ token: 'spacing-2', px: '8px', tokenCls: 'p-2', tw: 'p-2' },
				{ token: 'spacing-3', px: '12px', tokenCls: 'p-3', tw: 'p-3' },
				{ token: 'spacing-4', px: '16px', tokenCls: 'p-4', tw: 'p-4' },
				{ token: 'spacing-5', px: '20px', tokenCls: 'p-5', tw: 'p-5' },
				{ token: 'spacing-6', px: '24px', tokenCls: 'p-6', tw: 'p-6' },
				{ token: 'spacing-8', px: '32px', tokenCls: 'p-8', tw: 'p-8' },
				{ token: 'spacing-10', px: '40px', tokenCls: 'p-10', tw: 'p-10' },
				{ token: 'spacing-12', px: '48px', tokenCls: 'p-12', tw: 'p-12' },
				{ token: 'spacing-16', px: '64px', tokenCls: 'p-16', tw: 'p-16' },
				{ token: 'spacing-20', px: '80px', tokenCls: 'p-20', tw: 'p-20' },
			];
			return { rows };
		},
	}),
};

export const DoSpacing: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex flex-col w-52 px-4">
				<span class="text-sm font-medium">Label</span>
				<div class="spacing-indicator" style="height: 6px"><span class="spacing-label">spacing-1½</span></div>
				<div class="h-8 rounded-md border border-default bg-elevation-surface-default" />
				<div class="spacing-indicator" style="height: 16px"><span class="spacing-px">16</span><span class="spacing-label">spacing-4</span></div>
				<span class="text-sm font-medium">Label</span>
				<div class="spacing-indicator" style="height: 6px"></div>
				<div class="h-8 rounded-md border border-default bg-elevation-surface-default" />
			</div>`,
			'Use consistent spacing — tighter within groups, wider between.',
			`<div class="flex flex-col w-52 px-4">
				<span class="text-sm font-medium">Label</span>
				<div class="spacing-indicator spacing-indicator-danger" style="height: 2px"><span class="spacing-label">2px?</span></div>
				<div class="h-8 rounded-md border border-default bg-elevation-surface-default" />
				<div class="spacing-indicator spacing-indicator-danger" style="height: 32px"><span class="spacing-px">32</span><span class="spacing-label">32px?</span></div>
				<span class="text-sm font-medium">Label</span>
				<div class="spacing-indicator spacing-indicator-danger" style="height: 4px"></div>
				<div class="h-8 rounded-md border border-default bg-elevation-surface-default" />
			</div>`,
			"Don't use inconsistent spacing between similar elements."
		),
	}),
};

export const DoTokens: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex flex-col gap-2 w-48 px-4 items-start">
				<code class="text-xs bg-elevation-surface-default border border-brand rounded-full px-2 py-0.5 text-brand-default">p-4</code>
				<code class="text-xs bg-elevation-surface-default border border-brand rounded-full px-2 py-0.5 text-brand-default">gap-2</code>
				<code class="text-xs bg-elevation-surface-default border border-brand rounded-full px-2 py-0.5 text-brand-default">mt-6</code>
			</div>`,
			'Use spacing tokens for all padding, margin, and gap values.',
			`<div class="flex flex-col gap-2 w-48 px-4 items-start">
				<code class="text-xs bg-elevation-surface-default border border-danger rounded-full px-2 py-0.5 text-danger">p-[13px]</code>
				<code class="text-xs bg-elevation-surface-default border border-danger rounded-full px-2 py-0.5 text-danger">gap-[7px]</code>
				<code class="text-xs bg-elevation-surface-default border border-danger rounded-full px-2 py-0.5 text-danger">mt-[30px]</code>
			</div>`,
			"Don't use arbitrary pixel values — they break the rhythm of the 8px grid."
		),
	}),
};
