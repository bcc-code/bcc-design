import type { Meta, StoryObj } from '@storybook/vue3';

/**
 * # Theme — Safe area spacing (Capacitor)
 *
 * In **native Capacitor apps** on iOS and Android, the system UI can overlap your content:
 * - **Top:** Status bar, notch, or Dynamic Island
 * - **Bottom:** Home indicator or navigation bar
 *
 * The theme defines spacing variables that use `env(safe-area-inset-*)` so you can pad
 * content away from these areas. In the browser (and in Storybook) these insets are
 * typically `0`, so content is unchanged; on device, they resolve to the actual safe
 * area sizes.
 *
 * Variables are in `src/styles/theme.css`. Use them for padding (e.g. on the main
 * app shell or full-screen views) so content is never hidden under the system chrome.
 */
const meta = {
	title: 'Styles/Theme',
	parameters: {
		docs: {
			description: {
				component:
					'Safe area spacing variables for native Capacitor apps. Use these to keep content clear of the status bar, notch, and home indicator on iOS and Android.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const contentClass = 'rounded-lg border border-(--bcc-border-subtle) bg-[var(--bcc-surface-elevated)] p-4 text-sm';

/**
 * ## Why safe area spacing?
 *
 * On iOS and Android, the viewport can extend under the status bar, notch, and
 * bottom home/nav bar. If you don’t add padding, your headers and buttons sit
 * under that system UI. The theme variables read the platform’s safe area
 * insets and (optionally) enforce a minimum spacing so your layout stays
 * readable and tappable.
 */
export const WhySafeAreaSpacing: Story = {
	render: () => ({
		template: `
			<div class="max-w-xl space-y-4">
				<div class="${contentClass}">
					<p class="font-medium">Problem</p>
					<p class="mt-1 opacity-90">Without safe area padding, the top bar (status bar, notch) and bottom bar (home indicator) can cover your content in native Capacitor apps.</p>
				</div>
				<div class="${contentClass}">
					<p class="font-medium">Solution</p>
					<p class="mt-1 opacity-90">Use the theme spacing variables (e.g. <code class="rounded bg-(--bcc-surface) px-1">--spacing-inset-top</code>, <code class="rounded bg-(--bcc-surface) px-1">--spacing-inset-bottom</code>) for padding on your main layout so content stays in the safe area.</p>
				</div>
			</div>
		`,
	}),
};

/**
 * ## Available variables
 *
 * Defined in `theme.css` under `@theme`. All use `env(safe-area-inset-*, …)` with
 * a fallback so they’re `0` in the browser.
 *
 * | Variable | Description |
 * |----------|-------------|
 * | `--spacing-inset-top` | Exact top safe area (no minimum) |
 * | `--spacing-inset-top-1` | Top, at least 0.25rem |
 * | `--spacing-inset-top-2` | Top, at least 0.5rem |
 * | `--spacing-inset-top-4` | Top, at least 1rem |
 * | `--spacing-inset-bottom` | Exact bottom safe area |
 * | `--spacing-inset-bottom-1` | Bottom, at least 0.25rem |
 * | `--spacing-inset-bottom-2` | Bottom, at least 0.5rem |
 * | `--spacing-inset-bottom-4` | Bottom, at least 1rem |
 * | `--spacing-inset-left` | Left safe area (e.g. landscape notch) |
 * | `--spacing-inset-right` | Right safe area |
 *
 * Use the `-1`, `-2`, `-4` variants when you want a minimum padding even when
 * the system inset is small or zero (e.g. in browser or on devices with no notch).
 */
export const AvailableVariables: Story = {
	render: () => ({
		template: `
			<div class="max-w-xl space-y-3">
				<p class="text-sm opacity-80">Use these CSS variables for padding on your app shell or full-screen views:</p>
				<div class="grid gap-2 text-sm">
					<div class="${contentClass}">
						<span class="font-medium">Top</span>
						<code class="ml-2 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-top</code>,
						<code class="ml-1 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-top-1</code>,
						<code class="ml-1 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-top-2</code>,
						<code class="ml-1 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-top-4</code>
					</div>
					<div class="${contentClass}">
						<span class="font-medium">Bottom</span>
						<code class="ml-2 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-bottom</code>,
						<code class="ml-1 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-bottom-1</code>,
						<code class="ml-1 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-bottom-2</code>,
						<code class="ml-1 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-bottom-4</code>
					</div>
					<div class="${contentClass}">
						<span class="font-medium">Sides</span>
						<code class="ml-2 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-left</code>,
						<code class="ml-1 rounded bg-(--bcc-surface) px-1.5 py-0.5 text-xs">--spacing-inset-right</code>
					</div>
				</div>
			</div>
		`,
	}),
};

/**
 * ## Example: full-height layout
 *
 * A typical app shell pads the main content with the theme variables. In Storybook
 * the insets are 0, so we simulate a “phone” with fixed insets so you can see the
 * effect. On a real device you’d use the variables directly on your root or
 * main content container.
 */
export const FullHeightLayout: Story = {
	render: () => ({
		template: `
			<div class="rounded-xl border border-(--bcc-border-subtle) overflow-hidden" style="max-width: 320px; height: 560px;">
				<!-- Simulated top bar (status bar / notch) -->
				<div class="h-12 bg-(--bcc-border-subtle) center text-xs opacity-60">Status bar</div>
				<!-- Main content: use theme vars in real app: pt-[var(--spacing-inset-top)] pb-[var(--spacing-inset-bottom)] -->
				<div
					class="flex flex-col flex-1 overflow-auto p-4"
					style="
						padding-top: max(1rem, env(safe-area-inset-top, 0px));
						padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px));
					"
				>
					<div class="${contentClass} mb-4">
						<p class="font-medium">Content area</p>
						<p class="mt-1 opacity-90">This area uses safe-area-aware padding so it stays clear of the top and bottom system UI on iOS/Android.</p>
					</div>
					<div class="${contentClass} mb-4">More content…</div>
					<div class="${contentClass} mt-auto">
						<p class="font-medium">Footer / CTA</p>
						<p class="mt-1 opacity-90">Bottom padding keeps this above the home indicator.</p>
					</div>
				</div>
				<!-- Simulated bottom bar (home indicator) -->
				<div class="h-8 bg-(--bcc-border-subtle) center text-xs opacity-60">Home indicator</div>
			</div>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story:
					'Simulated phone frame. In a real Capacitor app, apply padding using the theme utilities (e.g. `pt-inset-top` or `pt-inset-top-4`) on your main content container.',
			},
		},
	},
};

/**
 * ## Usage in Tailwind
 *
 * The theme exposes these as spacing utilities. For a full-screen view that
 * respects safe areas, use the inset utilities:
 *
 * - `pt-inset-top`, `pt-inset-top-1`, `pt-inset-top-2`, `pt-inset-top-4`
 * - `pb-inset-bottom`, `pb-inset-bottom-1`, `pb-inset-bottom-2`, `pb-inset-bottom-4`
 * - `pl-inset-left`, `pr-inset-right`
 *
 * You can also use arbitrary values: `pt-[var(--spacing-inset-top-4)]`. Use
 * the bare variables when you only want the exact system inset; use `-1`, `-2`,
 * or `-4` when you want an extra minimum so content isn’t flush in browser or
 * on devices with small insets.
 */
export const UsageInTailwind: Story = {
	render: () => ({
		template: `
			<div class="max-w-xl space-y-4">
				<pre class="rounded-lg border border-(--bcc-border-subtle) bg-(--bcc-surface-elevated) p-4 text-xs overflow-x-auto"><code>&lt;main class="min-h-screen pt-inset-top-4 pb-inset-bottom-4 px-4"&gt;
  &lt;h1&gt;App content&lt;/h1&gt;
  ...
&lt;/main&gt;</code></pre>
				<p class="text-sm opacity-80">On iOS/Android in a Capacitor build, the padding will match the safe area (with a minimum of 1rem). In the browser, it will be 1rem.</p>
			</div>
		`,
	}),
};
