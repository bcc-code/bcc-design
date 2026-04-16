import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { PILL } from './helpers';
import { resolveColorTokenValues } from './tokenResolver';

const meta = {
	title: 'Foundations/Token Reference/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Shared template fragments ────────────────────────────

const pill = `<code class="${PILL}" :data-token="t.token" :data-tw="t.twClass || t.tw" :data-css="t.cssVar">{{ t.token }}</code>`;
const desc = `<span v-if="t.desc" class="body-md text-subtle">{{ t.desc }}</span>`;
const lightSwatch = `
	<div class="rounded-lg border border-default p-spacing-100 flex flex-col items-center gap-spacing-75 color-swatch color-swatch-no-hover cursor-pointer" :data-hex="t.lightHex">
		<div class="w-full h-10 rounded" :style="{ background: t.lightHex }"></div>
		<code class="text-xs text-subtlest font-semibold">{{ t.lightPrim }}</code>
	</div>`;
const darkSwatch = `
	<div class="rounded-lg border border-neutral-700 bg-neutral-900 p-spacing-100 flex flex-col items-center gap-spacing-75 color-swatch color-swatch-no-hover cursor-pointer" :data-hex="t.darkHex">
		<div class="w-full h-10 rounded" :style="{ background: t.darkHex }"></div>
		<code class="text-xs text-inverse font-semibold">{{ t.darkPrim }}</code>
	</div>`;

const colorTemplate = `
	<div class="flex flex-col">
		<div class="flex items-center gap-spacing-200 border-b border-default pb-spacing-100">
			<span class="body-md font-semibold flex-1">Token and description</span>
			<span class="body-md font-semibold w-32 text-center ml-auto">Light value</span>
			<span class="body-md font-semibold w-32 text-center">Dark value</span>
		</div>
		<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
			<div class="flex flex-col gap-spacing-50 flex-1">${pill}${desc}</div>
			<div class="w-32 ml-auto shrink-0">${lightSwatch}</div>
			<div class="w-32 shrink-0">${darkSwatch}</div>
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
			<div class="flex flex-col gap-spacing-50 flex-1">${pill}${desc}</div>
			<div class="w-32 ml-auto shrink-0">
				<div class="rounded-lg border border-default p-spacing-100 flex flex-col items-center gap-spacing-75 color-swatch color-swatch-no-hover cursor-pointer" :data-hex="t.lightHex">
					<div class="w-full h-10 rounded border-2 bg-elevation-surface-default" :style="{ borderColor: t.lightHex }"></div>
					<code class="text-xs text-subtlest font-semibold">{{ t.lightPrim }}</code>
				</div>
			</div>
			<div class="w-32 shrink-0">
				<div class="rounded-lg border border-neutral-700 bg-neutral-900 p-spacing-100 flex flex-col items-center gap-spacing-75 color-swatch color-swatch-no-hover cursor-pointer" :data-hex="t.darkHex">
					<div class="w-full h-10 rounded border-2 bg-neutral-800" :style="{ borderColor: t.darkHex }"></div>
					<code class="text-xs text-inverse font-semibold">{{ t.darkPrim }}</code>
				</div>
			</div>
		</div>
	</div>
`;

/** Build a color token data object with values resolved from @bcc-code/design-tokens css. */
function c(token: string, desc?: string, lightPrim?: string, darkPrim?: string) {
	const cssVar = 'var(--color-' + token.replace('color.', '').replace(/\./g, '-') + ')';
	const twClass = token.replace('color.', '').replace(/\./g, '-');
	const { lightHex, darkHex } = resolveColorTokenValues(token);
	return {
		token,
		lightHex,
		darkHex,
		desc,
		lightPrim: lightPrim || lightHex,
		darkPrim: darkPrim || darkHex,
		cssVar,
		twClass,
	};
}

// ── Color: Text ──────────────────────────────────────────

export const ColorText: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c(
					'color.text.default',
					'Primary text — body copy, sentence case headers, and buttons.',
					'Neutral1000',
					'DarkNeutral1100'
				),
				c('color.text.subtle', 'Secondary text — descriptions, labels.', 'Neutral800', 'DarkNeutral800'),
				c('color.text.subtlest', 'Tertiary text — captions, placeholders.', 'Neutral600', 'DarkNeutral600'),
				c('color.text.disabled', 'Disabled state text.', 'Alpha 29%', 'Alpha 25%'),
				c('color.text.inverse', 'Text on inverted backgrounds.', 'Neutral0', 'DarkNeutral100'),
				c('color.text.selected', 'Selected element text.', 'Bcc700', 'Bcc400'),
				c('color.text.static.default', "Static text that doesn't change between themes.", 'Neutral0', 'Neutral0'),
			],
		}),
	}),
};

