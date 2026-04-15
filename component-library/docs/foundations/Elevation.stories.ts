import type { Meta, StoryObj } from '@storybook/vue3';
import { doDont } from './helpers';

const meta = {
	title: 'Foundations/Elevation/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ElevationLevels: Story = {
	render: () => ({
		template: `
			<div class="flex gap-spacing-300 items-end">
				<div class="flex-1 flex flex-col items-center gap-spacing-150">
					<div class="w-full h-24 rounded-lg flex items-center justify-center bg-elevation-surface-sunken-default">
						<span class="body-md text-subtle">Sunken</span>
					</div>
					<span class="body-md text-subtlest">Lowest</span>
				</div>
				<div class="flex-1 flex flex-col items-center gap-spacing-150">
					<div class="w-full h-28 rounded-lg flex items-center justify-center bg-elevation-surface-default border border-default">
						<span class="body-md text-subtle">Default</span>
					</div>
					<span class="body-md text-subtlest">Baseline</span>
				</div>
				<div class="flex-1 flex flex-col items-center gap-spacing-150">
					<div class="w-full h-32 rounded-lg flex items-center justify-center bg-elevation-surface-raised-default" style="box-shadow: var(--elevation-shadow-raised)">
						<span class="body-md text-subtle">Raised</span>
					</div>
					<span class="body-md text-subtlest">Lifted</span>
				</div>
				<div class="flex-1 flex flex-col items-center gap-spacing-150">
					<div class="w-full h-36 rounded-lg flex items-center justify-center bg-elevation-surface-overlay-default" style="box-shadow: var(--elevation-shadow-overlay)">
						<span class="body-md text-subtle">Overlay</span>
					</div>
					<span class="body-md text-subtlest">Highest</span>
				</div>
			</div>
		`,
	}),
};

export const SurfaceTokens: Story = {
	render: () => ({
		setup() {
			const rows = [
				{ token: 'elevation.surface.sunken', tw: 'bg-elevation-surface-sunken-default', css: 'var(--color-elevation-surface-sunken-default)', desc: 'Recessed backgrounds: sidebars, page canvases, content wells.' },
				{ token: 'elevation.surface.default', tw: 'bg-elevation-surface-default', css: 'var(--color-elevation-surface-default)', desc: 'Baseline surface for main content, containers, and forms.' },
				{ token: 'elevation.surface.raised', tw: 'bg-elevation-surface-raised-default', css: 'var(--color-elevation-surface-raised-default)', desc: 'Lifted surfaces: cards, interactive tiles. Pair with shadow.raised.' },
				{ token: 'elevation.surface.overlay', tw: 'bg-elevation-surface-overlay-default', css: 'var(--color-elevation-surface-overlay-default)', desc: 'Floating UI: modals, dialogs, dropdowns. Pair with shadow.overlay.' },
			];
			return { rows };
		},
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold w-56 shrink-0">Token name</span>
					<span class="body-md font-semibold flex-1">Suitable for</span>
					<span class="body-md font-semibold w-14 shrink-0 text-right">Preview</span>
				</div>
				<div v-for="r in rows" :key="r.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="w-56 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="r.token" :data-tw="r.tw" :data-css="r.css">{{ r.token }}</code></div>
					<span class="body-md text-subtle flex-1">{{ r.desc }}</span>
					<div class="w-14 shrink-0 flex justify-end">
						<div class="w-10 h-10 rounded-sm border border-default" :class="r.tw" />
					</div>
				</div>
			</div>
		`,
	}),
};

export const ShadowTokens: Story = {
	render: () => ({
		setup() {
			const rows = [
				{ token: 'shadow.raised', tw: 'shadow-raised', css: 'var(--elevation-shadow-raised)', desc: 'Subtle lift for cards and interactive tiles.', shadow: 'var(--elevation-shadow-raised)' },
				{ token: 'shadow.overlay', tw: 'shadow-overlay', css: 'var(--elevation-shadow-overlay)', desc: 'Prominent shadow for modals, dropdowns, and floating UI.', shadow: 'var(--elevation-shadow-overlay)' },
				{ token: 'shadow.overflow', tw: 'shadow-overflow', css: 'var(--elevation-shadow-overflow)', desc: 'Scroll indicator for content overflowing a container.', shadow: 'var(--elevation-shadow-overflow)' },
			];
			return { rows };
		},
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold w-40 shrink-0">Token name</span>
					<span class="body-md font-semibold flex-1">Suitable for</span>
					<span class="body-md font-semibold w-14 shrink-0 text-right">Preview</span>
				</div>
				<div v-for="r in rows" :key="r.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="w-40 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="r.token" :data-tw="r.tw" :data-css="r.css">{{ r.token }}</code></div>
					<span class="body-md text-subtle flex-1">{{ r.desc }}</span>
					<div class="w-14 shrink-0 flex justify-end">
						<div class="w-10 h-10 rounded-sm bg-elevation-surface-default" :style="{ boxShadow: r.shadow }" />
					</div>
				</div>
			</div>
		`,
	}),
};

