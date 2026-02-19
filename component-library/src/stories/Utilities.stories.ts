import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

/**
 * # Layout & typography utilities
 *
 * These utilities are defined in `src/styles/utilities.css` and provide common layout
 * and typography helpers. Use them on any element to avoid repeating Tailwind classes.
 */
const meta = {
	title: 'Styles/Utilities',
	parameters: {
		docs: {
			description: {
				component:
					'Documentation and live examples for the utility classes in `utilities.css`. Apply these classes directly in your templates.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const boxClass = 'rounded-lg border border-(--bcc-border-subtle) bg-[var(--bcc-surface-elevated)] p-3 text-sm';

/**
 * ## `center`
 *
 * **Why:** Flexbox centering is used everywhere (cards, headers, empty states). This utility
 * keeps markup short and consistent.
 *
 * **Usage:** Add `center` for horizontal and vertical centering. Add a second class for alignment:
 * - `center between` — space between (e.g. header with title + actions)
 * - `center top` — align items to top
 * - `center bottom` — align items to bottom
 * - `center left` — justify start
 * - `center right` — justify end
 * - `center stretch` — stretch items to full height
 */
export const Center: Story = {
	render: () => ({
		template: `
			<div class="space-y-6">
				<div>
					<p class="mb-2 text-sm font-medium opacity-80">center (default)</p>
					<div class="center h-24 rounded-lg border border-dashed border-(--bcc-border-subtle)">
						<span class="${boxClass}">Centered</span>
					</div>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium opacity-80">center between</p>
					<div class="center between h-16 rounded-lg border border-dashed border-(--bcc-border-subtle) px-4">
						<span class="${boxClass}">Left</span>
						<span class="${boxClass}">Right</span>
					</div>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium opacity-80">center top</p>
					<div class="center top h-24 rounded-lg border border-dashed border-(--bcc-border-subtle)">
						<span class="${boxClass}">Aligned top</span>
					</div>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium opacity-80">center bottom</p>
					<div class="center bottom h-24 rounded-lg border border-dashed border-(--bcc-border-subtle)">
						<span class="${boxClass}">Aligned bottom</span>
					</div>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium opacity-80">center right</p>
					<div class="center right h-16 rounded-lg border border-dashed border-(--bcc-border-subtle) px-4">
						<span class="${boxClass}">Pushed right</span>
					</div>
				</div>
			</div>
		`,
	}),
};

/**
 * ## `col`
 *
 * **Why:** Vertical flex layouts (forms, lists, stacked content) are common. `col` gives you
 * a centered column; add a modifier for alignment.
 *
 * **Usage:** Add `col` for a vertical flex container with centered cross-axis. Add a second class:
 * - `col between` — justify space between along the column
 * - `col left` — align items to start (left in LTR)
 * - `col right` — align items to end
 * - `col top` — justify start
 * - `col bottom` — justify end
 */
export const Col: Story = {
	render: () => ({
		template: `
			<div class="space-y-6">
				<div>
					<p class="mb-2 text-sm font-medium opacity-80">col (default)</p>
					<div class="col gap-2 rounded-lg border border-dashed border-(--bcc-border-subtle) p-4" style="min-height: 120px;">
						<span class="${boxClass}">One</span>
						<span class="${boxClass}">Two</span>
					</div>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium opacity-80">col between</p>
					<div class="col between rounded-lg border border-dashed border-(--bcc-border-subtle) p-4" style="min-height: 160px;">
						<span class="${boxClass}">Top</span>
						<span class="${boxClass}">Bottom</span>
					</div>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium opacity-80">col left</p>
					<div class="col left gap-2 rounded-lg border border-dashed border-(--bcc-border-subtle) p-4" style="min-height: 100px;">
						<span class="${boxClass}">Left-aligned</span>
					</div>
				</div>
			</div>
		`,
	}),
};

/**
 * ## `capital`
 *
 * **Why:** Labels, placeholders, and dynamic text often need the first letter capitalized
 * (e.g. status labels, field names). This avoids manual string handling in JS.
 *
 * **Usage:** Add `capital` to any text element. Only the first letter of the first word
 * is capitalized (via `:first-letter` and `text-transform: uppercase`).
 */
export const Capital: Story = {
	render: () => ({
		setup() {
			const active = ref(true);
			return { active };
		},
		template: `
			<button class="ctx clickable ctx-green-subtler rounded p-2" :class="{capital: active}" @click="active = !active">status: {{ active ? 'active' : 'inactive' }}</button>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<p class="capital">first letter will be capitalized</p>`,
			},
		},
	},
};

/**
 * ## `hide-scrollbar`
 *
 * **Why:** Scrollable areas (sidebars, horizontal strips, modals) often need to show content
 * that scrolls without showing the native scrollbar for a cleaner look.
 *
 * **Usage:** Add `hide-scrollbar` to the scrollable container. Scroll still works with mouse/trackpad;
 * the scrollbar is hidden in Chrome, Safari, Firefox, and Edge via vendor-specific rules.
 */
export const HideScrollbar: Story = {
	render: () => ({
		template: `
			<div class="space-y-4">
				<p class="text-sm opacity-80">Horizontal strip with scrollbar hidden (scroll to see more):</p>
				<div class="hide-scrollbar flex gap-3 overflow-x-auto rounded-lg border border-(--bcc-border-subtle) p-3" style="max-width: 320px;">
					<div class="${boxClass} shrink-0" style="width: 140px;">Card 1</div>
					<div class="${boxClass} shrink-0" style="width: 140px;">Card 2</div>
					<div class="${boxClass} shrink-0" style="width: 140px;">Card 3</div>
					<div class="${boxClass} shrink-0" style="width: 140px;">Card 4</div>
				</div>
				<p class="text-sm opacity-80">Vertical area with scrollbar hidden:</p>
				<div class="hide-scrollbar rounded-lg border border-(--bcc-border-subtle) p-3" style="max-height: 120px;">
					<p>Line 1</p>
					<p>Line 2</p>
					<p>Line 3</p>
					<p>Line 4</p>
					<p>Line 5</p>
					<p>Line 6</p>
				</div>
			</div>
		`,
	}),
};

/**
 * All utilities from `utilities.css` in one overview. Use the individual stories above
 * for copy-paste examples and detailed usage.
 */
export const AllUtilities: Story = {
	render: () => ({
		template: `
			<div class="space-y-8">
				<section>
					<h3 class="mb-3 text-lg font-semibold">center</h3>
					<div class="center h-20 rounded border border-dashed border-(--bcc-border-subtle)">
						<span class="${boxClass}">center</span>
					</div>
				</section>
				<section>
					<h3 class="mb-3 text-lg font-semibold">col</h3>
					<div class="col gap-2 rounded border border-dashed border-(--bcc-border-subtle) p-3" style="min-height: 80px;">
						<span class="${boxClass}">col</span>
					</div>
				</section>
				<section>
					<h3 class="mb-3 text-lg font-semibold">capital</h3>
					<p><span class="capital">first letter only</span></p>
				</section>
				<section>
					<h3 class="mb-3 text-lg font-semibold">hide-scrollbar</h3>
					<div class="hide-scrollbar flex gap-2 overflow-x-auto rounded border border-(--bcc-border-subtle) p-2" style="max-width: 280px;">
						<span class="${boxClass} shrink-0" style="width: 100px;">1</span>
						<span class="${boxClass} shrink-0" style="width: 100px;">2</span>
						<span class="${boxClass} shrink-0" style="width: 100px;">3</span>
					</div>
				</section>
			</div>
		`,
	}),
};
