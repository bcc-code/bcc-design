import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
	title: 'Foundations/Colors/Demos',
	tags: ['!autodocs', '!dev'],
	parameters: { minimal: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Color Ramps ── */

const saturatedRamps = [
	{ label: 'Blue', token: 'color.blue', colors: ['#f6fbff','#d9ecff','#a6cdfd','#7cabf9','#608ef6','#446add','#274eb5','#273c8f','#212c64','#091e47'] },
	{ label: 'Teal', token: 'color.teal', colors: ['#f6fbff','#c3f2f8','#82d3e3','#51b9cf','#1a9eb7','#0b7da1','#005b81','#09486b','#0d324d','#0c2132'] },
	{ label: 'Green', token: 'color.green', colors: ['#efffed','#cbf3c9','#83d895','#32c180','#1ca673','#09825d','#0c6241','#094c3b','#073734','#032429'] },
	{ label: 'Brown', token: 'color.brown', colors: ['#f9faf4','#ece8dc','#d1c5b0','#bea889','#a98c66','#8b6d45','#6e5232','#553d28','#3f2c1e','#2e1b0f'] },
	{ label: 'Yellow', token: 'color.yellow', colors: ['#fdf8e9','#f8e6a0','#e9c348','#d5a406','#bc870d','#a4670b','#854901','#653805','#4b2c04','#2d1f00'] },
	{ label: 'Orange', token: 'color.orange', colors: ['#fffaed','#fee3c1','#f6b981','#f19457','#da772e','#b55919','#943a14','#782612','#5d1712','#420e0d'] },
	{ label: 'Red', token: 'color.red', colors: ['#fff8f3','#fee2dd','#fab6ad','#fa877e','#ed6362','#ca414e','#a42237','#811436','#630d2e','#440223'] },
	{ label: 'Magenta', token: 'color.magenta', colors: ['#fff8ff','#fce0f8','#f3b4e2','#eb8acf','#de66b0','#be428f','#952e70','#751f57','#5b1043','#3f0534'] },
	{ label: 'Purple', token: 'color.purple', colors: ['#f6f9ff','#e3e3fe','#c9c3ec','#afa0e0','#9a82da','#8360c3','#61479c','#493481','#352465','#241850'] },
	{ label: 'Brand', token: 'color.bcc', colors: ['#f0fcfa','#d2eeeb','#a0cec8','#6fb5ad','#3e9f97','#1d7f78','#0c625c','#014d49','#0b3633','#012320'] },
];

const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

function rampTemplate(ramps: typeof saturatedRamps, stepsArr: (number | string)[], bgFn?: (r: any) => string) {
	const rows = ramps.map(r => {
		const bgStyle = bgFn ? ` style="background:${bgFn(r)}"` : '';
		const swatches = r.colors.map((c, i) => {
			const radius = i === 0 ? 'rounded-l-sm' : i === r.colors.length - 1 ? 'rounded-r-sm' : '';
			const twClass = 'bg-' + r.token.replace('color.', '') + '-' + stepsArr[i];
			return `<div class="color-swatch flex-1 h-[36px] ${radius}" data-token="${r.token}.${stepsArr[i]}" data-hex="${c}" data-tw="${twClass}" style="background:${c}" />`;
		}).join('');
		return `<div class="flex items-center">
			<span class="body-md text-subtle w-[72px] font-semibold shrink-0">${r.label}</span>
			<div class="flex flex-1 rounded-sm"${bgStyle}>${swatches}</div>
		</div>`;
	}).join('');

	const labels = stepsArr.map(s => `<div class="flex-1 text-center body-md text-subtlest">${s}</div>`).join('');

	return `<div class="flex flex-col gap-spacing-100">
		${rows}
		<div class="flex items-center">
			<span class="w-[72px] shrink-0"></span>
			<div class="flex flex-1">${labels}</div>
		</div>
	</div>`;
}

export const SaturatedColors: Story = {
	render: () => ({
		template: rampTemplate(saturatedRamps, steps),
	}),
};

export const NeutralColors: Story = {
	render: () => ({
		template: rampTemplate([
			{ label: 'Light', token: 'color.neutral', colors: ['#ffffff','#f8f8f8','#f0f1f2','#dddee1','#b7b9be','#8c8f97','#7d818a','#6b6e76','#505258','#3b3d42','#292a2e','#1e1f21'] },
			{ label: 'Dark', token: 'color.dark-neutral', colors: ['#18191a','#1f1f21','#242528','#303134','#4b4d51','#63666b','#7e8188','#96999e','#a9abaf','#bfc1c4','#cecfd2','#e2e3e4'] },
		], [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100]),
	}),
};

export const AlphaColors: Story = {
	render: () => ({
		template: rampTemplate([
			{ label: 'Light', token: 'color.neutral-alpha', colors: ['#17171708','#0515240f','#0b120e24','#080f214a','#050c1f75'], bg: '#ffffff' },
			{ label: 'Dark', token: 'color.dark-neutral-alpha', colors: ['#bdbdbd0a','#ceced912','#e3e4f21f','#e5e9f640','#e9f0fb5c'], bg: '#1f1f21' },
		] as any, ['100A', '200A', '300A', '400A', '500A'], (r: any) => r.bg),
	}),
};

/* ── Accent Background Grid ── */

export const AccentBackgroundGrid: Story = {
	render: () => ({
		setup() {
			const hues = ['gray', 'blue', 'teal', 'green', 'brown', 'yellow', 'orange', 'red', 'magenta', 'purple'];
			const levels = ['subtlest', 'subtler', 'subtle', 'bolder'];
			return { hues, levels };
		},
		template: `
			<div class="flex flex-col gap-spacing-100">
				<div v-for="level in levels" :key="level" class="flex items-center">
					<span class="body-md text-subtle w-[72px] font-semibold shrink-0 capitalize">{{ level }}</span>
					<div class="flex flex-1">
						<div v-for="(hue, i) in hues" :key="hue" class="flex-1">
							<div
								class="color-swatch w-full h-[36px]"
								:class="{ 'rounded-l-sm': i === 0, 'rounded-r-sm': i === hues.length - 1 }"
								:data-token="'color.background.accent.' + hue + '.' + level"
								:data-tw="'bg-accent-' + hue + '-' + level + '-default'"
								:data-hex="'var(--color-background-accent-' + hue + '-' + level + '-default)'"
								:style="{ background: 'var(--color-background-accent-' + hue + '-' + level + '-default)' }"
							/>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<span class="w-[72px] shrink-0" />
					<div class="flex flex-1">
						<div v-for="hue in hues" :key="hue" class="flex-1 text-center capitalize body-md text-subtlest">{{ hue }}</div>
					</div>
				</div>
			</div>
		`,
	}),
};

/* ── Token Anatomy ── */

export const TokenAnatomy: Story = {
	render: () => ({
		setup() {
			const segments = [
				{ text: 'color', label: 'Category', color: '#6b6e76' },
				{ text: 'background', label: 'Property', color: '#446add' },
				{ text: 'danger', label: 'Role', color: '#0c625c' },
				{ text: 'bold', label: 'Emphasis', color: '#ca414e' },
				{ text: 'hovered', label: 'State', color: '#a4670b' },
			];
			const parts = [
				{ label: 'Category', color: '#6b6e76', desc: 'Top-level group', examples: ['color'] },
				{ label: 'Property', color: '#446add', desc: 'Functional area', examples: ['text', 'background', 'border', 'elevation', 'icon'] },
				{ label: 'Role', color: '#0c625c', desc: 'Purpose of the token', examples: ['brand', 'danger', 'success', 'neutral', 'accent-blue'] },
				{ label: 'Emphasis', color: '#ca414e', desc: 'Intensity level', examples: ['subtlest', 'subtler', 'subtle', 'bold', 'bolder'] },
				{ label: 'State', color: '#a4670b', desc: 'Interaction state', examples: ['default', 'hovered', 'pressed'] },
			];
			return { segments, parts };
		},
		template: `
			<div>
				<div class="flex items-start justify-center my-spacing-300">
					<div v-for="(s, i) in segments" :key="i" class="flex items-start">
						<div class="flex flex-col items-center gap-spacing-100">
							<span class="text-sm font-mono font-medium leading-none rounded-full px-spacing-150 py-spacing-75" :style="{ background: s.color, color: '#fff' }">{{ s.text }}</span>
							<span class="text-xs font-semibold uppercase tracking-wider" :style="{ color: s.color }">{{ s.label }}</span>
						</div>
						<div v-if="i < segments.length - 1" class="w-[12px] h-[1.5px] bg-text-subtlest mt-[13px] shrink-0" />
					</div>
				</div>
				<div class="flex flex-col rounded-lg overflow-hidden border border-default">
					<div v-for="(p, idx) in parts" :key="p.label" class="flex items-center" :class="{ 'border-t border-default': idx > 0 }">
						<div class="w-[4px] self-stretch shrink-0" :style="{ background: p.color }" />
						<div class="px-spacing-200 py-spacing-150 w-[130px] shrink-0">
							<span class="heading-sm">{{ p.label }}</span>
						</div>
						<div class="py-spacing-150 w-[150px] shrink-0">
							<span class="body-md text-subtle">{{ p.desc }}</span>
						</div>
						<div class="flex gap-spacing-75 flex-wrap px-spacing-200 py-spacing-150">
							<code v-for="e in p.examples" :key="e" class="text-xs font-medium rounded-full px-spacing-150 py-spacing-25" :style="{ background: p.color + '14', color: p.color }">{{ e }}</code>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

/* ── Color Roles ── */

export const ColorRoles: Story = {
	render: () => ({
		setup() {
			const roles = [
				{ name: 'neutral', color: 'var(--color-neutral-600)', description: 'Use for default text and secondary UI elements, such as secondary buttons or navigation elements.' },
				{ name: 'brand', color: 'var(--color-bcc-600)', description: 'Use for primary actions or elements that communicate the BCC brand.' },
				{ name: 'danger', color: 'var(--color-red-600)', description: 'Errors, destructive actions, or critical warnings.' },
				{ name: 'warning', color: 'var(--color-yellow-500)', description: 'Cautions that need attention but are not critical.' },
				{ name: 'success', color: 'var(--color-green-600)', description: 'Positive feedback, completed actions, or valid states.' },
				{ name: 'information', color: 'var(--color-blue-600)', description: 'Neutral tips, contextual help, or informational banners.' },
				{ name: 'accent', color: 'var(--color-purple-500)', description: 'Categorization without semantic meaning — tags, labels, project icons.' },
				{ name: 'inverse', color: 'var(--color-neutral-1100)', description: 'Use for UI elements that sit on bold emphasis backgrounds.', border: true },
			];
			return { roles };
		},
		template: `
			<div class="flex flex-col gap-spacing-250 my-spacing-200">
				<div v-for="r in roles" :key="r.name" class="flex items-center gap-spacing-100">
					<div class="flex items-center gap-spacing-100 w-[140px] shrink-0">
						<div class="w-[12px] h-[12px] rounded-full shrink-0" :style="{ background: r.color, border: r.border ? '2px solid var(--color-border-default)' : 'none' }" />
						<span class="text-sm font-semibold">{{ r.name }}</span>
					</div>
					<span class="text-subtle body-sm">—</span>
					<span class="body-md text-subtle leading-relaxed">{{ r.description }}</span>
				</div>
			</div>
		`,
	}),
};

/* ── Do / Don't: Color Role ── */

export const DoColorRole: Story = {
	render: () => ({
		template: `
			<div class="flex gap-spacing-200">
				<div class="flex-1 rounded-lg overflow-hidden">
					<div class="bg-neutral-100 p-spacing-250 flex items-center justify-center gap-spacing-150 min-h-[72px]">
						<div class="flex items-center gap-spacing-75 bg-elevation-surface-default border border-default rounded-full px-spacing-150 py-spacing-75">
							<div class="w-[10px] h-[10px] rounded-full bg-icon-danger" />
							<code class="text-xs">color.icon.danger</code>
						</div>
						<div class="flex items-center gap-spacing-75 bg-danger-default border border-danger rounded-sm px-spacing-150 py-spacing-75">
							<div class="w-[14px] h-[14px] rounded-full bg-icon-danger flex items-center justify-center">
								<span class="text-white text-[10px] font-bold leading-none">!</span>
							</div>
							<span class="text-xs text-danger">Message Content</span>
						</div>
					</div>
					<div class="border-t-[3px] border-success" />
					<div class="bg-success-default p-spacing-200">
						<div class="flex items-center gap-spacing-75 mb-spacing-50">
							<span class="text-icon-success text-base leading-none">✔</span>
							<strong class="heading-sm">Do</strong>
						</div>
						<span class="body-md text-subtle">Use the right color role for your situation.</span>
					</div>
				</div>
				<div class="flex-1 rounded-lg overflow-hidden">
					<div class="bg-neutral-100 p-spacing-250 flex items-center justify-center gap-spacing-150 min-h-[72px]">
						<div class="flex items-center gap-spacing-75 bg-success-default border border-success rounded-sm px-spacing-150 py-spacing-75">
							<div class="w-[14px] h-[14px] rounded-full bg-icon-success flex items-center justify-center">
								<span class="text-white text-[10px] font-bold leading-none">!</span>
							</div>
							<span class="text-xs text-success">Error: something went wrong</span>
						</div>
					</div>
					<div class="border-t-[3px] border-danger" />
					<div class="bg-danger-default p-spacing-200">
						<div class="flex items-center gap-spacing-75 mb-spacing-50">
							<span class="text-icon-danger text-base leading-none">✖</span>
							<strong class="heading-sm">Don't</strong>
						</div>
						<span class="body-md text-subtle">Don't use the wrong color role — green for errors confuses users.</span>
					</div>
				</div>
			</div>
		`,
	}),
};

/* ── Accent Pairing Cards ── */

export const AccentPairingCards: Story = {
	render: () => ({
		setup() {
			const cards = [
				{ bg: 'subtlest', icons: 2, textColors: ['default', 'bold'], labels: ['Default text', 'Bolder text'], label: 'Subtlest' },
				{ bg: 'subtler', icons: 2, textColors: ['default', 'bold'], labels: ['Default text', 'Bolder text'], label: 'Subtler' },
				{ bg: 'subtle', icons: 1, textColors: ['bold'], labels: ['Bolder text'], label: 'Subtle' },
				{ bg: 'bolder', icons: 1, textColors: ['inverse'], labels: ['Inverse text'], label: 'Bolder', inverse: true },
			];
			return { cards };
		},
		template: `
			<div class="flex gap-spacing-150">
				<div v-for="c in cards" :key="c.bg" class="flex-1 rounded-xl overflow-hidden">
					<div class="flex flex-col items-start gap-spacing-50 min-h-[150px] px-spacing-250 pt-spacing-300 pb-spacing-250" :style="{ background: 'var(--color-background-brand-' + c.bg + '-default)' }">
						<div class="flex gap-spacing-50 mb-spacing-100">
							<span class="material-symbols-outlined text-2xl" :style="{ color: c.inverse ? 'var(--color-icon-inverse)' : 'var(--color-text-brand-default)' }">auto_fix_high</span>
							<span v-if="c.icons >= 2" class="material-symbols-outlined text-2xl" :style="{ color: c.inverse ? 'var(--color-icon-inverse)' : 'var(--color-text-brand-default)' }">auto_fix_high</span>
						</div>
						<span v-for="(tc, i) in c.textColors" :key="i" class="text-sm" :class="tc === 'bold' || tc === 'inverse' ? 'font-bold' : 'font-semibold'" :style="{ color: tc === 'inverse' ? 'var(--color-text-inverse)' : tc === 'default' ? 'var(--color-text-brand-default)' : 'var(--color-text-brand-bold)' }">{{ c.labels[i] }}</span>
					</div>
					<div class="px-spacing-250 py-spacing-100 text-xs font-medium" :style="{ background: 'var(--color-background-brand-' + c.bg + '-default)', borderTop: c.inverse ? '1px dashed rgba(255,255,255,0.2)' : '1px dashed var(--color-border-default)', color: c.inverse ? 'var(--color-text-inverse)' : 'var(--color-text-default)' }">{{ c.label }}</div>
				</div>
			</div>
		`,
	}),
};

/* ── Do / Don't: Accent Mixing ── */

export const DoAccentMixing: Story = {
	render: () => ({
		template: `
			<div class="flex gap-spacing-200">
				<div class="flex-1 rounded-lg overflow-hidden">
					<div class="bg-neutral-100 p-spacing-300 flex flex-col items-center">
						<div class="flex items-center gap-spacing-100 bg-elevation-surface-default border border-default rounded-full px-spacing-150 py-spacing-75">
							<div class="w-[16px] h-[16px] rounded-full bg-accent-teal-subtler-default" />
							<code class="text-xs whitespace-nowrap">background.accent.teal.subtler</code>
						</div>
						<div class="w-[1.5px] h-[20px] bg-border-danger mx-auto" />
						<div class="flex items-center gap-spacing-75 rounded-full px-spacing-200 py-spacing-100 bg-accent-teal-subtler-default">
							<span class="material-symbols-outlined text-base text-accent-teal-bold">grid_view</span>
							<span class="text-sm font-semibold leading-none text-accent-teal-bold">Label</span>
						</div>
						<div class="w-[1.5px] h-[20px] bg-border-danger mx-auto" />
						<div class="flex items-center gap-spacing-100 bg-elevation-surface-default border border-default rounded-full px-spacing-150 py-spacing-75">
							<div class="w-[16px] h-[16px] rounded-full bg-icon-accent-teal-bold" />
							<code class="text-xs whitespace-nowrap">text.accent.teal.bold</code>
						</div>
					</div>
					<div class="border-t-[3px] border-success" />
					<div class="bg-success-default p-spacing-200">
						<div class="flex items-center gap-spacing-75 mb-spacing-50">
							<span class="text-icon-success text-base leading-none">✔</span>
							<strong class="heading-sm">Do</strong>
						</div>
						<span class="body-md text-subtle">Use the right color role for your situation.</span>
					</div>
				</div>
				<div class="flex-1 rounded-lg overflow-hidden">
					<div class="bg-neutral-100 p-spacing-300 flex flex-col items-center">
						<div class="flex items-center gap-spacing-100 bg-elevation-surface-default border border-default rounded-full px-spacing-150 py-spacing-75">
							<div class="w-[16px] h-[16px] rounded-full bg-accent-brown-subtler-default" />
							<code class="text-xs whitespace-nowrap">background.accent.brown.subtler</code>
						</div>
						<div class="w-[1.5px] h-[20px] bg-border-danger mx-auto" />
						<div class="flex items-center gap-spacing-75 rounded-full px-spacing-200 py-spacing-100 bg-accent-brown-subtler-default">
							<span class="material-symbols-outlined text-base text-accent-teal-bold">grid_view</span>
							<span class="text-sm font-semibold leading-none text-accent-teal-bold">Label</span>
						</div>
						<div class="w-[1.5px] h-[20px] bg-border-danger mx-auto" />
						<div class="flex items-center gap-spacing-100 bg-elevation-surface-default border border-default rounded-full px-spacing-150 py-spacing-75">
							<div class="w-[16px] h-[16px] rounded-full bg-icon-accent-teal-bold" />
							<code class="text-xs whitespace-nowrap">text.accent.teal.bold</code>
						</div>
					</div>
					<div class="border-t-[3px] border-danger" />
					<div class="bg-danger-default p-spacing-200">
						<div class="flex items-center gap-spacing-75 mb-spacing-50">
							<span class="text-icon-danger text-base leading-none">✖</span>
							<strong class="heading-sm">Don't</strong>
						</div>
						<span class="body-md text-subtle">Don't mix accent hue families across foreground and background.</span>
					</div>
				</div>
			</div>
		`,
	}),
};

/* ── Text & Icon Accent Tokens ── */

export const TextAccentTokens: Story = {
	render: () => ({
		template: `
			<div class="flex rounded-lg overflow-hidden bg-neutral-100">
				<div class="flex-1 p-spacing-300 flex flex-col items-center gap-spacing-100">
					<div class="flex items-center gap-spacing-100 mb-spacing-50 border border-default rounded-full px-spacing-150 py-spacing-75 bg-elevation-surface-default">
						<div class="w-4 h-4 rounded-full" style="background:var(--color-text-brand-default)" />
						<code class="text-xs">color.text.brand.default</code>
					</div>
					<span class="heading-lg text-brand-default">Heading</span>
					<span class="body-md text-brand-default">Body text</span>
				</div>
				<div class="w-px bg-border-default" />
				<div class="flex-1 p-spacing-300 flex flex-col items-center gap-spacing-100">
					<div class="flex items-center gap-spacing-100 mb-spacing-50 border border-default rounded-full px-spacing-150 py-spacing-75 bg-elevation-surface-default">
						<div class="w-4 h-4 rounded-full" style="background:var(--color-text-brand-bold)" />
						<code class="text-xs">color.text.brand.bold</code>
					</div>
					<span class="heading-lg text-brand-bold">Heading</span>
					<span class="body-md text-brand-bold">Body text</span>
				</div>
			</div>
		`,
	}),
};

export const IconAccentTokens: Story = {
	render: () => ({
		template: `
			<div class="flex rounded-lg overflow-hidden bg-neutral-100">
				<div class="flex-1 p-spacing-300 flex flex-col items-center gap-spacing-100">
					<div class="flex items-center gap-spacing-100 mb-spacing-50 border border-default rounded-full px-spacing-150 py-spacing-75 bg-elevation-surface-default">
						<div class="w-4 h-4 rounded-full" style="background:var(--color-icon-brand-default)" />
						<code class="text-xs">color.icon.brand.default</code>
					</div>
					<span class="material-symbols-outlined text-[32px]" style="color:var(--color-icon-brand-default)">auto_fix_high</span>
				</div>
				<div class="w-px bg-border-default" />
				<div class="flex-1 p-spacing-300 flex flex-col items-center gap-spacing-100">
					<div class="flex items-center gap-spacing-100 mb-spacing-50 border border-default rounded-full px-spacing-150 py-spacing-75 bg-elevation-surface-default">
						<div class="w-4 h-4 rounded-full" style="background:var(--color-icon-brand-bold)" />
						<code class="text-xs">color.icon.brand.bold</code>
					</div>
					<span class="material-symbols-outlined text-[32px]" style="color:var(--color-icon-brand-bold)">auto_fix_high</span>
				</div>
			</div>
		`,
	}),
};