export const ColorTextStatus: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.text.success', undefined, 'Green800', 'Green300'),
				c('color.text.information', undefined, 'Blue800', 'Blue300'),
				c('color.text.danger', undefined, 'Red800', 'Red300'),
				c('color.text.warning.default', undefined, 'Yellow800', 'Yellow300'),
				c('color.text.warning.inverse', 'Text on warning bolder backgrounds.', 'Yellow900', 'DarkNeutral100'),
				c('color.text.brand.default', undefined, 'Bcc800', 'Bcc400'),
				c('color.text.brand.bold', undefined, 'Bcc900', 'Bcc300'),
			],
		}),
	}),
};

export const ColorLink: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.link.default', 'Default link color.', 'Blue800', 'Blue400'),
				c('color.link.pressed', 'Active/pressed link.', 'Blue900', 'Blue300'),
				c('color.link.visited.default', 'Visited link.', 'Purple800', 'Purple300'),
				c('color.link.visited.hover', 'Visited link hover.', 'Purple900', 'Purple200'),
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
				c('color.icon.default', 'Default icon color.', 'Neutral1100', 'DarkNeutral1000'),
				c('color.icon.subtle', 'Secondary icon.', 'Neutral800', 'DarkNeutral800'),
				c('color.icon.subtlest', 'Tertiary icon.', 'Neutral600', 'DarkNeutral600'),
				c('color.icon.disabled', undefined, 'Alpha 29%', 'Alpha 25%'),
				c('color.icon.inverse', undefined, 'Neutral0', 'DarkNeutral100'),
				c('color.icon.selected', undefined, 'Bcc700', 'Bcc400'),
				c('color.icon.success', undefined, 'Green800', 'Green500'),
				c('color.icon.information', undefined, 'Blue800', 'Blue500'),
				c('color.icon.danger', undefined, 'Red800', 'Red500'),
				c('color.icon.warning.default', undefined, 'Yellow800', 'Yellow300'),
				c('color.icon.warning.inverse', 'Icon on warning bolder backgrounds.', 'Yellow900', 'DarkNeutral100'),
				c('color.icon.static.default', "Static icon that doesn't change between themes.", 'Neutral0', 'Neutral0'),
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
				c('color.border.default', 'Standard borders and dividers.', 'Alpha 14%', 'Alpha 12%'),
				c('color.border.bold', 'High-contrast borders.', 'Neutral600', 'DarkNeutral600'),
				c('color.border.disabled', undefined, 'Alpha 6%', 'Alpha 7%'),
				c('color.border.selected', undefined, 'Bcc700', 'Bcc400'),
				c('color.border.focused', 'Focus ring on interactive elements.', 'Neutral800', 'DarkNeutral800'),
				c('color.border.input', 'Form input borders at rest.', 'Neutral500', 'DarkNeutral500'),
				c('color.border.brand', undefined, 'Bcc700', 'Bcc400'),
				c('color.border.success', undefined, 'Green600', 'Green500'),
				c('color.border.information', undefined, 'Blue600', 'Blue500'),
				c('color.border.danger', undefined, 'Red600', 'Red500'),
				c('color.border.warning', undefined, 'Orange600', 'Yellow500'),
				c('color.border.inverse', 'Borders on inverted backgrounds.', 'Neutral0', 'DarkNeutral0'),
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
				c('color.elevation.surface.default', 'Primary background.', 'Neutral0', 'DarkNeutral100'),
				c('color.elevation.surface.hovered', undefined, 'Neutral200', 'DarkNeutral200'),
				c('color.elevation.surface.pressed', undefined, 'Neutral300', 'DarkNeutral300'),
				c(
					'color.elevation.surface.sunken.default',
					'Recessed areas — page background behind cards.',
					'Neutral100',
					'DarkNeutral0'
				),
				c('color.elevation.surface.raised.default', 'Raised cards and containers.', 'Neutral0', 'DarkNeutral200'),
				c('color.elevation.surface.raised.hovered', undefined, 'Neutral200', 'DarkNeutral300'),
				c('color.elevation.surface.raised.pressed', undefined, 'Neutral300', 'DarkNeutral400'),
				c('color.elevation.surface.overlay.default', 'Modals, dialogs, dropdown menus.', 'Neutral0', 'DarkNeutral200'),
				c('color.elevation.surface.overlay.hovered', undefined, 'Neutral200', 'DarkNeutral300'),
				c('color.elevation.surface.overlay.pressed', undefined, 'Neutral300', 'DarkNeutral400'),
			],
		}),
	}),
};

