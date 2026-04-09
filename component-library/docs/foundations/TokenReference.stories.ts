import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	title: 'Foundations/Token Reference/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const colorTemplate = `
	<div class="flex flex-col">
		<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
			<span class="body-md font-semibold flex-1">Token and description</span>
			<span class="body-md font-semibold w-32 text-center ml-auto">Light value</span>
			<span class="body-md font-semibold w-32 text-center">Dark value</span>
		</div>
		<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
			<div class="flex flex-col gap-spacing-50 flex-1">
				<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="t.twClass" >{{ t.token }}</code>
				<span v-if="t.desc" class="body-md text-subtle">{{ t.desc }}</span>
			</div>
			<div class="w-32 ml-auto shrink-0">
				<div class="rounded-lg border border-default p-spacing-100 flex flex-col items-center gap-spacing-75 color-swatch color-swatch-no-hover cursor-pointer" :data-hex="t.lightHex" >
					<div class="w-full h-10 rounded" :style="{ background: t.lightHex }"></div>
					<code class="text-xs text-subtlest font-semibold">{{ t.lightPrim }}</code>
				</div>
			</div>
			<div class="w-32 shrink-0">
				<div class="rounded-lg border border-neutral-700 bg-neutral-900 p-spacing-100 flex flex-col items-center gap-spacing-75 color-swatch color-swatch-no-hover cursor-pointer" :data-hex="t.darkHex" >
					<div class="w-full h-10 rounded" :style="{ background: t.darkHex }"></div>
					<code class="text-xs text-inverse font-semibold">{{ t.darkPrim }}</code>
				</div>
			</div>
		</div>
	</div>
`;

const borderColorTemplate = `
	<div class="flex flex-col">
		<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
			<span class="body-md font-semibold flex-1">Token and description</span>
			<span class="body-md font-semibold w-32 text-center ml-auto">Light value</span>
			<span class="body-md font-semibold w-32 text-center">Dark value</span>
		</div>
		<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
			<div class="flex flex-col gap-spacing-50 flex-1">
				<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="t.twClass" >{{ t.token }}</code>
				<span v-if="t.desc" class="body-md text-subtle">{{ t.desc }}</span>
			</div>
			<div class="w-32 ml-auto shrink-0">
				<div class="rounded-lg border border-default p-spacing-100 flex flex-col items-center gap-spacing-75 color-swatch color-swatch-no-hover cursor-pointer" :data-hex="t.lightHex" >
					<div class="w-full h-10 rounded border-2 bg-elevation-surface-default" :style="{ borderColor: t.lightHex }"></div>
					<code class="text-xs text-subtlest font-semibold">{{ t.lightPrim }}</code>
				</div>
			</div>
			<div class="w-32 shrink-0">
				<div class="rounded-lg border border-neutral-700 bg-neutral-900 p-spacing-100 flex flex-col items-center gap-spacing-75 color-swatch color-swatch-no-hover cursor-pointer" :data-hex="t.darkHex" >
					<div class="w-full h-10 rounded border-2 bg-neutral-800" :style="{ borderColor: t.darkHex }"></div>
					<code class="text-xs text-inverse font-semibold">{{ t.darkPrim }}</code>
				</div>
			</div>
		</div>
	</div>
