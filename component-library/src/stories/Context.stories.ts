import type { Meta, StoryObj } from '@storybook/vue3';
import { BCC_CONTEXT_LIST } from '../contexts';

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
	return `ctx-${ctx} ctx border-2 border-ctx rounded-lg p-4`;
}

/**
 * ## All context tokens
 *
 * Each box uses a context from `BCC_CONTEXT_LIST`: the class `ctx-<name>` sets the
 * context variables, and `ctx border-ctx` applies background and border from that context.
 * The heading uses normal context text; the bold line uses `text-ctx-bold`.
 */
export const AllContexts: Story = {
	render: () => ({
		setup() {
			return { contexts: BCC_CONTEXT_LIST };
		},
		template: `
			<div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
				<div
					v-for="ctx in contexts"
					:key="ctx"
					:class="boxClass(ctx)"
				>
					<h3 class="text-sm font-medium">{{ ctx }}</h3>
					<p class="mt-1 text-sm text-ctx-bold font-bold">Bold context text</p>
				</div>
			</div>
		`,
		methods: { boxClass },
	}),
};
