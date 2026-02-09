import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import BccPreset from '@bcc-code/design-tokens/primevue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import FocusTrap from 'primevue/focustrap';

import '../src/style.css';

// PrimeVue setup for Storybook (see https://github.com/xiscohv/primevue-ts-storybook)
setup(app => {
	app.use(PrimeVue, {
		theme: {
			preset: BccPreset,
			options: {
				prefix: '',
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
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [
		story => ({
			components: { story },
			template: '<div class="ctx ctx-default p-6 font-sans"><story /></div>',
		}),
	],
};

export default preview;