export const DarkModeComparison: Story = {
	render: () => ({
		template: `
			<div class="flex gap-spacing-300">
				<div class="flex-1 flex flex-col gap-spacing-150">
					<span class="body-md font-semibold">Light mode</span>
					<div class="bg-neutral-100 rounded-lg p-spacing-300 flex flex-col gap-spacing-150">
						<div class="rounded-md p-spacing-200 flex items-center justify-center h-12" style="background: #f8f8f8">
							<span class="text-sm text-subtle">Sunken</span>
						</div>
						<div class="rounded-md p-spacing-200 flex items-center justify-center h-12 border" style="background: #ffffff; border-color: rgba(11,18,14,0.14)">
							<span class="text-sm text-subtle">Default</span>
						</div>
						<div class="rounded-md p-spacing-200 flex items-center justify-center h-12" style="background: #ffffff; box-shadow: 0 1px 1px 0 rgba(30,31,33,0.25), 0 0 1px 0 rgba(30,31,33,0.31)">
							<span class="text-sm text-subtle">Raised</span>
						</div>
						<div class="rounded-md p-spacing-200 flex items-center justify-center h-12" style="background: #ffffff; box-shadow: 0 8px 12px 0 rgba(30,31,33,0.15), 0 0 1px 0 rgba(30,31,33,0.31)">
							<span class="text-sm text-subtle">Overlay</span>
						</div>
					</div>
					<p class="body-md text-subtlest">Surfaces share the same white — shadows create the depth.</p>
				</div>
				<div class="flex-1 flex flex-col gap-spacing-150">
					<span class="body-md font-semibold">Dark mode</span>
					<div class="rounded-lg p-spacing-300 flex flex-col gap-spacing-150" style="background: #18191a">
						<div class="rounded-md p-spacing-200 flex items-center justify-center h-12" style="background: #18191a">
							<span class="text-sm" style="color: #96999e">Sunken</span>
						</div>
						<div class="rounded-md p-spacing-200 flex items-center justify-center h-12" style="background: #1f1f21; border: 1px solid rgba(227,228,242,0.12)">
							<span class="text-sm" style="color: #96999e">Default</span>
						</div>
						<div class="rounded-md p-spacing-200 flex items-center justify-center h-12" style="background: #242528; box-shadow: 0 1px 1px 0 rgba(0,0,0,0.5)">
							<span class="text-sm" style="color: #96999e">Raised</span>
						</div>
						<div class="rounded-md p-spacing-200 flex items-center justify-center h-12" style="background: #242528; box-shadow: 0 8px 12px 0 rgba(0,0,0,0.4)">
							<span class="text-sm" style="color: #96999e">Overlay</span>
						</div>
					</div>
					<p class="body-md text-subtlest">Shadows are barely visible — surface color gets progressively lighter to show depth.</p>
				</div>
			</div>
		`,
	}),
};

