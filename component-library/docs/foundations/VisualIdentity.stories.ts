import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { doDont } from './helpers';

const meta = {
	title: 'Foundations/Visual Identity/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const base = 'https://design.bcc.no/logos/';

export const ProportionsAndClearSpace: Story = {
	render: () => ({
		template: `
			<div class="grid grid-cols-2 gap-4">
				<div class="rounded-lg border border-default overflow-hidden flex flex-col">
					<div class="p-6 flex items-center justify-center flex-1 bg-brand-bolder-default">
						<img src="/dm-proportions.png" alt="Logo form and proportions" class="w-full lightbox-trigger" onclick="openLightbox(this.src)" />
					</div>
					<div class="px-3 py-2 border-t border-default">
						<span class="body-md text-subtle">Proportions</span>
					</div>
				</div>
				<div class="rounded-lg border border-default overflow-hidden flex flex-col">
					<div class="p-6 flex items-center justify-center flex-1 bg-brand-bolder-default">
						<img src="/dm-clearspace.png" alt="Clear space rules" class="w-full lightbox-trigger" onclick="openLightbox(this.src)" />
					</div>
					<div class="px-3 py-2 border-t border-default">
						<span class="body-md text-subtle">Clear space (frisone)</span>
					</div>
				</div>
			</div>
		`,
	}),
};

export const HierarchyPrinciples: Story = {
	render: () => ({
		template: `
			<div class="grid grid-cols-2 gap-4">
				<div class="rounded-lg border border-default overflow-hidden flex flex-col">
					<div class="p-6 flex items-center justify-center flex-1 bg-brand-bolder-default">
						<img src="/dm-departments.png" alt="Department logo principles" class="w-full lightbox-trigger" onclick="openLightbox(this.src)" />
					</div>
					<div class="px-3 py-2 border-t border-default">
						<span class="body-md text-subtle">Department spacing</span>
					</div>
				</div>
				<div class="rounded-lg border border-default overflow-hidden flex flex-col">
					<div class="p-6 flex items-center justify-center flex-1 bg-brand-bolder-default">
						<img src="/dm-national.png" alt="National entity logo principles" class="w-full lightbox-trigger" onclick="openLightbox(this.src)" />
					</div>
					<div class="px-3 py-2 border-t border-default">
						<span class="body-md text-subtle">National entity spacing</span>
					</div>
				</div>
			</div>
		`,
	}),
};

export const LogoHierarchy: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-4">
				<div v-for="level in hierarchy" :key="level.label" class="flex items-center gap-6 rounded-lg border border-default overflow-hidden">
					<div class="bg-neutral-100 p-6 flex items-center justify-center w-56 shrink-0 self-stretch border-r border-default">
						<img :src="base + level.file + '.svg'" :alt="level.label" class="max-h-12 max-w-full" />
					</div>
					<div class="flex flex-col gap-0.5 py-4 pr-4">
						<span class="body-md font-semibold text-default">{{ level.label }}</span>
						<span class="body-md text-subtle">{{ level.desc }}</span>
						<span class="body-md text-subtlest">{{ level.rule }}</span>
					</div>
				</div>
			</div>
		`,
		setup() {
			const hierarchy = [
				{
					label: 'Departments (Fellestiltak)',
					file: 'bcc-media_logo',
					desc: 'Name extends directly after "BCC" — e.g., BCC Media, BCC Event.',
					rule: 'Must always use the full name logo. Cannot use primary/secondary logo alone.',
				},
				{
					label: 'National entities (Nasjonale ledd)',
					file: 'bcc-norge_logo',
					desc: 'Country name in UPPERCASE underneath the primary logo.',
					rule: 'Cannot use the logo without the country name underneath.',
				},
				{
					label: 'Local churches (Lokalmenigheter)',
					file: 'bcc-bergen_logo',
					desc: 'Place name in Mixed Case underneath — lowercase indicates a local level.',
					rule: 'Cannot use the logo without the place name underneath.',
				},
			];
			return { hierarchy, base };
		},
	}),
};

export const SymbolUsage: Story = {
	render: () => ({
		template: `
			<div class="rounded-lg border border-default overflow-hidden">
				<div class="bg-neutral-100 p-8 flex items-center justify-center">
					<img src="/dm-symbol.png" alt="Symbol (with circle) and figure (without circle) — standalone graphic elements" class="max-w-md w-full lightbox-trigger" onclick="openLightbox(this.src)" />
				</div>
			</div>
		`,
	}),
};

export const FontArchivo: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-6">
				<h3 class="heading-lg text-brand-default">Archivo</h3>
				<hr class="border-neutral-900" />
				<p class="text-3xl font-bold text-brand-default leading-snug">abcdefghijklmnopqrstuvwxyzæøå<br/>ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ<br/>1234567890</p>
				<div class="flex gap-12 mt-4">
					<div class="flex flex-col gap-1">
						<span class="body-md text-subtlest border-b border-neutral-900 pb-1">Available weights</span>
						<span class="font-light">Light</span>
						<span class="font-normal">Regular</span>
						<span class="font-medium">Medium</span>
						<span class="font-bold">Bold</span>
						<span class="font-extrabold">Extra Bold</span>
						<span class="font-black italic">Black</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="body-md text-subtlest border-b border-neutral-900 pb-1">&nbsp;</span>
						<span class="font-light italic">Light Italic</span>
						<span class="font-normal italic">Regular Italic</span>
						<span class="font-medium italic">Medium Italic</span>
						<span class="font-bold italic">Bold Italic</span>
						<span class="font-extrabold italic">Extra Bold Italic</span>
						<span class="font-black italic">Black Italic</span>
					</div>
				</div>
			</div>
		`,
	}),
};

