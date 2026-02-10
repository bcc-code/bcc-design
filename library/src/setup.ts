import BccPreset from '@bcc-code/design-tokens/primevue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import './style.css';

import type { App } from 'vue';

export default function setup(app: App) {
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

	app.use(ToastService);
}