`;

function c(token: string, lightHex: string, darkHex: string, desc?: string, lightPrim?: string, darkPrim?: string) {
	const cssVar = '--color-' + token.replace('color.', '').replace(/\./g, '-');
	const twClass = token.replace('color.', '').replace(/\./g, '-');
	return { token, lightHex, darkHex, desc, lightPrim: lightPrim || lightHex, darkPrim: darkPrim || darkHex, cssVar, twClass };
}


// ── Color: Text ──────────────────────────────────────────

export const ColorText: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.text.default', '#292a2e', '#e2e3e4', 'Primary text — body copy, sentence case headers, and buttons.', 'Neutral1000', 'DarkNeutral1100'),
				c('color.text.subtle', '#505258', '#a9abaf', 'Secondary text — descriptions, labels.', 'Neutral800', 'DarkNeutral800'),
				c('color.text.subtlest', '#6b6e76', '#96999e', 'Tertiary text — captions, placeholders.', 'Neutral700', 'DarkNeutral700'),
				c('color.text.disabled', 'rgba(8,15,33,0.29)', 'rgba(229,233,246,0.25)', 'Disabled state text.', 'Alpha 29%', 'Alpha 25%'),
				c('color.text.inverse', '#ffffff', '#1f1f21', 'Text on inverted backgrounds.', 'Neutral0', 'DarkNeutral100'),
				c('color.text.selected', '#014d49', '#51b9cf', 'Selected element text.', 'Bcc800', 'Teal400'),
			],
		}),
	}),
};

export const ColorTextStatus: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.text.success', '#094c3b', '#83d895', undefined, 'Green800', 'Green300'),
				c('color.text.information', '#273c8f', '#a6cdfd', undefined, 'Blue800', 'Blue300'),
				c('color.text.danger', '#811436', '#fab6ad', undefined, 'Red800', 'Red300'),
				c('color.text.warning.default', '#653805', '#e9c348', undefined, 'Yellow800', 'Yellow300'),
				c('color.text.brand.default', '#014d49', '#51b9cf', undefined, 'Bcc800', 'Teal400'),
				c('color.text.brand.bold', '#0b3633', '#a0cec8', undefined, 'Bcc900', 'Bcc300'),
			],
		}),
	}),
};

export const ColorLink: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.link.default', '#273c8f', '#608ef6', 'Default link color.', 'Blue800', 'Blue500'),
				c('color.link.pressed', '#212c64', '#446add', 'Active/pressed link.', 'Blue900', 'Blue600'),
				c('color.link.visited.default', '#493481', '#a78bfa', 'Visited link.', 'Purple800', 'Violet400'),
			],
		}),
	}),
};

// ── Color: Icon ──────────────────────────────────────────

export const ColorIcon: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.icon.default', '#1e1f21', '#cecfd2', 'Default icon color.', 'Neutral1100', 'DarkNeutral1000'),
				c('color.icon.subtle', '#505258', '#a9abaf', 'Secondary icon.', 'Neutral800', 'DarkNeutral800'),
				c('color.icon.subtlest', '#6b6e76', '#96999e', 'Tertiary icon.', 'Neutral700', 'DarkNeutral700'),
				c('color.icon.disabled', 'rgba(8,15,33,0.29)', 'rgba(229,233,246,0.25)', undefined, 'Alpha 29%', 'Alpha 25%'),
				c('color.icon.inverse', '#ffffff', '#1f1f21', undefined, 'Neutral0', 'DarkNeutral100'),
				c('color.icon.selected', '#0c625c', '#51b9cf', undefined, 'Bcc700', 'Teal400'),
				c('color.icon.success', '#09825d', '#1ca673', undefined, 'Green600', 'Green500'),
				c('color.icon.information', '#446add', '#608ef6', undefined, 'Blue600', 'Blue500'),
				c('color.icon.danger', '#ca414e', '#ed6362', undefined, 'Red600', 'Red500'),
				c('color.icon.warning.default', '#b55919', '#e9c348', undefined, 'Orange600', 'Yellow300'),
			],
		}),
	}),
};

// ── Color: Border ────────────────────────────────────────

export const ColorBorder: Story = {
	render: () => ({
		template: borderColorTemplate,
		setup: () => ({
			tokens: [
				c('color.border.default', 'rgba(11,18,14,0.14)', 'rgba(227,228,242,0.12)', 'Standard borders and dividers.', 'Alpha 14%', 'Alpha 12%'),
				c('color.border.bold', '#7d818a', '#7e8188', 'High-contrast borders.', 'Neutral600', 'DarkNeutral600'),
				c('color.border.disabled', 'rgba(5,21,36,0.06)', 'rgba(206,206,217,0.07)', undefined, 'Alpha 6%', 'Alpha 7%'),
				c('color.border.selected', '#0c625c', '#51b9cf', undefined, 'Bcc700', 'Teal400'),
				c('color.border.focused', '#1a9eb7', '#a0cec8', 'Focus ring on interactive elements.', 'Teal500', 'Bcc300'),
				c('color.border.input', '#8c8f97', '#63666b', 'Form input borders at rest.', 'Neutral500', 'DarkNeutral500'),
				c('color.border.brand', '#0c625c', '#51b9cf', undefined, 'Bcc700', 'Teal400'),
				c('color.border.success', '#09825d', '#1ca673', undefined, 'Green600', 'Green500'),
				c('color.border.information', '#446add', '#608ef6', undefined, 'Blue600', 'Blue500'),
				c('color.border.danger', '#ca414e', '#ed6362', undefined, 'Red600', 'Red500'),
				c('color.border.warning', '#b55919', '#bc870d', undefined, 'Orange600', 'Yellow400'),
			],
		}),
	}),
};

// ── Color: Background ────────────────────────────────────

export const ColorBgElevation: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.elevation.surface.default', '#ffffff', '#1f1f21', 'Primary background.', 'Neutral0', 'DarkNeutral100'),
				c('color.elevation.surface.hovered', '#f0f1f2', '#242528', undefined, 'Neutral200', 'DarkNeutral200'),
				c('color.elevation.surface.pressed', '#dddee1', '#303134', undefined, 'Neutral300', 'DarkNeutral300'),
				c('color.elevation.surface.sunken', '#f8f8f8', '#18191a', 'Recessed areas — page background behind cards.', 'Neutral100', 'DarkNeutral0'),
				c('color.elevation.surface.raised', '#ffffff', '#242528', 'Raised cards and containers.', 'Neutral0', 'DarkNeutral200'),
				c('color.elevation.surface.overlay', '#ffffff', '#242528', 'Modals, dialogs, dropdown menus.', 'Neutral0', 'DarkNeutral200'),
			],
		}),
	}),
};

export const ColorBgBrand: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.brand.subtlest', '#f0fcfa', '#012320', 'Subtle brand tint for backgrounds.', 'Bcc100', 'Bcc1000'),
				c('color.background.brand.subtler', '#d2eeeb', '#0b3633', undefined, 'Bcc200', 'Bcc900'),
				c('color.background.brand.subtle', '#51b9cf', '#014d49', undefined, 'Teal400', 'Bcc800'),
				c('color.background.brand.bolder', '#0c625c', '#51b9cf', 'Primary buttons, strong brand emphasis.', 'Bcc700', 'Teal400'),
				c('color.background.brand.boldest', '#012320', '#a0cec8', undefined, 'Bcc1000', 'Bcc300'),
			],
		}),
	}),
};

export const ColorBgStatus: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.success.default', '#efffed', '#012418', undefined, 'Green100', 'Green1000'),
				c('color.background.success.bolder', '#0c6241', '#1ca673', undefined, 'Green700', 'Green500'),
				c('color.background.information.default', '#f6fbff', '#0d1a3f', undefined, 'Blue100', 'Blue1000'),
				c('color.background.information.bolder', '#274eb5', '#608ef6', undefined, 'Blue700', 'Blue500'),
				c('color.background.danger.default', '#fff8f3', '#2a0810', undefined, 'Red100', 'Red1000'),
				c('color.background.danger.bolder', '#a42237', '#ed6362', undefined, 'Red700', 'Red500'),
				c('color.background.warning.default', '#fdf8e9', '#261b00', undefined, 'Yellow100', 'Yellow1000'),
				c('color.background.warning.bolder', '#e9c348', '#e9c348', undefined, 'Yellow300', 'Yellow300'),
			],
		}),
	}),
};

export const ColorBgSelected: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.selected.default', '#f0fcfa', '#012320', 'Selected item background.', 'Bcc100', 'Bcc1000'),
				c('color.background.selected.hovered', '#d2eeeb', '#0b3633', undefined, 'Bcc200', 'Bcc900'),
				c('color.background.selected.pressed', '#a0cec8', '#014d49', undefined, 'Bcc300', 'Bcc800'),
				c('color.background.selected.bold', '#0c625c', '#6fb5ad', 'Bold selected — active tabs, pills.', 'Bcc700', 'Bcc400'),
			],
		}),
	}),
};

export const ColorBgInput: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.input.default', '#ffffff', '#242528', 'Form input backgrounds.', 'Neutral0', 'DarkNeutral200'),
				c('color.background.input.hovered', '#f8f8f8', '#303134', undefined, 'Neutral100', 'DarkNeutral300'),
				c('color.background.input.pressed', '#ffffff', '#242528', undefined, 'Neutral0', 'DarkNeutral200'),
			],
		}),
	}),
};

export const ColorBgAlpha: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.alpha.subtlest', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'Fully transparent.', 'Transparent', 'Transparent'),
				c('color.background.alpha.subtler', 'rgba(23,23,23,0.03)', 'rgba(189,189,189,0.04)', undefined, 'Alpha 3%', 'Alpha 4%'),
				c('color.background.alpha.subtle', 'rgba(5,21,36,0.06)', 'rgba(206,206,217,0.07)', undefined, 'Alpha 6%', 'Alpha 7%'),
				c('color.background.alpha.default', 'rgba(11,18,14,0.14)', 'rgba(227,228,242,0.12)', undefined, 'Alpha 14%', 'Alpha 12%'),
				c('color.background.alpha.bold', 'rgba(5,12,31,0.46)', 'rgba(233,240,251,0.36)', undefined, 'Alpha 46%', 'Alpha 36%'),
			],
		}),
	}),
};

export const ColorBgOverlay: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.inverse.subtle.default', 'rgba(0,0,0,0.16)', 'rgba(255,255,255,0.16)', 'Inverse overlay — content on inverted surfaces.', 'Alpha 16%', 'Alpha 16%'),
				c('color.background.inverse.subtle.hovered', 'rgba(0,0,0,0.24)', 'rgba(255,255,255,0.24)', undefined, 'Alpha 24%', 'Alpha 24%'),
				c('color.background.inverse.subtle.pressed', 'rgba(0,0,0,0.32)', 'rgba(255,255,255,0.32)', undefined, 'Alpha 32%', 'Alpha 32%'),
				c('color.background.disabled', 'rgba(5,21,36,0.06)', 'rgba(206,206,217,0.07)', 'Disabled element backgrounds.', 'Alpha 6%', 'Alpha 7%'),
			],
		}),
	}),
};

export const ColorBlanket: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.blanket.default', 'rgba(5,12,31,0.46)', 'rgba(16,18,20,0.6)', 'Modal backdrop overlay.', 'Alpha 46%', 'Alpha 60%'),
				c('color.blanket.selected', 'rgba(56,139,255,0.08)', 'rgba(29,122,252,0.08)', 'Selected blanket.', 'Blue 8%', 'Blue 8%'),
				c('color.blanket.danger', 'rgba(239,92,72,0.08)', 'rgba(227,73,53,0.08)', 'Danger blanket.', 'Red 8%', 'Red 8%'),
			],
		}),
	}),
};

export const ColorInteraction: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.interaction.hovered', 'rgba(0,0,0,0.16)', 'rgba(255,255,255,0.2)', 'Hover state overlay.', 'Alpha 16%', 'Alpha 20%'),
				c('color.interaction.pressed', 'rgba(0,0,0,0.32)', 'rgba(255,255,255,0.36)', 'Press state overlay.', 'Alpha 32%', 'Alpha 36%'),
			],
		}),
	}),
};

export const ColorSkeleton: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.skeleton.default', 'rgba(5,21,36,0.06)', 'rgba(206,206,217,0.07)', 'Loading placeholder.', 'Alpha 6%', 'Alpha 7%'),
				c('color.skeleton.subtle', 'rgba(23,23,23,0.03)', 'rgba(189,189,189,0.04)', 'Subtle loading placeholder.', 'Alpha 3%', 'Alpha 4%'),
			],
		}),
	}),
};

// ── Elevation: Shadow ────────────────────────────────────

export const ElevationShadow: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold flex-1">Token and description</span>
					<span class="body-md font-semibold w-32 text-center ml-auto">Light</span>
					<span class="body-md font-semibold w-32 text-center">Dark</span>
				</div>
				<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
					<div class="flex flex-col gap-spacing-50 flex-1">
						<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="t.css" >{{ t.token }}</code>
						<span v-if="t.desc" class="body-md text-subtle">{{ t.desc }}</span>
					</div>
					<div class="w-32 ml-auto shrink-0">
						<div class="w-28 h-20 rounded-lg bg-elevation-surface-default mx-auto" :style="{ boxShadow: t.value }"></div>
					</div>
					<div class="w-32 shrink-0">
						<div class="rounded-lg p-spacing-50 bg-neutral-900">
							<div class="w-28 h-20 rounded-lg bg-neutral-800 mx-auto" :style="{ boxShadow: t.darkValue }"></div>
						</div>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				{
					token: 'elevation.shadow.raised', desc: 'Raised cards and containers.',
					css: '--elevation-shadow-raised',
					value: '0 1px 1px 0 rgba(30,31,33,0.25), 0 0 1px 0 rgba(30,31,33,0.31)',
					darkValue: '0 1px 1px 0 rgba(0,0,0,0.5), 0 0 1px 0 rgba(0,0,0,0.6)',
				},
				{
					token: 'elevation.shadow.overflow', desc: 'Scrolling content edge shadow.',
					css: '--elevation-shadow-oveflow',
					value: '0 0 8px 0 rgba(30,31,33,0.16), 0 0 1px 0 rgba(30,31,33,0.12)',
					darkValue: '0 0 8px 0 rgba(0,0,0,0.4), 0 0 1px 0 rgba(0,0,0,0.3)',
				},
				{
					token: 'elevation.shadow.overlay', desc: 'Modals, dialogs, dropdown menus, floating toolbars.',
					css: '--elevation-shadow-overlay',
					value: '0 8px 12px 0 rgba(30,31,33,0.15), 0 0 1px 0 rgba(30,31,33,0.31)',
					darkValue: '0 8px 12px 0 rgba(0,0,0,0.4), 0 0 1px 0 rgba(0,0,0,0.6)',
				},
			],
		}),
	}),
};

// ── Accent: Text ─────────────────────────────────────────

export const AccentText: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.text.accent.gray.default', '#505258', '#a9abaf', undefined, 'Neutral800', 'DarkNeutral800'),
				c('color.text.accent.gray.bold', '#1e1f21', '#e2e3e4', undefined, 'Neutral1100', 'DarkNeutral1100'),
				c('color.text.accent.blue.default', '#273c8f', '#a6cdfd', undefined, 'Blue800', 'Blue300'),
				c('color.text.accent.blue.bold', '#212c64', '#d9ecff', undefined, 'Blue900', 'Blue200'),
				c('color.text.accent.teal.default', '#09486b', '#82d3e3', undefined, 'Teal800', 'Teal300'),
				c('color.text.accent.teal.bold', '#0d324d', '#c3f2f8', undefined, 'Teal900', 'Teal200'),
				c('color.text.accent.green.default', '#094c3b', '#83d895', undefined, 'Green800', 'Green300'),
				c('color.text.accent.green.bold', '#073734', '#cbf3c9', undefined, 'Green900', 'Green200'),
				c('color.text.accent.brown.default', '#553d28', '#d1c5b0', undefined, 'Brown800', 'Brown300'),
				c('color.text.accent.brown.bold', '#3f2c1e', '#ece8dc', undefined, 'Brown900', 'Brown200'),
				c('color.text.accent.yellow.default', '#653805', '#e9c348', undefined, 'Yellow800', 'Yellow300'),
				c('color.text.accent.yellow.bold', '#4b2c04', '#f8e6a0', undefined, 'Yellow900', 'Yellow200'),
				c('color.text.accent.orange.default', '#782612', '#f6b981', undefined, 'Orange800', 'Orange300'),
				c('color.text.accent.orange.bold', '#5d1712', '#fee3c1', undefined, 'Orange900', 'Orange200'),
				c('color.text.accent.red.default', '#811436', '#fab6ad', undefined, 'Red800', 'Red300'),
				c('color.text.accent.red.bold', '#630d2e', '#fee2dd', undefined, 'Red900', 'Red200'),
				c('color.text.accent.magenta.default', '#751f57', '#f3b4e2', undefined, 'Magenta800', 'Magenta300'),
				c('color.text.accent.magenta.bold', '#5b1043', '#fce0f8', undefined, 'Magenta900', 'Magenta200'),
				c('color.text.accent.purple.default', '#493481', '#c9c3ec', undefined, 'Purple800', 'Purple300'),
				c('color.text.accent.purple.bold', '#352465', '#e3e3fe', undefined, 'Purple900', 'Purple200'),
			],
		}),
	}),
};

// ── Accent: Icon ─────────────────────────────────────────

export const AccentIcon: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.icon.accent.gray.default', '#505258', '#7e8188', undefined, 'Neutral800', 'DarkNeutral600'),
				c('color.icon.accent.gray.bold', '#1e1f21', '#96999e', undefined, 'Neutral1100', 'DarkNeutral700'),
				c('color.icon.accent.blue.default', '#273c8f', '#608ef6', undefined, 'Blue800', 'Blue500'),
				c('color.icon.accent.blue.bold', '#212c64', '#7cabf9', undefined, 'Blue900', 'Blue400'),
				c('color.icon.accent.teal.default', '#09486b', '#1a9eb7', undefined, 'Teal800', 'Teal500'),
				c('color.icon.accent.teal.bold', '#0d324d', '#51b9cf', undefined, 'Teal900', 'Teal400'),
				c('color.icon.accent.green.default', '#094c3b', '#1ca673', undefined, 'Green800', 'Green500'),
				c('color.icon.accent.green.bold', '#073734', '#32c180', undefined, 'Green900', 'Green400'),
				c('color.icon.accent.brown.default', '#553d28', '#a98c66', undefined, 'Brown800', 'Brown500'),
				c('color.icon.accent.brown.bold', '#3f2c1e', '#bea889', undefined, 'Brown900', 'Brown400'),
				c('color.icon.accent.yellow.default', '#653805', '#e9c348', undefined, 'Yellow800', 'Yellow300'),
				c('color.icon.accent.yellow.bold', '#4b2c04', '#f8e6a0', undefined, 'Yellow900', 'Yellow200'),
				c('color.icon.accent.orange.default', '#782612', '#da772e', undefined, 'Orange800', 'Orange500'),
				c('color.icon.accent.orange.bold', '#5d1712', '#f19457', undefined, 'Orange900', 'Orange400'),
				c('color.icon.accent.red.default', '#811436', '#ca414e', undefined, 'Red800', 'Red600'),
				c('color.icon.accent.red.bold', '#630d2e', '#ed6362', undefined, 'Red900', 'Red500'),
				c('color.icon.accent.magenta.default', '#751f57', '#de66b0', undefined, 'Magenta800', 'Magenta500'),
				c('color.icon.accent.magenta.bold', '#5b1043', '#eb8acf', undefined, 'Magenta900', 'Magenta400'),
				c('color.icon.accent.purple.default', '#493481', '#9a82da', undefined, 'Purple800', 'Purple500'),
				c('color.icon.accent.purple.bold', '#352465', '#afa0e0', undefined, 'Purple900', 'Purple400'),
			],
		}),
	}),
};

// ── Accent: Border ───────────────────────────────────────

export const AccentBorder: Story = {
	render: () => ({
		template: borderColorTemplate,
		setup: () => ({
			tokens: [
				c('color.border.accent.gray', '#7d818a', '#7e8188', undefined, 'Neutral600', 'DarkNeutral600'),
				c('color.border.accent.blue', '#446add', '#608ef6', undefined, 'Blue600', 'Blue500'),
				c('color.border.accent.teal', '#0b7da1', '#1a9eb7', undefined, 'Teal600', 'Teal500'),
				c('color.border.accent.green', '#09825d', '#1ca673', undefined, 'Green600', 'Green500'),
				c('color.border.accent.brown', '#8b6d45', '#a98c66', undefined, 'Brown600', 'Brown500'),
				c('color.border.accent.yellow', '#a4670b', '#bc870d', undefined, 'Yellow600', 'Yellow500'),
				c('color.border.accent.orange', '#b55919', '#da772e', undefined, 'Orange600', 'Orange500'),
				c('color.border.accent.red', '#ca414e', '#ed6362', undefined, 'Red600', 'Red500'),
				c('color.border.accent.magenta', '#be428f', '#de66b0', undefined, 'Magenta600', 'Magenta500'),
				c('color.border.accent.purple', '#8360c3', '#9a82da', undefined, 'Purple600', 'Purple500'),
			],
		}),
	}),
};

// ── Accent: Background (subtlest only for each color) ────

export const AccentBgSubtlest: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.accent.gray.subtlest', '#ffffff', '#18191a', undefined, 'Neutral0', 'DarkNeutral0'),
				c('color.background.accent.blue.subtlest', '#f6fbff', '#091e47', undefined, 'Blue100', 'Blue1000'),
				c('color.background.accent.teal.subtlest', '#f6fbff', '#0c2132', undefined, 'Teal100', 'Teal1000'),
				c('color.background.accent.green.subtlest', '#efffed', '#032429', undefined, 'Green100', 'Green1000'),
				c('color.background.accent.brown.subtlest', '#f9faf4', '#2e1b0f', undefined, 'Brown100', 'Brown1000'),
				c('color.background.accent.yellow.subtlest', '#fdf8e9', '#2d1f00', undefined, 'Yellow100', 'Yellow1000'),
				c('color.background.accent.orange.subtlest', '#fffaed', '#420e0d', undefined, 'Orange100', 'Orange1000'),
				c('color.background.accent.red.subtlest', '#fff8f3', '#440223', undefined, 'Red100', 'Red1000'),
				c('color.background.accent.magenta.subtlest', '#fff8ff', '#3f0534', undefined, 'Magenta100', 'Magenta1000'),
				c('color.background.accent.purple.subtlest', '#f6f9ff', '#1d154d', undefined, 'Purple100', 'Purple1000'),
			],
		}),
	}),
};

// ── Spacing ──────────────────────────────────────────────

export const SpaceTokens: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold flex-1">Token</span>
					<span class="body-md font-semibold w-32 ml-auto">Preview</span>
				</div>
				<div v-for="t in tokens" :key="t.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="flex flex-col gap-spacing-50 flex-1">
						<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="'spacing-' + t.token.replace('space.', '')" >{{ t.token }}</code>
					</div>
					<div class="w-32 shrink-0 flex flex-col items-start gap-spacing-25 ml-auto">
						<div class="spacing-indicator h-3" :style="{ width: t.px === '0px' ? '1px' : t.px }"></div>
						<code class="text-xs text-subtlest">{{ t.px }}</code>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				{ token: 'space.0', px: '0px' },
				{ token: 'space.25', px: '2px' },
				{ token: 'space.50', px: '4px' },
				{ token: 'space.75', px: '6px' },
				{ token: 'space.100', px: '8px' },
				{ token: 'space.150', px: '12px' },
				{ token: 'space.200', px: '16px' },
				{ token: 'space.250', px: '20px' },
				{ token: 'space.300', px: '24px' },
				{ token: 'space.400', px: '32px' },
				{ token: 'space.500', px: '40px' },
				{ token: 'space.600', px: '48px' },
				{ token: 'space.800', px: '64px' },
				{ token: 'space.1000', px: '80px' },
			],
		}),
	}),
};

// ── Border ───────────────────────────────────────────────

export const BorderWidth: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold flex-1">Token and description</span>
					<span class="body-md font-semibold w-32 text-center ml-auto">Value</span>
				</div>
				<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
					<div class="flex flex-col gap-spacing-50 flex-1">
						<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
						<span v-if="t.desc" class="body-md text-subtle">{{ t.desc }}</span>
					</div>
					<div class="flex flex-col items-center gap-spacing-50 w-32 ml-auto shrink-0">
						<div class="w-20 h-10 rounded bg-elevation-surface-default" :style="{ border: t.px + ' solid var(--color-border-bold)' }"></div>
						<code class="text-xs text-subtlest">{{ t.px }}</code>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				{ token: 'border-width.0', px: '0px', desc: 'No border.', css: '--border-width-0', tw: 'border-0' },
				{ token: 'border-width.1', px: '1px', desc: 'Default borders and dividers.', css: '--border-width-1', tw: 'border' },
				{ token: 'border-width.2', px: '2px', desc: 'Selected states and focus rings.', css: '--border-width-2', tw: 'border-2' },
			],
		}),
	}),
};

// ── Radius ───────────────────────────────────────────────

export const RadiusTokens: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold flex-1">Token and description</span>
					<span class="body-md font-semibold w-32 text-center ml-auto">Value</span>
				</div>
				<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
					<div class="flex flex-col gap-spacing-50 flex-1">
						<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
						<span v-if="t.desc" class="body-md text-subtle">{{ t.desc }}</span>
					</div>
					<div class="flex flex-col items-center gap-spacing-50 w-32 ml-auto shrink-0">
						<div class="w-10 h-10 border-2 border-brand bg-brand-subtlest-default" :style="{ borderRadius: t.px }"></div>
						<code class="text-xs text-subtlest">{{ t.px }}</code>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				{ token: 'border-radius.none', px: '0px', desc: 'No rounding.', css: '--border-radius-none', tw: 'rounded-none' },
				{ token: 'border-radius.2xs', px: '2px', desc: 'Checkboxes, small detail elements.', css: '--border-radius-2xs', tw: 'rounded-2xs' },
				{ token: 'border-radius.xs', px: '4px', desc: 'Tags, labels, date pickers.', css: '--border-radius-xs', tw: 'rounded-xs' },
				{ token: 'border-radius.sm', px: '6px', desc: 'Buttons, tooltips, dropdown menus.', css: '--border-radius-sm', tw: 'rounded-sm' },
				{ token: 'border-radius.md', px: '8px', desc: 'Inputs, cards, dialogs.', css: '--border-radius-md', tw: 'rounded-md' },
				{ token: 'border-radius.lg', px: '12px', desc: 'Larger containers.', css: '--border-radius-lg', tw: 'rounded-lg' },
				{ token: 'border-radius.xl', px: '16px', desc: 'Large cards.', css: '--border-radius-xl', tw: 'rounded-xl' },
				{ token: 'border-radius.2xl', px: '24px', desc: 'Extra large containers.', css: '--border-radius-2xl', tw: 'rounded-2xl' },
				{ token: 'border-radius.3xl', px: '32px', css: '--border-radius-3xl', tw: 'rounded-3xl' },
				{ token: 'border-radius.4xl', px: '48px', css: '--border-radius-4xl', tw: 'rounded-4xl' },
				{ token: 'border-radius.full', px: '999px', desc: 'Circular and pill shapes.', css: '--border-radius-full', tw: 'rounded-full' },
			],
		}),
	}),
};

// ── Typography ───────────────────────────────────────────

export const FontHeading: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold flex-1">Token and description</span>
					<span class="body-md font-semibold flex-1 text-right">Preview</span>
				</div>
				<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
					<div class="flex flex-col gap-spacing-50 flex-1">
						<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
						<span class="body-md text-subtle">{{ t.desc }}</span>
					</div>
					<div class="flex-1 text-right ml-auto">
						<span :class="t.tw + ' text-default'">{{ t.preview }}</span>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				{ token: 'font.heading.2xl', tw: 'heading-2xl', preview: 'Heading XXL', desc: 'Page titles.' },
				{ token: 'font.heading.xl', tw: 'heading-xl', preview: 'Heading XL', desc: 'Section headers.' },
				{ token: 'font.heading.lg', tw: 'heading-lg', preview: 'Heading L', desc: 'Sub-section headers.' },
				{ token: 'font.heading.md', tw: 'heading-md', preview: 'Heading M', desc: 'Card titles, dialog headers.' },
				{ token: 'font.heading.sm', tw: 'heading-sm', preview: 'Heading S', desc: 'Small headings, labels.' },
			],
		}),
	}),
};

export const FontBody: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
					<div class="flex flex-col gap-spacing-50 flex-1">
						<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
						<span class="body-md text-subtle">{{ t.desc }}</span>
					</div>
					<div class="flex-1 text-right ml-auto">
						<span :class="t.tw + ' text-default'">{{ t.preview }}</span>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				{ token: 'font.body.lg', tw: 'body-lg', preview: 'Body Large — 16px', desc: 'Paragraphs, long-form text.' },
				{ token: 'font.body.md', tw: 'body-md', preview: 'Body Medium — 14px', desc: 'UI labels, descriptions.' },
				{ token: 'font.body.sm', tw: 'body-sm', preview: 'Body Small — 12px', desc: 'Captions, fine print.' },
			],
		}),
	}),
};

// ── Icon Size ────────────────────────────────────────────

export const IconSize: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col">
				<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
					<span class="body-md font-semibold flex-1">Token</span>
					<span class="body-md font-semibold w-20 text-center ml-auto">Preview</span>
				</div>
				<div v-for="t in tokens" :key="t.token" class="flex items-center gap-spacing-200 border-b border-default py-spacing-150">
					<div class="flex flex-col gap-spacing-50 flex-1">
						<code class="text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
					</div>
					<div class="w-20 ml-auto shrink-0 flex flex-col items-center gap-spacing-25">
						<span class="material-symbols-outlined text-default" :style="{ fontSize: t.px }">search</span>
						<code class="text-xs text-subtlest">{{ t.px }}</code>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				{ token: 'icon.size.xs', px: '16px', css: '--icon-size-xs', tw: 'icon-xs' },
				{ token: 'icon.size.sm', px: '20px', css: '--icon-size-sm', tw: 'icon-sm' },
				{ token: 'icon.size.md', px: '24px', css: '--icon-size-md', tw: 'icon-md' },
				{ token: 'icon.size.lg', px: '32px', css: '--icon-size-lg', tw: 'icon-lg' },
				{ token: 'icon.size.xl', px: '48px', css: '--icon-size-xl', tw: 'icon-xl' },
			],
		}),
	}),
};
