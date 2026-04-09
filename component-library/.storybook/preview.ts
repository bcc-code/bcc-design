import BccPreset from '@bcc-code/design-tokens/primevue';
import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import FocusTrapDirective from 'primevue/focustrap';
import TooltipDirective from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import { onMounted, onUnmounted, ref } from 'vue';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import { BccConfirmDialog, BccToast } from '../src/index';
import '../src/style.css';
import '../src/styles/archivo-font.css';

/* ── Color swatch copy popover (tippy) ── */

function hexToRgb(hex: string) {
	hex = hex.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	if (hex.length === 8) {
		const a = parseInt(hex.substring(6, 8), 16) / 255;
		return `rgba(${r}, ${g}, ${b}, ${parseFloat(a.toFixed(2))})`;
	}
	return `rgb(${r}, ${g}, ${b})`;
}

function showCopyToast(text: string) {
	let toast = document.getElementById('copy-toast');
	if (!toast) {
		toast = document.createElement('div');
		toast.id = 'copy-toast';
		toast.className = 'copy-toast';
		document.body.appendChild(toast);
	}
	toast.textContent = 'Copied ' + text;
	toast.classList.add('show');
	clearTimeout(toastTimeout);
	toastTimeout = setTimeout(() => toast!.classList.remove('show'), 1200);
}

let toastTimeout: ReturnType<typeof setTimeout>;
let copyLock = false;

document.addEventListener('mouseover', (e) => {
	const swatch = (e.target as HTMLElement).closest('.color-swatch') as HTMLElement | null;
	if (!swatch || (swatch as any)._tippy || copyLock) return;

	let hex = swatch.getAttribute('data-hex');
	const token = swatch.getAttribute('data-token');
	const tw = swatch.getAttribute('data-tw');
	if (!hex && !token && !tw) return;

	// Resolve hex from computed background only for actual color swatches
	if (hex && hex.startsWith('#')) {
		// Already a hex value — keep it
	} else if (hex && hex.startsWith('rgba(')) {
		// Already an rgba value — keep it as-is
	} else if (hex && hex.startsWith('var(')) {
		const computed = getComputedStyle(swatch).backgroundColor;
		const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
		if (match) {
			hex = '#' + [match[1], match[2], match[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
			if (match[4] && parseFloat(match[4]) < 1) {
				hex += Math.round(parseFloat(match[4]) * 255).toString(16).padStart(2, '0');
			}
		} else {
			hex = null;
		}
	} else {
		hex = null;
	}

	const isRgba = hex && hex.startsWith('rgba(');
	const rgb = hex && !isRgba ? hexToRgb(hex) : '';
	const items: { label: string; value: string }[] = [];
	if (token) items.push({ label: 'Token', value: token });
	if (token && !hex) {
		const cssVar = 'var(--' + token.replace(/\./g, '-') + ')';
		items.push({ label: 'CSS', value: cssVar });
	}
	if (tw) items.push({ label: 'Tailwind', value: tw });
	if (hex) items.push({ label: isRgba ? 'RGBA' : 'Hex', value: hex });
	if (rgb) items.push({ label: 'RGB', value: rgb });

	const html = items.map(item =>
		`<div class="color-copy-row">` +
		`<span class="color-copy-label">${item.label}</span>` +
		`<button class="color-copy-btn" data-value="${item.value}">${item.value}<span class="color-copy-icon">&#xe14d;</span></button>` +
		`</div>`
	).join('');

	tippy(swatch, {
		content: html,
		allowHTML: true,
		interactive: true,
		trigger: 'mouseenter',
		placement: 'bottom-start',
		theme: 'color-copy',
		arrow: true,
		appendTo: document.body,
		onCreate(instance) {
			instance.popper.addEventListener('click', (ev) => {
				const btn = (ev.target as HTMLElement).closest('.color-copy-btn');
				if (!btn) return;
				const val = btn.getAttribute('data-value');
				if (val) {
					navigator.clipboard.writeText(val).then(() => {
						showCopyToast(val);
						instance.hide();
						copyLock = true;
						setTimeout(() => { copyLock = false; }, 400);
					});
				}
			});
		},
		onHidden(instance) {
			instance.destroy();
		},
	});

	(swatch as any)._tippy.show();
});

/** Only one BccConfirmDialog is mounted across all story instances (avoids 5 dialogs on docs page). */
let confirmDialogSlotClaimed = false;
const ConfirmDialogSingleton = {
	components: { BccConfirmDialog },
	template: '<BccConfirmDialog v-if="claimed" />',
	setup() {
		const claimed = ref(false);
		onMounted(() => {
			if (!confirmDialogSlotClaimed) {
				confirmDialogSlotClaimed = true;
				claimed.value = true;
			}
		});
		onUnmounted(() => {
			if (claimed.value) confirmDialogSlotClaimed = false;
		});
		return { claimed };
	},
};

let toastSlotClaimed = false;
const ToastSingleton = {
	components: { BccToast },
	template: '<BccToast v-if="claimed" />',
	setup() {
		const claimed = ref(false);
		onMounted(() => {
			if (!toastSlotClaimed) {
				toastSlotClaimed = true;
				claimed.value = true;
			}
		});
		onUnmounted(() => {
			if (claimed.value) toastSlotClaimed = false;
		});
		return { claimed };
	},
};

// PrimeVue setup for Storybook (see https://github.com/xiscohv/primevue-ts-storybook)
setup(app => {
	// Avoid useId() conflicts when multiple Vue apps exist (e.g. in Docs with multiple stories).
	// All Storybook-generated IDs (and PrimeVue’s $attrSelector e.g. pc0) will use this prefix.
	const random = Array.from(
		{ length: 5 },
		() => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]
	).join('');
	app.config.idPrefix = `sb-${random}-`;

	app.use(PrimeVue, {
		theme: {
			preset: BccPreset,
			options: {
				darkModeSelector: '.dark',
				cssLayer: {
					name: 'primevue',
					order: 'theme, base, primevue, tailwind',
				},
			},
		},
	});
	app.use(ConfirmationService);
	app.use(ToastService);
	app.directive('tooltip', TooltipDirective);
	app.directive('focus-trap', FocusTrapDirective);
});

const preview: Preview = {
	tags: ['autodocs'],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		docs: {
			codePanel: true,
			toc: {
				headingSelector: 'h2',
				title: null,
			},
		},
	},
	decorators: [
		(story, context) => ({
			components: { story, ConfirmDialogSingleton, ToastSingleton },
			setup() {
				const toggleDarkMode = () => {
					document.documentElement.classList.toggle('dark');
				};
				const minimal = !!context.parameters?.minimal;
				return { toggleDarkMode, minimal };
			},
			template: `
				<div v-if="minimal" class="sb-unstyled"><story /></div>
				<div v-else class="ctx ctx-default p-6 font-sans">
					<ConfirmDialogSingleton /><ToastSingleton /><story /> <br/> <button @click="toggleDarkMode">🌓</button>
				</div>
			`,
		}),
	],
};

export default preview;