export const FontIBMPlexSerif: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-6 font-serif">
				<h3 class="heading-lg text-brand-default">IBM Plex Serif</h3>
				<hr class="border-neutral-900" />
				<p class="text-3xl font-bold text-brand-default leading-snug">abcdefghijklmnopqrstuvwxyzæøå<br/>ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ<br/>1234567890</p>
				<div class="flex flex-col gap-1 mt-4">
					<span class="body-md text-subtlest border-b border-neutral-900 pb-1">Available weights</span>
					<span class="font-light text-brand-default">Light</span>
					<span class="font-normal text-brand-default">Regular</span>
					<span class="font-medium text-brand-default">Medium</span>
					<span class="font-semibold text-brand-default">Semibold</span>
					<span class="font-bold text-brand-default">Bold</span>
				</div>
			</div>
		`,
	}),
};

export const ProfileColors: Story = {
	render: () => ({
		template: `
			<div class="flex gap-12">
				<div class="flex flex-col gap-6 flex-1">
					<h3 class="body-md font-semibold text-default border-b border-default pb-1.5">Colors</h3>
					<div v-for="c in colors" :key="c.name" class="flex items-center gap-4">
						<div class="w-16 h-16 rounded-full shrink-0 color-swatch" :style="{ background: c.hex }" :data-hex="c.hex"></div>
						<div class="flex flex-col">
							<span class="body-md font-semibold text-brand-default">{{ c.label }}</span>
							<code class="text-xs text-subtle">{{ c.hex }}</code>
						</div>
					</div>
				</div>
				<div class="flex flex-col flex-1">
					<h3 class="body-md font-semibold text-default border-b border-default pb-1.5 mb-6">Tints</h3>
					<div class="flex flex-col flex-1">
						<div v-for="(t, i) in tints" :key="t" class="flex items-end gap-2 flex-1 border-b border-neutral-900">
							<span class="text-sm font-semibold w-10 shrink-0 pb-1 text-brand-default">{{ t }}%</span>
							<div class="flex gap-1.5 flex-1 self-stretch">
								<div v-for="c in colors" :key="c.name" class="flex-1" :class="t >= c.minTint ? 'color-swatch cursor-pointer' : ''" :style="t >= c.minTint ? { background: c.hex, opacity: t / 100 } : {}" :data-hex="t >= c.minTint ? c.hex : undefined"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`,
		setup() {
			const colors = [
				{ name: 'dark-green', label: 'Dark green: Pantone 3302 C', hex: '#004e48', minTint: 60 },
				{ name: 'light-green', label: 'Light green: Pantone 7485 C', hex: '#dbe1c0', minTint: 60 },
				{ name: 'black', label: 'Black: Pantone Neutral Black', hex: '#272727', minTint: 80 },
				{ name: 'warm-grey', label: 'Warm grey: Pantone Warm Grey 1 C', hex: '#d3cfc9', minTint: 10 },
			];
			const tints = [100, 80, 60, 40, 20, 10];
			return { colors, tints };
		},
	}),
};

export const SupportColors: Story = {
	render: () => ({
		template: `
			<div class="flex gap-12">
				<div class="flex flex-col gap-6 flex-1">
					<div v-for="c in colors" :key="c.name" class="flex items-center gap-4">
						<div class="w-16 h-16 rounded-full shrink-0 color-swatch" :style="{ background: c.hex }" :data-hex="c.hex"></div>
						<div class="flex flex-col">
							<span class="body-md font-semibold text-brand-default">{{ c.label }}</span>
							<code class="text-xs text-subtle">{{ c.hex }}</code>
						</div>
					</div>
				</div>
				<div class="flex flex-col flex-1">
					<div class="flex flex-col flex-1">
						<div v-for="(t, i) in tints" :key="t" class="flex items-end gap-2 flex-1 border-b border-neutral-900">
							<span class="text-sm font-semibold w-10 shrink-0 pb-1 text-brand-default">{{ t }}%</span>
							<div class="flex gap-1.5 flex-1 self-stretch">
								<div v-for="c in colors" :key="c.name" class="flex-1 color-swatch cursor-pointer" :style="{ background: c.hex, opacity: t / 100 }" :data-hex="c.hex"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`,
		setup() {
			const colors = [
				{ name: 'sand', label: 'Sand', hex: '#ceba97' },
				{ name: 'rust', label: 'Rust', hex: '#bd8167' },
				{ name: 'glacier', label: 'Glacier', hex: '#98afb0' },
			];
			const tints = [100, 80, 60, 40];
			return { colors, tints };
		},
	}),
};

export const DoProportions: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex items-center justify-center px-4 min-h-24">
				<img src="${base}bcc_logo_primary.svg" alt="BCC logo" class="h-10" />
			</div>`,
			'Keep the logo at its original proportions — size, spacing, and color are fixed.',
			`<div class="flex items-center justify-center px-4 min-h-24">
				<img src="${base}bcc_logo_primary.svg" alt="BCC logo stretched" class="h-10 scale-x-[1.6] -skew-x-[5deg]" />
			</div>`,
			"Don't stretch, compress, rotate, or change the proportions of the logo."
		),
	}),
};

