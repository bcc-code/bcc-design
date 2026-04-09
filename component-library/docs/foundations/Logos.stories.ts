import type { Meta, StoryObj } from '@storybook/vue3';
import { doDont } from './helpers';

const meta = {
	title: 'Foundations/Logos/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const base = 'https://design.bcc.no/logos/';

export const BrandLogos: Story = {
	render: () => ({
		setup() {
			const logos = [
				{ name: 'Primary', file: 'bcc_logo_primary', desc: 'Default logo for most contexts.' },
				{ name: 'Secondary', file: 'bcc_logo_secondary', desc: 'Alternative layout for narrow spaces.' },
				{ name: 'Full', file: 'bcc_logo_full', desc: 'Logo with full name spelled out.' },
				{ name: 'Symbol', file: 'bcc_logo_symbol', desc: 'Standalone icon — favicons, app icons.' },
			];
			return { logos, base };
		},
		template: `
			<div class="grid grid-cols-2 gap-spacing-200">
				<a v-for="l in logos" :key="l.file" :href="base + l.file + '.svg'" target="_blank" rel="noopener noreferrer" class="rounded-lg border border-default overflow-hidden no-underline hover:border-brand transition-colors">
					<div class="flex items-center justify-between px-spacing-200 py-spacing-100 border-b border-default bg-elevation-surface-default">
						<span class="body-md text-subtle">{{ l.name }}</span>
						<span class="material-symbols-outlined text-xl text-subtle">download</span>
					</div>
					<div class="bg-neutral-100 p-spacing-400 flex items-center justify-center min-h-28">
						<img :src="base + l.file + '.svg'" :alt="l.name + ' logo'" class="max-h-16 max-w-full" />
					</div>
				</a>
			</div>
		`,
	}),
};

export const LocalChurches: Story = {
	render: () => ({
		setup() {
			const churches = [
				'bcc-bergen', 'bcc-drammen', 'bcc-eiker', 'bcc-grenland',
				'bcc-hallingdal', 'bcc-hamar', 'bcc-harstad', 'bcc-honefoss',
				'bcc-horten', 'bcc-maloy', 'bcc-molde', 'bcc-oslo-og-follo',
				'bcc-ostfold', 'bcc-sandefjord', 'bcc-sorlandet', 'bcc-stavanger',
				'bcc-stord', 'bcc-tonsberg', 'bcc-valdres',
			];
			return { churches, base };
		},
		template: `
			<div class="grid grid-cols-3 gap-spacing-150">
				<a v-for="c in churches" :key="c" :href="base + c + '_logo.svg'" target="_blank" rel="noopener noreferrer" class="rounded-lg border border-default overflow-hidden no-underline hover:border-brand transition-colors">
					<div class="flex items-center justify-between px-spacing-150 py-spacing-75 border-b border-default bg-elevation-surface-default">
						<span class="text-xs text-subtle">{{ c }}</span>
						<span class="material-symbols-outlined text-lg text-subtle">download</span>
					</div>
					<div class="bg-neutral-100 p-spacing-250 flex items-center justify-center">
						<img :src="base + c + '_logo.svg'" :alt="c" class="h-10 max-w-full" />
					</div>
				</a>
			</div>
		`,
	}),
};

export const Departments: Story = {
	render: () => ({
		setup() {
			const depts = [
				'bcc-a-team', 'bcc-connect', 'bcc-event', 'bcc-facilities',
				'bcc-fund', 'bcc-media', 'bcc-music', 'bcc-norge',
			];
			return { depts, base };
		},
		template: `
			<div class="grid grid-cols-3 gap-spacing-150">
				<a v-for="d in depts" :key="d" :href="base + d + '_logo.svg'" target="_blank" rel="noopener noreferrer" class="rounded-lg border border-default overflow-hidden no-underline hover:border-brand transition-colors">
					<div class="flex items-center justify-between px-spacing-150 py-spacing-75 border-b border-default bg-elevation-surface-default">
						<span class="text-xs text-subtle">{{ d }}</span>
						<span class="material-symbols-outlined text-lg text-subtle">download</span>
					</div>
					<div class="bg-neutral-100 p-spacing-250 flex items-center justify-center">
						<img :src="base + d + '_logo.svg'" :alt="d" class="h-10 max-w-full" />
					</div>
				</a>
			</div>
		`,
	}),
};

export const DoLogos: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex items-center justify-center px-spacing-200">
				<img src="${base}bcc_logo_primary.svg" alt="BCC logo" class="h-10" />
			</div>`,
			'Use official logo files — dark on light backgrounds, white on dark.',
			`<div class="flex items-center justify-center px-spacing-200 gap-spacing-100">
				<img src="${base}bcc_logo_symbol.svg" alt="BCC symbol" class="h-8" />
				<div class="flex flex-col">
					<span class="text-sm font-bold">BCC</span>
					<span class="text-xs text-subtle leading-tight">Component Library</span>
				</div>
			</div>`,
			"Don't compose custom logo layouts — use the official variants.",
		),
	}),
};
