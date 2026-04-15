import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { doDont } from './helpers';

const meta = {
	title: 'Foundations/Typography/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypefaceShowcase: Story = {
	render: () => ({
		template: `
			<p class="font-archivo text-5xl font-semibold leading-tight">Archivo</p>
		`,
	}),
};

export const HeadingScale: Story = {
	render: () => ({
		setup() {
			const headings = [
				{ token: 'heading.5xl', tw: 'heading-5xl', size: '56px', lh: '64px' },
				{ token: 'heading.4xl', tw: 'heading-4xl', size: '48px', lh: '56px' },
				{ token: 'heading.3xl', tw: 'heading-3xl', size: '36px', lh: '40px' },
				{ token: 'heading.2xl', tw: 'heading-2xl', size: '32px', lh: '32px' },
				{ token: 'heading.xl', tw: 'heading-xl', size: '24px', lh: '28px' },
				{ token: 'heading.lg', tw: 'heading-lg', size: '20px', lh: '24px' },
				{ token: 'heading.md', tw: 'heading-md', size: '16px', lh: '20px' },
				{ token: 'heading.sm', tw: 'heading-sm', size: '14px', lh: '16px' },
				{ token: 'heading.xs', tw: 'heading-xs', size: '12px', lh: '14px' },
			];
			return { headings };
		},
		template: `
			<div class="flex flex-col">
				<div v-for="h in headings" :key="h.token" class="flex items-baseline gap-spacing-200 border-b border-default py-spacing-200">
					<div class="w-40 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="h.token" :data-tw="h.tw">{{ h.token }}</code></div>
					<span class="flex-1" :class="h.tw">The quick brown fox</span>
					<span class="body-md text-subtlest w-24 shrink-0 text-right">{{ h.size }} / {{ h.lh }}</span>
				</div>
			</div>
		`,
	}),
};

export const BodyScale: Story = {
	render: () => ({
		setup() {
			const bodies = [
				{ token: 'body.lg', tw: 'body-lg', size: '16px', lh: '24px', usage: 'Paragraphs, long-form content' },
				{ token: 'body.md', tw: 'body-md', size: '14px', lh: '20px', usage: 'Descriptions, UI labels, secondary text' },
				{ token: 'body.sm', tw: 'body-sm', size: '12px', lh: '16px', usage: 'Captions, metadata, helper text' },
			];
			return { bodies };
		},
		template: `
			<div class="flex flex-col">
				<div v-for="b in bodies" :key="b.token" class="flex items-baseline gap-spacing-200 border-b border-default py-spacing-200">
					<div class="w-28 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="b.token" :data-tw="b.tw">{{ b.token }}</code></div>
					<div class="flex-1">
						<span :class="b.tw">The quick brown fox jumps over the lazy dog.</span>
						<span class="body-md text-subtlest ml-spacing-100">— {{ b.usage }}</span>
					</div>
					<span class="body-md text-subtlest w-24 shrink-0 text-right">{{ b.size }} / {{ b.lh }}</span>
				</div>
			</div>
		`,
	}),
};

export const WeightTokens: Story = {
	render: () => ({
		setup() {
			const weights = [
				{ token: 'font.weight.regular', tw: 'font-regular', value: '400', usage: 'Body text, descriptions' },
				{ token: 'font.weight.medium', tw: 'font-medium', value: '500', usage: 'Buttons, form labels, navigation' },
				{ token: 'font.weight.semibold', tw: 'font-semibold', value: '600', usage: 'All headings, emphasis' },
				{ token: 'font.weight.bold', tw: 'font-bold', value: '700', usage: 'Strong emphasis, rare' },
			];
			return { weights };
		},
		template: `
			<div class="flex flex-col">
				<div v-for="w in weights" :key="w.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="w-44 shrink-0"><code class="color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block" :data-token="w.token" :data-tw="w.tw">{{ w.token }}</code></div>
					<span class="text-lg flex-1" :style="{ fontWeight: w.value }">Archivo {{ w.value }}</span>
					<span class="body-md text-subtle w-56 shrink-0 text-right">{{ w.usage }}</span>
				</div>
			</div>
		`,
	}),
};

export const TypographyInComponents: Story = {
	render: () => ({
		template: `
			<div class="bg-neutral-100 rounded-lg p-spacing-400 flex gap-spacing-400 items-start justify-center">
				<div class="bg-elevation-surface-default rounded-lg border border-default p-spacing-250 w-56 flex flex-col gap-spacing-150" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<span class="text-sm font-medium">Delete project?</span>
					<p class="text-sm text-subtle">This action cannot be undone. All data will be permanently removed.</p>
					<div class="flex gap-spacing-100 justify-end mt-spacing-100">
						<div class="rounded-md border border-default bg-elevation-surface-default px-spacing-150 py-spacing-50 text-sm font-medium text-subtle">Cancel</div>
						<div class="rounded-md px-spacing-150 py-spacing-50 text-sm font-medium text-inverse bg-brand-bolder-default">Delete</div>
					</div>
				</div>
				<div class="flex flex-col gap-spacing-150 w-56">
					<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-spacing-150 flex items-center">
						<span class="text-sm text-subtlest">Search members...</span>
					</div>
					<div class="flex gap-spacing-100">
						<div class="rounded-sm py-spacing-50 px-spacing-100 bg-brand-subtlest-default border border-brand">
							<span class="text-sm text-brand-default">Design</span>
						</div>
						<div class="bg-success-default border border-success rounded-sm py-spacing-50 px-spacing-100">
							<span class="text-sm text-success">Published</span>
						</div>
					</div>
					<div class="text-inverse rounded-md px-spacing-200 py-spacing-75 text-sm font-medium text-center bg-brand-bolder-default">Save changes</div>
				</div>
			</div>
		`,
	}),
};

export const DoTypography: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex flex-col gap-spacing-100 text-left px-spacing-200">
				<span class="heading-xl">Section title</span>
				<span class="heading-lg">Subsection</span>
				<span class="body-md text-subtle">Description text.</span>
			</div>`,
			'Follow the heading hierarchy — don\'t skip levels.',
			`<div class="flex flex-col gap-spacing-100 text-left px-spacing-200">
				<span class="heading-2xl">Section title</span>
				<span class="heading-md">Subsection</span>
				<span class="body-md text-subtle">Description text.</span>
			</div>`,
			"Don't jump from 2xl to md — it breaks visual rhythm and accessibility.",
		),
	}),
};