export const ExampleSunken: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-300 items-start justify-center">
				<div class="bg-elevation-surface-sunken-default rounded-lg p-spacing-200 w-48 flex flex-col gap-spacing-100">
					<div class="bg-elevation-surface-default rounded-md border border-default p-spacing-150 h-16" />
					<div class="bg-elevation-surface-default rounded-md border border-default p-spacing-150 h-16" />
					<div class="bg-elevation-surface-default rounded-md border border-default p-spacing-150 h-16" />
				</div>
				<div class="bg-elevation-surface-sunken-default rounded-lg p-spacing-250 w-56">
					<div class="flex flex-col gap-spacing-100">
						<div class="h-3 rounded-xs bg-neutral-300 w-3/4" />
						<div class="h-3 rounded-xs bg-neutral-300 w-full" />
						<div class="h-3 rounded-xs bg-neutral-300 w-2/3" />
					</div>
				</div>
			</div>
		`,
	}),
};

export const ExampleRaised: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-start justify-center">
				<div class="bg-elevation-surface-raised-default rounded-xl p-spacing-250 w-52 flex flex-col gap-spacing-100" style="box-shadow: var(--elevation-shadow-raised)">
					<div class="w-full h-12 rounded-sm bg-neutral-200" />
					<span class="text-sm font-medium">Card title</span>
					<div class="w-full h-3 rounded-xs bg-neutral-200" />
				</div>
				<div class="bg-elevation-surface-raised-default rounded-xl p-spacing-250 w-52 flex flex-col gap-spacing-100" style="box-shadow: var(--elevation-shadow-raised)">
					<div class="w-full h-12 rounded-sm bg-neutral-200" />
					<span class="text-sm font-medium">Another card</span>
					<div class="w-full h-3 rounded-xs bg-neutral-200" />
				</div>
			</div>
		`,
	}),
};

export const ExampleOverlay: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-start justify-center">
				<div class="bg-elevation-surface-overlay-default rounded-lg p-spacing-250 w-56 flex flex-col gap-spacing-150" style="box-shadow: var(--elevation-shadow-overlay)">
					<span class="text-sm font-medium">Confirm action</span>
					<div class="w-full h-3 rounded-xs bg-neutral-200" />
					<div class="w-3/4 h-3 rounded-xs bg-neutral-200" />
					<div class="flex gap-spacing-100 justify-end mt-spacing-100">
						<div class="rounded-md border border-default bg-elevation-surface-default px-spacing-150 py-spacing-50 text-sm font-medium text-subtle">Cancel</div>
						<div class="rounded-md px-spacing-150 py-spacing-50 text-sm font-medium text-inverse bg-brand-bolder-default">Confirm</div>
					</div>
				</div>
				<div class="bg-elevation-surface-overlay-default rounded-sm w-44 flex flex-col overflow-hidden" style="box-shadow: var(--elevation-shadow-overlay)">
					<div class="px-spacing-150 py-spacing-100 text-sm border-b border-default">Menu item</div>
					<div class="px-spacing-150 py-spacing-100 text-sm font-medium bg-brand-subtlest-default text-brand-default">Selected</div>
					<div class="px-spacing-150 py-spacing-100 text-sm">Menu item</div>
				</div>
			</div>
		`,
	}),
};

export const DoPairing: Story = {
	render: () => ({
		template: doDont(
			`<div class="bg-elevation-surface-raised-default rounded-lg p-spacing-200 w-32 h-20 flex items-center justify-center" style="box-shadow: var(--elevation-shadow-raised)">
				<span class="text-sm text-subtle">Card</span>
			</div>`,
			'Always pair raised and overlay surfaces with their shadow token.',
			`<div class="bg-elevation-surface-raised-default rounded-lg p-spacing-200 w-32 h-20 flex items-center justify-center">
				<span class="text-sm text-subtle">Card</span>
			</div>`,
			"Don't use raised or overlay surfaces without their paired shadow.",
		),
	}),
};
