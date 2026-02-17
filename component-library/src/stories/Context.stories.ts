import type { Meta, StoryObj } from '@storybook/vue3';
import { BCC_CONTEXTS } from '../contexts';

/**
 * # Contexts — context.css & contexts.css
 *
 * **context.css** defines generic utilities that read context CSS variables:
 * - `ctx` — background and text color
 * - `border-ctx` — border color
 * - `text-ctx` / `text-ctx-bold` — text colors
 *
 * **contexts.css** defines the context setters (`ctx-<name>`) that populate those
 * variables for each color/level (e.g. `ctx-brand-subtle`, `ctx-blue-bolder`).
 *
 * Use a context setter plus the generic utilities, e.g. `ctx-brand-subtle ctx border-ctx`.
 */
const meta = {
	title: 'Styles/Context',
	parameters: {
		docs: {
			description: {
				component:
					'Context tokens from contexts.css set CSS variables; context.css utilities (ctx, border-ctx, text-ctx-bold) consume them. Combine e.g. ctx-<name> with ctx border-ctx for boxes.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Base box classes: set context, apply ctx (bg + text) and border-ctx, add border and spacing */
function boxClass(ctx: string) {
	return `ctx-${ctx} ctx border-2 border-ctx shadow-lg shadow-ctx rounded-lg p-4`;
}

/**
 * ## All context tokens by color
 *
 * Grouped by top-level key from `BCC_CONTEXTS` (brand, neutral, success, blue, etc.).
 * Each box uses `ctx-<name>` plus `ctx border-ctx`; the bold line uses `text-ctx-bold`.
 */
export const AllContexts: Story = {
	render: () => ({
		setup() {
			return { BCC_CONTEXTS };
		},
		template: `
			<div class="space-y-8">
				<section v-for="(levels, color) in BCC_CONTEXTS" :key="color">
					<h2 class="mb-4 text-lg font-semibold capitalize">{{ color }}</h2>
					<div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
						<div v-for="(ctx, level) in levels" :key="level" :class="boxClass(ctx)">
							<h3 class="text-heading-sm text-ctx-bold capital">{{ level }}</h3>
							<p class="text-body-sm">ctx-{{ ctx }}</p>
						</div>
					</div>
				</section>
			</div>
		`,
		methods: { boxClass },
	}),
};
