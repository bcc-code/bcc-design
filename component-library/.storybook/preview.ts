import BccPreset from '@bcc-code/design-tokens/primevue';
import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import FocusTrap from 'primevue/focustrap';
import ToastService from 'primevue/toastservice';

import '../src/style.css';
import '../src/styles/archivo-font.css';

// PrimeVue setup for Storybook (see https://github.com/xiscohv/primevue-ts-storybook)
setup(app => {
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
	app.directive('focus-trap', FocusTrap);
});

const preview: Preview = {
	tags: ['autodocs'],
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		docs: {
			// Show story source in the Code panel (Canvas tab) and in Docs tab
			codePanel: true,
		},
	},
	decorators: [
		story => ({
			components: { story },
			setup() {
				const toggleDarkMode = () => {
					document.documentElement.classList.toggle('dark');
				};
				return { toggleDarkMode };
			},
			template:
				'<div class="ctx ctx-default p-6 font-sans"><story /> <br/> <button @click="toggleDarkMode">🌓</button></div>',
		}),
	],
};

export default preview;