export const ColorBgBrand: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.brand.subtlest.default', 'Subtle brand tint for backgrounds.', 'Bcc100', 'Bcc1000'),
				c('color.background.brand.subtler.default', undefined, 'Bcc200', 'Bcc900'),
				c('color.background.brand.subtle.default', undefined, 'Bcc400', 'Bcc700'),
				c('color.background.brand.bolder.default', 'Primary buttons, strong brand emphasis.', 'Bcc800', 'Bcc300'),
				c('color.background.brand.boldest.default', undefined, 'Bcc1000', 'Bcc100'),
			],
		}),
	}),
};

export const ColorBgStatus: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.success.default', undefined, 'Green100', 'Green1000'),
				c('color.background.success.bolder.default', undefined, 'Green700', 'Green400'),
				c('color.background.information.default', undefined, 'Blue100', 'Blue1000'),
				c('color.background.information.bolder.default', undefined, 'Blue700', 'Blue400'),
				c('color.background.danger.default', undefined, 'Red100', 'Red1000'),
				c('color.background.danger.bolder.default', undefined, 'Red700', 'Red400'),
				c('color.background.warning.default', undefined, 'Yellow100', 'Yellow1000'),
				c('color.background.warning.bolder.default', undefined, 'Yellow300', 'Yellow400'),
			],
		}),
	}),
};

export const ColorBgSelected: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.selected.default', 'Selected item background.', 'Bcc100', 'Bcc1000'),
				c('color.background.selected.hovered', undefined, 'Bcc200', 'Bcc900'),
				c('color.background.selected.pressed', undefined, 'Bcc300', 'Bcc800'),
				c('color.background.selected.bold.default', 'Bold selected — active tabs, pills.', 'Bcc700', 'Bcc400'),
			],
		}),
	}),
};

export const ColorBgInput: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.input.default', 'Form input backgrounds.', 'Neutral0', 'DarkNeutral200'),
				c('color.background.input.hovered', undefined, 'Neutral100', 'DarkNeutral300'),
				c('color.background.input.pressed', undefined, 'Neutral0', 'DarkNeutral200'),
			],
		}),
	}),
};

export const ColorBgAlpha: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.background.alpha.subtlest.default', 'Fully transparent.', 'Transparent', 'Transparent'),
				c('color.background.alpha.subtler.default', undefined, 'Alpha 3%', 'Alpha 4%'),
				c('color.background.alpha.subtle.default', undefined, 'Alpha 6%', 'Alpha 7%'),
				c('color.background.alpha.default', undefined, 'Alpha 14%', 'Alpha 12%'),
				c('color.background.alpha.bold.default', undefined, 'Alpha 46%', 'Alpha 36%'),
			],
		}),
	}),
};

