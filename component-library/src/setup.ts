import BccPreset from '@bcc-code/design-tokens/primevue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';

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
	app.use(DialogService);
	app.use(ConfirmationService);
}
