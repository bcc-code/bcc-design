import BccPreset from '@bcc-code/design-tokens/primevue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import FocusTrapDirective from 'primevue/focustrap';
import ToastService from 'primevue/toastservice';
import TooltipDirective from 'primevue/tooltip';

import type { App } from 'vue';

import { setBccApp } from './appContext';
import { installBccLightbox } from './components/custom/BccLightbox/state';

export default function setup(app: App) {
	setBccApp(app);

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
	app.directive('tooltip', TooltipDirective);
	app.directive('focus-trap', FocusTrapDirective);

	installBccLightbox(app);
}
