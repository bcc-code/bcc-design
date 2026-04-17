import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { doDont, PILL, remToPx } from './helpers';
import { resolveTokenValue } from './tokenResolver';

/** Resolve a heading/body composite token into its font-size and line-height px values. */
function resolveTypoToken(fontSizeToken: string, lineHeightToken: string) {
	return {
		size: remToPx(resolveTokenValue(fontSizeToken)),
		lh: resolveTokenValue(lineHeightToken), // line-heights are already in px
	};
}

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
				{ token: 'heading.5xl', tw: 'heading-5xl', ...resolveTypoToken('font-size.5xl', 'line-height.7xl') },
				{ token: 'heading.4xl', tw: 'heading-4xl', ...resolveTypoToken('font-size.4xl', 'line-height.6xl') },
				{ token: 'heading.3xl', tw: 'heading-3xl', ...resolveTypoToken('font-size.3xl', 'line-height.5xl') },
				{ token: 'heading.2xl', tw: 'heading-2xl', ...resolveTypoToken('font-size.2xl', 'line-height.3xl') },
				{ token: 'heading.xl', tw: 'heading-xl', ...resolveTypoToken('font-size.xl', 'line-height.2xl') },
				{ token: 'heading.lg', tw: 'heading-lg', ...resolveTypoToken('font-size.lg', 'line-height.xl') },
				{ token: 'heading.md', tw: 'heading-md', ...resolveTypoToken('font-size.md', 'line-height.lg') },
				{ token: 'heading.sm', tw: 'heading-sm', ...resolveTypoToken('font-size.sm', 'line-height.md') },
				{ token: 'heading.xs', tw: 'heading-xs', ...resolveTypoToken('font-size.xs', 'line-height.sm') },
			];
			return { headings };
		},
		template: `
			<div class="flex flex-col">
				<div v-for="h in headings" :key="h.token" class="flex items-baseline gap-4 border-b border-default py-4">
					<div class="w-40 shrink-0"><code class="${PILL}" :data-token="h.token" :data-tw="h.tw">{{ h.token }}</code></div>
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
				{
					token: 'body.lg',
					tw: 'body-lg',
					...resolveTypoToken('font-size.md', 'line-height.xl'),
					usage: 'Paragraphs, long-form content',
				},
				{
					token: 'body.md',
					tw: 'body-md',
					...resolveTypoToken('font-size.sm', 'line-height.lg'),
					usage: 'Descriptions, UI labels, secondary text',
				},
				{
					token: 'body.sm',
					tw: 'body-sm',
					...resolveTypoToken('font-size.xs', 'line-height.md'),
					usage: 'Captions, metadata, helper text',
				},
			];
			return { bodies };
		},
		template: `
			<div class="flex flex-col">
				<div v-for="b in bodies" :key="b.token" class="flex items-baseline gap-4 border-b border-default py-4">
					<div class="w-28 shrink-0"><code class="${PILL}" :data-token="b.token" :data-tw="b.tw">{{ b.token }}</code></div>
					<div class="flex-1">
						<span :class="b.tw">The quick brown fox jumps over the lazy dog.</span>
						<span class="body-md text-subtlest ml-2">— {{ b.usage }}</span>
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
				{
					token: 'font.weight.regular',
					tw: 'font-regular',
					value: resolveTokenValue('font-weight.regular'),
					usage: 'Body text, descriptions',
				},
				{
					token: 'font.weight.medium',
					tw: 'font-medium',
					value: resolveTokenValue('font-weight.medium'),
					usage: 'Buttons, form labels, navigation',
				},
				{
					token: 'font.weight.semibold',
					tw: 'font-semibold',
					value: resolveTokenValue('font-weight.semibold'),
					usage: 'All headings, emphasis',
				},
				{
					token: 'font.weight.bold',
					tw: 'font-bold',
					value: resolveTokenValue('font-weight.bold'),
					usage: 'Strong emphasis, rare',
				},
			];
			return { weights };
		},
		template: `
			<div class="flex flex-col">
				<div v-for="w in weights" :key="w.token" class="flex items-center gap-4 border-b border-default py-3">
					<div class="w-44 shrink-0"><code class="${PILL}" :data-token="w.token" :data-tw="w.tw">{{ w.token }}</code></div>
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
			<div class="bg-neutral-100 rounded-lg p-8 flex gap-8 items-start justify-center">
				<div class="bg-elevation-surface-default rounded-lg border border-default p-5 w-56 flex flex-col gap-3" style="box-shadow: 0 4px 16px rgba(0,0,0,0.08)">
					<span class="text-sm font-medium">Delete project?</span>
					<p class="text-sm text-subtle">This action cannot be undone. All data will be permanently removed.</p>
					<div class="flex gap-2 justify-end mt-2">
						<div class="rounded-md border border-default bg-elevation-surface-default px-3 py-1 text-sm font-medium text-subtle">Cancel</div>
						<div class="rounded-md px-3 py-1 text-sm font-medium text-inverse bg-brand-bolder-default">Delete</div>
					</div>
				</div>
				<div class="flex flex-col gap-3 w-56">
					<div class="h-10 rounded-md border border-default bg-elevation-surface-default px-3 flex items-center">
						<span class="text-sm text-subtlest">Search members...</span>
					</div>
					<div class="flex gap-2">
						<div class="rounded-sm py-1 px-2 bg-brand-subtlest-default border border-brand">
							<span class="text-sm text-brand-default">Design</span>
						</div>
						<div class="bg-success-default border border-success rounded-sm py-1 px-2">
							<span class="text-sm text-success">Published</span>
						</div>
					</div>
					<div class="text-inverse rounded-md px-4 py-1.5 text-sm font-medium text-center bg-brand-bolder-default">Save changes</div>
				</div>
			</div>
		`,
	}),
};

export const DoTypography: Story = {
	render: () => ({
		template: doDont(
			`<div class="flex flex-col gap-2 text-left px-4">
				<span class="heading-xl">Section title</span>
				<span class="heading-lg">Subsection</span>
				<span class="body-md text-subtle">Description text.</span>
			</div>`,
			"Follow the heading hierarchy — don't skip levels.",
			`<div class="flex flex-col gap-2 text-left px-4">
				<span class="heading-2xl">Section title</span>
				<span class="heading-md">Subsection</span>
				<span class="body-md text-subtle">Description text.</span>
			</div>`,
			"Don't jump from 2xl to md — it breaks visual rhythm and accessibility."
		),
	}),
};
