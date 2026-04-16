/** Copyable token pill — shows tippy with token name, CSS var, and Tailwind class. */
export const PILL =
	'text-xs bg-neutral-100 border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle inline-block w-fit cursor-pointer hover:bg-neutral-200 transition-colors color-swatch color-swatch-no-hover';

/** Copyable token pill used in component demos — same look, with swatch hover. */
export const PILL_SWATCH =
	'color-swatch text-xs bg-elevation-surface-default border border-default rounded-full px-spacing-100 py-spacing-25 text-subtle cursor-pointer inline-block';

/** Convert rem/em values to px (assumes 16px root). Returns the original string if not rem/em. */
export function remToPx(value: string, rootFontSize = 16): string {
	const match = value.trim().match(/^(-?\d*\.?\d+)(rem|em)$/i);
	if (!match) return value;
	const px = Number.parseFloat(match[1]) * rootFontSize;
	const normalized = Number(px.toFixed(4));
	return Number.isInteger(normalized) ? `${normalized}px` : `${normalized}px`;
}

/** Do/Don't card pair — two side-by-side cards with visual example and guidance text. */
export function doDont(doExample: string, doText: string, dontExample: string, dontText: string) {
	return `
		<div class="flex gap-spacing-200 items-stretch">
			<div class="flex-1 rounded-lg overflow-hidden flex flex-col">
				<div class="bg-neutral-100 p-spacing-300 flex items-center justify-center flex-1">${doExample}</div>
				<div class="border-t-[3px] border-success"></div>
				<div class="bg-success-default p-spacing-200 flex-1">
					<div class="flex items-center gap-spacing-75 mb-spacing-50">
						<span class="text-icon-success text-base leading-none">&#x2714;</span>
						<strong class="heading-sm">Do</strong>
					</div>
					<span class="body-md text-subtle">${doText}</span>
				</div>
			</div>
			<div class="flex-1 rounded-lg overflow-hidden flex flex-col">
				<div class="bg-neutral-100 p-spacing-300 flex items-center justify-center flex-1">${dontExample}</div>
				<div class="border-t-[3px] border-danger"></div>
				<div class="bg-danger-default p-spacing-200 flex-1">
					<div class="flex items-center gap-spacing-75 mb-spacing-50">
						<span class="text-icon-danger text-base leading-none">&#x2716;</span>
						<strong class="heading-sm">Don't</strong>
					</div>
					<span class="body-md text-subtle">${dontText}</span>
				</div>
			</div>
		</div>
	`;
}