export const ColorBgOverlay: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c(
					'color.background.inverse.subtle.default',
					'Inverse overlay — content on inverted surfaces.',
					'Alpha 16%',
					'Alpha 16%'
				),
				c('color.background.inverse.subtle.hovered', undefined, 'Alpha 24%', 'Alpha 24%'),
				c('color.background.inverse.subtle.pressed', undefined, 'Alpha 32%', 'Alpha 32%'),
				c('color.background.disabled.default', 'Disabled element backgrounds.', 'Alpha 6%', 'Alpha 7%'),
			],
		}),
	}),
};

export const ColorBlanket: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.blanket.default', 'Modal backdrop overlay.', 'Alpha 46%', 'Alpha 60%'),
				c('color.blanket.selected', 'Selected blanket.', 'Blue 8%', 'Blue 8%'),
				c('color.blanket.danger', 'Danger blanket.', 'Red 8%', 'Red 8%'),
			],
		}),
	}),
};

export const ColorInteraction: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.interaction.hovered', 'Hover state overlay.', 'Alpha 16%', 'Alpha 20%'),
				c('color.interaction.pressed', 'Press state overlay.', 'Alpha 32%', 'Alpha 36%'),
			],
		}),
	}),
};

export const ColorSkeleton: Story = {
	render: () => ({
		template: colorTemplate,
		setup: () => ({
			tokens: [
				c('color.skeleton.default', 'Loading placeholder.', 'Alpha 6%', 'Alpha 7%'),
				c('color.skeleton.subtle', 'Subtle loading placeholder.', 'Alpha 3%', 'Alpha 4%'),
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
					<span class="body-md font-semibold w-40 text-center ml-auto">Light</span>
					<span class="body-md font-semibold w-40 text-center">Dark</span>
				</div>
				<div v-for="t in tokens" :key="t.token" class="flex items-start gap-spacing-200 border-b border-default py-spacing-200">
					<div class="flex flex-col gap-spacing-50 flex-1">
						<code class="${PILL}" :data-token="t.token" :data-tw="t.tw" :data-css="'var(' + t.css + ')'" >{{ t.token }}</code>
						<span v-if="t.desc" class="body-md text-subtle">{{ t.desc }}</span>
					</div>
					<div class="w-40 ml-auto shrink-0 p-spacing-200 rounded-lg bg-neutral-100">
						<div class="w-full h-20 rounded-lg bg-elevation-surface-default" :style="{ boxShadow: t.value }"></div>
					</div>
					<div class="w-40 shrink-0 p-spacing-200 rounded-lg bg-neutral-900">
						<div class="w-full h-20 rounded-lg bg-neutral-800" :style="{ boxShadow: t.darkValue }"></div>
					</div>
				</div>
			</div>
		`,
		setup: () => ({
			tokens: [
				{
					token: 'elevation.shadow.raised',
					desc: 'Raised cards and containers.',
					tw: 'shadow-raised',
					css: '--elevation-shadow-raised',
					value: '0 1px 1px 0 rgba(30,31,33,0.25), 0 0 1px 0 rgba(30,31,33,0.31)',
					darkValue: '0 1px 1px 0 rgba(0,0,0,0.5), 0 0 1px 0 rgba(0,0,0,0.6)',
				},
				{
					token: 'elevation.shadow.overflow',
					desc: 'Scrolling content edge shadow.',
					tw: 'shadow-overflow',
					css: '--elevation-shadow-overflow',
					value: '0 0 8px 0 rgba(30,31,33,0.16), 0 0 1px 0 rgba(30,31,33,0.12)',
					darkValue: '0 0 8px 0 rgba(0,0,0,0.4), 0 0 1px 0 rgba(0,0,0,0.3)',
				},
				{
					token: 'elevation.shadow.overlay',
					desc: 'Modals, dialogs, dropdown menus, floating toolbars.',
					tw: 'shadow-overlay',
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
				c('color.text.accent.gray.default', undefined, 'Neutral800', 'DarkNeutral800'),
				c('color.text.accent.gray.bold', undefined, 'Neutral1100', 'DarkNeutral1100'),
				c('color.text.accent.blue.default', undefined, 'Blue800', 'Blue300'),
				c('color.text.accent.blue.bold', undefined, 'Blue900', 'Blue200'),
				c('color.text.accent.teal.default', undefined, 'Teal800', 'Teal300'),
				c('color.text.accent.teal.bold', undefined, 'Teal900', 'Teal200'),
				c('color.text.accent.green.default', undefined, 'Green800', 'Green300'),
				c('color.text.accent.green.bold', undefined, 'Green900', 'Green200'),
				c('color.text.accent.brown.default', undefined, 'Brown800', 'Brown300'),
				c('color.text.accent.brown.bold', undefined, 'Brown900', 'Brown200'),
				c('color.text.accent.yellow.default', undefined, 'Yellow800', 'Yellow300'),
				c('color.text.accent.yellow.bold', undefined, 'Yellow900', 'Yellow200'),
				c('color.text.accent.orange.default', undefined, 'Orange800', 'Orange300'),
				c('color.text.accent.orange.bold', undefined, 'Orange900', 'Orange200'),
				c('color.text.accent.red.default', undefined, 'Red800', 'Red300'),
				c('color.text.accent.red.bold', undefined, 'Red900', 'Red200'),
				c('color.text.accent.magenta.default', undefined, 'Magenta800', 'Magenta300'),
				c('color.text.accent.magenta.bold', undefined, 'Magenta900', 'Magenta200'),
				c('color.text.accent.purple.default', undefined, 'Purple800', 'Purple300'),
				c('color.text.accent.purple.bold', undefined, 'Purple900', 'Purple200'),
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
				c('color.icon.accent.gray.default', undefined, 'Neutral800', 'DarkNeutral600'),
				c('color.icon.accent.gray.bold', undefined, 'Neutral1100', 'DarkNeutral700'),
				c('color.icon.accent.blue.default', undefined, 'Blue800', 'Blue500'),
				c('color.icon.accent.blue.bold', undefined, 'Blue900', 'Blue400'),
				c('color.icon.accent.teal.default', undefined, 'Teal800', 'Teal500'),
				c('color.icon.accent.teal.bold', undefined, 'Teal900', 'Teal400'),
				c('color.icon.accent.green.default', undefined, 'Green800', 'Green500'),
				c('color.icon.accent.green.bold', undefined, 'Green900', 'Green400'),
				c('color.icon.accent.brown.default', undefined, 'Brown800', 'Brown500'),
				c('color.icon.accent.brown.bold', undefined, 'Brown900', 'Brown400'),
				c('color.icon.accent.yellow.default', undefined, 'Yellow800', 'Yellow300'),
				c('color.icon.accent.yellow.bold', undefined, 'Yellow900', 'Yellow200'),
				c('color.icon.accent.orange.default', undefined, 'Orange800', 'Orange500'),
				c('color.icon.accent.orange.bold', undefined, 'Orange900', 'Orange400'),
				c('color.icon.accent.red.default', undefined, 'Red800', 'Red600'),
				c('color.icon.accent.red.bold', undefined, 'Red900', 'Red500'),
				c('color.icon.accent.magenta.default', undefined, 'Magenta800', 'Magenta500'),
				c('color.icon.accent.magenta.bold', undefined, 'Magenta900', 'Magenta400'),
				c('color.icon.accent.purple.default', undefined, 'Purple800', 'Purple500'),
				c('color.icon.accent.purple.bold', undefined, 'Purple900', 'Purple400'),
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
				c('color.border.accent.gray', undefined, 'Neutral600', 'DarkNeutral600'),
				c('color.border.accent.blue', undefined, 'Blue600', 'Blue500'),
				c('color.border.accent.teal', undefined, 'Teal600', 'Teal500'),
				c('color.border.accent.green', undefined, 'Green600', 'Green500'),
				c('color.border.accent.brown', undefined, 'Brown600', 'Brown500'),
				c('color.border.accent.yellow', undefined, 'Yellow600', 'Yellow500'),
				c('color.border.accent.orange', undefined, 'Orange600', 'Orange500'),
				c('color.border.accent.red', undefined, 'Red600', 'Red500'),
				c('color.border.accent.magenta', undefined, 'Magenta600', 'Magenta500'),
				c('color.border.accent.purple', undefined, 'Purple600', 'Purple500'),
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
				c('color.background.accent.gray.subtlest.default', undefined, 'Neutral0', 'DarkNeutral0'),
				c('color.background.accent.blue.subtlest.default', undefined, 'Blue100', 'Blue1000'),
				c('color.background.accent.teal.subtlest.default', undefined, 'Teal100', 'Teal1000'),
				c('color.background.accent.green.subtlest.default', undefined, 'Green100', 'Green1000'),
				c('color.background.accent.brown.subtlest.default', undefined, 'Brown100', 'Brown1000'),
				c('color.background.accent.yellow.subtlest.default', undefined, 'Yellow100', 'Yellow1000'),
				c('color.background.accent.orange.subtlest.default', undefined, 'Orange100', 'Orange1000'),
				c('color.background.accent.red.subtlest.default', undefined, 'Red100', 'Red1000'),
				c('color.background.accent.magenta.subtlest.default', undefined, 'Magenta100', 'Magenta1000'),
				c('color.background.accent.purple.subtlest.default', undefined, 'Purple100', 'Purple1000'),
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
						<code class="${PILL}" :data-token="t.token" :data-tw="'spacing-' + t.token.replace('space.', '')" >{{ t.token }}</code>
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
						<code class="${PILL}" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
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
				{
					token: 'border-width.1',
					px: '1px',
					desc: 'Default borders and dividers.',
					css: '--border-width-1',
					tw: 'border',
				},
				{
					token: 'border-width.2',
					px: '2px',
					desc: 'Selected states and focus rings.',
					css: '--border-width-2',
					tw: 'border-2',
				},
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
						<code class="${PILL}" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
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
				{
					token: 'border-radius.none',
					px: '0px',
					desc: 'No rounding.',
					css: '--border-radius-none',
					tw: 'rounded-none',
				},
				{
					token: 'border-radius.2xs',
					px: '2px',
					desc: 'Checkboxes, small detail elements.',
					css: '--border-radius-2xs',
					tw: 'rounded-2xs',
				},
				{
					token: 'border-radius.xs',
					px: '4px',
					desc: 'Tags, labels, date pickers.',
					css: '--border-radius-xs',
					tw: 'rounded-xs',
				},
				{
					token: 'border-radius.sm',
					px: '6px',
					desc: 'Buttons, tooltips, dropdown menus.',
					css: '--border-radius-sm',
					tw: 'rounded-sm',
				},
				{
					token: 'border-radius.md',
					px: '8px',
					desc: 'Inputs, cards, dialogs.',
					css: '--border-radius-md',
					tw: 'rounded-md',
				},
				{
					token: 'border-radius.lg',
					px: '12px',
					desc: 'Larger containers.',
					css: '--border-radius-lg',
					tw: 'rounded-lg',
				},
				{ token: 'border-radius.xl', px: '16px', desc: 'Large cards.', css: '--border-radius-xl', tw: 'rounded-xl' },
				{
					token: 'border-radius.2xl',
					px: '24px',
					desc: 'Extra large containers.',
					css: '--border-radius-2xl',
					tw: 'rounded-2xl',
				},
				{ token: 'border-radius.3xl', px: '32px', css: '--border-radius-3xl', tw: 'rounded-3xl' },
				{ token: 'border-radius.4xl', px: '48px', css: '--border-radius-4xl', tw: 'rounded-4xl' },
				{
					token: 'border-radius.full',
					px: '999px',
					desc: 'Circular and pill shapes.',
					css: '--border-radius-full',
					tw: 'rounded-full',
				},
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
						<code class="${PILL}" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
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
						<code class="${PILL}" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
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
						<code class="${PILL}" :data-token="t.token" :data-tw="t.tw" >{{ t.token }}</code>
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
