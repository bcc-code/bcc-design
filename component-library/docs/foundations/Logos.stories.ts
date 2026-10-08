import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, ref } from 'vue';
import { doDont } from './helpers';

const meta = {
	title: 'Foundations/Logos/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const base = 'https://design.bcc.no/logos/';

type Logo = { name: string; file: string };

const variants = [
	{ label: 'SVG · Dark green', suffix: '.svg', dark: false },
	{ label: 'SVG · White', suffix: '_white.svg', dark: true },
	...['dark-green', 'white'].flatMap(color =>
		[32, 48, 64, 72].map(size => ({
			label: `PNG · ${color === 'white' ? 'White' : 'Dark green'} · ${size}px`,
			suffix: `_${color}_${size}.png`,
			dark: color === 'white',
		}))
	),
];

/** Logo grid with a variant picker next to the heading and a copyable URL under each logo. */
function logoGrid(title: string, logos: Logo[], cols: 2 | 3) {
	return {
		setup() {
			const selected = ref(0);
			const variant = computed(() => variants[selected.value]);
			const url = (l: Logo) => base + l.file + variant.value.suffix;
			const copied = ref('');
			const copy = (value: string) =>
				navigator.clipboard
					.writeText(value)
					.then(() => {
						copied.value = value;
						setTimeout(() => {
							if (copied.value === value) copied.value = '';
						}, 1200);
					})
					.catch(() => {
						/* clipboard access denied — ignore silently */
					});
			// Files not yet deployed to design.bcc.no fall back to the repo copy served by Storybook (www/logos).
			const useLocal = (e: Event) => {
				const img = e.target as HTMLImageElement;
				const file = img.src.split('/').pop()!;
				if (img.src.startsWith(base)) img.src = './logos/' + file;
			};
			return { title, logos, cols, variants, selected, variant, url, copied, copy, useLocal };
		},
		template: `
			<div class="flex flex-col gap-4">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<h2 class="heading-xl text-default">{{ title }}</h2>
					<label class="flex items-center gap-2 body-md text-subtle">
						Type
						<select v-model="selected" class="body-md text-default bg-elevation-surface-default border border-default rounded-md px-2 py-1 cursor-pointer">
							<option v-for="(v, i) in variants" :key="v.label" :value="i">{{ v.label }}</option>
						</select>
					</label>
				</div>
				<div class="grid grid-cols-1 gap-3" :class="cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'">
					<div v-for="l in logos" :key="l.file" class="rounded-lg border border-default overflow-hidden flex flex-col">
						<a :href="url(l)" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-1.5 border-b border-default bg-elevation-surface-default no-underline hover:bg-neutral-100">
							<span class="body-md text-subtle">{{ l.name }}</span>
							<span class="material-symbols-outlined text-lg text-subtle">download</span>
						</a>
						<div class="p-5 flex items-center justify-center min-h-24 flex-1" :class="variant.dark ? 'bg-brand-bolder-default' : 'bg-neutral-100'">
							<img :src="url(l)" :alt="l.name + ' logo'" @error="useLocal" class="max-w-full" :class="variant.suffix.endsWith('.svg') ? 'h-10' : ''" />
						</div>
						<button type="button" class="flex items-center gap-2 px-3 py-1.5 border-t border-default bg-elevation-surface-default text-left cursor-pointer hover:bg-neutral-100 transition-colors" :title="'Copy ' + url(l)" @click="copy(url(l))">
							<code class="text-xs text-subtle flex-1 min-w-0 truncate">{{ url(l) }}</code>
							<span class="material-symbols-outlined text-base text-subtle">{{ copied === url(l) ? 'check' : 'content_copy' }}</span>
						</button>
					</div>
				</div>
			</div>
		`,
	};
}

const slugLogos = (slugs: string[]): Logo[] => slugs.map(s => ({ name: s, file: s + '_logo' }));

export const BrandLogos: Story = {
	render: () =>
		logoGrid(
			'BCC brand',
			[
				{ name: 'Primary', file: 'bcc_logo_primary' },
				{ name: 'Secondary', file: 'bcc_logo_secondary' },
				{ name: 'Full', file: 'bcc_logo_full' },
				{ name: 'Symbol', file: 'bcc_logo_symbol' },
			],
			2
		),
};

export const LocalChurches: Story = {
	render: () =>
		logoGrid(
			'Local churches',
			slugLogos([
				'bcc-bergen',
				'bcc-drammen',
				'bcc-eiker',
				'bcc-grenland',
				'bcc-hallingdal',
				'bcc-hamar',
				'bcc-harstad',
				'bcc-honefoss',
				'bcc-horten',
				'bcc-maloy',
				'bcc-molde',
				'bcc-oslo-og-follo',
				'bcc-ostfold',
				'bcc-sandefjord',
				'bcc-sorlandet',
				'bcc-stavanger',
				'bcc-stord',
				'bcc-tonsberg',
				'bcc-valdres',
			]),
			3
		),
};

export const Departments: Story = {
	render: () =>
		logoGrid(
			'Departments and national',
			slugLogos([
				'bcc-a-team',
				'bcc-connect',
				'bcc-event',
				'bcc-facilities',
				'bcc-fund',
				'bcc-media',
				'bcc-music',
				'bcc-norge',
			]),
			3
		),
};

export const DoLogos: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex items-center justify-center px-4">
				<img src="${base}bcc_logo_primary.svg" alt="BCC logo" class="h-10" />
			</div>`,
			'Use official logo files — dark on light backgrounds, white on dark.',
			`<div class="flex items-center justify-center px-4 gap-2">
				<img src="${base}bcc_logo_symbol.svg" alt="BCC symbol" class="h-8" />
				<div class="flex flex-col">
					<span class="text-sm font-bold">BCC</span>
					<span class="text-xs text-subtle leading-tight">Component Library</span>
				</div>
			</div>`,
			"Don't compose custom logo layouts — use the official variants."
		),
	}),
};