export const DoSymbol: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex items-center justify-center px-4 min-h-24">
				<img src="${base}bcc_logo_symbol.svg" alt="BCC symbol" class="h-12" />
			</div>`,
			'Use the symbol standalone — for emblems, avatars, and graphic accents.',
			`<div class="flex items-center justify-center px-4 gap-2 min-h-24">
				<img src="${base}bcc_logo_symbol.svg" alt="BCC symbol" class="h-10" />
				<span class="text-lg font-bold text-brand-default">My App</span>
			</div>`,
			"Don't add text next to the symbol to create a custom logo."
		),
	}),
};

export const DoClearSpace: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex items-center justify-center px-8 min-h-24">
				<img src="${base}bcc_logo_primary.svg" alt="BCC logo" class="h-8" />
			</div>`,
			'Give the logo enough breathing room — at minimum the width of the B.',
			`<div class="flex items-center justify-center px-2 min-h-24">
				<div class="flex items-center gap-1.5">
					<img src="${base}bcc_logo_primary.svg" alt="BCC logo" class="h-8" />
					<div class="w-px h-6 bg-neutral-300"></div>
					<span class="text-sm font-medium text-subtle">Brunstad Christian Church</span>
				</div>
			</div>`,
			"Don't crowd the logo — other elements must stay outside the clear space."
		),
	}),
};
